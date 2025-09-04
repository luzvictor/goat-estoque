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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { MoreHorizontal, Loader2, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
type Attribute = { id: string; nome: string; };
type VarianteProduto = {
  id_variante: string;
  cor: Attribute;
  tamanho: Attribute | null;
  valorCusto: number;
  valorVenda: number;
  estoqueMin: number;
  quantidade: number;
  sku: string | null;
};
type ProdutoBase = {
  id_produto_base: string;
  nome: string;
  categoria: Attribute;
  marca: Attribute;
  variantes: VarianteProduto[];
};
type ProdutoDisplay = {
  id_variante: string; id_produto_base: string; nome: string;
  categoria: Attribute; marca: Attribute; cor: Attribute;
  tamanho: Attribute | null; quantidade: number; valorCusto: number | string;
  valorVenda: number | string; estoqueMin: number; sku: string | null;
};

export default function ProdutosPageClient() {
  const [produtosBase, setProdutosBase] = useState<ProdutoBase[]>([]);
  const [marcas, setMarcas] = useState<Attribute[]>([]);
  const [categorias, setCategorias] = useState<Attribute[]>([]);
  const [cores, setCores] = useState<Attribute[]>([]);
  const [tamanhos, setTamanhos] = useState<Attribute[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEntryModalOpen, setEntryModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [formBase, setFormBase] = useState({ nome: "", categoriaId: "", marcaId: "" });
  const [formVariante, setFormVariante] = useState({ corId: "", tamanhoId: "", quantidade: 0, valorCusto: "", valorVenda: "", estoqueMin: 0, sku: "" });
  const [editingItem, setEditingItem] = useState<ProdutoDisplay | null>(null);
  const [entryForm, setEntryForm] = useState({ varianteId: "", quantidade: 0, numeroNota: "" });
  const [variantToDelete, setVariantToDelete] = useState<ProdutoDisplay | null>(null);

  // controla qual DropdownMenu está aberto (por id da variante)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // --- FUNÇÕES DE API ---
  const fetchAllData = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '10',
        search: searchTerm,
      });
      const [produtosRes, marcasRes, categoriasRes, coresRes, tamanhosRes] = await Promise.all([
        fetch(`/api/produtos?${params.toString()}`),
        fetch("/api/marcas"),
        fetch("/api/categorias"),
        fetch("/api/cores"),
        fetch("/api/tamanhos")
      ]);
      if (!produtosRes.ok || !marcasRes.ok || !categoriasRes.ok || !coresRes.ok || !tamanhosRes.ok) {
        throw new Error("Falha ao carregar dados essenciais.");
      }
      const { data, pagination } = await produtosRes.json();
      setProdutosBase(data);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
      setTotalItems(pagination.totalItems);

      setMarcas(await marcasRes.json());
      setCategorias(await categoriasRes.json());
      setCores(await coresRes.json());
      setTamanhos(await tamanhosRes.json());
    } catch (error: any) {
      toast.error("Erro ao carregar dados", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);
  // Dentro do seu componente _client.tsx

const handleRegisterEntry = () => {
  try {
    // Aqui você coloca a lógica de salvar entrada no estoque
    console.log("Entrada registrada com sucesso!");
    
    // Exemplo: chamada para API
    // await api.post("/entrada", { produtoId, quantidade });

  } catch (error) {
    console.error("Erro ao registrar entrada:", error);
  }
};


  useEffect(() => {
    fetchAllData(currentPage);
  }, [currentPage, fetchAllData]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchAllData(1);
      }
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const displayProdutos = useMemo(() => {
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

  async function criarProduto() {
    if (!formBase.nome.trim() || !formBase.marcaId || !formBase.categoriaId || !formVariante.corId) {
      toast.error("Campos obrigatórios não preenchidos.");
      return;
    }
    setIsSubmitting(true);
    const requestBody = {
      ...formBase,
      variantes: [{
        ...formVariante,
        tamanhoId: formVariante.tamanhoId || null,
        valorCusto: parseCurrency(formVariante.valorCusto),
        valorVenda: parseCurrency(formVariante.valorVenda),
        quantidade: Number(formVariante.quantidade),
        estoqueMin: Number(formVariante.estoqueMin),
        sku: formVariante.sku?.trim() || null,
      }]
    };
    try {
      const response = await fetch("/api/produtos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestBody) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      toast.success("Produto criado com sucesso!");
      setCreateModalOpen(false);
    } catch (error: any) {
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
        throw new Error(errorData.error || 'Não foi possível excluir.');
      }
      toast.success("Variante excluída com sucesso!");
      const newPage = displayProdutos.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
      await fetchAllData(newPage);
    } catch (error: any) {
      toast.error("Erro ao excluir", { description: error.message });
    } finally {
      setIsSubmitting(false);
      setIsDeleteAlertOpen(false);
    }
  }

  async function handleUpdateProduct() {
    if (!editingItem) return;
    setIsSubmitting(true);
    const { id_produto_base, id_variante, nome, marca, categoria, tamanho, ...variantDataOnly } = editingItem;
    const baseData = { nome, marcaId: marca.id, categoriaId: categoria.id };
    const variantData = {
      corId: (variantDataOnly.cor as Attribute).id,
      tamanhoId: tamanho?.id || null,
      quantidade: Number(variantDataOnly.quantidade) || 0,
      estoqueMin: Number(variantDataOnly.estoqueMin) || 0,
      valorCusto: parseCurrency(variantDataOnly.valorCusto),
      valorVenda: parseCurrency(variantDataOnly.valorVenda),
      sku: variantDataOnly.sku,
    };
    try {
      const [baseResponse, variantResponse] = await Promise.all([
        fetch(`/api/produtos/${id_produto_base}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(baseData) }),
        fetch(`/api/variantes/${id_variante}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(variantData) })
      ]);
      if (!baseResponse.ok || !variantResponse.ok) {
        const baseError = baseResponse.ok ? null : await baseResponse.json();
        const variantError = variantResponse.ok ? null : await variantResponse.json();
        throw new Error(`Base: ${baseError?.error || 'OK'}\nVariante: ${variantError?.error || 'OK'}`);
      }
      toast.success("Produto atualizado com sucesso!");
      setEditModalOpen(false);
    } catch (error: any) {
      toast.error("Falha ao atualizar", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!isCreateModalOpen && !isEditModalOpen && !isEntryModalOpen) {
      fetchAllData(currentPage);
    }
  }, [isCreateModalOpen, isEditModalOpen, isEntryModalOpen, fetchAllData, currentPage]);

  useEffect(() => {
    if (editingItem) setEditModalOpen(true);
  }, [editingItem]);

  // handlers que fecham o menu antes de abrir o modal/alerta
  const handleEditFromMenu = (produto: ProdutoDisplay) => {
    setOpenMenuId(null);
    // garante que o dropdown feche antes do dialog abrir
    setTimeout(() => {
      setEditingItem(produto);
      setEditModalOpen(true);
    }, 0);
  };

  const handleDeleteFromMenu = (produto: ProdutoDisplay) => {
    setOpenMenuId(null);
    setTimeout(() => {
      openDeleteAlert(produto);
    }, 0);
  };

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
              <Input placeholder="Pesquisar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-64"/>

              <Dialog open={isEntryModalOpen} onOpenChange={setEntryModalOpen}>
                <DialogTrigger asChild><Button variant="outline" className="shrink-0">Registrar Entrada</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Registrar Nova Entrada</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="variante-select">Produto (Variante)</Label>
                      <Select value={entryForm.varianteId} onValueChange={(value) => setEntryForm(prev => ({...prev, varianteId: value}))}>
                        <SelectTrigger id="variante-select"><SelectValue placeholder="Selecione uma variante" /></SelectTrigger>
                        <SelectContent>
                          {displayProdutos.map((produto) => (
                            <SelectItem key={produto.id_variante} value={produto.id_variante}>
                              {produto.marca.nome} - {produto.nome} ({produto.cor.nome}, {produto.tamanho?.nome || 'Único'})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label htmlFor="quantidade_entrada">Quantidade</Label><Input id="quantidade_entrada" type="number" min={1} value={entryForm.quantidade || ''} onChange={(e) => setEntryForm(prev => ({ ...prev, quantidade: Number(e.target.value) }))} /></div>
                    <div><Label htmlFor="numeroNota">Nota Fiscal (Opcional)</Label><Input id="numeroNota" value={entryForm.numeroNota} onChange={(e) => setEntryForm(prev => ({ ...prev, numeroNota: e.target.value }))} /></div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEntryModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleRegisterEntry} disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Salvar Entrada
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
                <DialogTrigger asChild><Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 gap-1"><PlusCircle className="h-4 w-4" />Adicionar</Button></DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>Adicionar Novo Produto</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Dados do Produto Base</h3>
                    <div><Label>Nome</Label><Input value={formBase.nome} onChange={(e) => setFormBase(p => ({...p, nome: e.target.value}))} /></div>
                    <div><Label>Marca</Label>
                      <Select value={formBase.marcaId} onValueChange={(v) => setFormBase(p => ({...p, marcaId: v}))}>
                        <SelectTrigger><SelectValue placeholder="Selecione uma marca" /></SelectTrigger>
                        <SelectContent>{marcas.map(m => <SelectItem key={m.id} value={m.id}>{m.nome}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div><Label>Categoria</Label>
                      <Select value={formBase.categoriaId} onValueChange={(v) => setFormBase(p => ({...p, categoriaId: v}))}>
                        <SelectTrigger><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                        <SelectContent>{categorias.map(c => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <h3 className="font-semibold text-lg border-b pb-2 pt-4">Dados da Primeira Variante</h3>
                    <div><Label>Cor</Label>
                      <Select value={formVariante.corId} onValueChange={(v) => setFormVariante(p => ({...p, corId: v}))}>
                        <SelectTrigger><SelectValue placeholder="Selecione uma cor" /></SelectTrigger>
                        <SelectContent>{cores.map(c => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div><Label>Tamanho</Label>
                      <Select value={formVariante.tamanhoId} onValueChange={(v) => setFormVariante(p => ({...p, tamanhoId: v === 'none' ? '' : v}))}>
                        <SelectTrigger><SelectValue placeholder="Selecione (opcional)" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhum</SelectItem>
                          {tamanhos.map(t => <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label>Quantidade Inicial</Label><Input type="number" min={0} value={formVariante.quantidade} onChange={(e) => setFormVariante(p => ({...p, quantidade: Number(e.target.value)}))} /></div>
                    <div><Label>Valor de Custo (R$)</Label><Input type="text" value={formVariante.valorCusto} onChange={(e) => setFormVariante(p => ({...p, valorCusto: formatCurrency(e.target.value)}))} /></div>
                    <div><Label>Valor de Venda (R$)</Label><Input type="text" value={formVariante.valorVenda} onChange={(e) => setFormVariante(p => ({...p, valorVenda: formatCurrency(e.target.value)}))} /></div>
                    <div><Label>Estoque Mínimo</Label><Input type="number" min={0} value={formVariante.estoqueMin} onChange={(e) => setFormVariante(p => ({...p, estoqueMin: Number(e.target.value)}))} /></div>
                    <div><Label>SKU</Label><Input value={formVariante.sku} onChange={(e) => setFormVariante(p => ({...p, sku: e.target.value}))} /></div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateModalOpen(false)}>Cancelar</Button>
                    <Button onClick={criarProduto} disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Criar Produto
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
                <TableHead>Marca</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead className="text-center">Estoque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="h-24 text-center">Carregando...</TableCell></TableRow>
              ) : displayProdutos.map((produto) => (
                <TableRow key={produto.id_variante}>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell>{produto.marca.nome}</TableCell>
                  <TableCell>{produto.cor.nome}</TableCell>
                  <TableCell>{produto.tamanho?.nome || 'N/A'}</TableCell>
                  <TableCell className="text-center">{produto.quantidade}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      open={openMenuId === produto.id_variante}
                      onOpenChange={(open) => setOpenMenuId(open ? produto.id_variante : null)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditFromMenu(produto)}
                          onSelect={() => handleEditFromMenu(produto)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteFromMenu(produto)}
                          onSelect={() => handleDeleteFromMenu(produto)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Mostrando <strong>{displayProdutos.length}</strong> de <strong>{totalItems}</strong> produtos.
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}/></PaginationItem>
              <PaginationItem><PaginationLink isActive>{currentPage}</PaginationLink></PaginationItem>
              {totalPages > currentPage && <PaginationItem><PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }}>{currentPage + 1}</PaginationLink></PaginationItem>}
              {totalPages > currentPage + 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
              {totalPages > currentPage + 1 && <PaginationItem><PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(totalPages); }}>{totalPages}</PaginationLink></PaginationItem>}
              <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}/></PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* Modal de Edição */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setEditModalOpen(open);
          if (!open) setEditingItem(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {editingItem && (
            <>
              <DialogHeader><DialogTitle>Editar: {editingItem.nome} ({editingItem.cor.nome})</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <h3 className="font-semibold text-lg border-b pb-2">Dados do Produto Base</h3>
                <div><Label>Nome</Label><Input value={editingItem.nome} onChange={(e) => setEditingItem(p => p ? {...p, nome: e.target.value} : null)} /></div>
                <div><Label>Marca</Label>
                  <Select value={editingItem.marca.id} onValueChange={(v) => setEditingItem(p => p ? {...p, marca: marcas.find(m => m.id === v)!} : null)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{marcas.map(m => <SelectItem key={m.id} value={m.id}>{m.nome}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Categoria</Label>
                  <Select value={editingItem.categoria.id} onValueChange={(v) => setEditingItem(p => p ? {...p, categoria: categorias.find(c => c.id === v)!} : null)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{categorias.map(c => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <h3 className="font-semibold text-lg border-b pb-2 pt-4">Dados da Variante</h3>
                <div><Label>Cor</Label>
                  <Select value={editingItem.cor.id} onValueChange={(v) => setEditingItem(p => p ? {...p, cor: cores.find(c => c.id === v)!} : null)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{cores.map(c => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Tamanho</Label>
                  <Select value={editingItem.tamanho?.id || "none"} onValueChange={(v) => {
                    const valueToSet = v === 'none' ? null : tamanhos.find(t => t.id === v) || null;
                    setEditingItem(p => p ? {...p, tamanho: valueToSet} : null);
                  }}>
                    <SelectTrigger><SelectValue placeholder="Nenhum" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      {tamanhos.map(t => <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Quantidade</Label><Input type="number" min={0} value={editingItem.quantidade} onChange={(e) => setEditingItem(p => p ? {...p, quantidade: Number(e.target.value)} : null)} /></div>
                <div><Label>Valor de Custo (R$)</Label><Input type="text" value={formatCurrency(editingItem.valorCusto)} onChange={(e) => setEditingItem(p => p ? {...p, valorCusto: e.target.value} : null)} /></div>
                <div><Label>Valor de Venda (R$)</Label><Input type="text" value={formatCurrency(editingItem.valorVenda)} onChange={(e) => setEditingItem(p => p ? {...p, valorVenda: e.target.value} : null)} /></div>
                <div><Label>Estoque Mínimo</Label><Input type="number" min={0} value={editingItem.estoqueMin} onChange={(e) => setEditingItem(p => p ? {...p, estoqueMin: Number(e.target.value)} : null)} /></div>
                <div><Label>SKU</Label><Input value={editingItem.sku || ''} onChange={(e) => setEditingItem(p => p ? {...p, sku: e.target.value} : null)} /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleUpdateProduct} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Alerta de exclusão */}
      <AlertDialog
        open={isDeleteAlertOpen}
        onOpenChange={(open) => {
          setIsDeleteAlertOpen(open);
          if (!open) setVariantToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              A ação de excluir a variante "{variantToDelete?.nome} - {variantToDelete?.cor.nome}" não pode ser desfeita.
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
