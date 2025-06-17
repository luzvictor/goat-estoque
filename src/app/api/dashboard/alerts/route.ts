// Em: src/app/api/dashboard/alerts/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Busca produtos com estoque baixo ou zerado
    const estoqueBaixo = await prisma.varianteProduto.findMany({
      where: {
        // A lógica exata pode ser ajustada, ex: usando uma comparação de colunas se o prisma suportar
        // Por simplicidade, vamos pegar onde o estoque é <= 5 e o estoqueMin é > 0
        quantidade: {
          lte: 5,
        },
        estoqueMin: {
            gt: 0
        }
      },
      include: {
        produtoBase: { select: { nome: true, marca: true } },
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