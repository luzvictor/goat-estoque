// Em: src/lib/require-auth.ts

import { redirect } from "next/navigation";
import { getUsuarioDaSessao } from "./session"; 

/**
@returns {Promise<object>} O objeto do usuário autenticado.
 */
export async function requireAuth() {
  const usuario = await getUsuarioDaSessao();

  if (!usuario) {
    redirect("/login");
  }

  return usuario;
}