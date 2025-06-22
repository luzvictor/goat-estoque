  'use client'

  import { useState, useEffect, useMemo, useCallback } from "react";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
  } from "@/components/ui/dialog";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import { Input } from "@/components/ui/input";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Label } from "@/components/ui/label";
  import { MoreHorizontal, Loader2, ChevronsUpDown, Check, PlusCircle, Trash2 } from "lucide-react";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { cn } from "@/lib/utils";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

  // Funções de formatação e parse de moeda
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
    valorCusto: number | string; valorVenda: number | string;
    estoqueMin: number; sku: string | null;
  };

  export default function ProdutosPageClient() {
    const [produtosBase, setProdutosBase] = useState<ProdutoBase[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Estados dos modais
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isEntryModalOpen, setEntryModalOpen] = useState(false);

    // Estados dos formulários
    const [formBase, setFormBase] = useState({ nome: "", categoria: "", marca: "" });
    const [formVariante, setFormVariante] = useState({ cor: "", tamanho: "", quantidade: 0, valorCusto: "", valorVenda: "", estoqueMin: 0, sku: "" });
    const [editingItem, setEditingItem] = useState<ProdutoDisplay | null>(null);
    const [entryForm, setEntryForm] = useState({ varianteId: "", quantidade: 0, numeroNota: "" });

    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [variantToDelete, setVariantToDelete] = useState<ProdutoDisplay | null>(null);

    // --- FUNÇÃO CENTRALIZADA PARA LIMPAR FORMULÁRIOS ---
    const resetForms = () => {
      setFormBase({ nome: "", categoria: "", marca: "" });
      setFormVariante({ cor: "", tamanho: "", quantidade: 0, valorCusto: "", valorVenda: "", estoqueMin: 0, sku: "" });
      setEditingItem(null);
      setEntryForm({ varianteId: "", quantidade: 0, numeroNota: "" });
    };
    
    // --- FUNÇÕES DE API E AÇÕES DO USUÁRIO ---
    const fetchProdutos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/produtos"); 
      if (!res.ok) throw new Error("Falha ao buscar produtos do servidor.");
      const data: ProdutoBase[] = await res.json();
      setProdutosBase(data);
    } catch(error: any) {
      toast.error("Erro de Rede", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchProdutos(); }, [fetchProdutos]);
  useEffect(() => { if (editingItem) setEditModalOpen(true); }, [editingItem]);
  useEffect(() => { if (!isCreateModalOpen && !isEditModalOpen && !isEntryModalOpen) { resetForms(); } }, [isCreateModalOpen, isEditModalOpen, isEntryModalOpen]);
  
  const displayProdutos = useMemo(() => {
    return produtosBase.flatMap(base => 
      base.variantes.map(variante => ({ ...variante, ...base, id_produto_base: base.id_produto_base, nome: base.nome }))
    ).filter(p => searchTerm.trim() === '' || 
      Object.values(p).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase().trim()))
    );
  }, [produtosBase, searchTerm]);

  const handleBaseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormBase(prev => ({ ...prev, [e.target.id]: e.target.value }));
  const handleVarianteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormVariante(prev => ({ ...prev, [id]: ['quantidade', 'estoqueMin'].includes(id) ? Number(value) : value }));
  };
  const handleCreateCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, campo: "valorCusto" | "valorVenda") => setFormVariante(prev => ({ ...prev, [campo]: formatCurrency(e.target.value) }));
  
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingItem) return;
    const { id, value } = e.target;
    setEditingItem(prev => prev ? { ...prev, [id]: value } : null);
  };
  const handleEditCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, campo: "valorCusto" | "valorVenda") => {
    if (!editingItem) return;
    setEditingItem(prev => prev ? { ...prev, [campo]: formatCurrency(e.target.value) } : null);
  };

  // --- FUNÇÕES DE API ATUALIZADAS COM toast() ---

  async function criarProduto() {
    if (!formBase.nome.trim() || !formBase.categoria.trim() || !formBase.marca.trim() || !formVariante.cor.trim()) {
      toast.error("Campos obrigatórios", { description: "Por favor, preencha nome, categoria, marca e cor." });
      return;
    }
    setIsSubmitting(true);
    const requestBody = {
      ...formBase,
      variantes: [{
        ...formVariante,
        valorCusto: parseCurrency(formVariante.valorCusto),
        valorVenda: parseCurrency(formVariante.valorVenda),
        quantidade: Number(formVariante.quantidade),
        estoqueMin: Number(formVariante.estoqueMin),
      }]
    };
    try {
      const response = await fetch("/api/produtos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestBody) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível criar o produto.");
      
      setCreateModalOpen(false);
      await fetchProdutos();
      toast.success("Produto criado com sucesso!");
    } catch(error: any) {
      toast.error("Erro ao criar produto", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  const openDeleteAlert = (produto: ProdutoDisplay) => {
    setVariantToDelete(produto);
    setIsDeleteAlertOpen(true);
  };

  async function handleDeleteVariant() {
    if (!variantToDelete) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/variantes/${variantToDelete.id_variante}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Não foi possível excluir a variante.');
      }
      toast.success("Variante excluída com sucesso!");
      await fetchProdutos();
    } catch(error: any) {
      toast.error("Erro ao excluir", { description: error.message });
    } finally {
      setIsSubmitting(false);
      setIsDeleteAlertOpen(false);
      setVariantToDelete(null);
    }
  }

  async function handleUpdateProduct() {
    if (!editingItem) return;
    setIsSubmitting(true);
    const { id_produto_base, id_variante, nome, marca, categoria, ...variantDataOnly } = editingItem;
    const baseData = { nome, marca, categoria };
    const variantData = {
      cor: variantDataOnly.cor, tamanho: variantDataOnly.tamanho, sku: variantDataOnly.sku,
      quantidade: Number(variantDataOnly.quantidade) || 0,
      estoqueMin: Number(variantDataOnly.estoqueMin) || 0,
      valorCusto: parseCurrency(variantDataOnly.valorCusto),
      valorVenda: parseCurrency(variantDataOnly.valorVenda),
    };
    try {
      const [baseResponse, variantResponse] = await Promise.all([
        fetch(`/api/produtos/${id_produto_base}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(baseData) }),
        fetch(`/api/variantes/${id_variante}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(variantData) })
      ]);

      const baseResult = await baseResponse.json();
      const variantResult = await variantResponse.json();

      if (!baseResponse.ok || !variantResponse.ok) {
        const errors = [];
        if (!baseResponse.ok) errors.push(`Base: ${baseResult.error}`);
        if (!variantResponse.ok) errors.push(`Variante: ${variantResult.error}`);
        throw new Error(errors.join('\n'));
      }

      setEditModalOpen(false);
      await fetchProdutos();
      toast.success("Produto atualizado com sucesso!");
    } catch (error: any) {
      toast.error("Falha ao atualizar", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  async function handleRegisterEntry() {
    if (!entryForm.varianteId) { toast.error("Selecione um produto."); return; }
    if (!entryForm.quantidade || entryForm.quantidade <= 0) { toast.error("Insira uma quantidade válida."); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/entradas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entryForm) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      toast.success("Entrada de estoque registrada!");
      setEntryModalOpen(false);
      await fetchProdutos();
    } catch (error: any) {
      toast.error("Erro ao registrar entrada", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight text-accent">Gerenciar Produtos</CardTitle>
                <CardDescription>Adicione, edite e visualize todos os produtos e suas variantes.</CardDescription>
              </div>
              <div className="flex w-full md:w-auto items-center gap-2">
                <Input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64"
                />
                <Dialog open={isEntryModalOpen} onOpenChange={(isOpen) => {
                    setEntryModalOpen(isOpen);
                    if (!isOpen) setTimeout(resetForms, 150);
                }}>
                  <DialogTrigger asChild><Button variant="outline" className="shrink-0">Registrar Entrada</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Nova Entrada</DialogTitle>
                      </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="variante-select">Produto (Variante)</Label>
                        <Select
                          value={entryForm.varianteId}
                          onValueChange={(value) => setEntryForm(prev => ({...prev, varianteId: value}))}
                        >
                          <SelectTrigger id="variante-select">
                            <SelectValue placeholder="Selecione uma variante" />
                          </SelectTrigger>
                          <SelectContent>
                            <Command>
                              <CommandInput placeholder="Buscar para filtrar..." />
                              <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                              <CommandGroup>
                                {displayProdutos.map((produto) => (
                                  <SelectItem key={produto.id_variante} value={produto.id_variante}>
                                    {produto.marca} - {produto.nome} ({produto.cor}, {produto.tamanho || 'Único'})
                                  </SelectItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label htmlFor="quantidade_entrada">Quantidade de Entrada</Label><Input id="quantidade_entrada" type="number" min={1} value={entryForm.quantidade || ''} onChange={(e) => setEntryForm(prev => ({ ...prev, quantidade: Number(e.target.value) }))} placeholder="0"/></div>
                      <div><Label htmlFor="numeroNota">Número da Nota (Opcional)</Label><Input id="numeroNota" value={entryForm.numeroNota} onChange={(e) => setEntryForm(prev => ({ ...prev, numeroNota: e.target.value }))} placeholder="Ex: 123456"/></div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setEntryModalOpen(false)} variant="outline">Cancelar</Button>
                      <Button onClick={handleRegisterEntry} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar Entrada'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog> 

                <Dialog open={isCreateModalOpen} onOpenChange={(isOpen) => {
                    setCreateModalOpen(isOpen);
                    if (!isOpen) setTimeout(resetForms, 150);
                }}>
                    <DialogTrigger asChild>
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 gap-1"><PlusCircle className="h-4 w-4" />Adicionar Produto</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>Adicionar Novo Produto</DialogTitle></DialogHeader>
                        <div className="space-y-4 py-4">
                          <h3 className="font-semibold text-lg border-b pb-2">Dados do Produto Base</h3>
                          <div><Label htmlFor="nome">Nome do Produto</Label><Input id="nome" value={formBase.nome} onChange={handleBaseInputChange} placeholder="Ex: Camiseta Polo"/></div>
                          <div><Label htmlFor="categoria">Categoria</Label><Input id="categoria" value={formBase.categoria} onChange={handleBaseInputChange} placeholder="Ex: Roupas"/></div>
                          <div><Label htmlFor="marca">Marca</Label><Input id="marca" value={formBase.marca} onChange={handleBaseInputChange} placeholder="Ex: Nike"/></div>
                          <h3 className="font-semibold text-lg border-b pb-2 pt-4">Dados da Primeira Variante</h3>
                          <div><Label htmlFor="cor">Cor</Label><Input id="cor" value={formVariante.cor} onChange={handleVarianteInputChange} placeholder="Ex: Azul"/></div>
                          <div><Label htmlFor="tamanho">Tamanho</Label><Input id="tamanho" value={formVariante.tamanho} onChange={handleVarianteInputChange} placeholder="Ex: M (opcional)"/></div>
                          <div><Label htmlFor="quantidade">Quantidade Inicial</Label><Input id="quantidade" type="number" min={0} value={formVariante.quantidade} onChange={handleVarianteInputChange} placeholder="0"/></div>
                          <div><Label htmlFor="valorCusto">Valor de Custo (R$)</Label><Input id="valorCusto" type="text" value={formVariante.valorCusto} onChange={(e) => handleCreateCurrencyChange(e, "valorCusto")} placeholder="0,00"/></div>
                          <div><Label htmlFor="valorVenda">Valor de Venda (R$)</Label><Input id="valorVenda" type="text" value={formVariante.valorVenda} onChange={(e) => handleCreateCurrencyChange(e, "valorVenda")} placeholder="0,00"/></div>
                          <div><Label htmlFor="estoqueMin">Estoque Mínimo</Label><Input id="estoqueMin" type="number" min={0} value={formVariante.estoqueMin} onChange={handleVarianteInputChange} placeholder="0"/></div>
                          <div><Label htmlFor="sku">SKU</Label><Input id="sku" value={formVariante.sku} onChange={handleVarianteInputChange} placeholder="Código único (opcional)"/></div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setCreateModalOpen(false)} variant="outline">Cancelar</Button>
                            <Button onClick={criarProduto} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                              {isLoading ? 'Criando...' : 'Criar Produto'}
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
                  <TableHead>Produto</TableHead>
                  <TableHead className="hidden md:table-cell">Marca</TableHead>
                  <TableHead className="text-center">Estoque</TableHead>
                  <TableHead className="hidden sm:table-cell">Custo (R$)</TableHead>
                  <TableHead>Venda (R$)</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={6} className="h-24 text-center">Carregando produtos...</TableCell></TableRow>
                ) : displayProdutos.length > 0 ? (
                  displayProdutos.map((produto) => (
                    <TableRow key={produto.id_variante}>
                      <TableCell className="font-medium">
                        <div>{produto.nome}</div>
                        <div className="text-xs text-muted-foreground">{produto.cor}{produto.tamanho ? `, ${produto.tamanho}` : ''}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{produto.marca}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center justify-center">
                          <span className="font-mono text-lg">{produto.quantidade}</span>
                          {produto.quantidade === 0 ? (<Badge variant="destructive" className="mt-1">Zerado</Badge>) : produto.quantidade <= produto.estoqueMin ? (<Badge className="mt-1 bg-yellow-600 text-white hover:bg-yellow-600/80">Baixo</Badge>) : (<Badge variant="secondary" className="mt-1 bg-green-700 hover:bg-green-700/80">OK</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{formatCurrency(produto.valorCusto)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(produto.valorVenda)}</TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2" align="end">
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => setEditingItem(produto)}
                              >
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive"
                              onClick={() => {
                                setVariantToDelete(produto);
                                setIsDeleteAlertOpen(true);
                              }}>
                              <Trash2 className="h-4 w-4" /> Excluir
                            </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="h-24 text-center">Nenhum produto encontrado.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Mostrando <strong>{displayProdutos.length}</strong> {displayProdutos.length === 1 ? 'variante' : 'variantes'}.
            </div>
          </CardFooter>
        </Card>
        
        <Dialog open={isEditModalOpen} onOpenChange={(isOpen) => {
            setEditModalOpen(isOpen);
            if (!isOpen) setTimeout(resetForms, 150);
        }}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            {editingItem && (
              <>
                <DialogHeader><DialogTitle>Editar: {editingItem.nome} ({editingItem.cor})</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Dados do Produto Base</h3>
                  <div><Label htmlFor="nome">Nome do Produto</Label><Input id="nome" value={editingItem.nome} onChange={handleEditInputChange} /></div>
                  <div><Label htmlFor="marca">Marca</Label><Input id="marca" value={editingItem.marca} onChange={handleEditInputChange} /></div>
                  <div><Label htmlFor="categoria">Categoria</Label><Input id="categoria" value={editingItem.categoria} onChange={handleEditInputChange} /></div>
                  <h3 className="font-semibold text-lg border-b pb-2 pt-4">Dados da Variante</h3>
                  <div><Label htmlFor="cor">Cor</Label><Input id="cor" value={editingItem.cor} onChange={handleEditInputChange} /></div>
                  <div><Label htmlFor="tamanho">Tamanho</Label><Input id="tamanho" value={editingItem.tamanho || ''} onChange={handleEditInputChange} /></div>
                  <div><Label htmlFor="quantidade">Quantidade</Label><Input id="quantidade" type="number" min={0} value={editingItem.quantidade} onChange={handleEditInputChange} /></div>
                  <div><Label htmlFor="valorCusto">Valor de Custo (R$)</Label><Input id="valorCusto" type="text" value={formatCurrency(editingItem.valorCusto)} onChange={(e) => handleEditCurrencyChange(e, 'valorCusto')} /></div>
                  <div><Label htmlFor="valorVenda">Valor de Venda (R$)</Label><Input id="valorVenda" type="text" value={formatCurrency(editingItem.valorVenda)} onChange={(e) => handleEditCurrencyChange(e, 'valorVenda')} /></div>
                  <div><Label htmlFor="estoqueMin">Estoque Mínimo</Label><Input id="estoqueMin" type="number" min={0} value={editingItem.estoqueMin} onChange={handleEditInputChange} /></div>
                  <div><Label htmlFor="sku">SKU</Label><Input id="sku" value={editingItem.sku || ''} onChange={handleEditInputChange} /></div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setEditModalOpen(false)} variant="outline">Cancelar</Button>
                  <Button onClick={handleUpdateProduct} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              A ação de excluir a variante "{variantToDelete?.nome} - {variantToDelete?.cor}" não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setVariantToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVariant} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Confirmar Exclusão'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}