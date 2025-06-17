// Em: src/components/modals/PedidoDetalhesModal.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Tipagem do Pedido
type Pedido = {
  id: string; data: string; status: string;
  produtos: {
    id: string; quantidade: number;
    variante: { id_variante: string; produtoBase: { nome: string; marca: string }; cor: string; tamanho: string | null; valorVenda: number };
  }[];
  Usuario: { nome: string } | null;
};

// NOVO: Adicionada a prop onStatusChange na interface
interface PedidoDetalhesModalProps {
  pedido: Pedido | null;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
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

// ALTERADO: A função agora aceita a prop 'onStatusChange'
export function PedidoDetalhesModal({ pedido, onClose, onStatusChange }: PedidoDetalhesModalProps) {
  if (!pedido) return null;

  const totalPedido = pedido.produtos.reduce((acc, p) => acc + (p.quantidade * p.variante.valorVenda), 0);

  return (
    <Dialog open={!!pedido} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido</DialogTitle>
          <DialogDescription>ID: {pedido.id}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="font-semibold mb-2">Informações Gerais</h3>
            <div className="text-sm space-y-2">
              <p><strong>Data:</strong> {new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
              
              {/* ALTERADO: Status agora é um Popover editável */}
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
                          onClick={() => onStatusChange(statusOption)}
                          disabled={pedido.status === statusOption}
                        >
                          {statusOption}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <p><strong>Cliente:</strong> {pedido.Usuario?.nome || 'Não identificado'}</p>
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
                      <div className="text-xs text-muted-foreground">{item.variante.cor}, {item.variante.tamanho || 'Único'}</div>
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
      </DialogContent>
    </Dialog>
  );
}