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
  desconto: number | null;
  Cliente: {
    nome: string;
    cpf: string | null;
    telefone: string | null;
    endereco: string | null;
  } | null;
  produtos: Array<{
    id: string;
    quantidade: number;
    variante: {
      valorVenda: number;
      cor: { nome: string };
      tamanho: { nome: string } | null;
      produtoBase: {
        nome: string;
        marca: { nome: string };
      };
    };
  }>;
};

interface PedidoDetalhesModalProps {
  pedidoId: string | null;
  onClose: () => void;
  onStatusChange: (pedidoId: string, newStatus: string) => void;
}

const STATUS_OPTIONS = ["Pendente", "Enviado", "Concluído", "Cancelado"];

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
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

  const subtotal = pedido ? pedido.produtos.reduce((acc, p) => acc + (p.quantidade * p.variante.valorVenda), 0) : 0;
  const desconto = pedido?.desconto || 0;
  const totalFinal = Math.max(0, subtotal - desconto);

  return (
    <Dialog open={!!pedidoId} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>
            {pedido ? "Detalhes do Pedido" : "Carregando..."}
          </DialogTitle>
          {pedido && <DialogDescription className="truncate">ID: {pedido.id}</DialogDescription>}
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : pedido ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Informações do Cliente</h3>
                {pedido.Cliente ? (
                  <div className="text-sm space-y-1 bg-muted/30 p-3 rounded-md">
                    <p><span className="font-medium">Nome:</span> {pedido.Cliente.nome}</p>
                    <p><span className="font-medium">CPF:</span> {pedido.Cliente.cpf || 'Não informado'}</p>
                    <p><span className="font-medium">Telefone:</span> {pedido.Cliente.telefone || 'Não informado'}</p>
                    <p><span className="font-medium">Endereço:</span> {pedido.Cliente.endereco || 'Não informado'}</p>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    Cliente não identificado
                  </div>
                )}
              </div>
               <div>
                 <h3 className="font-semibold mb-2">Informações do Pedido</h3>
                 <div className="text-sm space-y-2 bg-muted/30 p-3 rounded-md">
                    <p><span className="font-medium">Data:</span> {new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Status:</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Badge variant={getStatusVariant(pedido.status)} className="cursor-pointer hover:opacity-80">
                              {pedido.status}
                            </Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-1" align="start">
                            <div className="flex flex-col">
                              {STATUS_OPTIONS.map(statusOption => (
                                <Button
                                  key={statusOption}
                                  variant={pedido.status === statusOption ? "secondary" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start h-8"
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
                <div className="border rounded-md overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="whitespace-nowrap">Produto</TableHead>
                                <TableHead className="text-center whitespace-nowrap">Qtd.</TableHead>
                                <TableHead className="text-right whitespace-nowrap">Preço Unit.</TableHead>
                                <TableHead className="text-right whitespace-nowrap">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pedido.produtos.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="min-w-[200px]">
                                        <div className="font-medium">{item.variante.produtoBase.marca?.nome || 'N/A'} - {item.variante.produtoBase.nome}</div>
                                        <div className="text-xs text-muted-foreground">{item.variante.cor.nome}, {item.variante.tamanho?.nome || 'Único'}</div>
                                    </TableCell>
                                    <TableCell className="text-center">{item.quantidade}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.variante.valorVenda)}</TableCell>
                                    <TableCell className="text-right font-medium">{formatCurrency(item.variante.valorVenda * item.quantidade)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col items-end gap-2 mt-4 pt-4 border-t">
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {desconto > 0 && (
                      <div className="flex justify-between text-sm text-destructive font-medium">
                        <span>Desconto:</span>
                        <span>- {formatCurrency(desconto)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Final:</span>
                      <span>{formatCurrency(totalFinal)}</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}