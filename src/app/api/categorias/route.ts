// Em: src/app/api/categorias/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET: Lista todas as categorias em ordem alfabética
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json({ error: "Erro ao buscar categorias." }, { status: 500 });
  }
}

// POST: Cria uma nova categoria
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome } = body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
      return NextResponse.json({ error: "O nome da categoria é obrigatório." }, { status: 400 });
    }

    const novaCategoria = await prisma.categoria.create({
      data: {
        nome: nome.trim(),
      },
    });

    return NextResponse.json(novaCategoria, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar categoria:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Uma categoria com este nome já existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar categoria." }, { status: 500 });
  }
}
