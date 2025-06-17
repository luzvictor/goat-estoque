// Em: src/types/index.ts

export type Cliente = {
  id_cliente: string;
  nome: string;
  cpf?: string | null;
  // Adicione outros campos se necessário, como telefone e endereco
};

export type VarianteProduto = {
  id_variante: string;
  cor: string;
  tamanho: string | null;
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
  marca: string;
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
  // A relação correta com Cliente
  Cliente: {
    nome: string;
  } | null;
};

export type NewOrderItem = {
  varianteId: string;
  nome: string;
  quantidade: number;
  estoqueDisponivel: number;
  precoUnitario: number;
};