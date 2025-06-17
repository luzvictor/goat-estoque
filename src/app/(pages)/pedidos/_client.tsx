'use client'

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronsUpDown, Check, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Funções Auxiliares ---
const formatCurrency = (value: string | number): string => {
  if (typeof value === 'number') value = value.toFixed(2);
  let cleaned = String(value).replace(/\D/g, "");
  if (!cleaned) return "0,00";
  const numberValue = parseInt(cleaned, 10);
  let s = (numberValue / 100).toFixed(2).replace(".", ",");
  s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return s;
};

const parseCurrency = (value: string | number): number => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string' || value.trim() === '') return 0;
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
};

// --- Tipagens ---
type VarianteProduto = {
  id_variante: string; cor: string; tamanho: string | null; valorCusto: number;
  valorVenda: number; estoqueMin: number; quantidade: number; sku: string | null;
  imageUrl: string | null; produtoBaseId: string;
};
type ProdutoBase = {
  id_produto_base: string; nome: string; categoria: string;
  marca: string; variantes: VarianteProduto[];
};
type ProdutoDisplay = {
  id_variante: string; id_produto_base: string; nome: string; categoria: string;
  marca: string; cor: string; tamanho: string | null; quantidade: number;
  valorCusto: number; valorVenda: number; estoqueMin: number; sku: string | null;
};
type Pedido = {
  id: string; data: string; status: string;
  produtos: {
    id: string; quantidade: number;
    variante: { id_variante: string; produtoBase: { nome: string; marca: string }; cor: string; tamanho: string | null; valorVenda: number };
  }[];
  Usuario: { nome: string } | null;
};
type NewOrderItem = {
  varianteId: string; nome: string; quantidade: number; estoqueDisponivel: number; precoUnitario: number;
}

