// Em: src/app/api/entradas/route.ts

import { criarNotificacaoParaAdmins } from "@/lib/notifications";
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
    // Alteramos para o formato de transação interativa para incluir a notificação
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Cria o registro histórico na tabela de entradas
      await tx.entradaEstoque.create({
        data: {
          varianteId: varianteId,
          quantidade: qtdNumber,
          numeroNota: numeroNota || null,
        },
      });

      // 2. Atualiza (incrementa) a quantidade na tabela da variante
      const varianteAtualizada = await tx.varianteProduto.update({
        where: { id_variante: varianteId },
        data: {
          quantidade: {
            increment: qtdNumber,
          },
        },
        // Incluímos os dados do produto base para usar na mensagem da notificação
        include: {
            produtoBase: true
        }
      });

      // =======================================================
      // 3. PASSO NOVO: Criar e enviar a notificação
      // =======================================================
      const nomeProduto = `${varianteAtualizada.produtoBase.marca} - ${varianteAtualizada.produtoBase.nome} (${varianteAtualizada.cor})`;
      
      await criarNotificacaoParaAdmins({
        tx, // Passa o cliente da transação para o helper
        mensagem: `${qtdNumber} unidades de "${nomeProduto}" foram adicionadas ao estoque.`,
        link: `/produtos`, // Link opcional para a página de produtos
      });
      
      return varianteAtualizada;
    });

    return NextResponse.json(resultado, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao registrar entrada:", error);
    
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
