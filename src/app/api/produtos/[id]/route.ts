import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

// DELETE: Remover um produto pelo ID
export async function DELETE(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params;
  

  try {
    await prisma.produto.delete({
      where: {
        id_produto: id,
      },
    });

    return NextResponse.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao remover produto" }, { status: 500 });
  }
}
