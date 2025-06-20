// Em: src/components/AppShell.tsx

'use client'

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';

// --- NOVOS IMPORTS ---
import { NotificationBell } from '@/components/NotificationBell'; // Importa o sininho
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';


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
      <div className="hidden border-r bg-sidebar md:block">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-col">
        
        {/* --- CABEÇALHO ATUALIZADO --- */}
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          {/* Mantém seu header de mobile, que provavelmente contém o botão de menu */}
          <MobileHeader />

          {/* Espaço para um futuro campo de busca, se desejar */}
          <div className="w-full flex-1">
            {/* <SearchForm /> */}
          </div>
          
          {/* Ícones de Ação à Direita */}
          <div className='flex items-center gap-4'>
            <NotificationBell />
            
            {/* Menu de Usuário (exemplo) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* O conteúdo da sua página (children) será renderizado aqui */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}