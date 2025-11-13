'use client'

import { useState, useEffect, useCallback, ElementType } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, DollarSign, ShoppingCart, AlertTriangle, Clock, PackageCheck, Loader2 } from "lucide-react";
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { ContextHelp } from "@/components/ui/ContextHelp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type KpiData = {
  faturamento: { valor: number; variacao: number };
  totalPedidos: { valor: number };
  ticketMedio: { valor: number };
};
type AlertData = {
  estoqueBaixo: {
    id_variante: string;
    cor: { id: string; nome: string } | null;
    tamanho: { id: string; nome: string } | null;
    quantidade: number;
    produtoBase: { nome: string; marca: { id: string; nome: string } | null };
  }[];
  pedidosPendentes: { id: string; data: string; Cliente: { nome: string } | null }[];
};

type SalesData = { name: string; Vendas: number };
type CategoryData = { name: string; value: number };

type RawCategory = { name: string | { nome: string }; value: number };


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];
const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


interface KpiCardProps {
  title: string;
  value: number;
  change?: number;
  icon: ElementType;
  format?: (v: number) => string;
}

function KpiCard({ title, value, change, icon: Icon, format = (v) => v.toString() }: KpiCardProps) {
  const isPositive = change !== undefined && change >= 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="text-sm font-medium cursor-help">
              {title}
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent>
            {title === "Faturamento Total" && <p>Valor total de vendas (faturamento bruto) no período selecionado.</p>}
            {title === "Total de Pedidos" && <p>Número total de pedidos realizados no período.</p>}
            {title === "Ticket Médio" && <p>Valor médio por pedido (Faturamento / Total de Pedidos).</p>}
          </TooltipContent>
        </Tooltip>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{format(value)}</div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground flex items-center">
            <span className={`flex items-center mr-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {change.toFixed(1)}%
            </span>
            em relação ao periodo anterior
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardClient() {
  const [kpis, setKpis] = useState<KpiData | null>(null);
  const [alerts, setAlerts] = useState<AlertData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const fetchDashboardData = useCallback(async (currentDate: DateRange | undefined) => {
    if (!currentDate?.from || !currentDate?.to) {
      return;
    }
    
    setIsLoading(true);
    try {
      const fromDate = startOfDay(currentDate.from);
      
      const toDate = endOfDay(currentDate.to || currentDate.from);

      const fromISO = fromDate.toISOString();
      const toISO = toDate.toISOString();

      const [kpisRes, alertsRes, salesRes, categoryRes] = await Promise.all([
        fetch(`/api/dashboard/kpis?from=${fromISO}&to=${toISO}`),
        fetch(`/api/dashboard/alerts?from=${fromISO}&to=${toISO}`),
        fetch(`/api/dashboard/sales-over-time?from=${fromISO}&to=${toISO}`),
        fetch(`/api/dashboard/sales-by-category?from=${fromISO}&to=${toISO}`),
      ]);

      if (!kpisRes.ok || !alertsRes.ok || !salesRes.ok || !categoryRes.ok) {
        throw new Error("Falha ao buscar dados do dashboard");
      }

      const kpisData = await kpisRes.json();
      const alertsData = await alertsRes.json();
      const salesData = await salesRes.json();
      const categoryData = await categoryRes.json();
      
      setKpis(kpisData);
      setAlerts(alertsData);
      setSalesData(salesData);
      setCategoryData(categoryData);

    } catch (error) {
      console.error("Erro no dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const [chartColors, setChartColors] = useState({
    primary: '#000000', // Cor de fallback
    mutedForeground: '#000000',
    border: '#000000',
  });

  const mappedCategoryData: CategoryData[] = categoryData.map((c: RawCategory) => ({
  name: typeof c.name === 'object' ? c.name.nome : c.name,
  value: c.value
}));

  useEffect(() => {
    const style = getComputedStyle(document.body);
    setChartColors({
      primary: style.getPropertyValue('--primary').trim(),
      mutedForeground: style.getPropertyValue('--muted-foreground').trim(),
      border: style.getPropertyValue('--border').trim(),
    });
  }, []);

  useEffect(() => {
    fetchDashboardData(date);
  }, [date, fetchDashboardData]);

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => { /* ... */ return 'outline' };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen"><Loader2 className="h-8 w-8 animate-spin text-accent"/></div>;
  }
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        // Usamos as classes do shadcn diretamente. 
        // Note o 'bg-popover' e 'text-popover-foreground'
        <div className="rounded-lg border bg-popover p-2 text-sm shadow-sm text-popover-foreground">
          
          {/* O "label" é o item do XAxis (ex: a data ou nome da categoria) */}
          <p className="font-bold">{label}</p>
          
          {/* O "payload" são os dados (ex: 'Vendas' e o valor) */}
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color || entry.fill }}>
              {/* entry.name = "Vendas", entry.value = 5000 */}
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-accent flex items-center gap-2">
          Dashboard
          <ContextHelp
            title="Dashboard Principal"
            content="Este painel mostra uma visão geral do seu negócio no período selecionado. Todos os dados aqui são atualizados com base no filtro de data."
          />
        </h2>
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div> 
                <DateRangePicker date={date} setDate={setDate} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filtrar dados por período</p>
            </TooltipContent>
          </Tooltip>
          </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Faturamento Total" value={kpis?.faturamento.valor || 0} change={kpis?.faturamento.variacao} icon={DollarSign} format={formatCurrency} />
        <KpiCard title="Total de Pedidos" value={kpis?.totalPedidos.valor || 0} icon={ShoppingCart} />
        <KpiCard title="Ticket Médio" value={kpis?.ticketMedio.valor || 0} icon={PackageCheck} format={formatCurrency} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* CARD 1: Gráfico de Barras (Evolução) - Ocupa 4 de 7 colunas em telas grandes */}
        <Card className="col-span-full lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Evolução de Vendas
                <ContextHelp
                  title="Evolução de Vendas"
                  content="Mostra o faturamento total por período (dia/mês) dentro do intervalo selecionado."
                />
              </CardTitle>
              <CardDescription>Faturamento ao longo do tempo.</CardDescription>
            </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  content={<CustomTooltip />} 
                />
                <Bar dataKey="Vendas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CARD 2: Gráfico de Pizza (Categorias) - Ocupa 3 de 7 colunas em telas grandes */}
        <Card className="col-span-full lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Por Categoria
                <ContextHelp
                  title="Faturamento por Categoria"
                  content="Mostra a participação de cada categoria no faturamento total do período."
                />
              </CardTitle>
              <CardDescription>Distribuição do faturamento.</CardDescription>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={mappedCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={(entry) => entry.name} 
                    >
                        {mappedCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500"/>
              Alerta de Estoque Baixo
              <ContextHelp content="Lista de produtos cujo estoque atual está abaixo ou igual ao estoque mínimo definido no cadastro." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Estoque Atual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts?.estoqueBaixo.map(item => (
                  <TableRow key={item.id_variante}>
                    <TableCell>
                      <div className="font-medium">{item.produtoBase.marca?.nome} - {item.produtoBase.nome}</div>
                      <div className="text-sm text-muted-foreground">{item.cor?.nome}, {item.tamanho?.nome || 'Único'}</div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-destructive">{item.quantidade}</TableCell>
                  </TableRow>
                ))}
                 {alerts && alerts.estoqueBaixo.length === 0 && <TableRow><TableCell colSpan={2} className="text-center h-24">Nenhum alerta de estoque.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500"/>
              Últimos Pedidos Pendentes
              <ContextHelp content="Exibe os pedidos mais recentes que ainda não foram enviados ou concluídos." />
            </CardTitle>
          </CardHeader>
          <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {alerts?.pedidosPendentes.map(pedido => (
                        <TableRow key={pedido.id}>
                            <TableCell className="font-medium">{pedido.Cliente?.nome || 'Não Identificado'}</TableCell>
                            <TableCell>{new Date(pedido.data).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell className="text-right"><Badge variant={getStatusVariant('Pendente')}>Pendente</Badge></TableCell>
                        </TableRow>
                    ))}
                    {alerts && alerts.pedidosPendentes.length === 0 && <TableRow><TableCell colSpan={3} className="text-center h-24">Nenhum pedido pendente.</TableCell></TableRow>}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}