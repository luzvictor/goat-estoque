// Em: src/app/page.tsx

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  // 1. Acessa os cookies do navegador no lado do servidor.
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get('session-token'); // Usamos o mesmo nome de cookie da sua API de login/logout.

  // 2. Verifica se o token de sessão existe.
  if (sessionToken?.value) {
    // 3a. Se existe, redireciona para o dashboard.
    redirect('/dashboard');
  } else {
    // 3b. Se não existe, redireciona para a página de login.
    redirect('/login');
  }

  // Este componente nunca será realmente renderizado para o usuário,
  // pois o redirecionamento acontece antes.
  // Podemos retornar null ou um loader simples.
  return null;
}
