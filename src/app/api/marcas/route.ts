// Em: src/app/api/marcas/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET: Lista todas as marcas em ordem alfabética
export async function GET() {
  try {
    const marcas = await prisma.marca.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
    return NextResponse.json(marcas);
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return NextResponse.json({ error: "Erro ao buscar marcas." }, { status: 500 });
  }
}

// POST: Cria uma nova marca
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome } = body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
      return NextResponse.json({ error: "O nome da marca é obrigatório." }, { status: 400 });
    }

    const novaMarca = await prisma.marca.create({
      data: {
        nome: nome.trim(),
      },
    });

    return NextResponse.json(novaMarca, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar marca:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Uma marca com este nome já existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar marca." }, { status: 500 });
  }
}
