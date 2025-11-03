// Em: src/app/api/clientes/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * PUT: Atualiza os dados de um cliente específico.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { nome, cpf, endereco, telefone } = body;

    if (!nome) {
      return NextResponse.json({ error: "O nome é obrigatório." }, { status: 400 });
    }

    const cpfNormalizado = cpf ? String(cpf).replace(/\D/g, '') : null;

    const clienteAtualizado = await prisma.cliente.update({
      where: { id_cliente: id },
      data: {
        nome,
        cpf: cpfNormalizado,
        endereco,
        telefone,
      },
    });

    return NextResponse.json(clienteAtualizado);

  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Este CPF já está cadastrado em outro cliente." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao atualizar cliente." }, { status: 500 });
  }
}

/**
 * DELETE: Remove um cliente específico.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.cliente.delete({
      where: { id_cliente: id },
    });

    return NextResponse.json({ message: "Cliente removido com sucesso." });

  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Cliente não encontrado." }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro ao remover cliente." }, { status: 500 });
  }
}