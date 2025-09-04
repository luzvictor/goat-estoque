'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
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
  itemLabel: string; // Ex: "marca"
  items: AttributeItem[];
  apiEndpoint: string; // Ex: "/api/marcas"
  onUpdate: () => void; // Função para recarregar os dados na página principal
}

export function AttributeManager({ title, itemLabel, items, apiEndpoint, onUpdate }: AttributeManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para criar um novo item (marca, categoria, etc.)
  async function handleCreate() {
    if (!newItemName.trim()) {
      toast.error(`O nome da ${itemLabel} não pode ser vazio.`);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: newItemName }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Não foi possível criar a ${itemLabel}.`);
      
      toast.success(`${title.slice(0, -1)} criada com sucesso!`);
      setIsModalOpen(false);
      setNewItemName("");
      onUpdate(); // Chama a função para recarregar os dados na página pai
    } catch (error: any) {
      toast.error(`Erro ao criar ${itemLabel}`, { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Função para deletar um item
  async function handleDelete(itemId: string, itemName: string) {
    if (!window.confirm(`Tem certeza que deseja excluir "${itemName}"?`)) return;
    
    try {
      const response = await fetch(`${apiEndpoint}/${itemId}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Não foi possível excluir a ${itemLabel}.`);

      toast.success(`${title.slice(0, -1)} excluída com sucesso!`);
      onUpdate();
    } catch (error: any) {
      toast.error(`Erro ao excluir ${itemLabel}`, { description: error.message });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Adicionar Nova {title.slice(0, -1)}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova {title.slice(0, -1)}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="name">Nome da {itemLabel}</Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={`Ex: Nike, Adidas...`}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(item.id, item.nome)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
