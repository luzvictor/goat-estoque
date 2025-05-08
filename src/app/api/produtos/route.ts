import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Listar todos os produtos
export async function GET() {
  try {
    const produtos = await prisma.produto.findMany();
    return NextResponse.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

// POST: Criar um novo produto
export async function POST(request: Request) {
  const data = await request.json();

  const novoProduto = await prisma.produto.create({
    data: {
      nome: data.nome,
      categoria: data.categoria,
      marca: data.marca,
      cor: data.cor,
      quantidade: data.quantidade,
      valorCusto: data.valorCusto,
      valorVenda: data.valorVenda,
      estoqueMin: data.estoqueMin,
    },
  });

  return NextResponse.json(novoProduto);
}
