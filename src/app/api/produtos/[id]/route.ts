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
        where: { id_produto_base: id },
        include: {
          marca: true,
          categoria: true,
          variantes: {
            include: {
              cor: true,
              tamanho: true,
            },
            orderBy: {
              cor: { nome: "asc" },
            },
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

    const produtoBase = await prisma.produtoBase.findUnique({
      where: { id_produto_base: id },
      include: { variantes: true },
    });

    if (!produtoBase) {
      return NextResponse.json(
        { error: "Produto base não encontrado para remoção." },
        { status: 404 }
      );
    }

    const varianteComEstoque = produtoBase.variantes.find(
      (v) => v.quantidade > 0
    );

    if (varianteComEstoque) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir um produto que ainda possui estoque em uma ou mais variantes.",
        },
        { status: 400 }
      );
    }

    const varianteIds = produtoBase.variantes.map((v) => v.id_variante);

    if (varianteIds.length > 0) {
      const vendaAssociada = await prisma.pedidoProduto.findFirst({
        where: { varianteId: { in: varianteIds } },
      });

      if (vendaAssociada) {
        return NextResponse.json(
          {
            error:
              "Não é possível excluir um produto que já possui vendas registradas.",
          },
          { status: 400 }
        );
      }
    }

    await prisma.produtoBase.delete({
      where: { id_produto_base: id },
    });

    return NextResponse.json({
      message: "Produto base e suas variantes foram removidos com sucesso.",
    });
  } catch (error: any) {
    console.error("Erro ao remover produto base:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
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

  // PUT - Atualizar um Produto Base
  export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      const body = await request.json();
      const { nome, categoria, marca } = body;

      const dataToUpdate: Prisma.ProdutoBaseUpdateInput = {};

      if (nome !== undefined) dataToUpdate.nome = nome;

      if (marca !== undefined) {
        dataToUpdate.marca = { connect: { id: marca } };
      }
      if (categoria !== undefined) {
        dataToUpdate.categoria = { connect: { id: categoria } };
      }

      if (Object.keys(dataToUpdate).length === 0) {
        return NextResponse.json(
          { error: "Nenhum campo válido para atualizar foi fornecido." },
          { status: 400 }
        );
      }

      const produtoAtualizado = await prisma.produtoBase.update({
        where: { id_produto_base: id },
        data: dataToUpdate,
        include: {
          marca: true,
          categoria: true,
          variantes: {
            include: {
              cor: true,
              tamanho: true,
            },
            orderBy: {
              cor: { nome: "asc" },
            },
          },
        },
      });

      return NextResponse.json(produtoAtualizado);
    } catch (error: any) {
      console.error("Erro ao atualizar produto base:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
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
