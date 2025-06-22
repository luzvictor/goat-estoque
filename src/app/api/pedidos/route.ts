// Em: src/app/api/pedidos/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getUsuarioDaSessao } from "@/lib/session";
import { criarNotificacaoParaAdmins } from "@/lib/notifications";

console.log('STATUS DA IMPORTAÇÃO getUsuarioDaSessao:', typeof getUsuarioDaSessao);

/**
 * GET: Lista todos os pedidos do sistema, incluindo detalhes dos produtos,
 * suas variantes, e o cliente associado.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mes = searchParams.get('mes');
    const ano = searchParams.get('ano');

    let whereClause = {};

    // Se os parâmetros de mês e ano forem fornecidos, cria o filtro de data
    if (mes && ano) {
      const mesNumero = parseInt(mes);
      const anoNumero = parseInt(ano);

      // Valida se são números válidos
      if (!isNaN(mesNumero) && !isNaN(anoNumero)) {
        // O mês em JavaScript é 0-indexado (Janeiro = 0), por isso subtraímos 1
        const dataInicio = new Date(anoNumero, mesNumero - 1, 1);
        // O fim é o início do próximo mês
        const dataFim = new Date(anoNumero, mesNumero, 1);

        whereClause = {
          data: {
            gte: dataInicio, // gte = Greater Than or Equal (Maior ou Igual a)
            lt: dataFim,     // lt = Less Than (Menor Que)
          },
        };
      }
    }

    const pedidos = await prisma.pedido.findMany({
      where: whereClause, // Aplica o filtro aqui
      include: {
        Cliente: {
          select: {
            nome: true,
          },
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
      orderBy: {
        data: 'desc',
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
 * Recebe um corpo JSON: { clienteId?: string, produtos: [{ varianteId: string, quantidade: number }] }
 */
export async function POST(request: Request) {
  try {
    const usuarioLogado = await getUsuarioDaSessao();
    if (!usuarioLogado) {
      return NextResponse.json({ error: "Apenas usuários autenticados podem criar pedidos." }, { status: 401 });
    }
    
    const body = await request.json();
    const { clienteId, produtos } = body;

    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return NextResponse.json({ error: "O pedido deve conter pelo menos um produto." }, { status: 400 });
    }

    const pedidoComCliente = await prisma.$transaction(async (tx) => {
      // Passo 1: Verificar estoque
      for (const produto of produtos) {
        const varianteEmEstoque = await tx.varianteProduto.findUnique({
          where: { id_variante: produto.varianteId },
        });
        if (!varianteEmEstoque || varianteEmEstoque.quantidade < produto.quantidade) {
          throw new Error(`Estoque insuficiente para o produto SKU: ${varianteEmEstoque?.sku || produto.varianteId}`);
        }
      }

      // Passo 2: Criar o Pedido
      const pedido = await tx.pedido.create({
        data: {
          clienteId: clienteId || null,
          criadoPorUsuarioId: usuarioLogado.id_usuario,
          produtos: {
            create: produtos.map((p: { varianteId: string, quantidade: number }) => ({
              varianteId: p.varianteId,
              quantidade: p.quantidade,
            })),
          },
        },
        include: { // Incluímos o cliente para usar o nome na notificação
          Cliente: { select: { nome: true } }
        }
      });

      // Passo 3: Dar baixa no estoque e verificar o nível para alertas
      for (const produto of produtos) {
        const varianteAtualizada = await tx.varianteProduto.update({
          where: { id_variante: produto.varianteId },
          data: {
            quantidade: { decrement: produto.quantidade },
          },
          include: { produtoBase: true },
        });

        // LÓGICA DE ALERTA DE ESTOQUE
        const { quantidade, estoqueMin, produtoBase, cor, tamanho } = varianteAtualizada;
        const nomeProduto = `${produtoBase.marca} - ${produtoBase.nome} (${cor}, ${tamanho || 'Único'})`;

        if (quantidade <= 0) {
          await criarNotificacaoParaAdmins({
            tx,
            mensagem: `ESTOQUE ZERADO: O produto ${nomeProduto} acabou!`,
            link: `/produtos`
          });
        } else if (estoqueMin > 0 && quantidade <= estoqueMin) {
          await criarNotificacaoParaAdmins({
            tx,
            mensagem: `Estoque Baixo: Restam apenas ${quantidade} unidades de ${nomeProduto}.`,
            link: `/produtos`
          });
        }
      }
      
      // Passo 4: Notificação de Novo Pedido
      await criarNotificacaoParaAdmins({
         tx,
         mensagem: `Novo pedido de ${pedido.Cliente?.nome || 'um cliente sem cadastro'} foi criado.`,
         link: `/pedidos` // Link para a lista de pedidos
      });

      return pedido;
    });

    return NextResponse.json(pedidoComCliente, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao criar pedido:", error);
    if (error.message.includes('Estoque insuficiente')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro interno do servidor ao criar o pedido." }, { status: 500 });
  }
}