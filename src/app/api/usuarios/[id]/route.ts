// app/api/usuarios/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { getUsuarioDaSessao } from "@/lib/session";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const usuarioLogado = await getUsuarioDaSessao();
  if (usuarioLogado?.role !== Role.ADM) {
    return NextResponse.json({ error: 'Acesso negado. Apenas administradores podem excluir usuários.' }, { status: 403 });
  }

  const idToDelete = params.id;

  if (usuarioLogado.id_usuario === idToDelete) {
      return NextResponse.json({ error: 'Você não pode excluir sua própria conta por aqui.' }, { status: 400 });
  }

  try {
    await prisma.usuario.delete({
      where: { id_usuario: idToDelete },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json({ error: "Erro ao excluir usuário. Verifique se ele ainda existe." }, { status: 500 });
  }
}