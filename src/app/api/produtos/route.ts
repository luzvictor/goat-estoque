import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// GET: Listar todos os Produtos Base com suas Variantes
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const searchTerm = searchParams.get('search') || '';
        const sortKey = searchParams.get('sortKey');
    const sortDirection = searchParams.get('sortDirection') as 'asc' | 'desc' | null;

    const skip = (page - 1) * limit;

    const whereClause: Prisma.ProdutoBaseWhereInput = searchTerm
      ? {
          OR: [
            { nome: { contains: searchTerm, mode: 'insensitive' } },
            { marca: { nome: { contains: searchTerm, mode: 'insensitive' } } },
            { categoria: { nome: { contains: searchTerm, mode: 'insensitive' } } },
            { variantes: { some: { sku: { contains: searchTerm, mode: 'insensitive' } } } }
          ],
        }
      : {};

    let orderBy: Prisma.ProdutoBaseOrderByWithRelationInput | Prisma.ProdutoBaseOrderByWithRelationInput[] = { nome: 'asc' }; // Padrão

    if (sortKey && sortDirection) {
      switch (sortKey) {
        case 'nome':
          orderBy = { nome: sortDirection };
          break;
        case 'marca':
          orderBy = { marca: { nome: sortDirection } };
          break;
        //
        default:
          orderBy = { nome: 'asc' };
      }
    }

    const [produtos, total] = await prisma.$transaction([
      prisma.produtoBase.findMany({
        where: whereClause,
        include: {
          marca: true,
          categoria: true,
          variantes: {
            include: { cor: true, tamanho: true },
            orderBy: [
                { cor: { nome: 'asc' } },
                { tamanho: { nome: 'asc' } } 
            ],
          },
        },
        orderBy: orderBy,
        skip,
        take: limit,
      }),
      prisma.produtoBase.count({ where: whereClause }),
    ]);
    const totalPages = Math.ceil(total / limit);

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
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nome, categoriaId, marcaId, variantes } = body;

    if (!nome || !categoriaId || !marcaId) {
      return NextResponse.json(
        { error: "Campos 'nome', 'categoriaId' e 'marcaId' são obrigatórios." },
        { status: 400 }
      );
    }

    if (!variantes || !Array.isArray(variantes) || variantes.length === 0) {
      return NextResponse.json(
        { error: "É necessário fornecer pelo menos uma variante para o produto." },
        { status: 400 }
      );
    }

    for (const v of variantes) {
      if (!v.corId) {
        return NextResponse.json(
          { error: "Cada variante precisa de um 'corId' válido." },
          { status: 400 }
        );
      }
      if (typeof v.valorCusto !== "number" || isNaN(v.valorCusto)) {
        return NextResponse.json({ error: "valorCusto inválido." }, { status: 400 });
      }
      if (typeof v.valorVenda !== "number" || isNaN(v.valorVenda)) {
        return NextResponse.json({ error: "valorVenda inválido." }, { status: 400 });
      }
    }

    const novoProdutoBaseComVariantes = await prisma.produtoBase.create({
      data: {
        nome,
        categoria: { connect: { id: categoriaId } },
        marca: { connect: { id: marcaId } },
        variantes: {
          create: variantes.map((v: any) => ({
            cor: { connect: { id: v.corId } },
            tamanho: v.tamanhoId ? { connect: { id: v.tamanhoId } } : undefined,
            valorCusto: v.valorCusto,
            valorVenda: v.valorVenda,
            estoqueMin: v.estoqueMin,
            quantidade: v.quantidade,
            sku: v.sku?.trim() || null,
            imageUrl: v.imageUrl ?? null,
          })),
        },
      },
      include: {
        categoria: true,
        marca: true,
        variantes: { include: { cor: true, tamanho: true } },
      },
    });

    return NextResponse.json(novoProdutoBaseComVariantes, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar produto base com variantes:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Já existe um produto/variante com dados duplicados (SKU, cor+tamanho, etc)." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor ao criar produto." },
      { status: 500 }
    );
  }
}