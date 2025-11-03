// Em: src/app/page.tsx

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get('session-token');

  if (sessionToken?.value) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }

  return null;
}
