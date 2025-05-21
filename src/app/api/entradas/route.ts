import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: listar entradas
export async function GET() {
  const entradas = await prisma.entradaEstoque.findMany({
    include: { produto: true },
    orderBy: { data: "desc" },
  });
  return NextResponse.json(entradas);
}

// POST: registrar nova entrada
export async function POST(request: Request) {
  const body = await request.json();
  const { produtoId, quantidade, numeroNota } = body;

  try {
    const novaEntrada = await prisma.entradaEstoque.create({
      data: {
        produtoId,
        quantidade,
        numeroNota: numeroNota || null,
      },
    });

    // Atualiza quantidade no produto
    await prisma.produto.update({
      where: { id_produto: produtoId },
      data: {
        quantidade: {
          increment: quantidade,
        },
      },
    });

    return NextResponse.json(novaEntrada);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao registrar entrada" }, { status: 500 });
  }
}
