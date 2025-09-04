import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// DELETE: Exclui um tamanho pelo ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.tamanho.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Tamanho excluído com sucesso." });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return NextResponse.json({ error: "Este tamanho está em uso por uma ou mais variantes e não pode ser excluído." }, { status: 409 });
      }
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Tamanho não encontrado." }, { status: 404 });
      }
    }
    return NextResponse.json({ error: "Erro ao excluir o tamanho." }, { status: 500 });
  }
}