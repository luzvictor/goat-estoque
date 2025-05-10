'use client'

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

export default function ProdutosPageClient() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState<Omit<Produto, "id_produto">>({
    nome: "", categoria: "", marca: "", cor: "",
    quantidade: 0, valorCusto: 0, valorVenda: 0, estoqueMin: 0,
  });

  async function fetchProdutos() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  }

  async function criarProduto() {
    await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    await fetchProdutos();
    setForm({ nome: "", categoria: "", marca: "", cor: "", quantidade: 0, valorCusto: 0, valorVenda: 0, estoqueMin: 0 });
  }

  async function deletarProduto(id: string) {
    const confirmacao = confirm("Tem certeza que deseja remover este produto?");
    if (!confirmacao) return;

    await fetch(`/api/produtos/${id}`, {
      method: "DELETE",
    });
    await fetchProdutos();
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 max-w-1xl mx-auto text-white bg-[#111] min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-[#CFFF04]">Gerenciar Produtos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <Label htmlFor={key} className="capitalize text-gray-300 mb-1">{key}</Label>
              <Input
                id={key}
                type={typeof value === "number" ? "number" : "text"}
                value={value}
                placeholder={key}
                className="bg-[#1c1c1c] border border-gray-600 text-white placeholder-gray-400"
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]: typeof value === "number" ? +e.target.value : e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>

        <Button
          onClick={criarProduto}
          className="w-full bg-[#CFFF04] text-black hover:bg-lime-300 font-semibold transition"
        >
          Adicionar Produto
        </Button>

        <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-200">Lista de Produtos</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {produtos.map((produto) => (
            <div
              key={produto.id_produto}
              className="bg-[#1c1c1c] rounded-xl shadow-lg p-4 border border-gray-700 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-[#CFFF04]">{produto.nome}</h3>
                <p className="text-sm text-gray-400 mb-1">Categoria: {produto.categoria}</p>
                <p className="text-sm text-gray-400 mb-1">Marca: {produto.marca}</p>
                <p className="text-sm text-gray-400 mb-1">Cor: {produto.cor}</p>
                <p className="text-sm text-gray-300">Estoque: {produto.quantidade}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => deletarProduto(produto.id_produto)}
                className="mt-4"
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
