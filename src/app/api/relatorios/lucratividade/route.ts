// Em: src/app/api/relatorios/lucratividade/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!from || !to) {
      return NextResponse.json({ error: "Parâmetros de data são obrigatórios." }, { status: 400 });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return NextResponse.json({ error: "Formato de data inválido." }, { status: 400 });
    }

    console.log(`Buscando pedidos de ${fromDate.toISOString()} até ${toDate.toISOString()}`);

    const pedidosNoPeriodo = await prisma.pedido.findMany({
      where: {
        data: {
          gte: fromDate,
          lte: toDate,
        }
      },
      include: {
        produtos: {
          include: {
            variante: true
          }
        }
      }
    });
    
    console.log(`Encontrados ${pedidosNoPeriodo.length} pedidos no período.`);

    let faturamentoTotal = 0;
    let custoTotal = 0;

    for (const pedido of pedidosNoPeriodo) {
      for (const item of pedido.produtos) {
        if (item.variante) {
          faturamentoTotal += item.quantidade * item.variante.valorVenda;
          custoTotal += item.quantidade * item.variante.valorCusto;
        }
      }
    }

    const lucroTotal = faturamentoTotal - custoTotal;
    const margemDeLucro = faturamentoTotal > 0 ? (lucroTotal / faturamentoTotal) * 100 : 0;
    
    return NextResponse.json({
      faturamentoTotal,
      custoTotal,
      lucroTotal,
      margemDeLucro,
    });

  } catch (error) {
    console.error("Erro ao gerar relatório de lucratividade:", error);
    return NextResponse.json({ error: "Erro ao gerar relatório." }, { status: 500 });
  }
}