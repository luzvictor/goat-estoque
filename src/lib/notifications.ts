// Em: src/lib/notifications.ts

import { PrismaClient, Prisma } from '@prisma/client';

// Opções para nossa função de criação
interface NotificationOptions {
  tx: Prisma.TransactionClient | PrismaClient; // Aceita uma transação ou o cliente prisma normal
  mensagem: string;
  link?: string;
  // Futuramente, poderia receber um `userIds: string[]` para notificações direcionadas
}

/**
 * Cria uma notificação e a associa a todos os usuários do sistema.
 */
export async function criarNotificacaoParaAdmins({ tx, mensagem, link }: NotificationOptions) {
  // 1. Busca todos os usuários (nossos administradores)
  const admins = await tx.usuario.findMany({
    select: { id_usuario: true },
  });

  if (admins.length > 0) {
    // 2. Cria o registro da notificação
    const novaNotificacao = await tx.notificacao.create({
      data: {
        mensagem,
        link: link || undefined,
      },
    });

    // 3. Associa a notificação a todos os administradores
    await tx.notificacaoUsuario.createMany({
      data: admins.map(admin => ({
        usuarioId: admin.id_usuario,
        notificacaoId: novaNotificacao.id_notificacao,
      })),
    });
  }
}