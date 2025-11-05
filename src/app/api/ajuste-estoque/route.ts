import { prisma } from "@/lib/prisma";
import { getUsuarioDaSessao } from "@/lib/session";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const ajusteSchema = z.object({
  varianteId: z.string().min(1, "ID da variante é obrigatório"),
  novaQuantidade: z.number().min(0, "A quantidade não pode ser negativa"),
  motivo: z.string().min(3, "Informe um motivo para o ajuste"),
});

export async function POST(request: Request) {
  const usuario = await getUsuarioDaSessao();
  if (!usuario || (usuario.role !== Role.ADM)) { // Ajuste conforme suas roles
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { varianteId, novaQuantidade, motivo } = ajusteSchema.parse(body);
    const varianteAtualizada = await prisma.varianteProduto.update({
      where: { id_variante: varianteId },
      data: { quantidade: novaQuantidade },
    });

    console.log(`[AJUSTE ESTOQUE] Usuário ${usuario.email} alterou variante ${varianteId} para ${novaQuantidade}. Motivo: ${motivo}`);

    return NextResponse.json(varianteAtualizada);

  } catch (error: any) {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Erro ao ajustar estoque:", error);
    return NextResponse.json({ error: "Erro interno ao ajustar estoque." }, { status: 500 });
  }
}