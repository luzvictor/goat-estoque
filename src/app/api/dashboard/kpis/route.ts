// Em: src/app/api/dashboard/kpis/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { subDays, differenceInDays } from 'date-fns';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!from || !to) {
      return NextResponse.json({ error: "Parâmetros 'from' e 'to' são obrigatórios." }, { status: 400 });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Período Selecionado
    const pedidosPeriodoAtual = await prisma.pedido.findMany({
      where: { data: { gte: fromDate, lte: toDate } },
      include: { produtos: { include: { variante: true } } },
    });
    
    const faturamentoAtual = pedidosPeriodoAtual.reduce((total, pedido) => 
      total + pedido.produtos.reduce((subtotal, item) => 
        subtotal + (item.quantidade * item.variante.valorVenda), 0), 0);
    
    const totalPedidosAtual = pedidosPeriodoAtual.length;

    // Período Anterior (com a mesma duração do período selecionado)
    const duracaoPeriodo = differenceInDays(toDate, fromDate);
    const inicioPeriodoAnterior = subDays(fromDate, duracaoPeriodo + 1);
    const fimPeriodoAnterior = subDays(toDate, duracaoPeriodo + 1);

    const pedidosPeriodoAnterior = await prisma.pedido.findMany({
      where: { data: { gte: inicioPeriodoAnterior, lte: fimPeriodoAnterior } },
      include: { produtos: { include: { variante: true } } },
    });

    const faturamentoAnterior = pedidosPeriodoAnterior.reduce((total, pedido) => 
      total + pedido.produtos.reduce((subtotal, item) => 
        subtotal + (item.quantidade * item.variante.valorVenda), 0), 0);

    const calcularVariacao = (atual: number, anterior: number) => {
        if (anterior === 0) return atual > 0 ? 100 : 0;
        return ((atual - anterior) / anterior) * 100;
    };
    
    const variacaoFaturamento = calcularVariacao(faturamentoAtual, faturamentoAnterior);
    const ticketMedio = totalPedidosAtual > 0 ? faturamentoAtual / totalPedidosAtual : 0;

    return NextResponse.json({
      faturamento: { valor: faturamentoAtual, variacao: variacaoFaturamento },
      totalPedidos: { valor: totalPedidosAtual },
      ticketMedio: { valor: ticketMedio },
    });

  } catch (error) {
    console.error("Erro ao buscar KPIs:", error);
    return NextResponse.json({ error: "Erro ao buscar KPIs." }, { status: 500 });
  }
}