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

// Tipagem genérica para os itens (Marca, Categoria, etc.)
type AttributeItem = {
  id: string;
  nome: string;
};

// Props que o nosso componente reutilizável vai aceitar
interface AttributeManagerProps {
  title: string; // Ex: "Marcas"
  itemLabel: string; // Ex: "Marca"
  items: AttributeItem[];
  apiEndpoint: string; // Ex: "/api/marcas"
  onUpdate: () => void; // Função para recarregar os dados na página principal
}

export function AttributeManager({ title, itemLabel, items, apiEndpoint, onUpdate }: AttributeManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Objeto para mapear títulos a placeholders específicos
  const placeholders: { [key: string]: string } = {
    Marcas: "Ex: Nike, Adidas...",
    Categorias: "Ex: Camisetas, Calças...",
    Cores: "Ex: Azul Marinho, Preto...",
    Tamanhos: "Ex: P, M, G...",
  };

  // Seleciona o placeholder com base no título, com um fallback genérico
  const placeholderText = placeholders[title] || `Nome do(a) ${itemLabel}`;

  // Determina o gênero do item para ajustar as mensagens de notificação
  const isMasculine = itemLabel === "Tamanho";

  // Efeito para limpar o campo de input sempre que o modal for fechado
  useEffect(() => {
    if (!isModalOpen) {
      // Adiciona um pequeno delay para a animação de fechamento do modal ser suave
      setTimeout(() => {
        setNewItemName("");
      }, 150);
    }
  }, [isModalOpen]);

  // Função para criar um novo item (marca, categoria, etc.)
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
      
      setIsModalOpen(false); // Fecha o modal
      onUpdate(); // Chama a função para recarregar os dados na página pai
    } catch (error: any) {
      toast.error(`Erro ao criar ${itemLabel}`, { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Função para deletar um item. Movida para dentro do componente.
  async function handleDelete(itemId: string) {
    try {
      const response = await fetch(`${apiEndpoint}/${itemId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Não foi possível excluir ${itemLabel}.`);

      const participle = isMasculine ? 'excluído' : 'excluída';
      toast.success(`${itemLabel} ${participle} com sucesso!`);
      onUpdate(); // Recarrega os dados na página pai
    } catch (error: any) {
      toast.error(`Erro ao excluir ${itemLabel}`, { description: error.message });
    }
  }

  return (
    <div className="space-y-4">
      {/* Modal de criação */}
      <div className="flex justify-end">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Adicionar {itemLabel}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar {itemLabel}</DialogTitle>
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

      {/* Tabela de itens */}
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
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir {itemLabel}</AlertDialogTitle>
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

