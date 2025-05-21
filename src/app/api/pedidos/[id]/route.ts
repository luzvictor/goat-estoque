import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const body = await req.json();
  const { status } = body;

  try {
    const pedidoAtualizado = await prisma.pedido.update({
      where: { id_pedido: id },
      data: { status },
    });

    return NextResponse.json(pedidoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return NextResponse.json({ error: "Erro ao atualizar pedido" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params;
  
    try {
      // Busca o pedido com os produtos
      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido: id },
        include: {
          produtos: true,
        },
      });
  
      if (!pedido) {
        return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
      }
  
      // Reverte o estoque
      for (const item of pedido.produtos) {
        await prisma.produto.update({
          where: { id_produto: item.produtoId },
          data: {
            quantidade: {
              increment: item.quantidade,
            },
          },
        });
      }
  
      // Remove os itens do pedido (PedidoProduto)
      await prisma.pedidoProduto.deleteMany({
        where: { pedidoId: id },
      });
  
      // Remove o pedido
      await prisma.pedido.delete({
        where: { id_pedido: id },
      });
  
      return NextResponse.json({ message: "Pedido removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover pedido:", error);
      return NextResponse.json({ error: "Erro ao remover pedido" }, { status: 500 });
    }
  }
