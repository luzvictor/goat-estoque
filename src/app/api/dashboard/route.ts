import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const [totalProdutos, entradasHoje, pedidosHoje, produtosCriticos, totalEstoque] = await Promise.all([
    prisma.produto.count(),
    prisma.entradaEstoque.count({ where: { data: { gte: hoje } } }),
    prisma.pedido.count({ where: { data: { gte: hoje } } }),
    prisma.produto.findMany({ where: { quantidade: { lte: prisma.produto.fields.estoqueMin } } }),
    prisma.produto.aggregate({
      _sum: { quantidade: true },
    }),
  ]);

  return NextResponse.json({
    totalProdutos,
    entradasHoje,
    pedidosHoje,
    produtosCriticos: produtosCriticos.length,
    totalEstoque: totalEstoque._sum.quantidade || 0,
  });
}
