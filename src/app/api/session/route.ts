import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const usuarioId = (await cookies()).get("usuarioId")?.value;

  if (!usuarioId) {
    return NextResponse.json({ autenticado: false });
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: usuarioId },
    select: { id_usuario: true, nome: true, email: true },
  });

  if (!usuario) {
    return NextResponse.json({ autenticado: false });
  }

  return NextResponse.json({ autenticado: true, usuario });
}
