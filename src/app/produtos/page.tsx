'use client'

import { useEffect, useState } from "react";

type Produto = {
  id_produto: string;
  nome: string;
  categoria: string;
  marca: string;
  cor: string;
  quantidade: number;
  valorCusto: number;
  valorVenda: number;
  estoqueMin: number;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<Produto, "id_produto">>({
    nome: "",
    categoria: "",
    marca: "",
    cor: "",
    quantidade: 0,
    valorCusto: 0,
    valorVenda: 0,
    estoqueMin: 0,
  });

  async function fetchProdutos() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  }

  async function salvarProduto() {
    const url = editandoId ? `/api/produtos/${editandoId}` : "/api/produtos";
    const method = editandoId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      nome: "",
      categoria: "",
      marca: "",
      cor: "",
      quantidade: 0,
      valorCusto: 0,
      valorVenda: 0,
      estoqueMin: 0,
    });
    setEditandoId(null);
    await fetchProdutos();
  }

  async function deletarProduto(id: string) {
    await fetch(`/api/produtos/${id}`, {
      method: "DELETE",
    });
    await fetchProdutos();
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            type={typeof value === "number" ? "number" : "text"}
            placeholder={key}
            className="border p-2 rounded"
            value={value}
            onChange={(e) =>
              setForm({
                ...form,
                [key]: typeof value === "number" ? +e.target.value : e.target.value,
              })
            }
          />
        ))}

        <button
          onClick={salvarProduto}
          className="col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {editandoId ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
      </div>

      <ul className="space-y-2">
        {produtos.map((produto) => (
          <li
            key={produto.id_produto}
            className="border p-2 rounded shadow flex justify-between items-center"
          >
            <div>
              <strong>{produto.nome}</strong> — {produto.categoria} | Quantidade: {produto.quantidade}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditandoId(produto.id_produto);
                  setForm({ ...produto });
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => deletarProduto(produto.id_produto)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
