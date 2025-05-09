'use client'

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 mb-4">
      <h1 className="text-lg font-semibold">Sistema de Estoque</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </header>
  );
}
