// Em: src/app/api/tamanhos/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET: Lista todos os tamanhos em ordem alfabética
export async function GET() {
  try {
    const tamanhos = await prisma.tamanho.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
    return NextResponse.json(tamanhos);
  } catch (error) {
    console.error("Erro ao buscar tamanhos:", error);
    return NextResponse.json({ error: "Erro ao buscar tamanhos." }, { status: 500 });
  }
}

// POST: Cria um novo tamanho
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome } = body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
      return NextResponse.json({ error: "O nome do tamanho é obrigatório." }, { status: 400 });
    }

    const novoTamanho = await prisma.tamanho.create({
      data: {
        nome: nome.trim(),
      },
    });

    return NextResponse.json(novoTamanho, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar tamanho:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Um tamanho com este nome já existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar tamanho." }, { status: 500 });
  }
}
