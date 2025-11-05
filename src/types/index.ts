// Em: src/types/index.ts

export type Cliente = {
  id_cliente: string;
  nome: string;
  cpf?: string | null;
  endereco?: string | null;
  telefone?: string | null; 
};

type Atributo = {
  id: string;
  nome: string;
};

export type VarianteProduto = {
  sku: string | null;
  id_variante: string;
  cor: Atributo;
  tamanho?: Atributo | null;
  valorVenda: number;
  quantidade: number;
  estoqueMin: number;
  produtoBase: {
    nome: string;
    marca: Atributo;
    categoria?: Atributo;
  }
};

export type ProdutoBase = {
  id_produto_base: string;
  nome: string;
  categoria: Atributo;
  marca: Atributo;
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