// Em: src/app/api/pedidos/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

/**
 * GET: Lista todos os pedidos do sistema, incluindo detalhes dos produtos,
 * suas variantes, e o usuário associado (se houver).
 */
export async function GET() {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        // Inclui os dados do usuário que fez o pedido
        Usuario: {
          select: {
            nome: true,
            email: true,
          },
        },
        // Inclui os itens do pedido
        produtos: {
          include: {
            // Para cada item, inclui os dados da variante
            variante: {
              include: {
                // E para cada variante, inclui os dados do produto base
                produtoBase: true,
              },
            },
          },
        },
      },
      orderBy: {
        data: 'desc', // Ordena pelos mais recentes primeiro
      },
    });
    return NextResponse.json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return NextResponse.json({ error: "Erro ao buscar pedidos." }, { status: 500 });
  }
}

/**
 * POST: Cria um novo pedido, verifica o estoque e dá baixa de forma transacional.
 * Recebe um corpo JSON: { usuarioId?: string, produtos: [{ varianteId: string, quantidade: number }] }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Opcional: `usuarioId` pode ser nulo para vendas no balcão, por exemplo.
    const { usuarioId, produtos } = body;

    // --- Validação dos Dados de Entrada ---
    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return NextResponse.json({ error: "O pedido deve conter pelo menos um produto." }, { status: 400 });
    }

    // --- Lógica de Transação ---
    // Usamos $transaction para garantir que todas as operações seguintes
    // ocorram com sucesso, ou nenhuma delas será aplicada.
    const pedidoCriado = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Passo 1: Verificar estoque para todos os produtos ANTES de qualquer alteração.
      for (const produto of produtos) {
        const varianteEmEstoque = await tx.varianteProduto.findUnique({
          where: { id_variante: produto.varianteId },
        });

        // Se a variante não existe ou se a quantidade pedida é maior que a disponível
        if (!varianteEmEstoque || varianteEmEstoque.quantidade < produto.quantidade) {
          // Lançar um erro aqui cancelará toda a transação automaticamente.
          throw new Error(`Estoque insuficiente para o produto SKU: ${varianteEmEstoque?.sku || produto.varianteId}`);
        }
      }

      // Passo 2: Se todo o estoque estiver OK, criar o registro do Pedido e seus itens.
      const pedido = await tx.pedido.create({
        data: {
          usuarioId: usuarioId || null,
          status: 'PAGO', // Assume que o pedido já entra como pago e pronto para baixa.
          produtos: {
            create: produtos.map((p: { varianteId: string, quantidade: number }) => ({
              varianteId: p.varianteId,
              quantidade: p.quantidade,
            })),
          },
        },
        include: { produtos: true },
      });

      // Passo 3: Se a criação do pedido deu certo, dar baixa no estoque para cada produto.
      for (const produto of produtos) {
        await tx.varianteProduto.update({
          where: { id_variante: produto.varianteId },
          data: {
            quantidade: {
              decrement: produto.quantidade,
            },
          },
        });
      }

      // Se todas as etapas acima funcionarem, a transação é confirmada (commit)
      // e o pedido criado é retornado.
      return pedido;
    });

    return NextResponse.json(pedidoCriado, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao criar pedido:", error);
    // Se o erro foi o que lançamos por falta de estoque, retorna uma mensagem clara.
    if (error.message.includes('Estoque insuficiente')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // Trata outros erros possíveis do banco de dados.
    return NextResponse.json({ error: "Erro interno do servidor ao criar o pedido." }, { status: 500 });
  }
}
