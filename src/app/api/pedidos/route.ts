// Em: src/app/api/pedidos/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma, StatusPedido } from "@prisma/client";

/**
 * GET: Lista todos os pedidos do sistema, incluindo detalhes dos produtos,
 * suas variantes, e o cliente associado.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const mes = searchParams.get('mes');
    const ano = searchParams.get('ano');
    const statusParam = searchParams.get('status'); // novo filtro de status

    let whereClause: any = {};

    // --- FILTRO DE DATA ---
    if (mes && ano) {
      const mesNumero = parseInt(mes);
      const anoNumero = parseInt(ano);
      if (!isNaN(mesNumero) && !isNaN(anoNumero)) {
        const dataInicio = new Date(anoNumero, mesNumero - 1, 1);
        const dataFim = new Date(anoNumero, mesNumero, 1);
        whereClause.data = { gte: dataInicio, lt: dataFim };
      }
    }

    // --- FILTRO DE STATUS ---
    if (statusParam && statusParam !== "Todos") {
      // Normaliza "Concluído" para "Concluido" caso seja necessário
      const normalizedStatus = statusParam === "Concluído" ? "Concluido" : statusParam;
      whereClause.status = normalizedStatus as StatusPedido;
    }

    // --- QUERY PRINCIPAL COM TRANSAÇÃO ---
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
/**
 * POST: Cria um novo pedido, verifica o estoque e dá baixa de forma transacional.
 * Recebe um corpo JSON: { clienteId?: string, produtos: [{ varianteId: string, quantidade: number }] }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clienteId, produtos } = body;

    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return NextResponse.json({ error: "O pedido deve conter pelo menos um produto." }, { status: 400 });
    }

    const pedidoCriado = await prisma.$transaction(async (tx) => {
      // Passo 1: Verificar estoque
      for (const produto of produtos) {
        const varianteEmEstoque = await tx.varianteProduto.findUnique({
          where: { id_variante: produto.varianteId },
        });
        if (!varianteEmEstoque || varianteEmEstoque.quantidade < produto.quantidade) {
          throw new Error(`Estoque insuficiente para o produto SKU: ${varianteEmEstoque?.sku || produto.varianteId}`);
        }
      }

      // Passo 2: Criar o Pedido
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

      // Passo 3: Dar baixa no estoque
      for (const produto of produtos) {
        await tx.varianteProduto.update({
          where: { id_variante: produto.varianteId },
          data: {
            quantidade: {
              decrement: produto.quantidade,
            },
          },
        });
      }
      
      // =======================================================
      // PASSO 4: CRIAR E ENVIAR A NOTIFICAÇÃO (NOVA LÓGICA)
      // =======================================================
      
      // Busca todos os usuários do sistema para notificá-los.
      const usuariosDoSistema = await tx.usuario.findMany({
        select: { id_usuario: true },
      });

      // Só cria a notificação se existirem usuários para notificar.
      if (usuariosDoSistema.length > 0) {
        // Cria a notificação principal.
        const novaNotificacao = await tx.notificacao.create({
          data: {
            mensagem: `Novo pedido recebido! ID: #${pedido.id.substring(0, 8)}`,
            link: `/pedidos/${pedido.id}`
          },
        });

        // Cria as entradas na tabela de junção 'NotificacaoUsuario' para cada usuário.
        await tx.notificacaoUsuario.createMany({
          data: usuariosDoSistema.map(usuario => ({
            usuarioId: usuario.id_usuario,
            notificacaoId: novaNotificacao.id_notificacao,
          })),
        });
      }

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