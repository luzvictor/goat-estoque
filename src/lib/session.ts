import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export type UsuarioSessao = {
  id_usuario: string;
  nome: string;
  email: string;
  role: Role;
} | null;

export async function getUsuarioDaSessao(): Promise<UsuarioSessao> {
  const usuarioId = (await cookies()).get("usuarioId")?.value;

  if (!usuarioId) {
    return null;
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: usuarioId },
      select: {
        id_usuario: true,
        nome: true,
        email: true,
        role: true,
      },
    });

    if (!usuario) {
      (await cookies()).set("usuarioId", '', { expires: new Date(0), path: '/' });
      return null;
    }

    return usuario;

  } catch (error) {
    console.error("Erro ao buscar sessão do usuário:", error);
    return null;
  }
}

export async function isAdm(): Promise<boolean> {
  const usuario = await getUsuarioDaSessao();
  return usuario?.role === "ADM";
}
