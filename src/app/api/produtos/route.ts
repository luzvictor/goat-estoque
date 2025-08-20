import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
// Importe o enum se for usá-lo diretamente, embora o Prisma Client já o entenda
// import { StatusPedido } from '@prisma/client'; // O Prisma Client exporta os enums

// GET: Listar todos os Produtos Base com suas Variantes
// (Este endpoint agora retorna os produtos base e aninha suas variantes)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // 1. Lendo os novos parâmetros da URL
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const searchTerm = searchParams.get('search') || '';

    // Calcula o 'skip' (quantos itens pular)
    const skip = (page - 1) * limit;

    // Constrói a cláusula de busca (igual à que tínhamos)
    const whereClause: Prisma.ProdutoBaseWhereInput = searchTerm
      ? {
          OR: [
            { nome: { contains: searchTerm, mode: 'insensitive' } },
            { marca: { contains: searchTerm, mode: 'insensitive' } },
            { categoria: { contains: searchTerm, mode: 'insensitive' } },
          ],
        }
      : {};

    // 2. Executa duas queries em paralelo: uma para os dados, outra para a contagem total
    const [produtos, total] = await prisma.$transaction([
      prisma.produtoBase.findMany({
        where: whereClause,
        include: {
          variantes: {
            orderBy: { cor: 'asc' },
          },
        },
        orderBy: { nome: 'asc' },
        skip: skip, // Pula os itens das páginas anteriores
        take: limit, // Pega apenas o número de itens para esta página
      }),
      prisma.produtoBase.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // 3. Retorna os dados da página E a informação de paginação
    return NextResponse.json({
      data: produtos,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        pageSize: limit,
      }
    });
    
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos." },
      { status: 500 }
    );
  }
}
// POST: Criar um novo Produto Base com suas Variantes
// (Este endpoint agora espera dados para o ProdutoBase e um array de suas variantes)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extrair dados do ProdutoBase e das Variantes do corpo da requisição
    const {
      nome,         // Para ProdutoBase
      categoria,    // Para ProdutoBase
      marca,        // Para ProdutoBase 
      variantes     // Array de objetos VarianteProduto
    } = body;

    // Validação básica para ProdutoBase
    if (!nome || !categoria || !marca) {
      return NextResponse.json(
        { error: "Campos 'nome', 'categoria' e 'marca' do produto base são obrigatórios." },
        { status: 400 }
      );
    }

    // Validação para o array de Variantes
    if (!variantes || !Array.isArray(variantes) || variantes.length === 0) {
      return NextResponse.json(
        { error: "É necessário fornecer pelo menos uma variante para o produto." },
        { status: 400 }
      );
    }

    // Validação detalhada para cada Variante no array
    const camposObrigatoriosVariante = [
      "cor",
      // "tamanho" é opcional no schema, então não precisa estar aqui se for o caso
      "valorCusto",
      "valorVenda",
      "estoqueMin",
      "quantidade",
    ];

    for (const variante of variantes) {
      for (const campo of camposObrigatoriosVariante) {
        // Checa se o campo existe e não é nulo. Permite 0 para campos numéricos.
        if (variante[campo] === undefined || variante[campo] === null) {
          return NextResponse.json(
            { error: `O campo '${campo}' da variante é obrigatório.` },
            { status: 400 }
          );
        }
        // Validação para garantir que campos numéricos são de fato números
        if (["valorCusto", "valorVenda", "estoqueMin", "quantidade"].includes(campo)) {
          if (typeof variante[campo] !== 'number' || isNaN(variante[campo])) {
             return NextResponse.json(
              { error: `O campo '${campo}' da variante deve ser um número válido.` },
              { status: 400 }
            );
          }
        }
      }
      // Validação específica para cor (não pode ser string vazia)
      if (typeof variante.cor !== 'string' || variante.cor.trim() === "") {
          return NextResponse.json(
            { error: `O campo 'cor' da variante é obrigatório e não pode ser vazio.` },
            { status: 400 }
          );
      }
    }

    // Criação do ProdutoBase e suas Variantes aninhadas (transação implícita do Prisma)
    const novoProdutoBaseComVariantes = await prisma.produtoBase.create({
      data: {
        nome,
        categoria,
        marca,
        variantes: {
          create: variantes.map((v: any) => ({ // Tipar 'v' apropriadamente no seu projeto (ex: VarianteProdutoCreateInput)
            cor: v.cor,
            tamanho: v.tamanho ?? null, // Se 'tamanho' for opcional e puder ser null
            valorCusto: parseFloat(v.valorCusto),
            valorVenda: parseFloat(v.valorVenda),
            estoqueMin: parseInt(v.estoqueMin),
            quantidade: parseInt(v.quantidade),
            sku: v.sku && v.sku.trim() !== "" ? v.sku.trim() : null,        // Adiciona sku se houver
            imageUrl: v.imageUrl ?? null // Adiciona imageUrl se houver
          })),
        },
      },
      include: { // Para retornar o ProdutoBase criado junto com suas variantes
        variantes: true,
      },
    });

    return NextResponse.json(novoProdutoBaseComVariantes, { status: 201 }); // 201 Created
  } catch (error: any) {
    console.error("Erro ao criar produto base com variantes:", error);

    // Tratamento de erros específicos do Prisma (ex: violação de constraint unique)
    if (error.code === 'P2002') { // Código do Prisma para unique constraint failed
      const target = error.meta?.target as string[]; // Prisma typings might differ slightly
      if (target && target.includes('sku')) {
        return NextResponse.json(
          { error: "Já existe uma variante com o SKU fornecido." },
          { status: 409 } // 409 Conflict
        );
      }
      // Exemplo: @@unique([produtoBaseId, cor, tamanho])
      // O target seria algo como: ['produtoBaseId', 'cor', 'tamanho'] ou o nome da constraint.
      // Você pode inspecionar error.meta.target para ver o nome exato do campo/constraint.
      if (target && target.includes('produtoBaseId') && target.includes('cor') && target.includes('tamanho')) {
         return NextResponse.json(
          { error: "Já existe uma variante com a mesma cor e tamanho para este produto base." },
          { status: 409 }
        );
      }
       return NextResponse.json(
        { error: "Erro de duplicidade ao criar o produto ou variante. Verifique SKU, ou combinação de cor e tamanho." },
        { status: 409 }
      );
    }

    // Erro genérico
    return NextResponse.json(
      { error: "Erro interno do servidor ao criar produto base com variantes." },
      { status: 500 }
    );
  }
}