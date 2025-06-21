// Em: src/app/api/clientes/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET para buscar clientes por nome ou CPF
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || '';

  const whereClause = searchTerm
    ? {
        OR: [
          { 
            nome: { 
              contains: searchTerm, 
              // CORREÇÃO: Usamos o tipo QueryMode importado do Prisma
              mode: Prisma.QueryMode.insensitive 
            } 
          },
          { cpf: { contains: searchTerm } },
        ],
      }
    : {};

  try {
    const clientes = await prisma.cliente.findMany({
      where: whereClause,
      orderBy: {
        nome: 'asc',
      },
      take: 50,
    });
    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json({ error: "Erro ao buscar clientes." }, { status: 500 });
  }
}


// POST para criar um novo cliente
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, cpf, endereco, telefone } = body;

    if (!nome) {
      return NextResponse.json({ error: "O nome é obrigatório." }, { status: 400 });
    }

    // --- CORREÇÃO APLICADA AQUI ---
    // Se o CPF foi enviado, remove todos os caracteres que não são dígitos.
    const cpfNormalizado = cpf ? String(cpf).replace(/\D/g, '') : null;

    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        cpf: cpfNormalizado, // Salva o CPF normalizado
        endereco,
        telefone,
      },
    });

    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Este CPF já está cadastrado." }, { status: 409 });
    }
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json({ error: "Erro ao criar cliente." }, { status: 500 });
  }
}