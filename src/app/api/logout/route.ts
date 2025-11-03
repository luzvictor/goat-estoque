// Em: src/app/api/logout/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
try {
const cookieStore = await cookies();
    const cookieName = "usuarioId"; 

    if (cookieStore.get(cookieName)) {
        cookieStore.set(cookieName, '', { expires: new Date(0), path: '/' });
    }

return NextResponse.json({ message: 'Logout realizado com sucesso.' });
} catch (error) {
console.error('Erro no logout:', error);
return NextResponse.json({ error: 'Não foi possível realizar o logout.' }, { status: 500 });
}
}
