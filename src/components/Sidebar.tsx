// Em: src/components/Sidebar.tsx

'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Package, ShoppingCart, Users, LogOut, AreaChart } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from './ui/button';

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/produtos", label: "Produtos", icon: Package },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/relatorios", label: "Relatorios", icon: AreaChart },
  { href: "/clientes", label: "Clientes", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/login');
        router.refresh();
      } else {
        alert('Não foi possível sair. Tente novamente.');
      }
    } catch (error) {
      alert('Ocorreu um erro de rede ao tentar sair.');
    }
  }

  return (
    // CORREÇÃO 1: Define a cor de texto padrão para toda a sidebar
    <div className="flex h-full max-h-screen flex-col gap-2 text-sidebar-foreground">
      {/* Usa a cor de borda específica da sidebar */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Image
            src="/loja-goat.png" 
            alt="GOAT Store Logo"
            width={100}
            height={40}
            priority
            // Se sua logo tiver fundo, considere usar uma versão com texto branco e fundo transparente
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
                // CORREÇÃO 2: Usa as cores da sidebar para estado padrão e hover
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-primary",
                // CORREÇÃO 3: Usa as cores de destaque (accent) da sidebar para o link ATIVO
                pathname.startsWith(link.href) && "bg-sidebar-accent text-sidebar-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-sidebar-border">
        {/* O botão agora também usa as cores de hover corretas */}
        <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-primary" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sair
        </Button>
      </div>
    </div>
  );
}