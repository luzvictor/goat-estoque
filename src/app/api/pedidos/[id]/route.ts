// Em: src/app/api/pedidos/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { criarNotificacaoParaAdmins } from "@/lib/notifications";

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

    const statusBackend = statusMap[statusFrontend];

    // 🔍 1️⃣ Busca o pedido atual no banco
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

    // 🔒 2️⃣ Define as transições permitidas
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

    // ✅ 3️⃣ Se passou na validação, atualiza o status
    const pedidoAtualizado = await prisma.pedido.update({
      where: { id },
      data: { status: statusBackend },
    });

    // 🔔 4️⃣ Notificação se o pedido for cancelado
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
        // Inclui os dados do cliente associado
        Cliente: { 
          select: { 
            nome: true,
            cpf: true,
            telefone: true,
            endereco: true
          } 
        },
        // Inclui os itens do pedido
        produtos: {
          include: {
            // Para cada item, inclui os dados da variante
            variante: {
              include: {
                // E para cada variante, inclui os objetos completos
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
      // 1️⃣ Busca o pedido e seus itens
      const pedido = await tx.pedido.findUnique({
        where: { id: pedidoId },
        include: {
          produtos: true, // Itens do pedido
        },
      });

      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }

      // 2️⃣ Regra de negócio:
      // ❌ Não pode remover pedidos Enviados, Concluídos ou Cancelados.
      // ✅ Só pode remover se ainda estiver "Pendente".
      if (pedido.status !== "Pendente") {
        // 📦 Caso o pedido tenha sido Enviado → será cancelado + devolve estoque
        if (pedido.status === "Enviado") {
          // 2.1. Devolve o estoque dos produtos
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

          // 2.2. Atualiza o status para "Cancelado"
          await tx.pedido.update({
            where: { id: pedidoId },
            data: { status: "Cancelado" },
          });

          // 2.3. Notifica os administradores
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

        // 🚫 Concluído ou Cancelado não podem ser removidos
        throw new Error(
          `Não é permitido remover um pedido com status "${pedido.status}".`
        );
      }

      // 3️⃣ Se o pedido for Pendente → pode remover normalmente
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

      // 4️⃣ Remove os itens da tabela intermediária
      await tx.pedidoProduto.deleteMany({
        where: { pedidoId },
      });

      // 5️⃣ Remove o pedido principal
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
