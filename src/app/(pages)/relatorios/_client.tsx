// Em: src/app/(pages)/relatorios/_client.tsx
'use client'

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Percent, Loader2 } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { startOfMonth, endOfMonth } from "date-fns";

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
  
  // Define um estado inicial de data válido
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const fetchReportData = useCallback(async (currentDate: DateRange | undefined) => {
    // Garante que o período esteja completo antes de buscar
    if (!currentDate?.from || !currentDate?.to) {
      return;
    }
    
    setIsLoading(true);
    setData(null); // Limpa os dados antigos antes de uma nova busca

    try {
      // Converte as datas para o formato ISO, que é universal e seguro para URLs
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
      // alert() ou toast() aqui
    } finally {
      setIsLoading(false);
    }
  }, []);

  // O useEffect agora depende do estado 'date' e da função de busca
  useEffect(() => {
    fetchReportData(date);
  }, [date, fetchReportData]);
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight text-accent">Relatório de Lucratividade</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker date={date} setDate={setDate} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-accent"/></div>
      ) : data ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(data.faturamentoTotal)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo Total dos Produtos</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(data.custoTotal)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lucro Bruto</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(data.lucroTotal)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
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