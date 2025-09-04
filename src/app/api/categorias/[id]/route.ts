import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// DELETE: Exclui uma categoria pelo ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.categoria.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Categoria excluída com sucesso." });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return NextResponse.json({ error: "Esta categoria está em uso por um ou mais produtos e não pode ser excluída." }, { status: 409 });
      }
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Categoria não encontrada." }, { status: 404 });
      }
    }
    return NextResponse.json({ error: "Erro ao excluir a categoria." }, { status: 500 });
  }
}
