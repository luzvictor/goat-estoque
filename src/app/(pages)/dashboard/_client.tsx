'use client'

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, AlertCircle, ShoppingCart, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Tipagens para os dados do dashboard
interface DashboardData {
  faturamentoTotal: number;
  totalVendas: number;
  produtosEstoqueBaixo: any[];
  vendasRecentes: any[];
  faturamentoMensal: { mes: string, total: number }[];
}

const formatCurrency = (value: number) => {
  if (typeof value !== 'number') return "R$ 0,00";
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// --- NOVO COMPONENTE: Tooltip Customizado para o Gráfico ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Mês
            </span>
            <span className="font-bold text-muted-foreground">
              {label}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Faturamento
            </span>
            <span className="font-bold text-accent">
              {formatCurrency(payload[0].value)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};


export function DashboardPageClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Falha ao buscar dados');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-center">Não foi possível carregar os dados do dashboard.</p>;
  }

  // Formata os dados para o gráfico
  const chartData = data.faturamentoMensal.map(item => ({
    name: new Date(item.mes + '-02').toLocaleString('pt-BR', { month: 'short' }).toUpperCase(),
    Total: Number(item.total),
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.faturamentoTotal)}</div>
            <p className="text-xs text-muted-foreground">no período selecionado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data.totalVendas}</div>
            <p className="text-xs text-muted-foreground">no período selecionado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas de Estoque Baixo</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.produtosEstoqueBaixo.length}</div>
            <p className="text-xs text-muted-foreground">produtos precisando de atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico e Listas */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral de Faturamento</CardTitle>
            <CardDescription>Faturamento mensal nos últimos 12 meses.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${formatCurrency(value as number)}`} />
                  {/* --- CORREÇÃO APLICADA AQUI --- */}
                  <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                  <Bar dataKey="Total" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Produtos com Estoque Baixo</CardTitle>
            <CardDescription>Itens que atingiram ou estão abaixo do estoque mínimo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.produtosEstoqueBaixo.length > 0 ? (
                  data.produtosEstoqueBaixo.map((item) => (
                    <TableRow key={item.id_variante}>
                      <TableCell>
                        <div className="font-medium">{item.produtoBase.nome}</div>
                        <div className="text-sm text-muted-foreground">{item.cor}, {item.tamanho || 'Único'}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono">{item.quantidade}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">Nenhum produto com estoque baixo.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* --- NOVO CARD DE VENDAS RECENTES --- */}
       <Card>
        <CardHeader>
          <CardTitle>Vendas Recentes</CardTitle>
          <CardDescription>As últimas 5 vendas pagas registradas.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
            {data.vendasRecentes.length > 0 ? (
                data.vendasRecentes.map((venda) => (
                <div key={venda.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Pedido #{venda.id.substring(0, 8)}...
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {venda.produtos.map((p: any) => `${p.quantidade}x ${p.variante.produtoBase.nome}`).join(', ')}
                    </p>
                    </div>
                    <div className="ml-auto font-medium text-right">
                        <div>+{formatCurrency(venda.produtos.reduce((acc: number, p: any) => acc + (p.quantidade * p.variante.valorVenda), 0))}</div>
                        <div className="text-xs text-muted-foreground">{new Date(venda.data).toLocaleDateString()}</div>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground text-center">Nenhuma venda recente.</p>
            )}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
