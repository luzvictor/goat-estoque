// Em: src/app/api/logout/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Esta é a forma padrão de encerrar uma sessão baseada em cookies.
    // Ele define o cookie de sessão com uma data de expiração no passado,
    // fazendo com que o navegador o apague imediatamente.
    cookies().set('session-token', '', { expires: new Date(0), path: '/' });

    return NextResponse.json({ message: 'Logout realizado com sucesso.' });
  } catch (error) {
    console.error('Erro no logout:', error);
    return NextResponse.json({ error: 'Não foi possível realizar o logout.' }, { status: 500 });
  }
}
