// Em: src/app/api/dashboard/sales-over-time/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth } from 'date-fns';

export async function GET() {
  try {
    const agora = new Date();
    const inicioMes = startOfMonth(agora);
    const fimMes = endOfMonth(agora);

    // Usamos uma query SQL pura para agrupar os pedidos por dia e somar os valores.
    // Isso é muito mais eficiente do que buscar todos os pedidos e processar no código.
    const resultado: { dia: string, total: number }[] = await prisma.$queryRaw`
      SELECT 
        TO_CHAR(p.data, 'YYYY-MM-DD') as dia,
        SUM(pp."quantidade" * v."valorVenda") as total
      FROM "Pedido" p
      JOIN "PedidoProduto" pp ON p.id = pp."pedidoId"
      JOIN "VarianteProduto" v ON pp."varianteId" = v."id_variante"
      WHERE p.data >= ${inicioMes} AND p.data <= ${fimMes}
      GROUP BY TO_CHAR(p.data, 'YYYY-MM-DD')
      ORDER BY dia ASC;
    `;

    // Formata o resultado para o gráfico
    const dadosFormatados = resultado.map(item => ({
        // Formata a data para DD/MM para exibição no gráfico
        name: new Date(item.dia).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        Vendas: Number(item.total) // Garante que o total seja um número
    }));

    return NextResponse.json(dadosFormatados);

  } catch (error) {
    console.error("Erro ao buscar dados de vendas ao longo do tempo:", error);
    return NextResponse.json({ error: "Erro ao processar dados de vendas." }, { status: 500 });
  }
}