'use client'

import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { NotificationBell } from '@/components/NotificationBell';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();


  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        toast.success("Você saiu com sucesso!");
        router.push('/login');
        router.refresh();
      } else {
        toast.error('Não foi possível sair. Tente novamente.');
      }
    } catch (error) {
      toast.error('Ocorreu um erro de rede ao tentar sair.');
    }
  }

  if (pathname === '/login') {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 bg-muted overflow-y-auto">
        {children}
      </div>
    );
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/session');
        if (response.ok) {
          const data = await response.json();
          if (data.autenticado && data.usuario) {
             setUser(data.usuario);
          }
        }
      } catch (error) {
        console.error("Falha ao carregar sessão", error);
      }
    };

    if (pathname !== '/login') {
      fetchUserData();
    }
  }, [pathname]);

  return (
    <div className="grid h-screen w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      
      <div className="hidden border-r bg-sidebar md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col overflow-auto">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
          <MobileHeader />

          <div className="w-full flex-1">
          </div>
          
          <div className='flex items-center gap-4 p-2'>
            <NotificationBell />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                   <div className="flex flex-col space-y-1 p-2 leading-none">
                     <p className="font-medium text-sm">{user.nome}</p>
                     <p className="w-full truncate text-xs text-muted-foreground">
                       {user.email}
                     </p>
                   </div>
                ) : (
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/configuracoes')} className="cursor-pointer">
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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

function setUser(usuario: any) {
  throw new Error('Function not implemented.');
}

