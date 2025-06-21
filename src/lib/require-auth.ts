// Em: src/lib/require-auth.ts

import { redirect } from "next/navigation";
import { getUsuarioDaSessao } from "./session"; // 1. Importa nossa função central

/**
 * Protege uma página ou layout, exigindo que um usuário esteja autenticado.
 * Se não estiver, redireciona para a página de login.
 * Se estiver, retorna os dados completos do usuário logado.
 * * @returns {Promise<object>} O objeto do usuário autenticado.
 */
export async function requireAuth() {
  // 2. Chama a nossa "fonte da verdade" para obter o usuário
  const usuario = await getUsuarioDaSessao();

  // 3. Se não houver usuário, redireciona para o login
  if (!usuario) {
    redirect("/login");
  }

  // 4. Se houver, retorna o objeto completo do usuário
  return usuario;
}