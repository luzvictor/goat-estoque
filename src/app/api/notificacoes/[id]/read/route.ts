// Em: src/app/api/notificacoes/[id]/read/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUsuarioDaSessao } from "@/lib/session";

export async function POST(request: Request, { params }: { params: { id: string } }) {
 try {
    const usuarioLogado = await getUsuarioDaSessao(); // 2. Pegar usuário
    if (!usuarioLogado) {
   return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  await prisma.notificacaoUsuario.update({
   where: { 
        id: params.id, 
        usuarioId: usuarioLogado.id_usuario // 3. Garantir que a notificação é do usuário
      },
   data: { lida: true, dataLeitura: new Date() },
  });

  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json({ error: "Falha ao marcar como lida." }, { status: 500 });
 }
}