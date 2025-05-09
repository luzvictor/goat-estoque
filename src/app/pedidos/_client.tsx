'use client'

import Header from "@/components/Header";
import { useEffect, useState } from "react";

type Produto = {
  id_produto: string;
  nome: string;
};

type Pedido = {
  id_pedido: string;
  data: string;
  status: string;
  produtos: {
    id: string;
    quantidade: number;
    produto: Produto;
  }[];
};

export default function PedidosPageClient() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [itens, setItens] = useState<{ produtoId: string; quantidade: number }[]>([
    { produtoId: "", quantidade: 1 },
  ]);

  async function fetchProdutos() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
    if (data.length > 0 && itens[0].produtoId === "") {
      setItens([{ produtoId: data[0].id_produto, quantidade: 1 }]);
    }
  }

  async function fetchPedidos() {
    const res = await fetch("/api/pedidos");
    const data = await res.json();
    setPedidos(data);
  }

  async function registrarPedido() {
    const produtosValidos = itens.filter(i => i.produtoId && i.quantidade > 0);
    if (produtosValidos.length === 0) return;

    await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtos: produtosValidos }),
    });

    setItens([{ produtoId: produtos[0]?.id_produto || "", quantidade: 1 }]);
    await fetchPedidos();
  }

  async function removerPedido(id: string) {
    if (!confirm("Tem certeza que deseja remover este pedido?")) return;

    await fetch(`/api/pedidos/${id}`, {
      method: "DELETE",
    });
    await fetchPedidos();
  }

  async function atualizarStatus(id: string, status: string) {
    await fetch(`/api/pedidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchPedidos();
  }

  useEffect(() => {
    fetchProdutos();
    fetchPedidos();
  }, []);

  return (
    <>
    <Header />
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

      <div className="space-y-2 mb-4">
        {itens.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <select
              value={item.produtoId}
              onChange={(e) => {
                const novo = [...itens];
                novo[index].produtoId = e.target.value;
                setItens(novo);
              }}
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
              value={item.quantidade}
              onChange={(e) => {
                const novo = [...itens];
                novo[index].quantidade = Number(e.target.value);
                setItens(novo);
              }}
              className="border p-2 rounded"
            />
            <button
              onClick={() => {
                const novo = itens.filter((_, i) => i !== index);
                setItens(novo);
              }}
              className="bg-red-500 text-white rounded px-2 hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        ))}

        <button
          onClick={() => setItens([...itens, { produtoId: produtos[0]?.id_produto || "", quantidade: 1 }])}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar Produto
        </button>

        <button
          onClick={registrarPedido}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Registrar Pedido
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Pedidos Registrados</h2>
      <ul className="space-y-2">
        {pedidos.map((pedido) => (
          <li key={pedido.id_pedido} className="border p-3 rounded shadow">
            <div className="font-bold">
              Pedido #{pedido.id_pedido.slice(0, 6)} • {new Date(pedido.data).toLocaleString()}
            </div>

            <div className="flex items-center gap-2 my-1">
              <span>Status:</span>
              <select
                value={pedido.status}
                onChange={(e) => atualizarStatus(pedido.id_pedido, e.target.value)}
                className="border rounded p-1"
              >
                <option value="Pendente">Pendente</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <ul className="ml-4 list-disc">
              {pedido.produtos.map((pp) => (
                <li key={pp.id}>
                  {pp.produto.nome} — {pp.quantidade} unidade(s)
                </li>
              ))}
            </ul>

            <button
              onClick={() => removerPedido(pedido.id_pedido)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remover Pedido
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
