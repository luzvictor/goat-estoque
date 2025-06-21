// Em: src/app/api/notificacoes/[id]/read/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// O [id] aqui é o ID da *relação* NotificacaoUsuario
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.notificacaoUsuario.update({
      where: { id: params.id },
      data: { lida: true, dataLeitura: new Date() },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Falha ao marcar como lida." }, { status: 500 });
  }
}