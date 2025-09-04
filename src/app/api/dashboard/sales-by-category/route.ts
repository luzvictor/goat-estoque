import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // É uma boa prática usar parâmetros de busca para filtrar, mesmo que não estejam no seu erro
    // const { searchParams } = new URL(request.url);
    // const from = searchParams.get('from');
    // const to = searchParams.get('to');
    
    const resultado: { categoria: string, total: number }[] = await prisma.$queryRaw`
      SELECT
          t_categoria.nome AS categoria,
          SUM(t_variante."valorVenda" * t_pedido_produto.quantidade) as total
      FROM
          "PedidoProduto" AS t_pedido_produto
      JOIN
          "VarianteProduto" AS t_variante ON t_pedido_produto."varianteId" = t_variante."id_variante"
      JOIN
          "ProdutoBase" AS t_produto_base ON t_variante."produtoBaseId" = t_produto_base."id_produto_base"
      JOIN
          "Categoria" AS t_categoria ON t_produto_base."categoriaId" = t_categoria."id"
      GROUP BY
          t_categoria.nome
      ORDER BY
          total DESC;
    `;
    
    // O Prisma retorna valores de soma como `bigint` por padrão no Node.js. 
    // Mapear para `Number` garante a compatibilidade com o Recharts.
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