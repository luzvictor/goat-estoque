// Em: src/components/modals/PedidoDetalhesModal.tsx

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { Pedido as PedidoSimplificado } from "@/types";

type PedidoCompleto = PedidoSimplificado & {
  Cliente: {
    nome: string;
    cpf: string | null;
    telefone: string | null;
    endereco: string | null;
  } | null;
};

interface PedidoDetalhesModalProps {
  pedidoId: string | null;
  onClose: () => void;
  onStatusChange: (pedidoId: string, newStatus: string) => void;
}

const STATUS_OPTIONS = ["Pendente", "Enviado", "Concluído", "Cancelado"];

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Concluído': return 'default';
    case 'Enviado': return 'secondary';
    case 'Cancelado': return 'destructive';
    default: return 'outline';
  }
};

const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function PedidoDetalhesModal({ pedidoId, onClose, onStatusChange }: PedidoDetalhesModalProps) {
  const [pedido, setPedido] = useState<PedidoCompleto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPedidoDetails() {
      if (!pedidoId) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/pedidos/${pedidoId}`);
        if (response.ok) {
          const data = await response.json();
          setPedido(data);
        } else {
          console.error("Falha ao buscar detalhes do pedido");
          alert("Não foi possível carregar os detalhes do pedido.");
          onClose();
        }
      } catch (error) {
        console.error("Erro de rede:", error);
        onClose();
      } finally {
        setIsLoading(false);
      }
    }

    fetchPedidoDetails();
  }, [pedidoId, onClose]);
  
  const handleClose = () => {
    setPedido(null);
    onClose();
  }

  const totalPedido = pedido ? pedido.produtos.reduce((acc, p) => acc + (p.quantidade * p.variante.valorVenda), 0) : 0;

  return (
    <Dialog open={!!pedidoId} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-3xl">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : pedido ? (
          <>
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido</DialogTitle>
              <DialogDescription>ID: {pedido.id}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="font-semibold mb-2">Informações do Cliente</h3>
                {pedido.Cliente ? (
                  <div className="text-sm space-y-1">
                    <p><strong>Nome:</strong> {pedido.Cliente.nome}</p>
                    <p><strong>CPF:</strong> {pedido.Cliente.cpf || 'Não informado'}</p>
                    <p><strong>Telefone:</strong> {pedido.Cliente.telefone || 'Não informado'}</p>
                    <p><strong>Endereço:</strong> {pedido.Cliente.endereco || 'Não informado'}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Cliente não identificado</p>
                )}
              </div>
               <div>
                 <h3 className="font-semibold mb-2">Informações do Pedido</h3>
                 <div className="text-sm space-y-2">
                    <p><strong>Data:</strong> {new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
                    <div className="flex items-center gap-2">
                        <strong>Status:</strong>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Badge variant={getStatusVariant(pedido.status)} className="cursor-pointer hover:opacity-80">
                              {pedido.status}
                            </Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2" align="start">
                            <div className="flex flex-col gap-1">
                              {STATUS_OPTIONS.map(statusOption => (
                                <Button
                                  key={statusOption}
                                  variant={pedido.status === statusOption ? "default" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start"
                                  onClick={() => onStatusChange(pedido.id, statusOption)}
                                  disabled={pedido.status === statusOption}
                                >
                                  {statusOption}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                    </div>
                 </div>
              </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-semibold mb-2">Itens do Pedido</h3>
                <div className="border rounded-md max-h-64 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produto</TableHead>
                                <TableHead>Qtd.</TableHead>
                                <TableHead>Preço Unit.</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pedido.produtos.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.variante.produtoBase.marca} - {item.variante.produtoBase.nome}</div>
                                        <div className="text-xs text-muted-foreground">{item.variante.cor.nome}, {item.variante.tamanho?.nome || 'Único'}</div>
                                    </TableCell>
                                    <TableCell>{item.quantidade}</TableCell>
                                    <TableCell>{formatCurrency(item.variante.valorVenda)}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.variante.valorVenda * item.quantidade)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 <div className="flex justify-end font-bold text-lg mt-4">
                    <span>Total: {formatCurrency(totalPedido)}</span>
                </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}