import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET - Obter um único Produto Base pelo ID, com suas variantes
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const produtoBase = await prisma.produtoBase.findUnique({
      where: {
        id_produto_base: id,
      },
      include: {
        variantes: {
          orderBy: {
            cor: 'asc'
          }
        },
      },
    });

    if (!produtoBase) {
      return NextResponse.json(
        { error: "Produto base não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(produtoBase);
  } catch (error) {
    console.error("Erro ao buscar produto base:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produto base." },
      { status: 500 }
    );
  }
}

// DELETE - Deletar um Produto Base pelo ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.produtoBase.delete({
      where: {
        id_produto_base: id,
      },
    });

    return NextResponse.json({ message: "Produto base e suas variantes foram removidos com sucesso." });
  } catch (error: any) {
    console.error("Erro ao remover produto base:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: "Produto base não encontrado para remoção." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao remover produto base." },
      { status: 500 }
    );
  }
}

// --- FUNÇÃO PUT ATUALIZADA E MAIS ROBUSTA ---
export async function PUT(
  request: Request,
  { params }: { params: { id:string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nome, categoria, marca } = body;

    // 1. Cria um objeto de dados apenas com os campos que foram realmente enviados
    const dataToUpdate: Prisma.ProdutoBaseUpdateInput = {};
    if (nome !== undefined) dataToUpdate.nome = nome;
    if (categoria !== undefined) dataToUpdate.categoria = categoria;
    if (marca !== undefined) dataToUpdate.marca = marca;

    // 2. Verifica se há algo para atualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo válido para atualizar foi fornecido (nome, categoria, marca)." },
        { status: 400 }
      );
    }

    // 3. Executa o update com os dados filtrados
    const produtoAtualizado = await prisma.produtoBase.update({
      where: { id_produto_base: id },
      data: dataToUpdate,
    });

    return NextResponse.json(produtoAtualizado);
  } catch (error: any) {
    console.error("Erro ao atualizar produto base:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: "Produto base não encontrado para atualização." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro ao atualizar produto base." },
      { status: 500 }
    );
  }
}