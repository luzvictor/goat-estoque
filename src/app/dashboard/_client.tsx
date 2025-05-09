'use client'

import { useEffect, useState } from "react";
import Header from "@/components/Header";

type DashboardData = {
  totalProdutos: number;
  entradasHoje: number;
  pedidosHoje: number;
  produtosCriticos: number;
  totalEstoque: number;
};

export default function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-6">Carregando dashboard...</div>;

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Total de Produtos" value={data.totalProdutos} />
          <Card title="Entradas Hoje" value={data.entradasHoje} />
          <Card title="Pedidos Hoje" value={data.pedidosHoje} />
          <Card title="Produtos com Estoque Crítico" value={data.produtosCriticos} />
          <Card title="Total em Estoque" value={data.totalEstoque} />
        </div>
      </div>
    </>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow rounded p-4 border">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
