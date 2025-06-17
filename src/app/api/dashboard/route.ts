// Em: src/app/api/dashboard/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const dateFilter = (from && to) 
      ? { gte: new Date(from), lte: new Date(to) } 
      : undefined;

    // 1. Calcular Faturamento e Vendas no Período
    const pedidosPagos = await prisma.pedido.findMany({
      where: {
        status: 'PAGO',
        data: dateFilter,
      },
      include: {
        produtos: {
          include: {
            variante: true,
          },
        },
      },
    });

    const faturamentoTotal = pedidosPagos.reduce((acc, pedido) => {
      return acc + pedido.produtos.reduce((itemAcc, item) => {
        return itemAcc + (item.variante.valorVenda * item.quantidade);
      }, 0);
    }, 0);

    const totalVendas = pedidosPagos.length;

    // 2. Encontrar produtos com estoque baixo
    const produtosEstoqueBaixo = await prisma.varianteProduto.findMany({
      where: {
        // quantidade é menor ou igual ao estoqueMin
        quantidade: {
          lte: prisma.varianteProduto.fields.estoqueMin,
        },
        // E a quantidade é maior que 0 para não mostrar itens zerados
        NOT: {
          quantidade: 0,
        }
      },
      include: {
        produtoBase: true,
      },
      orderBy: {
        quantidade: 'asc',
      },
      take: 5,
    });
    
    // 3. Obter as vendas mais recentes
    const vendasRecentes = await prisma.pedido.findMany({
        where: { status: 'PAGO' },
        take: 5,
        orderBy: { data: 'desc' },
        include: {
            produtos: {
                include: {
                    variante: {
                        include: {
                            produtoBase: true
                        }
                    }
                }
            }
        }
    });

    // 4. Dados para o gráfico de barras (Faturamento por mês no último ano)
    const faturamentoMensal = await prisma.$queryRaw`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', "data"), 'YYYY-MM') as "mes",
        SUM(p."quantidade" * v."valorVenda") as "total"
      FROM "Pedido" o
      JOIN "PedidoProduto" p ON o."id" = p."pedidoId"
      JOIN "VarianteProduto" v ON p."varianteId" = v."id_variante"
      WHERE o."status" = 'PAGO' AND o."data" > NOW() - INTERVAL '12 months'
      GROUP BY "mes"
      ORDER BY "mes" ASC;
    `;

    return NextResponse.json({
      faturamentoTotal,
      totalVendas,
      produtosEstoqueBaixo,
      vendasRecentes,
      faturamentoMensal
    });

  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return NextResponse.json({ error: "Erro ao buscar dados do dashboard." }, { status: 500 });
  }
}
