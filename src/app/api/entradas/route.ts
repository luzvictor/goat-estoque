// Em: src/app/api/entradas/route.ts

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

/**
 * GET: Lista o histórico de todas as entradas de estoque.
 * Ótimo para auditoria e relatórios.
 */
export async function GET() {
  try {
    const entradas = await prisma.entradaEstoque.findMany({
      include: {
        // Inclui os dados da variante e do produto base relacionado a cada entrada
        variante: {
          include: {
            produtoBase: true,
          },
        },
      },
      orderBy: {
        data: "desc", // Ordena pelas mais recentes primeiro
      },
    });
    return NextResponse.json(entradas);
  } catch (error) {
    console.error("Erro ao buscar entradas de estoque:", error);
    return NextResponse.json(
      { error: "Erro ao buscar histórico de entradas." },
      { status: 500 }
    );
  }
}

/**
 * POST: Registra uma nova entrada de itens no estoque.
 * Executa duas operações em uma transação para garantir a consistência dos dados.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { varianteId, quantidade, numeroNota } = body;

    // --- Validação dos Dados de Entrada ---
    if (!varianteId || !quantidade) {
      return NextResponse.json(
        { error: "O ID da variante e a quantidade são obrigatórios." },
        { status: 400 }
      );
    }

    const qtdNumber = Number(quantidade);
    if (isNaN(qtdNumber) || qtdNumber <= 0) {
      return NextResponse.json(
        { error: "A quantidade deve ser um número positivo." },
        { status: 400 }
      );
    }

    // --- Transação no Banco de Dados ---
    // Usamos $transaction para garantir que ambas as operações (criar o histórico
    // e atualizar o estoque) ocorram com sucesso. Se uma falhar, a outra é desfeita.
    const [entrada, varianteAtualizada] = await prisma.$transaction([
      // 1. Cria o registro histórico na tabela de entradas
      prisma.entradaEstoque.create({
        data: {
          varianteId: varianteId,
          quantidade: qtdNumber,
          numeroNota: numeroNota || null, // Salva null se não for fornecido
        },
      }),
      // 2. Atualiza (incrementa) a quantidade na tabela da variante
      prisma.varianteProduto.update({
        where: { id_variante: varianteId },
        data: {
          quantidade: {
            increment: qtdNumber,
          },
        },
      }),
    ]);

    return NextResponse.json({ entrada, varianteAtualizada }, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao registrar entrada:", error);
    
    // Trata o erro comum que acontece se o 'varianteId' fornecido não existir no banco.
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003' || error.code === 'P2025') {
         return NextResponse.json(
          { error: "A variante de produto especificada não foi encontrada." },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Erro interno do servidor ao registrar a entrada." },
      { status: 500 }
    );
  }
}

