// Em: src/app/api/clientes/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET para buscar clientes por nome ou CPF
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || '';

  if (searchTerm.length < 2) return NextResponse.json([]);

  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        OR: [
          { nome: { contains: searchTerm, mode: 'insensitive' } },
          { cpf: { contains: searchTerm } }
        ]
      },
      take: 10,
    });
    return NextResponse.json(clientes);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar clientes." }, { status: 500 });
  }
}

// POST para criar um novo cliente
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, cpf, endereco, telefone } = body;

    if (!nome) return NextResponse.json({ error: "O nome é obrigatório." }, { status: 400 });

    const novoCliente = await prisma.cliente.create({
      data: { nome, cpf, endereco, telefone },
    });

    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Este CPF já está cadastrado." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar cliente." }, { status: 500 });
  }
}