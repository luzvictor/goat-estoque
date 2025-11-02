// Em: src/app/api/pedidos/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma, StatusPedido } from "@prisma/client";
import { criarNotificacaoParaAdmins } from "@/lib/notifications";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const mes = searchParams.get('mes');
    const ano = searchParams.get('ano');
    const statusParam = searchParams.get('status'); 
    let whereClause: any = {};

    if (mes && ano) {
      const mesNumero = parseInt(mes);
      const anoNumero = parseInt(ano);
      if (!isNaN(mesNumero) && !isNaN(anoNumero)) {
        const dataInicio = new Date(anoNumero, mesNumero - 1, 1);
        const dataFim = new Date(anoNumero, mesNumero, 1);
        whereClause.data = { gte: dataInicio, lt: dataFim };
      }
    }

    if (statusParam && statusParam !== "Todos") {
      const normalizedStatus = statusParam === "Concluído" ? "Concluido" : statusParam;
      whereClause.status = normalizedStatus as StatusPedido;
    }

    const [pedidos, total] = await prisma.$transaction([
      prisma.pedido.findMany({
        where: whereClause,
        include: {
          Cliente: { select: { nome: true } },
          produtos: {
            include: {
              variante: {
                include: {
                  produtoBase: {
                    include: { marca: true, categoria: true }
                  },
                  cor: true,
                  tamanho: true,
                }
              }
            }
          }
        },
        orderBy: { data: 'desc' },
        skip,
        take: limit,
      }),
      prisma.pedido.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: pedidos,
      pagination: { totalItems: total, totalPages, currentPage: page, pageSize: limit }
    });

  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return NextResponse.json({ error: "Erro ao buscar pedidos." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clienteId, produtos } = body;

    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return NextResponse.json({ error: "O pedido deve conter pelo menos um produto." }, { status: 400 });
    }

    const pedidoCriado = await prisma.$transaction(async (tx) => {
      // Passo 1: Verificar estoque (Sem alterações)
      for (const produto of produtos) {
        const varianteEmEstoque = await tx.varianteProduto.findUnique({
          where: { id_variante: produto.varianteId },
        });
        if (!varianteEmEstoque || varianteEmEstoque.quantidade < produto.quantidade) {
          throw new Error(`Estoque insuficiente para o produto SKU: ${varianteEmEstoque?.sku || produto.varianteId}`);
        }
      }

      // Passo 2: Criar o Pedido (Sem alterações)
      const pedido = await tx.pedido.create({
        data: {
          clienteId: clienteId || null,
          produtos: {
            create: produtos.map((p: { varianteId: string, quantidade: number }) => ({
              varianteId: p.varianteId,
              quantidade: p.quantidade,
            })),
          },
        },
      });

      // Passo 3: Dar baixa no estoque E VERIFICAR ESTOQUE MÍNIMO
      for (const produto of produtos) {
        // Atualiza o estoque e PAGA OS DADOS ATUALIZADOS
        const varianteAtualizada = await tx.varianteProduto.update({
          where: { id_variante: produto.varianteId },
          data: {
            quantidade: {
              decrement: produto.quantidade,
            },
          },
          // Inclui dados que precisamos para a notificação
          include: {
            produtoBase: { select: { nome: true, id_produto_base: true } },
            cor: { select: { nome: true } },
            tamanho: { select: { nome: true } },
          }
        });

        // =======================================================
        // NOVA LÓGICA DE NOTIFICAÇÃO DE ESTOQUE BAIXO
        // =======================================================
        const { quantidade, estoqueMin, produtoBase, cor, tamanho, id_variante } = varianteAtualizada;
        
        // Compara a quantidade ATUAL com o estoque MÍNIMO (do schema)
        if (quantidade <= estoqueMin) {
          // Monta uma mensagem descritiva
          const nomeVariante = `${produtoBase.nome} (${cor.nome}${tamanho ? ' - ' + tamanho.nome : ''})`;
          const mensagem = `Estoque baixo para ${nomeVariante}. Restam apenas ${quantidade} unidades.`;
          const link = `/produtos/${produtoBase.id_produto_base}?variante=${id_variante}`; // Link direto para o produto/variante

          // Chama a função helper (passando o 'tx' da transação)
          await criarNotificacaoParaAdmins({
            tx,
            mensagem,
            link,
          });
        }
        // =======================================================
        // FIM DA NOVA LÓGICA
        // =======================================================
      }
      
      // =======================================================
      // PASSO 4: NOTIFICAÇÃO DE "PEDIDO CRIADO" (REMOVIDO)
      // =======================================================
      // (A lógica que estava aqui foi removida conforme sua solicitação)

      return pedido;
    });

    return NextResponse.json(pedidoCriado, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao criar pedido:", error);
    if (error.message.includes('Estoque insuficiente')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro interno do servidor ao criar o pedido." }, { status: 500 });
  }
}
