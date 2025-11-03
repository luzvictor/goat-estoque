// Em: src/app/api/dashboard/sales-over-time/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth } from 'date-fns';

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

    const resultado: { dia: string, total: number }[] = await prisma.$queryRaw`
      SELECT 
        TO_CHAR(p.data AT TIME ZONE 'America/Sao_Paulo', 'YYYY-MM-DD') as dia,
        SUM(pp."quantidade" * v."valorVenda") as total
      FROM "Pedido" p
      JOIN "PedidoProduto" pp ON p.id = pp."pedidoId"
      JOIN "VarianteProduto" v ON pp."varianteId" = v."id_variante"
      WHERE p.data >= ${fromDate} AND p.data <= ${toDate}
      GROUP BY TO_CHAR(p.data AT TIME ZONE 'America/Sao_Paulo', 'YYYY-MM-DD')
      ORDER BY dia ASC;
    `;

    const dadosFormatados = resultado.map(item => ({
        name: new Date(item.dia + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        Vendas: Number(item.total)
    }));

    return NextResponse.json(dadosFormatados);

  } catch (error) {
    console.error("Erro ao buscar dados de vendas ao longo do tempo:", error);
    return NextResponse.json({ error: "Erro ao processar dados de vendas." }, { status: 500 });
  }
}