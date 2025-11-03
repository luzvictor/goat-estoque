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
              include: { marca: true }
            },
            cor: true,
            tamanho: true,
          },
        },
      },
      orderBy: { data: "desc" },
    });

    const entradasFormatadas = entradas.map(entry => ({
      ...entry,
      data: entry.data ? new Date(entry.data).toLocaleDateString('pt-BR') : null,
    }));

    return NextResponse.json(entradasFormatadas);
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
    const { varianteId, quantidade, numeroNota, data } = body;

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

    const dataEntrada = data ? new Date(data) : new Date();
    if (isNaN(dataEntrada.getTime())) {
      return NextResponse.json({ error: "Data inválida." }, { status: 400 });
    }

    const resultado = await prisma.$transaction(async (tx) => {
      await tx.entradaEstoque.create({
        data: {
          varianteId,
          quantidade: qtdNumber,
          numeroNota: numeroNota || null,
          data: dataEntrada, // <-- salva a data
        },
      });

      const varianteAtualizada = await tx.varianteProduto.update({
        where: { id_variante: varianteId },
        data: { quantidade: { increment: qtdNumber } },
        include: {
          cor: true,
          tamanho: true,
          produtoBase: { include: { marca: true } },
        },
      });


      return varianteAtualizada;
    });

    return NextResponse.json(resultado, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao registrar entrada:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: "A variante de produto especificada não foi encontrada." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno do servidor ao registrar a entrada." },
      { status: 500 }
    );
  }
}
