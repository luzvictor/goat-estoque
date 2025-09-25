// Em: src/app/api/entradas/route.ts

import { criarNotificacaoParaAdmins } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * GET: Lista o histórico de todas as entradas de estoque.
 */
export async function GET() {
  try {
    const entradas = await prisma.entradaEstoque.findMany({
      include: {
        variante: {
          include: {
            produtoBase: {
              include: {
                marca: true,
              }
            },
            cor: true,
            tamanho: true,
          },
        },
      },
      orderBy: {
        data: "desc",
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
        // CORREÇÃO: Incluímos todas as informações necessárias para a notificação.
        include: {
          cor: true,       // Inclui o objeto Cor
          tamanho: true,   // Inclui o objeto Tamanho
          produtoBase: {   // Inclui o ProdutoBase...
            include: {
              marca: true, // ...e a Marca dentro dele.
            },
          },
        },
      });

      // 3. Monta a mensagem da notificação com os dados completos
      const marcaNome = varianteAtualizada.produtoBase.marca.nome;
      const produtoNome = varianteAtualizada.produtoBase.nome;
      const corNome = varianteAtualizada.cor.nome;
      const tamanhoNome = varianteAtualizada.tamanho?.nome || 'Tamanho Único';

      const mensagem = `${qtdNumber} unidades de "${marcaNome} - ${produtoNome} (${corNome}, ${tamanhoNome})" foram adicionadas ao estoque.`;
      
      // 4. Cria a notificação persistente no banco de dados
      await criarNotificacaoParaAdmins({
        tx,
        mensagem: mensagem,
        link: `/produtos`,
      });
      
      return varianteAtualizada;
    });

    return NextResponse.json(resultado, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao registrar entrada:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Se a variante não for encontrada no update
      if (error.code === 'P2025') {
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
