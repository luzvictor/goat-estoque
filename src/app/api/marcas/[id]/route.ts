import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// DELETE: Exclui uma marca pelo ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.marca.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Marca excluída com sucesso." });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Erro de constraint de chave estrangeira: a marca está em uso
      if (error.code === 'P2003') {
        return NextResponse.json({ error: "Esta marca está em uso por um ou mais produtos e não pode ser excluída." }, { status: 409 });
      }
      // Erro de registro não encontrado
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Marca não encontrada." }, { status: 404 });
      }
    }
    return NextResponse.json({ error: "Erro ao excluir a marca." }, { status: 500 });
  }
}
