// Em: src/app/api/dashboard/kpis/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { subDays, differenceInDays } from 'date-fns';
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!from || !to) {
      return NextResponse.json({ error: "Parâmetros 'from' e 'to' são obrigatórios." }, { status: 400 });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    // --- CÁLCULO DO PERÍODO ATUAL USANDO QUERY SQL RAW OTIMIZADA ---
    const resultadoPeriodoAtual: { total: bigint }[] = await prisma.$queryRaw`
      SELECT 
          SUM("t_pedido_produto"."quantidade" * "t_variante"."valorVenda") as total
      FROM
          "Pedido" AS t_pedido
      JOIN
          "PedidoProduto" AS t_pedido_produto ON t_pedido.id = t_pedido_produto."pedidoId"
      JOIN
          "VarianteProduto" AS t_variante ON t_pedido_produto."varianteId" = t_variante."id_variante"
      WHERE
          t_pedido.data >= ${fromDate} AND t_pedido.data <= ${toDate};
    `;

    // O Prisma retorna um valor de soma como `bigint`, então convertemos para um número.
    const faturamentoAtual = Number(resultadoPeriodoAtual[0]?.total) || 0;

    // --- CÁLCULO DO PERÍODO ANTERIOR USANDO QUERY SQL RAW OTIMIZADA ---
    const duracaoPeriodo = differenceInDays(toDate, fromDate);
    const inicioPeriodoAnterior = subDays(fromDate, duracaoPeriodo + 1);
    const fimPeriodoAnterior = subDays(toDate, duracaoPeriodo + 1);

    const resultadoPeriodoAnterior: { total: bigint }[] = await prisma.$queryRaw`
      SELECT 
          SUM("t_pedido_produto"."quantidade" * "t_variante"."valorVenda") as total
      FROM
          "Pedido" AS t_pedido
      JOIN
          "PedidoProduto" AS t_pedido_produto ON t_pedido.id = t_pedido_produto."pedidoId"
      JOIN
          "VarianteProduto" AS t_variante ON t_pedido_produto."varianteId" = t_variante."id_variante"
      WHERE
          t_pedido.data >= ${inicioPeriodoAnterior} AND t_pedido.data <= ${fimPeriodoAnterior};
    `;
    
    const faturamentoAnterior = Number(resultadoPeriodoAnterior[0]?.total) || 0;
    
    // --- CÁLCULO DO TOTAL DE PEDIDOS ATUAL (Ainda pode ser feito com findMany, pois é mais simples) ---
    const totalPedidosAtual = await prisma.pedido.count({
      where: { data: { gte: fromDate, lte: toDate } }
    });

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
