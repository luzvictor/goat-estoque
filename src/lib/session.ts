import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getUsuarioDaSessao() {
  // Tentativa de suprimir o aviso do Next.js.
  // Envolvemos a chamada em parênteses, embora 'cookies()' não retorne uma Promise.
  const usuarioId = (await cookies()).get("usuarioId")?.value;

  if (!usuarioId) {
    return null;
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: usuarioId },
    select: { id_usuario: true, nome: true, email: true },
  });

  return usuario;
}