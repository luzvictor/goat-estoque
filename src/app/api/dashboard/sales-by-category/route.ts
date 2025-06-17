// Em: src/app/api/dashboard/sales-by-category/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resultado: { categoria: string, total: number }[] = await prisma.$queryRaw`
        SELECT
            pb.categoria,
            SUM(pp.quantidade * v."valorVenda") as total
        FROM "PedidoProduto" pp
        JOIN "VarianteProduto" v ON pp."varianteId" = v."id_variante"
        JOIN "ProdutoBase" pb ON v."produtoBaseId" = pb."id_produto_base"
        GROUP BY pb.categoria
        ORDER BY total DESC;
    `;
    
    // Formata o resultado para o gráfico de pizza
    const dadosFormatados = resultado.map(item => ({
        name: item.categoria,
        value: Number(item.total)
    }));

    return NextResponse.json(dadosFormatados);

  } catch (error) {
    console.error("Erro ao buscar vendas por categoria:", error);
    return NextResponse.json({ error: "Erro ao processar vendas por categoria." }, { status: 500 });
  }
}