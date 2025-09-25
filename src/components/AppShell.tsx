'use client'

import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { NotificationBell } from '@/components/NotificationBell';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
import { toast } from 'sonner';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Função para fazer logout do usuário
  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        toast.success("Você saiu com sucesso!");
        router.push('/login');
        router.refresh(); // Limpa o cache e garante que o estado do usuário seja atualizado
      } else {
        toast.error('Não foi possível sair. Tente novamente.');
      }
    } catch (error) {
      toast.error('Ocorreu um erro de rede ao tentar sair.');
    }
  }

  // Se a rota for a de login, renderiza apenas o conteúdo em um layout simples
  if (pathname === '/login') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-muted">
        {children}
      </div>
    );
  }

  // Para todas as outras rotas, renderiza o layout principal
  return (
    <div className="grid h-screen w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      
      <div className="hidden border-r bg-sidebar md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col overflow-auto">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
          <MobileHeader />

          <div className="w-full flex-1">
            {/* Espaço para um futuro campo de busca */}
          </div>
          
          <div className='flex items-center gap-4'>
            <NotificationBell />
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
                {/* CORREÇÃO: Adicionado onClick para navegar e classe de cursor */}
                <DropdownMenuItem onClick={() => router.push('/configuracoes')} className="cursor-pointer">
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* CORREÇÃO: Adicionado onClick para fazer logout e classe de cursor */}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

