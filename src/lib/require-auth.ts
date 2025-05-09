import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const cookieStore = cookies();
  const usuarioId = (await cookieStore).get("usuarioId")?.value;

  if (!usuarioId) {
    redirect("/login");
  }

  return usuarioId;
}
