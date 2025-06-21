// Em: src/app/api/notificacoes/read-all/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUsuarioDaSessao } from "@/lib/session";

export async function POST() {
  try {
    const usuarioLogado = await getUsuarioDaSessao();
    if (!usuarioLogado) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    await prisma.notificacaoUsuario.updateMany({
      where: { usuarioId: usuarioLogado.id_usuario, lida: false },
      data: { lida: true, dataLeitura: new Date() },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Falha ao marcar todas como lidas." }, { status: 500 });
  }
}