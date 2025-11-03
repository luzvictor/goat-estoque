// Em: src/app/api/dashboard/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
try {
const { searchParams } = new URL(request.url);
const from = searchParams.get('from');
const to = searchParams.get('to');

const fromDate = from ? new Date(from) : undefined;
const toDate = to ? new Date(to) : undefined;

const resultadoFaturamento: { total: bigint; }[] = await prisma.$queryRaw`
SELECT
SUM(t_pedido_produto.quantidade * t_variante."valorVenda") as total
FROM
"Pedido" AS t_pedido
JOIN
"PedidoProduto" AS t_pedido_produto ON t_pedido.id = t_pedido_produto."pedidoId"
JOIN
"VarianteProduto" AS t_variante ON t_pedido_produto."varianteId" = t_variante."id_variante"
WHERE
t_pedido.status = 'Concluido' AND t_pedido.data >= ${fromDate} AND t_pedido.data <= ${toDate};
`;

const faturamentoTotal = Number(resultadoFaturamento[0]?.total) || 0;

const totalVendas = await prisma.pedido.count({
where: {
status: 'Concluido',
data: { gte: fromDate, lte: toDate },
},
});

const produtosEstoqueBaixo = await prisma.$queryRaw`
SELECT
t_variante.quantidade,
t_variante."estoqueMin",
t_variante."id_variante",
t_produto_base.nome as "nome_produto",
t_marca.nome as marca,
t_cor.nome as cor,
t_tamanho.nome as tamanho
FROM "VarianteProduto" AS t_variante
JOIN "ProdutoBase" AS t_produto_base ON t_variante."produtoBaseId" = t_produto_base."id_produto_base"
JOIN "Marca" AS t_marca ON t_produto_base."marcaId" = t_marca.id
JOIN "Cor" AS t_cor ON t_variante.corId = t_cor.id
LEFT JOIN "Tamanho" AS t_tamanho ON t_variante.tamanhoId = t_tamanho.id
WHERE
t_variante.quantidade <= t_variante."estoqueMin" AND t_variante.quantidade > 0
ORDER BY
t_variante.quantidade ASC
LIMIT 5;
`;

const vendasRecentes = await prisma.pedido.findMany({
where: { status: 'Concluido', data: { gte: fromDate, lte: toDate } },
take: 5,
orderBy: { data: 'desc' },
include: {
produtos: {
include: {
variante: {
include: {
produtoBase: {
include: {
marca: true,
}
},
cor: true,
tamanho: true,
}
}
}
},
Cliente: true
}
});

const faturamentoMensal: { mes: string, total: bigint }[] = await prisma.$queryRaw`
SELECT 
TO_CHAR(DATE_TRUNC('month', t_pedido."data" AT TIME ZONE 'America/Sao_Paulo'), 'YYYY-MM') as "mes",
SUM(t_pedido_produto.quantidade * t_variante."valorVenda") as "total"
FROM
"Pedido" AS t_pedido
JOIN
"PedidoProduto" AS t_pedido_produto ON t_pedido.id = t_pedido_produto."pedidoId"
JOIN
"VarianteProduto" AS t_variante ON t_pedido_produto."varianteId" = t_variante."id_variante"
WHERE
t_pedido.status = 'Concluido' AND t_pedido.data >= NOW() - INTERVAL '12 months'
GROUP BY
mes
ORDER BY
mes ASC;
`;

const faturamentoMensalFormatado = faturamentoMensal.map(item => ({
mes: item.mes,
total: Number(item.total)
}));

return NextResponse.json({
faturamentoTotal,
totalVendas,
produtosEstoqueBaixo,
vendasRecentes,
faturamentoMensal: faturamentoMensalFormatado
});

} catch (error) {
console.error("Erro ao buscar dados do dashboard:", error);
return NextResponse.json({ error: "Erro ao buscar dados do dashboard." }, { status: 500 });
}
}
