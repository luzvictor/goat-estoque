'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Notificacao = {
  id_notificacao: string;
  mensagem: string;
  dataEnvio: string;
};

export default function Header() {
  const router = useRouter();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const [mobileMenuAberto, setMobileMenuAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/notificacoes")
      .then(res => res.json())
      .then(data => setNotificacoes(data));
  }, []);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setNotificacoesAbertas(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111] text-white border-b border-gray-800 px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center hover:opacity-80 transition">
          <Image
            src="/loja-goat.png"
            alt="GOAT Store Logo"
            width={110}
            height={35}
            priority
            className="object-contain"
          />
        </Link>
  
        {/* Botão hambúrguer no mobile */}
        <button
          onClick={() => setMobileMenuAberto(!mobileMenuAberto)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
  
        {/* Menu de navegação (desktop) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
          <Link href="/dashboard" className="hover:text-[#CFFF04] transition">Dashboard</Link>
          <Link href="/produtos" className="hover:text-[#CFFF04] transition">Produtos</Link>
          <Link href="/entradas" className="hover:text-[#CFFF04] transition">Entradas</Link>
          <Link href="/pedidos" className="hover:text-[#CFFF04] transition">Pedidos</Link>
        </nav>
  
        {/* Ações: notificações e usuário */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setNotificacoesAbertas(!notificacoesAbertas)}
            className="relative text-gray-300 hover:text-white transition"
          >
            🔔
            {notificacoes.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {notificacoes.length}
              </span>
            )}
          </button>
  
          {notificacoesAbertas && (
            <div className="absolute right-16 mt-12 w-72 bg-white text-black shadow-xl rounded-md border border-gray-300 p-3 z-50">
              <h2 className="font-semibold mb-2">Notificações</h2>
              {notificacoes.length === 0 ? (
                <p className="text-sm text-gray-500">Nenhuma notificação</p>
              ) : (
                <ul className="text-sm space-y-2 max-h-60 overflow-y-auto">
                  {notificacoes.slice(0, 10).map((n) => (
                    <li key={n.id_notificacao} className="border-b pb-1">
                      <p>{n.mensagem}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(n.dataEnvio).toLocaleString("pt-BR")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
  
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer text-white hover:text-[#CFFF04] transition font-semibold text-sm">
              Admin ⌄
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black mt-2">
              <DropdownMenuItem onClick={handleLogout}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  
      {/* Menu Mobile (fora do header) */}
      {mobileMenuAberto && (
        <div className="md:hidden bg-[#111] text-white px-6 py-4 space-y-2 border-b border-gray-800 pt-16">
          <Link
            href="/dashboard"
            className="block hover:text-[#CFFF04] transition"
            onClick={() => setMobileMenuAberto(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/produtos"
            className="block hover:text-[#CFFF04] transition"
            onClick={() => setMobileMenuAberto(false)}
          >
            Produtos
          </Link>
          <Link
            href="/entradas"
            className="block hover:text-[#CFFF04] transition"
            onClick={() => setMobileMenuAberto(false)}
          >
            Entradas
          </Link>
          <Link
            href="/pedidos"
            className="block hover:text-[#CFFF04] transition"
            onClick={() => setMobileMenuAberto(false)}
          >
            Pedidos
          </Link>
        </div>
      )}
    </>
  );  
}
