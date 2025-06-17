'use client'

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';

// Este componente "envolve" as páginas e decide qual layout usar.
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Se a rota for a de login, renderiza apenas o conteúdo em um layout simples
  if (pathname === '/login') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        {children}
      </div>
    );
  }

  // Para todas as outras rotas, renderiza o layout principal com a sidebar
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar para Desktop */}
      <div className="hidden border-r bg-card md:block">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-col">
        {/* Header para Mobile */}
        <MobileHeader />

        {/* O conteúdo da sua página (children) será renderizado aqui */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
