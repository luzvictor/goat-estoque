import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario || usuario.senha !== senha) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  // Cria cookie com ID do usuário (simples)
  (await cookies()).set("usuarioId", usuario.id_usuario, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  
  return NextResponse.json({ message: "Login realizado com sucesso" });
}
