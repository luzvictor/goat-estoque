'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ContextHelp } from "@/components/ui/ContextHelp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


type AttributeItem = {
  id: string;
  nome: string;
};

interface AttributeManagerProps {
  title: string;
  itemLabel: string;
  items: AttributeItem[];
  apiEndpoint: string; 
  onUpdate: () => void;
}

export function AttributeManager({ title, itemLabel, items, apiEndpoint, onUpdate }: AttributeManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placeholders: { [key: string]: string } = {
    Marcas: "Ex: Nike, Adidas...",
    Categorias: "Ex: Camisetas, Calças...",
    Cores: "Ex: Azul Marinho, Preto...",
    Tamanhos: "Ex: P, M, G...",
  };

  const placeholderText = placeholders[title] || `Nome do(a) ${itemLabel}`;

  const isMasculine = itemLabel === "Tamanho";

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => {
        setNewItemName("");
      }, 150);
    }
  }, [isModalOpen]);

  async function handleCreate() {
    if (!newItemName.trim()) {
      toast.error(`O nome do ${itemLabel} não pode ser vazio.`);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: newItemName }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Não foi possível criar ${itemLabel}.`);

      const participle = isMasculine ? 'criado' : 'criada';
      toast.success(`${itemLabel} ${participle} com sucesso!`);
      
      setIsModalOpen(false);
      onUpdate(); 
    } catch (error: any) {
      toast.error(`Erro ao criar ${itemLabel}`, { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(itemId: string) {
    try {
      const response = await fetch(`${apiEndpoint}/${itemId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Não foi possível excluir ${itemLabel}.`);

      const participle = isMasculine ? 'excluído' : 'excluída';
      toast.success(`${itemLabel} ${participle} com sucesso!`);
      onUpdate();
    } catch (error: any) {
      toast.error(`Erro ao excluir ${itemLabel}`, { description: error.message });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Adicionar {itemLabel}
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar um novo item: {itemLabel}</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Adicionar {itemLabel}
                <ContextHelp
                  title={`Adicionar ${itemLabel}`}
                  content={`Insira o nome do(a) novo(a) ${itemLabel} que deseja disponibilizar no sistema.`}
                />
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="name">{itemLabel}</Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={placeholderText}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreate} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remover {itemLabel}</p>
                        </TooltipContent>
                      </Tooltip>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            Excluir {itemLabel}
                            <ContextHelp
                              title="Atenção!"
                              content={`Se este(a) ${itemLabel} já estiver associado(a) a um produto, ele(a) não poderá ser removido(a) para manter a integridade dos dados.`}
                            />
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir <span className="font-medium">{item.nome}</span>? 
                            Esta ação não poderá ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                  Nenhum item encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

