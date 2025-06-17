// Em: src/app/api/pedidos/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// CORREÇÃO: Importamos apenas o namespace 'Prisma'
import { Prisma } from "@prisma/client";

/**
 * GET: Busca um pedido específico pelo seu ID.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pedido = await prisma.pedido.findUnique({
      where: { id: id },
      include: {
        Usuario: { select: { nome: true, email: true } },
        produtos: {
          include: {
            variante: {
              include: {
                produtoBase: true,
              },
            },
          },
        },
      },
    });

    if (!pedido) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }

    return NextResponse.json(pedido);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    return NextResponse.json({ error: "Erro ao buscar pedido." }, { status: 500 });
  }
}

/**
 * PUT: Atualiza o status de um pedido específico.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "O campo 'status' é obrigatório." }, { status: 400 });
    }

    const pedidoAtualizado = await prisma.pedido.update({
      where: { id: id },
      data: { status },
    });

    return NextResponse.json(pedidoAtualizado);
  } catch (error: any) {
    console.error("Erro ao atualizar pedido:", error);
    // CORREÇÃO: Acessando o tipo de erro através do namespace Prisma.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: "Pedido não encontrado para atualização." }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro ao atualizar pedido." }, { status: 500 });
  }
}

/**
 * DELETE: Cancela/deleta um pedido e reverte o estoque dos produtos vendidos.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: pedidoId } = params;

    const resultado = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Busca o pedido e seus itens para saber o que reverter.
      const pedido = await tx.pedido.findUnique({
        where: { id: pedidoId },
        include: {
          produtos: true, // Inclui os itens do pedido (PedidoProduto)
        },
      });

      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }
      
      if (pedido.status === 'PAGO') {
        // 2. Para cada item no pedido, devolve a quantidade ao estoque da variante.
        for (const item of pedido.produtos) {
          await tx.varianteProduto.update({
            where: { id_variante: item.varianteId },
            data: {
              quantidade: {
                increment: item.quantidade,
              },
            },
          });
        }
      }

      // 3. Deleta o pedido.
      await tx.pedido.delete({
        where: { id: pedidoId },
      });

      return { message: "Pedido removido e estoque revertido com sucesso." };
    });

    return NextResponse.json(resultado);

  } catch (error: any) {
    console.error("Erro ao remover pedido:", error);
    // CORREÇÃO: Acessando o tipo de erro através do namespace Prisma.
    if (error.message === "Pedido não encontrado" || (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')) {
      return NextResponse.json({ error: "Pedido não encontrado para remoção." }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro ao remover pedido." }, { status: 500 });
  }
}
