import { PrismaClient, Prisma } from '@prisma/client';

interface NotificationOptions {
  tx: Prisma.TransactionClient | PrismaClient; 
  mensagem: string;
  link?: string;
}

export async function criarNotificacaoParaAdmins({ tx, mensagem, link }: NotificationOptions) {
  try {
    if (link) {
      const notifExistenteNaoLida = await tx.notificacao.findFirst({
        where: {
          link: link,
          usuarios: {
            some: {
              lida: false,
            },
          },
        },
      });

      if (notifExistenteNaoLida) {
        console.log(`Notificação para ${link} já existe e não foi lida. Pulando.`);
        return;
      }
    }

    const admins = await tx.usuario.findMany({
      where: { role: 'ADM' }, 
      select: { id_usuario: true },
    });

    if (admins.length === 0) {
      console.warn("Nenhum usuário ADM encontrado para notificar.");
      return;
    }

    const novaNotificacao = await tx.notificacao.create({
      data: {
        mensagem,
        link: link || undefined,
      },
    });

    await tx.notificacaoUsuario.createMany({
      data: admins.map(admin => ({
        usuarioId: admin.id_usuario,
        notificacaoId: novaNotificacao.id_notificacao,
        lida: false,
      })),
      skipDuplicates: true,
    });

  } catch (error) {
    console.error("Erro ao criar notificação para admins:", error);

  }
}

