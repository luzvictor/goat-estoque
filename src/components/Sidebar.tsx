'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'; // 1. Importado o useRouter
import { Home, Package, ShoppingCart, Users, LogOut } from 'lucide-react'; // 2. Importado o ícone de LogOut
import { cn } from "@/lib/utils";
import { Button } from './ui/button';

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/produtos", label: "Produtos", icon: Package },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/usuarios", label: "Usuários", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // 3. Inicializado o router para redirecionamento

  // 4. Função para lidar com o logout
  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Redireciona para a página de login após o logout bem-sucedido
        router.push('/login');
        router.refresh(); // Força a atualização do estado do lado do servidor
      } else {
        console.error('Falha no logout');
        alert('Não foi possível sair. Tente novamente.');
      }
    } catch (error) {
      console.error('Ocorreu um erro durante o logout:', error);
      alert('Ocorreu um erro de rede ao tentar sair.');
    }
  }

  return (
    <div className="flex h-full max-h-screen flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
          <Image
            src="/loja-goat.png"
            alt="GOAT Store Logo"
            width={100}
            height={40}
            priority
          />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === link.href && "bg-muted text-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* 5. Seção de Logout adicionada no final da sidebar */}
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sair
        </Button>
      </div>
    </div>
  );
}
