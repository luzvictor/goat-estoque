// Em: src/app/api/notificacoes/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const usuarioLogado = await prisma.usuario.findFirst();
    
    if (!usuarioLogado) {
      return NextResponse.json({ error: "Nenhum usuário encontrado para buscar notificações." }, { status: 404 });
    }
    const mockUserId = usuarioLogado.id_usuario;
    
    const notificacoesUsuario = await prisma.notificacaoUsuario.findMany({
      where: {
        usuarioId: mockUserId,
      },
      include: {
        notificacao: true, // Inclui os dados da notificação (mensagem, data)
      },
      orderBy: [
        { lida: 'asc' }, // Não lidas primeiro
        { notificacao: { dataEnvio: 'desc' } }, // Depois, as mais recentes
      ],
      take: 20, // Limita a 20 notificações para não sobrecarregar
    });

    return NextResponse.json(notificacoesUsuario);

  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    return NextResponse.json({ error: "Erro ao buscar notificações." }, { status: 500 });
  }
}