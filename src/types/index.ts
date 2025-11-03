// Em: src/types/index.ts

export type Cliente = {
  id_cliente: string;
  nome: string;
  cpf?: string | null;
  endereco?: string | null;
  telefone?: string | null; 
};

export type VarianteProduto = {
  sku: string;
  id_variante: string;
  cor: { nome: string };
  tamanho?: { nome: string };
  valorVenda: number;
  quantidade: number;
  produtoBase: {
    nome: string;
    marca: string;
  }
};

export type ProdutoBase = {
  id_produto_base: string;
  nome: string;
  categoria: string;
  marca: { nome: string };
  variantes: VarianteProduto[];
};

export type Pedido = {
  id: string;
  data: string;
  status: string;
  produtos: {
    id: string;
    quantidade: number;
    variante: VarianteProduto;
  }[];
  Cliente: Cliente | null;
};

export type NewOrderItem = {
  varianteId: string;
  nome: string;
  quantidade: number;
  estoqueDisponivel: number;
  precoUnitario: number;
};