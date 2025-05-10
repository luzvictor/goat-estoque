import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: listar notificações (mais recentes primeiro)
export async function GET() {
  const notificacoes = await prisma.notificacao.findMany({
    orderBy: { dataEnvio: "desc" },
  });

  return NextResponse.json(notificacoes);
}

// POST: criar uma nova notificação
export async function POST(req: Request) {
  const body = await req.json();

  const nova = await prisma.notificacao.create({
    data: {
      mensagem: body.mensagem,
    },
  });

  return NextResponse.json(nova);
}
