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
import { ContextHelp } from "@/components/ui/ContextHelp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
              <CardTitle className="text-2xl font-bold tracking-tight text-accent flex items-center gap-2">
                Gerenciar Clientes
                <ContextHelp
                  title="Gestão de Clientes"
                  content="Nesta página pode adicionar novos clientes, editar informações existentes, pesquisar por nome/CPF e remover clientes."
                />
              </CardTitle>
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => openModal()} className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 gap-1">
                    <PlusCircle className="h-4 w-4" /> Adicionar Cliente
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adicionar um novo cliente ao sistema.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Tooltip>
                    <TooltipTrigger className="cursor-default">Nome</TooltipTrigger>
                    <TooltipContent><p>Nome completo do cliente.</p></TooltipContent>
                  </Tooltip>
                </TableHead>

                <TableHead>
                  <Tooltip>
                    <TooltipTrigger className="cursor-default">CPF</TooltipTrigger>
                    <TooltipContent><p>CPF do cliente (opcional).</p></TooltipContent>
                  </Tooltip>
                </TableHead>
                
                <TableHead>
                  <Tooltip>
                    <TooltipTrigger className="cursor-default">Telefone</TooltipTrigger>
                    <TooltipContent><p>Telefone de contato do cliente (opcional).</p></TooltipContent>
                  </Tooltip>
                </TableHead>

                <TableHead className="text-right">
                  <Tooltip>
                    <TooltipTrigger className="cursor-default">Ações</TooltipTrigger>
                    <TooltipContent><p>Visualizar, editar ou remover o cliente.</p></TooltipContent>
                  </Tooltip>
                </TableHead>
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
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                            </PopoverTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mais ações</p>
                          </TooltipContent>
                        </Tooltip>

                        <PopoverContent className="w-auto p-1">
                          <div className="flex flex-col">
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingCliente ? "Editar Cliente" : "Adicionar Novo Cliente"}
              <ContextHelp
                title={editingCliente ? "Editar Cliente" : "Adicionar Cliente"}
                content="Preencha as informações do cliente. O campo 'Nome' é obrigatório, os restantes são opcionais."
              />
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">Nome*</Label>
                  <Input id="nome" name="nome" value={clienteForm.nome} onChange={handleFormChange} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <div className="flex justify-end items-center gap-1 text-right">
                    <Label htmlFor="cpf">CPF</Label>
                    <ContextHelp content="O CPF é opcional, mas útil para identificar o cliente em futuras compras." />
                  </div>
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
      
      <Dialog open={!!viewingCliente} onOpenChange={(isOpen) => !isOpen && setViewingCliente(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Detalhes do Cliente
              <ContextHelp content="Estes são os dados de registo completos do cliente." />
            </DialogTitle>
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
            <AlertDialogTitle className="flex items-center gap-2">
              Você tem certeza?
              <ContextHelp
                title="Atenção!"
                content="Se o cliente tiver pedidos associados, ele não poderá ser removido para manter a integridade do histórico de vendas."
              />
            </AlertDialogTitle>
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