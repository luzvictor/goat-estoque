'use client'

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, Trash2, MoreHorizontal, UserPlus, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PedidoDetalhesModal } from "@/components/modals/PedidoDetalhesModal";
import { cn } from "@/lib/utils";
import { ContextHelp } from "@/components/ui/ContextHelp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Cliente, Pedido, ProdutoBase, VarianteProduto, NewOrderItem } from "@/types";
import { toast } from "sonner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const STATUS_OPTIONS = ["Pendente", "Enviado", "Concluído", "Cancelado"];

const MESES = [
  { nome: 'Janeiro', valor: 1 }, { nome: 'Fevereiro', valor: 2 }, { nome: 'Março', valor: 3 },
  { nome: 'Abril', valor: 4 }, { nome: 'Maio', valor: 5 }, { nome: 'Junho', valor: 6 },
  { nome: 'Julho', valor: 7 }, { nome: 'Agosto', valor: 8 }, { nome: 'Setembro', valor: 9 },
  { nome: 'Outubro', valor: 10 }, { nome: 'Novembro', valor: 11 }, { nome: 'Dezembro', valor: 12 },
];
const ANOS = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];

const normalizeText = (text: any): string => {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .trim();
};

const SortableTableHead = ({ children, sortKey, currentSort, onSort }: {
  children: React.ReactNode;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
}) => {
  const isSorted = currentSort?.key === sortKey;
  const Icon = isSorted ? (currentSort.direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className="hover:bg-transparent p-0 flex items-center gap-1 font-semibold"
      >
        {children}
        <Icon className="h-4 w-4" />
      </Button>
    </TableHead>
  );
};

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function PedidosPageClient() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtosBase, setProdutosBase] = useState<ProdutoBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [newOrderItems, setNewOrderItems] = useState<NewOrderItem[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Pedido | null>(null);
  const [viewingOrderId, setViewingOrderId] = useState<string | null>(null);

  const [clienteSearch, setClienteSearch] = useState("");
  const [clienteResults, setClienteResults] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isClienteComboboxOpen, setIsClienteComboboxOpen] = useState(false);
  const [isNewClienteModalOpen, setIsNewClienteModalOpen] = useState(false);
  const [newClienteForm, setNewClienteForm] = useState({ nome: "", cpf: "", endereco: "", telefone: "" });
  
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [orderDate, setOrderDate] = useState<string>(getTodayString());

  const [productSearch, setProductSearch] = useState("");

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const [productResults, setProductResults] = useState<any[]>([]);

  const [descontoValor, setDescontoValor] = useState<string>("");
  const [descontoPorcento, setDescontoPorcento] = useState<string>("");

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key && current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const produtosDisponiveis = useMemo(() => {
    return produtosBase.flatMap(base =>
      base.variantes.map(variante => ({
        ...variante,
        id_produto_base: base.id_produto_base,
        nome: base.nome,
        categoria: base.categoria,
        marca: base.marca,
        sku: variante.sku ?? "",
      }))
    );
  }, [produtosBase]);


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

  useEffect(() => {
    const fetchProdutos = async () => {
      if (productSearch.length < 2) {
        setProductResults([]);
        return;
      }
      setIsLoading(true);
      try {

        const response = await fetch(`/api/produtos?search=${productSearch}&limit=20`); 
        if (response.ok) {
          const dataWrapper = await response.json();

          const produtosRaw = dataWrapper.data || dataWrapper; 

          const flattenedResults = produtosRaw.flatMap((base: ProdutoBase) =>
            base.variantes.map((variante) => ({
              ...variante,
              id_produto_base: base.id_produto_base,
              nome: base.nome,
              categoria: base.categoria,
              marca: base.marca,
              sku: variante.sku ?? "",
            }))
          );
          setProductResults(flattenedResults);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Erro na busca de produtos");
      } finally {
        setIsLoading(false);
      }
    };

    const timerId = setTimeout(fetchProdutos, 300);
    return () => clearTimeout(timerId);
  }, [productSearch]);

  const fetchInitialData = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '15',
        mes: String(selectedMonth),
        ano: String(selectedYear),
      });

      if (selectedStatus && selectedStatus !== "Todos") {
        const normalizedStatus = selectedStatus === "Concluído" ? "Concluido" : selectedStatus;
        params.append("status", normalizedStatus);
      }

      if (sortConfig) {
        params.append('sortKey', sortConfig.key);
        params.append('sortDirection', sortConfig.direction);
      }

      const [pedidosRes, produtosRes] = await Promise.all([
        fetch(`/api/pedidos?${params.toString()}`),
        fetch('/api/produtos')
      ]);

      if (!pedidosRes.ok || !produtosRes.ok) throw new Error("Falha ao buscar dados do servidor.");

      const pedidosResponse = await pedidosRes.json();
      const produtosResponse = await produtosRes.json();

      setPedidos(pedidosResponse.data);
      setProdutosBase(produtosResponse.data);
      setCurrentPage(pedidosResponse.pagination.currentPage);
      setTotalPages(pedidosResponse.pagination.totalPages);
      setTotalItems(pedidosResponse.pagination.totalItems);

    } catch (error: any) {
      toast.error("Erro ao carregar dados", { description: error.message });
      setPedidos([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedYear, selectedStatus, sortConfig]);

  const handleDescontoValorChange = (valorStr: string) => {
    if (valorStr === "") {
      setDescontoValor("");
      setDescontoPorcento("");
      return;
    }

    const regex = /^\d*[.,]?\d{0,2}$/;
    if (!regex.test(valorStr)) return;

    setDescontoValor(valorStr);

    const valor = parseFloat(valorStr.replace(',', '.'));
    if (!isNaN(valor) && subtotalPedido > 0) {
       const novaPorcentagem = (valor / subtotalPedido) * 100;
       setDescontoPorcento(novaPorcentagem.toFixed(2).replace('.', ','));
    }
  };

  const handleDescontoPorcentoChange = (porcentoStr: string) => {
    if (porcentoStr === "") {
        setDescontoPorcento("");
        setDescontoValor("");
        return;
    }

    const regex = /^\d*[.,]?\d{0,4}$/; 
    if (!regex.test(porcentoStr)) return;
    
    setDescontoPorcento(porcentoStr);

    const porcento = parseFloat(porcentoStr.replace(',', '.'));
    if (!isNaN(porcento)) {
        const novoValor = (subtotalPedido * porcento) / 100;
        setDescontoValor(novoValor.toFixed(2).replace('.', ','));
    }
  };

  useEffect(() => {
    fetchInitialData(currentPage);
  }, [currentPage, fetchInitialData]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchInitialData(1);
    }
  }, [selectedMonth, selectedYear, selectedStatus, sortConfig, fetchInitialData]);


  
  async function handleUpdateStatus(pedidoId: string, newStatus: string) {
    const originalPedidos = [...pedidos];
    setPedidos(current => current.map(p => p.id === pedidoId ? { ...p, status: newStatus } : p));
    try {
      const response = await fetch(`/api/pedidos/${pedidoId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao atualizar status');
      }
      toast.success("Status do pedido atualizado!");
    } catch (error: any) {
      toast.error("Erro ao atualizar status", { description: error.message });
      setPedidos(originalPedidos);
    }
  }

  const openDeleteAlert = (pedido: Pedido) => {
    setOrderToDelete(pedido);
    setIsAlertOpen(true);
  };
  
  async function handleDeleteOrder() {
    if (!orderToDelete) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/pedidos/${orderToDelete.id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao remover pedido');
      }
      toast.success("Pedido removido com sucesso!");
      const newPage = pedidos.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
      await fetchInitialData(newPage);
    } catch (error: any) {
      toast.error("Falha ao remover pedido", { description: error.message });
    } finally {
      setOrderToDelete(null);
      setIsAlertOpen(false);
      setIsSubmitting(false);
    }
  }
  

  const resetCreateOrderModal = () => {
    setNewOrderItems([]);
    setSelectedVariant("");
    setItemQuantity(1);
    setSelectedCliente(null);
    setProductSearch("");
    setDescontoValor("");
    setDescontoPorcento("");
    setOrderDate(getTodayString());
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
    const produto = 
      produtosDisponiveis.find(p => p.id_variante === selectedVariant) || 
      productResults.find(p => p.id_variante === selectedVariant);

    if (!produto || itemQuantity <= 0) {
      toast.warning("Dados inválidos", { description: "Selecione um produto e uma quantidade válida." });
      return;
    }
    if (itemQuantity > produto.quantidade) {
      toast.error("Estoque insuficiente", { description: `A quantidade máxima para este item é ${produto.quantidade}.` });
      return;
    }
    setNewOrderItems(prev => {
      const existingItem = prev.find(item => item.varianteId === selectedVariant);
      if (existingItem) {
        return prev.map(item => item.varianteId === selectedVariant ? { ...item, quantidade: item.quantidade + itemQuantity } : item);
      }
      return [...prev, {
        varianteId: produto.id_variante,
        nome: `${produto.marca.nome} - ${produto.nome} (${produto.cor.nome}, ${produto.tamanho?.nome || "Único"})`,
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
      toast.warning("Pedido vazio", { description: "Adicione pelo menos um item ao pedido." });
      return;
    }
    setIsSubmitting(true);
    const body = {
      clienteId: selectedCliente ? selectedCliente.id_cliente : null,
      produtos: newOrderItems.map(item => ({ varianteId: item.varianteId, quantidade: item.quantidade })),
      data: orderDate ? new Date(orderDate).toISOString() : new Date().toISOString(),
      desconto: descontoNumerico, 
      valorTotal: totalFinal,
    };
    try {
      const response = await fetch('/api/pedidos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível criar o pedido.");     
      if (response.ok) {
        toast.success("Pedido criado com sucesso!");
        setCreateModalOpen(false);
        await fetchInitialData(1); 
      }
    } catch (error: any) {
      toast.error("Erro ao criar pedido", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  async function handleCreateNewCliente() {
    if (!newClienteForm.nome) { 
      toast.error("Campo obrigatório", { description: "O nome do cliente não pode estar vazio." });
      return; 
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/clientes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newClienteForm) });
      const newCliente = await response.json();
      if (!response.ok) throw new Error(newCliente.error || "Falha ao criar cliente");
      
      toast.success("Cliente cadastrado com sucesso!");
      setSelectedCliente(newCliente);
      setIsNewClienteModalOpen(false);
      setClienteSearch(newCliente.nome);
      setClienteResults([]);
    } catch (error: any) {
      toast.error("Erro ao salvar cliente", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }


  const subtotalPedido = useMemo(() => newOrderItems.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0), [newOrderItems]);

  const descontoNumerico = useMemo(() => {
    const valor = parseFloat(descontoValor.replace(',', '.'));
    return isNaN(valor) ? 0 : valor;
  }, [descontoValor]);

  const totalFinal = useMemo(() => {
    return Math.max(0, subtotalPedido - descontoNumerico);
  }, [subtotalPedido, descontoNumerico]);
  
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

  const produto = 
    produtosDisponiveis.find(p => p.id_variante === selectedVariant) ||
    productResults.find(p => p.id_variante === selectedVariant);

  if (!produto) return "";

  const marcaNome = produto.marca?.nome ?? "";
  const corNome = produto.cor?.nome ?? "";
  const tamanhoNome = produto.tamanho?.nome ?? "Único";

  return `${marcaNome} - ${produto.nome} (${corNome}, ${tamanhoNome})`;
}, [selectedVariant, produtosDisponiveis, productResults]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-accent flex items-center gap-2">
                Gerenciar Pedidos
                <ContextHelp
                  title="Gerenciamento de Pedidos"
                  content="Esta página exibe todos os pedidos do sistema. Use os filtros para refinar sua busca e o botão 'Novo Pedido' para criar uma nova venda."
                />
              </CardTitle>
              <CardDescription>Crie novos pedidos e visualize o histórico de vendas.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent><p>Filtrar por Mês</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent><p>Filtrar por Ano</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      {STATUS_OPTIONS.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent><p>Filtrar por Status</p></TooltipContent>
              </Tooltip>

            
            <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1">
                      <PlusCircle className="h-4 w-4" /> Novo Pedido
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Criar um novo pedido de venda.</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    Criar Novo Pedido
                    <ContextHelp
                      title="Criação de Pedido"
                      content={
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Informe a data do pedido (padrão é hoje).</li>
                          <li>Selecione um cliente existente ou cadastre um novo.</li>
                          <li>Busque e adicione produtos ao pedido.</li>
                          <li>O estoque será abatido automaticamente ao finalizar.</li>
                        </ul>
                      }
                    />
                  </DialogTitle>
                </DialogHeader>

                <div className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="order-date">Data do Pedido</Label>
                      <Input
                        id="order-date"
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5">
                        Cliente (Opcional)
                        <ContextHelp content="Busque o cliente por nome ou CPF." />
                      </Label>
                      {selectedCliente ? (
                        <div className="flex items-center justify-between p-3 border rounded-md bg-muted h-10">
                          <p className="font-medium text-sm truncate">
                            {selectedCliente.nome} {selectedCliente.cpf ? `- ${selectedCliente.cpf}` : ""}
                          </p>
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => setSelectedCliente(null)}>
                            Trocar
                          </Button>
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
                                    <p className="text-sm font-medium">{cliente.nome}</p>
                                    {cliente.cpf && <p className="text-xs text-muted-foreground">{cliente.cpf}</p>}
                                  </div>
                                ))
                              ) : (
                                <div className="p-2 text-center text-sm text-muted-foreground">
                                  Nenhum cliente encontrado.
                                </div>
                              )}
                              <div
                                className="p-2 flex items-center gap-2 justify-center text-sm text-accent-foreground/80 hover:bg-muted cursor-pointer font-medium border-t"
                                onClick={() => {
                                  setNewClienteForm({ nome: clienteSearch, cpf: "", endereco: "", telefone: "" });
                                  setIsNewClienteModalOpen(true);
                                }}
                              >
                                <UserPlus className="h-4 w-4" /> Cadastrar novo cliente: "{clienteSearch}"
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-t">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Adicionar Item ao Pedido</h3>
                      <div className="space-y-2">
                        <Label>Produto</Label>
                        {selectedVariant ? (
                          <div className="flex items-center justify-between p-3 border rounded-md bg-muted">
                            <p className="font-medium text-sm">{selectedProductName}</p>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedVariant("")}>
                              Trocar
                            </Button>
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
                                {productResults.length > 0 ? (
                                  productResults.map((produto) => (
                                    <div
                                      key={produto.id_variante}
                                      className="p-2 hover:bg-muted cursor-pointer"
                                      onClick={() => {
                                        setSelectedVariant(produto.id_variante);
                                      }}
                                    >
                                      <p className="text-sm font-medium">
                                        {produto.marca.nome} - {produto.nome}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {produto.cor.nome}, {produto.tamanho?.nome || "Único"} - Estoque:{" "}
                                        {produto.quantidade}
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
                      <div>
                        <Label>Quantidade</Label>
                        <Input
                          type="number"
                          value={itemQuantity}
                          onChange={(e) => setItemQuantity(Number(e.target.value))}
                          min={1}
                        />
                      </div>
                      <Button onClick={handleAddItemToOrder} className="w-full">
                        Adicionar Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-1.5">
                        Itens no Pedido
                        <ContextHelp content="Lista de itens adicionados a este pedido. O valor total é calculado automaticamente." />
                      </h3>
                      <div className="border rounded-lg p-2 h-64 overflow-y-auto">
                        {newOrderItems.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center pt-4">Nenhum item.</p>
                        ) : (
                          <div className="space-y-2">
                            {newOrderItems.map((item) => (
                              <div
                                key={item.varianteId}
                                className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded"
                              >
                                <div>
                                  <p className="font-medium">{item.nome}</p>
                                  <p>
                                    Qtd: {item.quantidade} x {formatCurrency(item.precoUnitario)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold">
                                    {formatCurrency(item.quantidade * item.precoUnitario)}
                                  </p>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => handleRemoveItem(item.varianteId)}
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Remover item do pedido</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="desconto-reais">Desconto (R$)</Label>
                            <Input
                              id="desconto-reais"
                              placeholder="0,00"
                              value={descontoValor}
                              onChange={(e) => handleDescontoValorChange(e.target.value)}
                              disabled={subtotalPedido <= 0}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="desconto-porcento">%</Label>
                            <Input
                              id="desconto-porcento"
                              placeholder="0%"
                              value={descontoPorcento}
                              onChange={(e) => handleDescontoPorcentoChange(e.target.value)}
                              disabled={subtotalPedido <= 0}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between text-muted-foreground">
                            <p>Subtotal:</p>
                            <p>{formatCurrency(subtotalPedido)}</p>
                          </div>
                          
                          {descontoNumerico > 0 && (
                            <div className="flex justify-between text-destructive">
                              <p>Desconto:</p>
                              <p>- {formatCurrency(descontoNumerico)}</p>
                            </div>
                          )}

                          <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <p>Total Final:</p>
                            <p>{formatCurrency(totalFinal)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateOrder}
                    disabled={isSubmitting || newOrderItems.length === 0}
                  >
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
            <TableHeader>
            <TableRow>
              <SortableTableHead sortKey="data" currentSort={sortConfig} onSort={handleSort}>
                <Tooltip><TooltipTrigger className="cursor-pointer">Data</TooltipTrigger><TooltipContent><p>Data da criação do pedido. Clique para ordenar.</p></TooltipContent></Tooltip>
              </SortableTableHead>
              <SortableTableHead sortKey="cliente" currentSort={sortConfig} onSort={handleSort}>
                <Tooltip><TooltipTrigger className="cursor-pointer">Cliente</TooltipTrigger><TooltipContent><p>Cliente associado ao pedido. Clique para ordenar.</p></TooltipContent></Tooltip>
              </SortableTableHead>
              <SortableTableHead sortKey="status" currentSort={sortConfig} onSort={handleSort}>
                <Tooltip><TooltipTrigger className="cursor-pointer">Status</TooltipTrigger><TooltipContent><p>Status atual do pedido. Clique para ordenar.</p></TooltipContent></Tooltip>
              </SortableTableHead>
              <TableHead>
                <Tooltip><TooltipTrigger className="cursor-default font-semibold">Itens</TooltipTrigger><TooltipContent><p>Quantidade total de itens no pedido.</p></TooltipContent></Tooltip>
              </TableHead>
              <TableHead className="text-right">
                <Tooltip><TooltipTrigger className="cursor-default font-semibold">Valor Total</TooltipTrigger><TooltipContent><p>Valor total do pedido.</p></TooltipContent></Tooltip>
              </TableHead>
              <TableHead className="text-right"><Tooltip><TooltipTrigger className="cursor-default font-semibold">Ações</TooltipTrigger><TooltipContent><p>Ações rápidas para o pedido.</p></TooltipContent></Tooltip></TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
                {isLoading ? (<TableRow><TableCell colSpan={7} className="text-center h-24">Carregando...</TableCell></TableRow>) :
                pedidos.length > 0 ? (
                  pedidos.map(pedido => (
                    <TableRow key={pedido.id}>
                        <TableCell>{new Date(pedido.data).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{pedido.Cliente?.nome || 'Não identificado'}</TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
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
                            </TooltipTrigger>
                            <TooltipContent><p>Clique para alterar o status</p></TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{pedido.produtos.reduce((acc, p) => acc + p.quantidade, 0)}</TableCell>  
                        <TableCell className="text-right">{formatCurrency(pedido.produtos.reduce((acc, item) => acc + item.variante.valorVenda * item.quantidade, 0))}</TableCell>
                        <TableCell className="text-right">
                           <Tooltip>
                            <TooltipTrigger asChild>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menu de ações</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2" align="end">
                                    <div className="flex flex-col gap-1">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setViewingOrderId(pedido.id)}>
                                            Visualizar
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left"><p>Ver detalhes completos do pedido.</p></TooltipContent>
                                      </Tooltip>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => openDeleteAlert(pedido)}>
                                            <Trash2 className="h-4 w-4"/>Remover
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left"><p>Remover este pedido (estorno de estoque).</p></TooltipContent>
                                      </Tooltip>
                                    </div>
                                </PopoverContent>
                              </Popover>
                            </TooltipTrigger>
                            <TooltipContent><p>Mais ações</p></TooltipContent>
                          </Tooltip>
                        </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={7} className="h-24 text-center">Nenhum pedido encontrado.</TableCell></TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong> ({totalItems} pedidos no total).
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                  className={cn(currentPage === 1 && 'pointer-events-none opacity-50')}
                />
              </PaginationItem>
              
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                  className={cn(currentPage === totalPages && 'pointer-events-none opacity-50')}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
      
      <Dialog open={isNewClienteModalOpen} onOpenChange={setIsNewClienteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Cadastrar Novo Cliente
              <ContextHelp
                title="Cadastro Rápido"
                content="Cadastre um novo cliente. Apenas o nome é obrigatório para salvar."
              />
            </DialogTitle>
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
            <AlertDialogTitle className="flex items-center gap-2">
              Você tem certeza?
              <ContextHelp
                title="Ação Irreversível"
                content="Se o pedido for 'Pendente', o estoque dos itens será devolvido. Se for 'Enviado', será marcado como 'Cancelado' e o estoque também será devolvido."
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O pedido será permanentemente removido e o estoque dos produtos será revertido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOrderToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOrder} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : "Confirmar Remoção"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PedidoDetalhesModal
        pedidoId={viewingOrderId}
        onClose={() => setViewingOrderId(null)}
        onStatusChange={(pedidoId, newStatus) => {
          handleUpdateStatus(pedidoId, newStatus);
          setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, status: newStatus } : p));
        }}
      />
    </div>
  );
}