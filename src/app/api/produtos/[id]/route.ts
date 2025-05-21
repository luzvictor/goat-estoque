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

export async function PUT(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params;
    const data = await req.json();
  
    try {
      const produtoAtualizado = await prisma.produto.update({
        where: { id_produto: id },
        data: {
          nome: data.nome,
          categoria: data.categoria,
          marca: data.marca,
          cor: data.cor,
          quantidade: data.quantidade,
          valorCusto: data.valorCusto,
          valorVenda: data.valorVenda,
          estoqueMin: data.estoqueMin,
          tamanho: data.tamanho,
        },
      });
  
      return NextResponse.json(produtoAtualizado);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
    }
  }