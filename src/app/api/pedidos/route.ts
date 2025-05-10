import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Listar todos os pedidos
export async function GET() {
  const pedidos = await prisma.pedido.findMany({
    include: {
      produtos: {
        include: {
          produto: true,
        },
      },
    },
    orderBy: { data: "desc" },
  });

  return NextResponse.json(pedidos);
}

// POST: Criar um novo pedido
export async function POST(req: Request) {
  const body = await req.json();
  const { produtos } = body; // produtos: [{ produtoId, quantidade }]

  try {
    // Cria pedido vazio
    const novoPedido = await prisma.pedido.create({
      data: {
        status: "Pendente",
        produtos: {
          create: produtos.map((p: any) => ({
            produtoId: p.produtoId,
            quantidade: p.quantidade,
          })),
        },
      },
      include: {
        produtos: true,
      },
    });

    // Reduz o estoque dos produtos
    for (const item of produtos) {
      await prisma.produto.update({
        where: { id_produto: item.produtoId },
        data: {
          quantidade: {
            decrement: item.quantidade,
          },
        },
      });
    }
    // Criar notificação
    await prisma.notificacao.create({
      data: {
        mensagem: `Novo pedido registrado em ${new Date().toLocaleString("pt-BR")}`,
      },
    });


    return NextResponse.json(novoPedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
  }
}
