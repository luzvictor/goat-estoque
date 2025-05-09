import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("usuarioId");
  return NextResponse.json({ message: "Logout realizado" });
}
