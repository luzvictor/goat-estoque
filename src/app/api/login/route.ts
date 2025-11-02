import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
  return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
 }
  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  (await cookies()).set("usuarioId", usuario.id_usuario, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  
  return NextResponse.json({ message: "Login realizado com sucesso" });
}
