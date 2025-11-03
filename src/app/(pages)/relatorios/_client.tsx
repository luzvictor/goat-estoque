// Em: src/app/(pages)/relatorios/_client.tsx
'use client'

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Percent, Loader2 } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { startOfMonth, endOfMonth } from "date-fns";
import { ContextHelp } from "@/components/ui/ContextHelp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RelatorioData = {
  faturamentoTotal: number;
  custoTotal: number;
  lucroTotal: number;
  margemDeLucro: number;
};

const formatCurrency = (value: number) => {
    if (isNaN(value)) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function RelatoriosPageClient() {
  const [data, setData] = useState<RelatorioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const fetchReportData = useCallback(async (currentDate: DateRange | undefined) => {
    if (!currentDate?.from || !currentDate?.to) {
      return;
    }
    
    setIsLoading(true);
    setData(null); 

    try {
      const fromISO = currentDate.from.toISOString();
      const toISO = currentDate.to.toISOString();

      const response = await fetch(`/api/relatorios/lucratividade?from=${fromISO}&to=${toISO}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao buscar dados do relatório.");
      }

      const reportData = await response.json();
      setData(reportData);

    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportData(date);
  }, [date, fetchReportData]);
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-accent">Relatório de Lucratividade</h2>
          <ContextHelp
            title="Relatório de Lucratividade"
            content="Este relatório calcula o faturamento, custos, lucro bruto e margem de lucro com base nos pedidos 'Concluídos' dentro do período selecionado."
          />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2">
              <DateRangePicker date={date} setDate={setDate} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>Selecione o período para o relatório.</p></TooltipContent>
        </Tooltip>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-accent"/></div>
      ) : data ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                Faturamento Total
                <ContextHelp content="Soma do 'valorVenda' de todos os itens em pedidos 'Concluídos' no período." />
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(data.faturamentoTotal)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                Custo Total dos Produtos
                <ContextHelp content="Soma do 'valorCusto' de todos os itens em pedidos 'Concluídos' no período." />
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(data.custoTotal)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                Lucro Bruto
                <ContextHelp content="Cálculo: (Faturamento Total - Custo Total)." />
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(data.lucroTotal)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                Margem de Lucro
                <ContextHelp content="Cálculo: (Lucro Bruto / Faturamento Total) * 100." />
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.margemDeLucro.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>
      ) : (
          <Card className="p-8 text-center">
              <CardTitle>Não foi possível carregar os dados</CardTitle>
              <CardDescription>Tente selecionar outro período ou recarregue a página.</CardDescription>
          </Card>
      )}
    </div>
  );
}