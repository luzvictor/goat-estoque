'use client'

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, Trash2, MoreHorizontal, Edit, Eye } from "lucide-react"; // 1. Importado o ícone Eye
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cliente } from "@/types";
import { toast } from "sonner";

export default function ClientesPageClient() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [clienteForm, setClienteForm] = useState({ nome: "", cpf: "", endereco: "", telefone: "" });

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  
  // --- 2. NOVO ESTADO PARA O MODAL DE VISUALIZAÇÃO ---
  const [viewingCliente, setViewingCliente] = useState<Cliente | null>(null);

  const fetchClientes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/clientes?search=${searchTerm}`);
      if (!response.ok) throw new Error("Falha ao buscar clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error: any) {
      toast.error("Erro de Rede", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const timerId = setTimeout(() => fetchClientes(), 300);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchClientes]);

  const openModal = (cliente: Cliente | null = null) => {
    if (cliente) {
      setEditingCliente(cliente);
      setClienteForm({
        nome: cliente.nome,
        cpf: cliente.cpf || "",
        endereco: cliente.endereco || "",
        telefone: cliente.telefone || "",
      });
    } else {
      setEditingCliente(null);
      setClienteForm({ nome: "", cpf: "", endereco: "", telefone: "" });
    }
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClienteForm({ ...clienteForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    if (!clienteForm.nome) {
      toast.error("Campo Obrigatório", { description: "O nome do cliente não pode estar vazio." });
      return;
    }
    
    setIsSubmitting(true);
    const url = editingCliente ? `/api/clientes/${editingCliente.id_cliente}` : '/api/clientes';
    const method = editingCliente ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Ocorreu um erro desconhecido.");

      toast.success(`Cliente ${editingCliente ? 'atualizado' : 'criado'} com sucesso!`);
      setIsModalOpen(false);
      await fetchClientes();
    } catch (error: any) {
      toast.error("Erro ao salvar", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const openDeleteAlert = (cliente: Cliente) => {
    setClienteToDelete(cliente);
    setIsDeleteAlertOpen(true);
  };
  
  const handleDeleteCliente = async () => {
    if (!clienteToDelete) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/clientes/${clienteToDelete.id_cliente}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao remover cliente.");
      }
      toast.success("Cliente removido com sucesso!");
      await fetchClientes();
    } catch (error: any) {
      toast.error("Erro ao remover", { description: error.message });
    } finally {
      setIsSubmitting(false);
      setIsDeleteAlertOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-accent">Gerenciar Clientes</CardTitle>
              <CardDescription>Adicione, edite e visualize todos os clientes.</CardDescription>
            </div>
            <div className="flex w-full md:w-auto items-center gap-2">
              <Input
                type="text"
                placeholder="Pesquisar por nome ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Button onClick={() => openModal()} className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 gap-1">
                <PlusCircle className="h-4 w-4" /> Adicionar Cliente
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">Carregando...</TableCell></TableRow>
              ) : clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <TableRow key={cliente.id_cliente}>
                    <TableCell className="font-medium">{cliente.nome}</TableCell>
                    <TableCell>{cliente.cpf || 'N/A'}</TableCell>
                    <TableCell>{cliente.telefone || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                       <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-1">
                           <div className="flex flex-col">
                            {/* --- 3. NOVO BOTÃO DE VISUALIZAR --- */}
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => setViewingCliente(cliente)}>
                              <Eye className="h-4 w-4" /> Visualizar
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => openModal(cliente)}>
                              <Edit className="h-4 w-4" /> Editar
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => openDeleteAlert(cliente)}>
                              <Trash2 className="h-4 w-4" /> Remover
                            </Button>
                           </div>
                        </PopoverContent>
                       </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">Nenhum cliente encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Criar/Editar */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCliente ? "Editar Cliente" : "Adicionar Novo Cliente"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">Nome*</Label>
                  <Input id="nome" name="nome" value={clienteForm.nome} onChange={handleFormChange} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cpf" className="text-right">CPF</Label>
                  <Input id="cpf" name="cpf" value={clienteForm.cpf || ''} onChange={handleFormChange} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telefone" className="text-right">Telefone</Label>
                  <Input id="telefone" name="telefone" value={clienteForm.telefone || ''} onChange={handleFormChange} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endereco" className="text-right">Endereço</Label>
                  <Input id="endereco" name="endereco" value={clienteForm.endereco || ''} onChange={handleFormChange} className="col-span-3"/>
              </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleFormSubmit} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* --- 4. NOVO MODAL DE VISUALIZAÇÃO --- */}
      <Dialog open={!!viewingCliente} onOpenChange={(isOpen) => !isOpen && setViewingCliente(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
            <DialogDescription>Informações completas do cliente selecionado.</DialogDescription>
          </DialogHeader>
          {viewingCliente && (
            <div className="space-y-2 py-4">
              <p><strong>Nome:</strong> {viewingCliente.nome}</p>
              <p><strong>CPF:</strong> {viewingCliente.cpf || 'Não informado'}</p>
              <p><strong>Telefone:</strong> {viewingCliente.telefone || 'Não informado'}</p>
              <p><strong>Endereço:</strong> {viewingCliente.endereco || 'Não informado'}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingCliente(null)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              A ação de excluir o cliente "{clienteToDelete?.nome}" não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setClienteToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCliente} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Confirmar Remoção'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
