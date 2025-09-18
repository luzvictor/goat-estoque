'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttributeManager } from "./_components/AttributeManager";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";

// Tipagem genérica para os itens
type AttributeItem = {
  id: string;
  nome: string;
};

export default function ConfiguracoesPage() {
  const [marcas, setMarcas] = useState<AttributeItem[]>([]);
  const [categorias, setCategorias] = useState<AttributeItem[]>([]);
  const [cores, setCores] = useState<AttributeItem[]>([]);
  const [tamanhos, setTamanhos] = useState<AttributeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função genérica para buscar dados de qualquer endpoint
  const fetchData = async (
    endpoint: string,
    setter: React.Dispatch<React.SetStateAction<AttributeItem[]>>
  ) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Falha ao buscar dados de ${endpoint}`);
      const data = await response.json();
      setter(data);
    } catch (error: any) {
      console.error("Erro ao carregar dados de", endpoint, error.message);
      // Não dispara toast aqui para evitar duplicidade
    }
  };

  // Função para recarregar todos os dados
  const fetchAllData = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchData("/api/marcas", setMarcas),
      fetchData("/api/categorias", setCategorias),
      fetchData("/api/cores", setCores),
      fetchData("/api/tamanhos", setTamanhos),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      {/* Apenas um Toaster global na página */}
      <Toaster richColors />
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-accent">
              Configurações do Sistema
            </CardTitle>
            <CardDescription>
              Gerencie os atributos e opções disponíveis para seus produtos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="marcas" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="marcas">Marcas</TabsTrigger>
                <TabsTrigger value="categorias">Categorias</TabsTrigger>
                <TabsTrigger value="cores">Cores</TabsTrigger>
                <TabsTrigger value="tamanhos">Tamanhos</TabsTrigger>
              </TabsList>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              ) : (
                <>
                  <TabsContent value="marcas">
                    <AttributeManager
                      title="Marcas"
                      itemLabel="Marca"
                      items={marcas}
                      apiEndpoint="/api/marcas"
                      onUpdate={fetchAllData}
                    />
                  </TabsContent>
                  <TabsContent value="categorias">
                    <AttributeManager
                      title="Categorias"
                      itemLabel="Categoria"
                      items={categorias}
                      apiEndpoint="/api/categorias"
                      onUpdate={fetchAllData}
                    />
                  </TabsContent>
                  <TabsContent value="cores">
                    <AttributeManager
                      title="Cores"
                      itemLabel="Cor"
                      items={cores}
                      apiEndpoint="/api/cores"
                      onUpdate={fetchAllData}
                    />
                  </TabsContent>
                  <TabsContent value="tamanhos">
                    <AttributeManager
                      title="Tamanhos"
                      itemLabel="Tamanho"
                      items={tamanhos}
                      apiEndpoint="/api/tamanhos"
                      onUpdate={fetchAllData}
                    />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
