// Em: src/app/api/variantes/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// PUT - Atualizar uma Variante de Produto específica
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Este é o id_variante
    const body = await request.json();
    
    // Filtra para garantir que apenas campos válidos sejam atualizados
    const { cor, tamanho, valorCusto, valorVenda, estoqueMin, quantidade, sku, imageUrl } = body;
    const dataToUpdate = { cor, tamanho, valorCusto, valorVenda, estoqueMin, quantidade, sku, imageUrl };

    const varianteAtualizada = await prisma.varianteProduto.update({
      where: { id_variante: id },
      data: dataToUpdate,
    });

    return NextResponse.json(varianteAtualizada);
  } catch (error: any) {
    console.error("Erro ao atualizar variante:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Variante não encontrada." }, { status: 404 });
      }
      if (error.code === 'P2002') {
        return NextResponse.json({ error: "Já existe uma variante com este SKU." }, { status: 409 });
      }
    }
    return NextResponse.json({ error: "Erro ao atualizar variante." }, { status: 500 });
  }
}

// DELETE - Deletar uma Variante de Produto específica
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: variantIdToDelete } = params;

    // Usamos uma transação para garantir a consistência dos dados.
    // Ou tudo funciona, ou nada é alterado no banco.
    const result = await prisma.$transaction(async (tx) => {
      // 1. Primeiro, encontramos a variante para obter o ID do seu produto base.
      // Usamos findUniqueOrThrow para garantir que a variante existe antes de prosseguir.
      const variant = await tx.varianteProduto.findUniqueOrThrow({
        where: { id_variante: variantIdToDelete },
        select: { produtoBaseId: true }, // Só precisamos do ID do pai
      });

      const { produtoBaseId } = variant;

      // 2. Deletamos a variante especificada.
      await tx.varianteProduto.delete({
        where: { id_variante: variantIdToDelete },
      });

      // 3. Contamos quantas variantes RESTARAM para o mesmo produto base.
      const remainingVariantsCount = await tx.varianteProduto.count({
        where: { produtoBaseId: produtoBaseId },
      });

      // 4. Se não restou nenhuma variante, deletamos o produto base "órfão".
      if (remainingVariantsCount === 0) {
        await tx.produtoBase.delete({
          where: { id_produto_base: produtoBaseId },
        });
        return { message: "Variante e produto base removidos com sucesso." };
      }

      return { message: "Variante removida com sucesso." };
    });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Erro ao remover variante:", error);
    // Erro comum se a variante a ser deletada não for encontrada no início.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: "Variante não encontrada para remoção." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro ao remover variante." },
      { status: 500 }
    );
  }
}