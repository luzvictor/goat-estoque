// Em: src/components/AppShell.tsx

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
      <div className="flex min-h-screen items-center justify-center p-4 bg-muted">
        {children}
      </div>
    );
  }

  // Para todas as outras rotas, renderiza o layout principal com a sidebar
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar para Desktop */}
      {/* CORREÇÃO AQUI: Trocamos bg-card por bg-sidebar para usar a cor correta */}
      <div className="hidden border-r bg-sidebar md:block">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-col">
        {/* Header para Mobile */}
        <MobileHeader />

        {/* O conteúdo da sua página (children) será renderizado aqui */}
        {/* Garante que o fundo da área de conteúdo seja o --background (branco) */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}