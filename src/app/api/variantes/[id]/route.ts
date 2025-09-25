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
    
    // Desestrutura o body para pegar todos os campos possíveis
    const { 
        corId, 
        tamanhoId, 
        valorCusto, 
        valorVenda, 
        estoqueMin, 
        quantidade, 
        sku, 
        imageUrl 
    } = body;

    // Constrói o objeto de atualização dinamicamente
    // Isso garante que apenas os campos enviados no body sejam atualizados
    const dataToUpdate: Prisma.VarianteProdutoUpdateInput = {};

    // Campos diretos (escalares)
    if (valorCusto !== undefined) dataToUpdate.valorCusto = parseFloat(valorCusto);
    if (valorVenda !== undefined) dataToUpdate.valorVenda = parseFloat(valorVenda);
    if (estoqueMin !== undefined) dataToUpdate.estoqueMin = parseInt(estoqueMin, 10);
    if (quantidade !== undefined) dataToUpdate.quantidade = parseInt(quantidade, 10);
    if (sku !== undefined) dataToUpdate.sku = sku;
    if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl;

    // Campos de relacionamento
    // Se um corId for enviado, conecta a nova cor
    if (corId !== undefined) {
      dataToUpdate.cor = { connect: { id: corId } };
    }
    
    // Se um tamanhoId for enviado, conecta o novo tamanho
    if (tamanhoId !== undefined) {
        // Se o tamanhoId for nulo, significa que o usuário quer remover o tamanho
        if (tamanhoId === null) {
            dataToUpdate.tamanho = { disconnect: true };
        } else {
            dataToUpdate.tamanho = { connect: { id: tamanhoId } };
        }
    }

    // Verifica se há algo para atualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "Nenhum dado para atualização foi fornecido." },
        { status: 400 }
      );
    }

    const varianteAtualizada = await prisma.varianteProduto.update({
      where: { id_variante: id },
      data: dataToUpdate,
      include: {
        cor: true,
        tamanho: true
      }
    });

    return NextResponse.json(varianteAtualizada);
  } catch (error: any) {
    console.error("Erro ao atualizar variante:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Variante não encontrada." }, { status: 404 });
      }
      if (error.code === 'P2002') {
        // O campo 'meta.target' pode te dizer qual campo unique falhou
        const target = (error.meta?.target as string[])?.join(', ');
        return NextResponse.json({ error: `O campo ${target} já está em uso.` }, { status: 409 });
      }
    }
    return NextResponse.json({ error: "Erro interno ao atualizar variante." }, { status: 500 });
  }
}

// DELETE - Deletar uma Variante de Produto específica
// A sua função DELETE já está muito bem implementada com transação. Nenhuma alteração necessária.
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: variantIdToDelete } = params;

    const result = await prisma.$transaction(async (tx) => {
      const variant = await tx.varianteProduto.findUniqueOrThrow({
        where: { id_variante: variantIdToDelete },
        select: { produtoBaseId: true },
      });

      const { produtoBaseId } = variant;

      await tx.varianteProduto.delete({
        where: { id_variante: variantIdToDelete },
      });

      const remainingVariantsCount = await tx.varianteProduto.count({
        where: { produtoBaseId: produtoBaseId },
      });

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
