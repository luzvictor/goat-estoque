// Em: src/app/api/pedidos/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma, StatusPedido } from "@prisma/client";
import { criarNotificacaoParaAdmins } from "@/lib/notifications";
import { getUsuarioDaSessao } from "@/lib/session";
import { Role } from "@prisma/client";

export async function GET(request: Request) {
  const usuarioLogado = await getUsuarioDaSessao();
 if (!usuarioLogado) {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
 }
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const mes = searchParams.get('mes');
    const ano = searchParams.get('ano');

    const statusParam = searchParams.get('status'); 
    const sortKey = searchParams.get('sortKey');
  const sortDirection = searchParams.get('sortDirection') as 'asc' | 'desc' | null;

    let whereClause: Prisma.PedidoWhereInput = {};

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

    let orderBy: Prisma.PedidoOrderByWithRelationInput | Prisma.PedidoOrderByWithRelationInput[] = { data: 'desc' };
    if (sortKey && sortDirection) {
      switch (sortKey) {
        case 'data':
          orderBy = { data: sortDirection };
          break;
        case 'cliente':
          orderBy = { Cliente: { nome: sortDirection } };
          break;
        case 'status':
          orderBy = { status: sortDirection };
          break;
      }
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
        orderBy: orderBy,
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
  const usuarioLogado = await getUsuarioDaSessao();
 if (!usuarioLogado) {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
 }
  try {
    const body = await request.json();
    const { clienteId, produtos, data, desconto } = body;

    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return NextResponse.json({ error: "O pedido deve conter pelo menos um produto." }, { status: 400 });
    }

    const pedidoCriado = await prisma.$transaction(async (tx) => {
      for (const produto of produtos) {
        const varianteEmEstoque = await tx.varianteProduto.findUnique({
          where: { id_variante: produto.varianteId },
        });
        if (!varianteEmEstoque || varianteEmEstoque.quantidade < produto.quantidade) {
          throw new Error(`Estoque insuficiente para o produto SKU: ${varianteEmEstoque?.sku || produto.varianteId}`);
        }
      }

      const pedido = await tx.pedido.create({
        data: {
          data: data ? new Date(data) : new Date(),
          clienteId: clienteId || null,
          desconto: Number(desconto) || 0,
          produtos: {
            create: produtos.map((p: { varianteId: string, quantidade: number }) => ({
              varianteId: p.varianteId,
              quantidade: p.quantidade,
            })),
          },
        },
      });

      for (const produto of produtos) {
        const varianteAtualizada = await tx.varianteProduto.update({
          where: { id_variante: produto.varianteId },
          data: {
            quantidade: {
              decrement: produto.quantidade,
            },
          },
          include: {
            produtoBase: { select: { nome: true, id_produto_base: true } },
            cor: { select: { nome: true } },
            tamanho: { select: { nome: true } },
          }
        });

        const { quantidade, estoqueMin, produtoBase, cor, tamanho, id_variante } = varianteAtualizada;
        
        if (quantidade <= estoqueMin) {
          const nomeVariante = `${produtoBase.nome} (${cor.nome}${tamanho ? ' - ' + tamanho.nome : ''})`;
          const mensagem = `Estoque baixo para ${nomeVariante}. Restam apenas ${quantidade} unidades.`;
          const link = `/produtos/${produtoBase.id_produto_base}?variante=${id_variante}`; // Link direto para o produto/variante

          await criarNotificacaoParaAdmins({
            tx,
            mensagem,
            link,
          });
        }

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
