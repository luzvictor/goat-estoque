// Em: src/app/api/notificacoes/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Busca as notificações de um usuário específico
export async function GET(request: Request) {
  try {
    // IMPORTANTE: Em um sistema real, você pegaria o ID do usuário da sessão de autenticação.
    // Como ainda não temos auth, vamos simular pegando o primeiro usuário do banco.
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