export default function PedidosPageClient() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtosBase, setProdutosBase] = useState<ProdutoBase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  
  // Estado para o formulário do novo pedido
  const [newOrderItems, setNewOrderItems] = useState<NewOrderItem[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [isComboboxOpen, setComboboxOpen] = useState(false);

  // --- LÓGICA DE DADOS ---
  const produtosDisponiveis = useMemo(() => {
    return produtosBase.flatMap(base => 
      base.variantes.map(variante => ({
        id_variante: variante.id_variante, id_produto_base: base.id_produto_base, nome: base.nome,
        categoria: base.categoria, marca: base.marca, cor: variante.cor, tamanho: variante.tamanho,
        quantidade: variante.quantidade, valorCusto: variante.valorCusto, valorVenda: variante.valorVenda,
        estoqueMin: variante.estoqueMin, sku: variante.sku,
      }))
    );
  }, [produtosBase]);

  // --- FUNÇÕES DE API ---
  async function fetchInitialData() {
    setIsLoading(true);
    try {
      const [pedidosRes, produtosRes] = await Promise.all([
        fetch('/api/pedidos'),
        fetch('/api/produtos')
      ]);
      const pedidosData = await pedidosRes.json();
      const produtosData: ProdutoBase[] = await produtosRes.json();
      
      setPedidos(pedidosData);
      setProdutosBase(produtosData);
    } catch(error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- LÓGICA DO MODAL DE NOVO PEDIDO ---
  function handleAddItemToOrder() {
    const produto = produtosDisponiveis.find(p => p.id_variante === selectedVariant);
    if (!produto || itemQuantity <= 0) {
      alert("Selecione um produto e uma quantidade válida.");
      return;
    }
    if (itemQuantity > produto.quantidade) {
      alert(`Estoque insuficiente. Disponível: ${produto.quantidade}`);
      return;
    }

    setNewOrderItems(prev => {
      const existingItem = prev.find(item => item.varianteId === selectedVariant);
      if (existingItem) {
        return prev.map(item => item.varianteId === selectedVariant ? { ...item, quantidade: item.quantidade + itemQuantity } : item);
      }
      return [...prev, {
        varianteId: produto.id_variante,
        nome: `${produto.marca} - ${produto.nome} (${produto.cor})`,
        quantidade: itemQuantity,
        estoqueDisponivel: produto.quantidade,
        precoUnitario: produto.valorVenda as number,
      }];
    });

    setSelectedVariant("");
    setItemQuantity(1);
  }

  function handleRemoveItem(variantId: string) {
    setNewOrderItems(prev => prev.filter(item => item.varianteId !== variantId));
  }

  async function handleCreateOrder() {
    if (newOrderItems.length === 0) {
      alert("Adicione pelo menos um item ao pedido.");
      return;
    }
    setIsLoading(true);
    const body = {
      produtos: newOrderItems.map(item => ({
        varianteId: item.varianteId,
        quantidade: item.quantidade,
      }))
    };
    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        alert('Pedido criado com sucesso!');
        setModalOpen(false);
        await fetchInitialData();
      } else {
        const errorData = await response.json();
        alert(`Erro ao criar pedido: ${errorData.error}`);
      }
    } catch (error) {
      alert("Ocorreu um erro de rede.");
    } finally {
      setIsLoading(false);
    }
  }

  const totalPedido = useMemo(() => {
    return newOrderItems.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0);
  }, [newOrderItems]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      const timer = setTimeout(() => {
        setNewOrderItems([]);
        setSelectedVariant("");
        setItemQuantity(1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-accent">Gerenciar Pedidos</CardTitle>
              <CardDescription>Crie novos pedidos e visualize o histórico de vendas.</CardDescription>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1">
                  <PlusCircle className="h-4 w-4" /> Novo Pedido
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader><DialogTitle>Criar Novo Pedido</DialogTitle></DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Coluna da Esquerda: Adicionar Itens */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Adicionar Item ao Pedido</h3>
                    <div><Label>Produto</Label>
                      <Popover open={isComboboxOpen} onOpenChange={setComboboxOpen}>
                        <PopoverTrigger asChild><Button variant="outline" role="combobox" className="w-full justify-between text-left h-auto">
                            {selectedVariant ? <span className="block truncate">{produtosDisponiveis.find(p => p.id_variante === selectedVariant)?.marca + ' - ' + produtosDisponiveis.find(p => p.id_variante === selectedVariant)?.nome + ` (${produtosDisponiveis.find(p => p.id_variante === selectedVariant)?.cor})`}</span> : "Selecione um produto..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button></PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0"><Command>
                          <CommandInput placeholder="Buscar produto..." />
                          <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                          <CommandList><CommandGroup>
                            {produtosDisponiveis.filter(p => p.quantidade > 0).map(p => (
                              <CommandItem 
                                key={p.id_variante} 
                                value={`${p.marca} ${p.nome} ${p.cor}`} 
                                onSelect={() => { setSelectedVariant(p.id_variante); setComboboxOpen(false); }}
                                // --- CORREÇÃO: Impede que o Dialog interfira com o clique ---
                                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              >
                                <Check className={cn("mr-2 h-4 w-4", selectedVariant === p.id_variante ? "opacity-100" : "opacity-0")} />
                                <div>
                                  <p>{p.marca} - {p.nome} ({p.cor})</p>
                                  <p className="text-xs text-muted-foreground">Estoque: {p.quantidade}</p>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup></CommandList>
                        </Command></PopoverContent>
                      </Popover>
                    </div>
                    <div><Label>Quantidade</Label><Input type="number" value={itemQuantity} onChange={e => setItemQuantity(Number(e.target.value))} min={1}/></div>
                    <Button onClick={handleAddItemToOrder} className="w-full">Adicionar Item</Button>
                  </div>
                  {/* Coluna da Direita: Itens do Pedido */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Itens no Pedido</h3>
                    <div className="border rounded-lg p-2 h-64 overflow-y-auto">
                      {newOrderItems.length === 0 ? ( <p className="text-sm text-muted-foreground text-center pt-4">Nenhum item adicionado.</p> ) : (
                        <div className="space-y-2">
                          {newOrderItems.map(item => (
                            <div key={item.varianteId} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                              <div>
                                <p className="font-medium">{item.nome}</p>
                                <p>Qtd: {item.quantidade} x R$ {item.precoUnitario.toFixed(2)}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</p>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveItem(item.varianteId)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <p>Total:</p>
                      <p>R$ {totalPedido.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
                  <Button onClick={handleCreateOrder} disabled={isLoading || newOrderItems.length === 0}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Finalizar Pedido
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Pedido ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {isLoading ? ( <TableRow><TableCell colSpan={5} className="h-24 text-center">Carregando pedidos...</TableCell></TableRow> ) : 
              pedidos.length > 0 ? (
                pedidos.map(pedido => (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-mono text-xs">{pedido.id.substring(0, 8)}...</TableCell>
                    <TableCell>{new Date(pedido.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell><Badge>{pedido.status}</Badge></TableCell>
                    <TableCell>{pedido.produtos.reduce((acc, p) => acc + p.quantidade, 0)}</TableCell>
                    <TableCell className="text-right font-medium">R$ {pedido.produtos.reduce((acc, p) => acc + (p.quantidade * p.variante.valorVenda), 0).toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : ( <TableRow><TableCell colSpan={5} className="h-24 text-center">Nenhum pedido encontrado.</TableCell></TableRow> )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
