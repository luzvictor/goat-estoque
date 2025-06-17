// Em: src/app/api/pedidos/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// =================================================================
//           INÍCIO DA LÓGICA DE ATUALIZAÇÃO CORRIGIDA
// =================================================================

// CORREÇÃO: "Concluído" com acento para bater com o frontend
const ALLOWED_STATUSES_FRONTEND = ["Pendente", "Enviado", "Concluído", "Cancelado"];

// CORREÇÃO: Tipagem e mapeamento ajustados
// Chave: O que o frontend envia (ex: "Concluído").
// Valor: O que o Prisma Client espera (PascalCase, correspondendo ao seu Enum, ex: "Entregue").
const statusMap: { [key: string]: 'Pendente' | 'Enviado' | 'Concluido' | 'Cancelado' } = {
  "Pendente": "Pendente",
  "Enviado": "Enviado",
  "Concluído": "Concluido", // <<< AQUI ESTÁ A CORREÇÃO FINAL E DEFINITIVA
  "Cancelado": "Cancelado"
};

/**
 * PUT: Atualiza o status de um pedido específico.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status: statusFrontend } = body;
    const { id } = params;

    if (!statusFrontend || !ALLOWED_STATUSES_FRONTEND.includes(statusFrontend)) {
      return NextResponse.json(
        { error: `Status inválido recebido: ${statusFrontend}` },
        { status: 400 }
      );
    }

    // "Traduz" o status para o formato do banco de dados
    const statusBackend = statusMap[statusFrontend];

    const pedidoAtualizado = await prisma.pedido.update({
      where: { id: id },
      data: { status: statusBackend },
    });

    return NextResponse.json(pedidoAtualizado);

  } catch (error: any) {
    console.error("Erro ao atualizar pedido:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: "Pedido não encontrado para atualização." }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro interno ao atualizar o pedido." }, { status: 500 });
  }
}

// =================================================================
//          FIM DA LÓGICA DE ATUALIZAÇÃO CORRIGIDA
// =================================================================


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
        // CORREÇÃO: Trocamos Usuario por Cliente e selecionamos os campos desejados
        Cliente: { 
          select: { 
            nome: true,
            cpf: true,
            telefone: true,
            endereco: true
          } 
        },
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
 * DELETE: Cancela/deleta um pedido e reverte o estoque dos produtos vendidos.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: pedidoId } = params;

    const resultado = await prisma.$transaction(async (tx) => {
      const pedido = await tx.pedido.findUnique({
        where: { id: pedidoId },
        include: {
          produtos: true,
        },
      });

      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }
      
      // CORREÇÃO: Usa os valores que realmente existem no banco de dados (PascalCase)
      if (['Pago', 'Enviado', 'Entregue'].includes(pedido.status)) {
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

      await tx.pedido.delete({
        where: { id: pedidoId },
      });

      return { message: "Pedido removido e estoque revertido com sucesso." };
    });

    return NextResponse.json(resultado);

  } catch (error: any) {
    console.error("Erro ao remover pedido:", error);
    if (error.message === "Pedido não encontrado" || (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')) {
      return NextResponse.json({ error: "Pedido não encontrado para remoção." }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro ao remover pedido." }, { status: 500 });
  }
}