// Em: src/app/api/dashboard/alerts/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
try {
// Busca produtos com estoque baixo ou zerado
const estoqueBaixo = await prisma.varianteProduto.findMany({
where: {
quantidade: {
lte: 5,
},
estoqueMin: {
gt: 0
}
},
include: {
produtoBase: {
include: {
marca: true
}
},
cor: true,
tamanho: true
},
orderBy: {
quantidade: 'asc',
},
take: 5,
});

// Busca os últimos pedidos pendentes
const pedidosPendentes = await prisma.pedido.findMany({
where: {
status: 'Pendente',
},
include: {
Cliente: { select: { nome: true } },
},
orderBy: {
data: 'desc',
},
take: 5,
});

return NextResponse.json({ estoqueBaixo, pedidosPendentes });
} catch (error) {
console.error("Erro ao buscar alertas:", error);
return NextResponse.json({ error: "Erro ao buscar alertas." }, { status: 500 });
}
}
