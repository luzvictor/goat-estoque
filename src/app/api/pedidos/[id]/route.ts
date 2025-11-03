// Em: src/app/api/pedidos/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { criarNotificacaoParaAdmins } from "@/lib/notifications";

const ALLOWED_STATUSES_FRONTEND = ["Pendente", "Enviado", "Concluído", "Cancelado"];

const statusMap: { [key: string]: 'Pendente' | 'Enviado' | 'Concluido' | 'Cancelado' } = {
  "Pendente": "Pendente",
  "Enviado": "Enviado",
  "Concluído": "Concluido",
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

    const statusBackend = statusMap[statusFrontend];

    const pedidoAtual = await prisma.pedido.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!pedidoAtual) {
      return NextResponse.json(
        { error: "Pedido não encontrado." },
        { status: 404 }
      );
    }

    const statusAtual = pedidoAtual.status;

    const transicoesPermitidas: Record<string, string[]> = {
      Pendente: ["Enviado", "Cancelado"],
      Enviado: ["Concluido", "Cancelado"],
      Concluido: [],
      Cancelado: [],
    };

    const permitidos = transicoesPermitidas[statusAtual] || [];

    if (!permitidos.includes(statusBackend)) {
      return NextResponse.json(
        {
          error: `Não é permitido alterar o status de "${statusAtual}" para "${statusBackend}".`,
        },
        { status: 400 }
      );
    }

    const pedidoAtualizado = await prisma.pedido.update({
      where: { id },
      data: { status: statusBackend },
    });

    if (statusFrontend === 'Cancelado') {
      await criarNotificacaoParaAdmins({
        tx: prisma,
        mensagem: `O Pedido #${id.substring(0, 8)} foi cancelado.`,
        link: `/pedidos`
      });
    }

    return NextResponse.json(pedidoAtualizado);

  } catch (error: any) {
    console.error("Erro ao atualizar pedido:", error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Pedido não encontrado para atualização." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno ao atualizar o pedido." },
      { status: 500 }
    );
  }
}




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
                cor: true,
                tamanho: true,
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

      if (pedido.status !== "Pendente") {
        if (pedido.status === "Enviado") {
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

          await tx.pedido.update({
            where: { id: pedidoId },
            data: { status: "Cancelado" },
          });

          await criarNotificacaoParaAdmins({
            tx,
            mensagem: `O Pedido #${pedidoId.substring(0, 8)} foi cancelado automaticamente e o estoque foi devolvido.`,
            link: `/pedidos`,
          });

          return {
            message:
              "Pedido já estava enviado. Ele foi cancelado e o estoque foi devolvido automaticamente.",
          };
        }

        throw new Error(
          `Não é permitido remover um pedido com status "${pedido.status}".`
        );
      }

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

      await tx.pedidoProduto.deleteMany({
        where: { pedidoId },
      });

      await tx.pedido.delete({
        where: { id: pedidoId },
      });

      return { message: "Pedido removido e estoque revertido com sucesso." };
    });

    return NextResponse.json(resultado);
  } catch (error: any) {
    console.error("Erro ao remover pedido:", error);

    if (
      error.message === "Pedido não encontrado" ||
      (error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025")
    ) {
      return NextResponse.json(
        { error: "Pedido não encontrado para remoção." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erro ao remover pedido." },
      { status: 400 }
    );
  }
}
