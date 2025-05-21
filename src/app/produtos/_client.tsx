'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

const formatCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  if (!numericValue) return '0,00';
  const floatValue = (parseFloat(numericValue) / 100).toFixed(2);
  return floatValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

type Produto = {
  id_produto: string;
  nome: string;
  categoria: string;
  marca: string;
  cor: string;
  tamanho: string;
  quantidade: number;
  valorCusto: number | string;
  valorVenda: number | string;
  estoqueMin: number;
};

export default function ProdutosPageClient() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<{ [key: string]: 'asc' | 'desc' }>({});
  const [sortBy, setSortBy] = useState<keyof Produto | null>(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Você pode ajustar esse número


  const [form, setForm] = useState<Omit<Produto, "id_produto">>({
    nome: "",
    categoria: "",
    marca: "",
    cor: "",
    tamanho: "",
    quantidade: 0,
    valorCusto: "",
    valorVenda: "",
    estoqueMin: 0,
  });

  async function fetchProdutos() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
    setFilteredProdutos(data);
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, campo: string) => {
    const formatted = formatCurrency(e.target.value);
    setForm({ ...form, [campo]: formatted });
  };

  const resetForm = () => {
    setForm({
      nome: "",
      categoria: "",
      marca: "",
      cor: "",
      tamanho: "",
      quantidade: 0,
      valorCusto: "",
      valorVenda: "",
      estoqueMin: 0,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredProdutos(produtos);
    } else {
      const filtered = produtos.filter((produto) =>
        Object.values(produto).join(" ").toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProdutos(filtered);
    }
  };

  const handleSort = (column: keyof Produto) => {
    const newDirection = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    setSortDirection({ [column]: newDirection });
    setSortBy(column);

    const sorted = [...filteredProdutos].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredProdutos(sorted);
  };

  const salvarProduto = async () => {
    const produtoFormatado = {
      ...form,
      valorCusto: parseFloat(form.valorCusto.toString().replace(/\./g, '').replace(',', '.')),
      valorVenda: parseFloat(form.valorVenda.toString().replace(/\./g, '').replace(',', '.')),
    };

    if (!form.nome || !form.categoria || !form.marca || !form.tamanho || produtoFormatado.valorCusto <= 0 || produtoFormatado.valorVenda <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    if (isEditing && editingId) {
      await fetch(`/api/produtos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoFormatado),
      });
    } else {
      await fetch("/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoFormatado),
      });
    }

    fetchProdutos();
    setOpen(false);
    resetForm();
  };

  const editarProduto = (produto: Produto) => {
    setForm({
      nome: produto.nome,
      categoria: produto.categoria,
      marca: produto.marca,
      cor: produto.cor,
      tamanho: produto.tamanho,
      quantidade: produto.quantidade,
      valorCusto: formatCurrency(produto.valorCusto.toString()),
      valorVenda: formatCurrency(produto.valorVenda.toString()),
      estoqueMin: produto.estoqueMin,
    });
    setEditingId(produto.id_produto);
    setIsEditing(true);
    setOpen(true);
  };

  const excluirProduto = async (id: string) => {
    const confirmar = confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmar) return;

    await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    fetchProdutos();
  };
  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);
  const currentProdutos = filteredProdutos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <Header />
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-7xl mx-auto min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-[#CFFF04]">Gerenciar Produtos</h1>

        <div className="mb-6">
          <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-[#CFFF04] text-black rounded-full py-2 px-6 shadow-md hover:bg-[#ffffff] hover:shadow-lg transition duration-300">
                {isEditing ? "Editar Produto" : "Adicionar Produto"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="sr-only">{isEditing ? "Editar Produto" : "Adicionar Novo Produto"}</DialogTitle>
                <h3 className="text-xl font-semibold">{isEditing ? "Editar Produto" : "Adicionar Novo Produto"}</h3>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Ex: Camiseta Polo"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input
                    id="categoria"
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    placeholder="Ex: Roupas"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="marca">Marca</Label>
                  <Input
                    id="marca"
                    value={form.marca}
                    onChange={(e) => setForm({ ...form, marca: e.target.value })}
                    placeholder="Ex: Nike"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cor">Cor</Label>
                  <Input
                    id="cor"
                    value={form.cor}
                    onChange={(e) => setForm({ ...form, cor: e.target.value })}
                    placeholder="Ex: Azul"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="tamanho">Tamanho</Label>
                  <Input
                    id="tamanho"
                    value={form.tamanho}
                    onChange={(e) => setForm({ ...form, tamanho: e.target.value })}
                    placeholder="Ex: M"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    value={form.quantidade || ""} // Evita mostrar "0"
                    onChange={(e) => setForm({ ...form, quantidade: +e.target.value })}
                    placeholder="Ex: 50"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="valorCusto">Valor de Custo</Label>
                  <Input
                    id="valorCusto"
                    value={form.valorCusto || ""} // Evita mostrar "0"
                    onChange={(e) => handleCurrencyChange(e, "valorCusto")}
                    placeholder="Ex: R$50,00"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="valorVenda">Valor de Venda</Label>
                  <Input
                    id="valorVenda"
                    value={form.valorVenda || ""} // Evita mostrar "0"
                    onChange={(e) => handleCurrencyChange(e, "valorVenda")}
                    placeholder="Ex: R$100,00"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
                <div>
                  <Label htmlFor="estoqueMin">Estoque Mínimo</Label>
                  <Input
                    id="estoqueMin"
                    value={form.estoqueMin || ""} // Evita mostrar "0"
                    onChange={(e) => setForm({ ...form, estoqueMin: +e.target.value })}
                    placeholder="Ex: 5"
                    className="border-gray-300 shadow-sm rounded-lg p-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={salvarProduto} className="bg-[#CFFF04] text-black py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300">
                  {isEditing ? "Salvar Alterações" : "Criar Produto"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              handleSearch(e.target.value);
              setCurrentPage(1); // Reseta para primeira página ao pesquisar
            }}
            placeholder="Pesquisar produtos..."
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <Table>
          <TableHeader>
            <TableRow>
              {["nome", "categoria", "marca", "cor", "tamanho", "quantidade", "valorCusto", "valorVenda", "estoqueMin", "ações"].map((col) => (
                <TableHead key={col} onClick={() => col !== "ações" && handleSort(col as keyof Produto)} className="cursor-pointer">
                  {col[0].toUpperCase() + col.slice(1)}{" "}
                  {sortBy === col && (sortDirection[col] === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProdutos.map((produto) => (
              <TableRow key={produto.id_produto}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.categoria}</TableCell>
                <TableCell>{produto.marca}</TableCell>
                <TableCell>{produto.cor}</TableCell>
                <TableCell>{produto.tamanho}</TableCell>
                <TableCell>{produto.quantidade}</TableCell>
                <TableCell>
                  R$
                  {typeof produto.valorCusto === 'number' && !isNaN(produto.valorCusto)
                    ? produto.valorCusto.toFixed(2).replace('.', ',')
                    : '0,00'}
                </TableCell>
                <TableCell>
                  R$
                  {typeof produto.valorVenda === 'number' && !isNaN(produto.valorVenda)
                    ? produto.valorVenda.toFixed(2).replace('.', ',')
                    : '0,00'}
                </TableCell>
                <TableCell>{produto.estoqueMin}</TableCell>
                <TableCell className="space-x-2">
                  <Button onClick={() => editarProduto(produto)} variant="outline" className="text-sm">Editar</Button>
                  <Button onClick={() => excluirProduto(produto.id_produto)} variant="destructive" className="text-sm">Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          variant="outline"
        >
          Anterior
        </Button>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-full text-sm ${
              currentPage === index + 1 ? "bg-[#CFFF04] text-black" : "bg-gray-100"
            }`}
            variant="outline"
          >
            {index + 1}
          </Button>
        ))}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          variant="outline"
        >
          Próximo
        </Button>
      </div>
    </div>
  </>
);
}
