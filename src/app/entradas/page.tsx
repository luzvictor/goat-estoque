'use client'

import { useEffect, useState } from "react";

type Produto = {
  id_produto: string;
  nome: string;
};

type Entrada = {
  id_entrada: string;
  data: string;
  quantidade: number;
  numeroNota: string | null;
  produto: Produto;
};

export default function EntradasPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  const [form, setForm] = useState({
    produtoId: "",
    quantidade: 0,
    numeroNota: "",
  });

  async function fetchProdutos() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
    if (data.length > 0 && !form.produtoId) {
      setForm((prev) => ({ ...prev, produtoId: data[0].id_produto }));
    }
  }

  async function fetchEntradas() {
    const res = await fetch("/api/entradas");
    const data = await res.json();
    setEntradas(data);
  }

  async function registrarEntrada() {
    await fetch("/api/entradas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        quantidade: Number(form.quantidade),
        numeroNota: form.numeroNota.trim() || null,
      }),
    });

    setForm({ ...form, quantidade: 0, numeroNota: "" });
    await fetchEntradas();
  }

  useEffect(() => {
    fetchProdutos();
    fetchEntradas();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Entradas de Estoque</h1>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <select
          value={form.produtoId}
          onChange={(e) => setForm({ ...form, produtoId: e.target.value })}
          className="border p-2 rounded"
        >
          {produtos.map((produto) => (
            <option key={produto.id_produto} value={produto.id_produto}>
              {produto.nome}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantidade"
          className="border p-2 rounded"
          value={form.quantidade}
          onChange={(e) => setForm({ ...form, quantidade: Number(e.target.value) })}
        />

        <input
          type="text"
          placeholder="Número da Nota (opcional)"
          className="border p-2 rounded"
          value={form.numeroNota}
          onChange={(e) => setForm({ ...form, numeroNota: e.target.value })}
        />

        <button
          onClick={registrarEntrada}
          className="col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Registrar Entrada
        </button>
      </div>

      <ul className="space-y-2">
        {entradas.map((entrada) => (
          <li key={entrada.id_entrada} className="border p-3 rounded shadow">
            <strong>{entrada.produto.nome}</strong> — {entrada.quantidade} unidades  
            <div className="text-sm text-gray-500">
              Data: {new Date(entrada.data).toLocaleString()}
              {entrada.numeroNota && <> • Nota: {entrada.numeroNota}</>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
