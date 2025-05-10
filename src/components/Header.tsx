'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Notificacao = {
  id_notificacao: string;
  mensagem: string;
  dataEnvio: string;
};

export default function Header() {
  const router = useRouter();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/notificacoes")
      .then(res => res.json())
      .then(data => setNotificacoes(data));
  }, []);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownAberto(false);
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
    <header className="relative flex justify-between items-center p-4 bg-gray-200 mb-4">
      <h1 className="text-lg font-semibold">Sistema de Estoque</h1>
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownAberto(!dropdownAberto)}
          className="relative text-gray-700 hover:text-black"
        >
          🔔
          {notificacoes.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {notificacoes.length}
            </span>
          )}
        </button>

        {dropdownAberto && (
          <div className="absolute right-0 mt-10 w-64 bg-white shadow-lg border rounded p-3 z-50">
            <h2 className="font-semibold mb-2">Notificações</h2>
            {notificacoes.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma notificação</p>
            ) : (
              <ul className="text-sm space-y-2 max-h-60 overflow-y-auto">
                {notificacoes.slice(0, 10).map((n) => (
                  <li key={n.id_notificacao} className="border-b pb-1 text-gray-800">
                    <p>{n.mensagem}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(n.dataEnvio).toLocaleString("pt-BR")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
