import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUsuarioDaSessao } from "@/lib/session"; 

// 1. ADICIONE ESTA LINHA
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
try {
 // 2. USAR A SESSÃO, E NÃO O MOCK
 const usuarioLogado = await getUsuarioDaSessao(); 
 
 if (!usuarioLogado) {
 // Retorna 401 se não houver usuário, e o frontend não mostrará nada
 return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
 }
 
 // 3. BUSCAR NOTIFICAÇÕES APENAS DO USUÁRIO DA SESSÃO
 const notificacoesUsuario = await prisma.notificacaoUsuario.findMany({
 where: {
  usuarioId: usuarioLogado.id_usuario, 
 },
 include: {
  notificacao: true,
 },
 orderBy: [
  { lida: 'asc' }, // Não lidas primeiro
  { notificacao: { dataEnvio: 'desc' } }, // Mais recentes no topo
 ],
 take: 20,
 });

 return NextResponse.json(notificacoesUsuario);

} catch (error) {
 console.error("Erro ao buscar notificações:", error);
 return NextResponse.json({ error: "Erro ao buscar notificações." }, { status: 500 });
}
}
export async function DELETE(request: Request) {
  try {
    const usuarioLogado = await getUsuarioDaSessao();
    if (!usuarioLogado) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    await prisma.notificacaoUsuario.updateMany({
      where: { usuarioId: usuarioLogado.id_usuario, lida: false },
      data: { lida: true, dataLeitura: new Date() },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao limpar." }, { status: 500 });
  }
}