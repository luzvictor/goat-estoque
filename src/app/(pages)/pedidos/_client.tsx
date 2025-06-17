'use client'

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, Trash2, MoreHorizontal, ChevronsUpDown, Check, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PedidoDetalhesModal } from "@/components/modals/PedidoDetalhesModal";
import { cn } from "@/lib/utils";

// --- CORREÇÃO: Importando as tipagens centralizadas ---
import { Cliente, Pedido, ProdutoBase, VarianteProduto, NewOrderItem } from "@/types";

const STATUS_OPTIONS = ["Pendente", "Enviado", "Concluído", "Cancelado"];

const MESES = [
  { nome: 'Janeiro', valor: 1 }, { nome: 'Fevereiro', valor: 2 }, { nome: 'Março', valor: 3 },
  { nome: 'Abril', valor: 4 }, { nome: 'Maio', valor: 5 }, { nome: 'Junho', valor: 6 },
  { nome: 'Julho', valor: 7 }, { nome: 'Agosto', valor: 8 }, { nome: 'Setembro', valor: 9 },
  { nome: 'Outubro', valor: 10 }, { nome: 'Novembro', valor: 11 }, { nome: 'Dezembro', valor: 12 },
];
const ANOS = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];

export default function PedidosPageClient() {
  // --- Estados do Componente ---
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtosBase, setProdutosBase] = useState<ProdutoBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  
  // Estados para o formulário de novo pedido
  const [newOrderItems, setNewOrderItems] = useState<NewOrderItem[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  
  // Estados para modais de confirmação e detalhes
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Pedido | null>(null);

  // --- Estados para gestão de clientes ---
  const [clienteSearch, setClienteSearch] = useState("");
  const [clienteResults, setClienteResults] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isClienteComboboxOpen, setIsClienteComboboxOpen] = useState(false);
  const [isNewClienteModalOpen, setIsNewClienteModalOpen] = useState(false);
  const [newClienteForm, setNewClienteForm] = useState({ nome: "", cpf: "", endereco: "", telefone: "" });

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [productSearch, setProductSearch] = useState("");

  const produtosDisponiveis = useMemo(() => {
    return produtosBase.flatMap(base =>
      base.variantes.map(variante => ({
        ...variante,
        id_produto_base: base.id_produto_base,
        nome: base.nome,
        categoria: base.categoria,
        marca: base.marca,
      }))
    );
  }, [produtosBase]);

  const filteredProducts = useMemo(() => {
    if (productSearch.length < 2) return [];
    const searchLower = productSearch.toLowerCase();
    return produtosDisponiveis.filter(p =>
      p.nome.toLowerCase().includes(searchLower) ||
      p.marca.toLowerCase().includes(searchLower) ||
      p.sku?.toLowerCase().includes(searchLower)
    );
  }, [productSearch, produtosDisponiveis]);


  // --- Funções de API ---

  // Busca de clientes com debounce
  useEffect(() => {
    const fetchClientes = async () => {
      if (clienteSearch.length < 2) {
        setClienteResults([]);
        return;
      }
      const response = await fetch(`/api/clientes?search=${clienteSearch}`);
      if (response.ok) {
        const data: Cliente[] = await response.json();
        setClienteResults(data);
      }
    };

    const timerId = setTimeout(fetchClientes, 300);
    return () => clearTimeout(timerId);
  }, [clienteSearch]);

  const fetchInitialData = useCallback(async (mes: number, ano: number) => {
    setIsLoading(true);
    try {
      // Adiciona os parâmetros na URL da API de pedidos
      const [pedidosRes, produtosRes] = await Promise.all([
        fetch(`/api/pedidos?mes=${mes}&ano=${ano}`),
        fetch('/api/produtos')
      ]);
      if (!pedidosRes.ok || !produtosRes.ok) throw new Error("Falha ao buscar dados");
      
      const pedidosData = await pedidosRes.json();
      const produtosData = await produtosRes.json();
      
      setPedidos(pedidosData);
      setProdutosBase(produtosData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setPedidos([]); // Limpa os pedidos em caso de erro para não mostrar dados antigos
    } finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    fetchInitialData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, fetchInitialData]);
  
  async function handleUpdateStatus(pedidoId: string, newStatus: string) {
    const originalPedidos = [...pedidos];
    const pedido = originalPedidos.find(p => p.id === pedidoId);
    if (!pedido || pedido.status === newStatus) return;

    const optimisticPedidos = pedidos.map(p => p.id === pedidoId ? { ...p, status: newStatus } : p);
    setPedidos(optimisticPedidos);

    if (viewingOrder?.id === pedidoId) {
      setViewingOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }

    try {
      const response = await fetch(`/api/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao atualizar o status');
      }
    } catch (error: any) {
      alert(`Não foi possível atualizar o status: ${error.message}. Revertendo.`);
      setPedidos(originalPedidos);
      if (viewingOrder?.id === pedidoId) {
        setViewingOrder(originalPedidos.find(p => p.id === pedidoId) || null);
      }
    }
  }
  
  async function handleDeleteOrder() {
    if (!orderToDelete) return;
    const originalPedidos = [...pedidos];
    setPedidos(current => current.filter(p => p.id !== orderToDelete));
    
    try {
      const response = await fetch(`/api/pedidos/${orderToDelete}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao remover pedido');
      }
      alert("Pedido removido com sucesso!");
    } catch (error: any) {
      alert(`Não foi possível remover o pedido: ${error.message}.`);
      setPedidos(originalPedidos);
    } finally {
      setOrderToDelete(null);
      setIsAlertOpen(false);
    }
  }
  
  // --- Funções do Formulário de Novo Pedido ---

  const resetCreateOrderModal = () => {
    setNewOrderItems([]);
    setSelectedVariant("");
    setItemQuantity(1);
    setSelectedCliente(null);
    setClienteSearch("");
    setClienteResults([]);
    setNewClienteForm({ nome: "", cpf: "", endereco: "", telefone: "" });
  };

  useEffect(() => {
    if (!isCreateModalOpen) {
      const timer = setTimeout(resetCreateOrderModal, 150);
      return () => clearTimeout(timer);
    }
  }, [isCreateModalOpen]);


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
        nome: `${produto.marca} - ${produto.nome} (${produto.cor}, ${produto.tamanho || "Único"})`,
        quantidade: itemQuantity,
        estoqueDisponivel: produto.quantidade,
        precoUnitario: produto.valorVenda,
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
    alert("Adicione pelo menos um item.");
    return;
  }
  setIsSubmitting(true);
  const body = {
    clienteId: selectedCliente ? selectedCliente.id_cliente : null,
    produtos: newOrderItems.map(item => ({ varianteId: item.varianteId, quantidade: item.quantidade }))
  };
  try {
    const response = await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      alert('Pedido criado com sucesso!');
      setCreateModalOpen(false);
      // --- CORREÇÃO AQUI ---
      // Passando os filtros atuais ao recarregar a lista de pedidos.
      await fetchInitialData(selectedMonth, selectedYear);
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar pedido: ${errorData.error}`);
    }
  } catch (error) {
    alert("Ocorreu um erro de rede.");
  } finally {
    setIsSubmitting(false);
  }
}
  
  async function handleCreateNewCliente() {
    if (!newClienteForm.nome) { alert("O nome é obrigatório."); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/clientes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newClienteForm) });
      const newCliente: Cliente = await response.json();
      if (response.ok) {
        alert("Cliente cadastrado com sucesso!");
        setSelectedCliente(newCliente);
        setIsNewClienteModalOpen(false);
        setClienteSearch(newCliente.nome);
        setClienteResults([]);
      } else {
        throw new Error(newCliente.error || "Falha ao criar cliente");
      }
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- Funções Auxiliares de Renderização ---

  const totalPedido = useMemo(() => newOrderItems.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0), [newOrderItems]);
  
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Concluído': return 'default';
      case 'Enviado': return 'secondary';
      case 'Cancelado': return 'destructive';
      case 'Pendente':
      default: return 'outline';
    }
  };
  
  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const selectedProductName = useMemo(() => {
    if (!selectedVariant) return "";
    const produto = produtosDisponiveis.find(p => p.id_variante === selectedVariant);
    return produto ? `${produto.marca} - ${produto.nome} (${produto.cor}, ${produto.tamanho || 'Único'})` : "";
  }, [selectedVariant, produtosDisponiveis]);

  // --- Renderização do Componente ---
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-accent">Gerenciar Pedidos</CardTitle>
              <CardDescription>Crie novos pedidos e visualize o histórico de vendas.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-2">
              <Select value={String(selectedMonth)} onValueChange={(value) => setSelectedMonth(Number(value))}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Selecione o Mês" />
                  </SelectTrigger>
                  <SelectContent>
                      {MESES.map(mes => (
                          <SelectItem key={mes.valor} value={String(mes.valor)}>{mes.nome}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
              <Select value={String(selectedYear)} onValueChange={(value) => setSelectedYear(Number(value))}>
                  <SelectTrigger className="w-full sm:w-[120px]">
                      <SelectValue placeholder="Selecione o Ano" />
                  </SelectTrigger>
                  <SelectContent>
                      {ANOS.map(ano => (
                          <SelectItem key={ano} value={String(ano)}>{ano}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            
            <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1"><PlusCircle className="h-4 w-4" /> Novo Pedido</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader><DialogTitle>Criar Novo Pedido</DialogTitle></DialogHeader>
                
                <div className="pt-4 space-y-2">
                  <Label>Cliente (Opcional)</Label>
                  {selectedCliente ? (
                    <div className="flex items-center justify-between p-3 border rounded-md bg-muted">
                      <p className="font-medium">{selectedCliente.nome} {selectedCliente.cpf ? `- ${selectedCliente.cpf}` : ''}</p>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedCliente(null)}>Trocar</Button>
                    </div>
                  ) : (
                    <div className="relative">
                      <Input
                        placeholder="Buscar por nome ou CPF..."
                        value={clienteSearch}
                        onChange={(e) => setClienteSearch(e.target.value)}
                      />
                      {clienteSearch.length >= 2 && (
                        <div className="absolute w-full mt-1 bg-background border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                          {clienteResults.length > 0 ? (
                            clienteResults.map((cliente) => (
                              <div
                                key={cliente.id_cliente}
                                className="p-2 hover:bg-muted cursor-pointer"
                                onClick={() => {
                                  setSelectedCliente(cliente);
                                  setClienteSearch(cliente.nome);
                                  setClienteResults([]);
                                }}
                              >
                                <p>{cliente.nome}</p>
                                {cliente.cpf && <p className="text-xs text-muted-foreground">{cliente.cpf}</p>}
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-center text-sm text-muted-foreground">
                              Nenhum cliente encontrado.
                            </div>
                          )}
                          <div
                            className="p-2 flex items-center gap-2 justify-center text-sm text-accent-foreground/80 hover:bg-muted cursor-pointer font-medium"
                            onClick={() => {
                                setNewClienteForm({ nome: clienteSearch, cpf: "", endereco: "", telefone: "" });
                                setIsNewClienteModalOpen(true);
                            }}
                          >
                            <UserPlus className="h-4 w-4"/> Cadastrar novo cliente: "{clienteSearch}"
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Adicionar Item ao Pedido</h3>
                    <div className="space-y-2">
                        <Label>Produto</Label>
                        {selectedVariant ? (
                            <div className="flex items-center justify-between p-3 border rounded-md bg-muted">
                                <p className="font-medium text-sm">{selectedProductName}</p>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedVariant("")}>Trocar</Button>
                            </div>
                        ) : (
                            <div className="relative">
                                <Input
                                    placeholder="Buscar produto por nome, marca ou SKU..."
                                    value={productSearch}
                                    onChange={(e) => setProductSearch(e.target.value)}
                                />
                                {productSearch.length >= 2 && (
                                    <div className="absolute w-full mt-1 bg-background border rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((produto) => (
                                                <div
                                                    key={produto.id_variante}
                                                    className="p-2 hover:bg-muted cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedVariant(produto.id_variante);
                                                        setProductSearch(""); // Limpa a busca
                                                    }}
                                                >
                                                    <p className="text-sm font-medium">{produto.marca} - {produto.nome}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {produto.cor}, {produto.tamanho || 'Único'} - Estoque: {produto.quantidade}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 text-center text-sm text-muted-foreground">
                                                Nenhum produto encontrado.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div><Label>Quantidade</Label><Input type="number" value={itemQuantity} onChange={e => setItemQuantity(Number(e.target.value))} min={1}/></div>
                    <Button onClick={handleAddItemToOrder} className="w-full">Adicionar Item</Button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Itens no Pedido</h3>
                    <div className="border rounded-lg p-2 h-64 overflow-y-auto">
                      {newOrderItems.length === 0 ? ( <p className="text-sm text-muted-foreground text-center pt-4">Nenhum item.</p> ) : (
                        <div className="space-y-2">
                          {newOrderItems.map(item => (
                            <div key={item.varianteId} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                              <div>
                                <p className="font-medium">{item.nome}</p>
                                <p>Qtd: {item.quantidade} x {formatCurrency(item.precoUnitario)}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">{formatCurrency(item.quantidade * item.precoUnitario)}</p>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveItem(item.varianteId)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <p>Total:</p>
                      <p>{formatCurrency(totalPedido)}</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateModalOpen(false)}>Cancelar</Button>
                  <Button onClick={handleCreateOrder} disabled={isSubmitting || newOrderItems.length === 0}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Finalizar Pedido
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead className="text-right">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
                {isLoading ? (<TableRow><TableCell colSpan={7} className="text-center h-24">Carregando...</TableCell></TableRow>) :
                pedidos.length > 0 ? (
                  pedidos.map(pedido => (
                    <TableRow key={pedido.id}>
                        <TableCell className="font-mono text-xs">{pedido.id.substring(0,8)}...</TableCell>
                        <TableCell>{new Date(pedido.data).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{pedido.Cliente?.nome || 'Não identificado'}</TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Badge variant={getStatusVariant(pedido.status)} className="cursor-pointer hover:opacity-80">
                                {pedido.status}
                              </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2" align="start">
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium p-2">Alterar status para:</p>
                                {STATUS_OPTIONS.map(statusOption => (
                                  <Button key={statusOption} variant={pedido.status === statusOption ? "default" : "ghost"} size="sm" className="w-full justify-start"
                                    onClick={() => handleUpdateStatus(pedido.id, statusOption)}
                                    disabled={pedido.status === statusOption}>
                                    {statusOption}
                                  </Button>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell>{pedido.produtos.reduce((acc, p) => acc + p.quantidade, 0)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(pedido.produtos.reduce((acc, item) => acc + item.variante.valorVenda * item.quantidade, 0))}</TableCell>
                        <TableCell className="text-right">
                           <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu de ações</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2" align="end">
                               <div className="flex flex-col gap-1">
                                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setViewingOrder(pedido)}>
                                    Visualizar / Editar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                                    onClick={() => { setOrderToDelete(pedido.id); setIsAlertOpen(true); }}>
                                    Remover Pedido
                                  </Button>
                               </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={7} className="h-24 text-center">Nenhum pedido encontrado.</TableCell></TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isNewClienteModalOpen} onOpenChange={setIsNewClienteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
            <DialogDescription>Preencha os dados para criar um novo cliente.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-cliente-name" className="text-right">Nome*</Label>
              <Input id="new-cliente-name" value={newClienteForm.nome} onChange={(e) => setNewClienteForm({...newClienteForm, nome: e.target.value})} className="col-span-3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-cliente-cpf" className="text-right">CPF</Label>
              <Input id="new-cliente-cpf" value={newClienteForm.cpf} onChange={(e) => setNewClienteForm({...newClienteForm, cpf: e.target.value})} className="col-span-3"/>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-cliente-telefone" className="text-right">Telefone</Label>
              <Input id="new-cliente-telefone" value={newClienteForm.telefone} onChange={(e) => setNewClienteForm({...newClienteForm, telefone: e.target.value})} className="col-span-3"/>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-cliente-endereco" className="text-right">Endereço</Label>
              <Input id="new-cliente-endereco" value={newClienteForm.endereco} onChange={(e) => setNewClienteForm({...newClienteForm, endereco: e.target.value})} className="col-span-3"/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewClienteModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateNewCliente} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Salvar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
         <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O pedido será permanentemente removido
              e o estoque dos produtos será revertido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOrderToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOrder}>Confirmar Remoção</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PedidoDetalhesModal
        pedido={viewingOrder}
        onClose={() => setViewingOrder(null)}
        onStatusChange={(newStatus: string) => {
          if (viewingOrder) {
            handleUpdateStatus(viewingOrder.id, newStatus);
          }
        }}
      />
    </div>
  );
}