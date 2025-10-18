// Em: src/app/api/cores/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET: Lista todas as cores em ordem alfabética
export async function GET() {
  try {
    const cores = await prisma.cor.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
    return NextResponse.json(cores);
  } catch (error) {
    console.error("Erro ao buscar cores:", error);
    return NextResponse.json({ error: "Erro ao buscar cores." }, { status: 500 });
  }
}

// POST: Cria uma nova cor
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome } = body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
      return NextResponse.json({ error: "O nome da cor é obrigatório." }, { status: 400 });
    }

    const novaCor = await prisma.cor.create({
      data: {
        nome: nome.trim(),
      },
    });

    return NextResponse.json(novaCor, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar cor:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Uma cor com este nome já existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar cor." }, { status: 500 });
  }
}
