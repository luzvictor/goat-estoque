// Em prisma/importProdutos.ts (v3 - Corrigido)

import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as path from 'path';

const prisma = new PrismaClient();

const COLUNAS_DE_DADOS = [
  'MARCA', 'PRODUTO', 'CATEGORIA', 'COR',
  'CUSTO', 'VENDA', 'ESTOQUE_MIN', 'SKU'
];

function normalizeString(str: string): string {
  if (!str || typeof str.trim !== 'function') return '';
  return str.trim();
}

function parseCurrency(value: string | number | null): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  
  const strValue = String(value)
    .replace('R$', '')
    .trim()
    .replace(/\./g, '')
    .replace(',', '.');
    
  return parseFloat(strValue) || 0;
}

async function main() {
  console.log('Iniciando importação de produtos (Formato Pivotado)...');

  const filePath = path.join(__dirname, 'produtos.xlsx');
  const workbook = xlsx.readFile(filePath, { cellNF: true });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[] = xlsx.utils.sheet_to_json(sheet);

  console.log(`Encontradas ${rows.length} linhas de produto no Excel.`);

  let produtosCriados = 0;
  let variantesCriadas = 0;
  let linhasIgnoradas = 0;
  let cabecalhosDeTamanho: string[] = [];

  for (const row of rows) {
    const marcaNome = normalizeString(row.MARCA);
    const produtoNome = normalizeString(row.PRODUTO);
    const categoriaNome = normalizeString(row.CATEGORIA);
    const corNome = normalizeString(row.COR);

    if (!marcaNome || !produtoNome || !categoriaNome || !corNome) {
      console.warn(`Linha ignorada: Faltando MARCA, PRODUTO, CATEGORIA ou COR.`);
      linhasIgnoradas++;
      continue;
    }
    
    const valorCusto = parseCurrency(row.CUSTO);
    const valorVenda = parseCurrency(row.VENDA);
    const estoqueMin = parseInt(row.ESTOQUE_MIN) || 0;
    const skuBase = row.SKU || null;

    try {
      // --- UPSERT DOS DADOS RELACIONADOS ---
      const marca = await prisma.marca.upsert({
        where: { nome: marcaNome },
        update: {},
        create: { nome: marcaNome },
      });

      const categoria = await prisma.categoria.upsert({
        where: { nome: categoriaNome },
        update: {},
        create: { nome: categoriaNome },
      });

      const cor = await prisma.cor.upsert({
        where: { nome: corNome },
        update: {},
        create: { nome: corNome },
      });

      // --- CORREÇÃO DO ERRO 1 (nome_marcaId) ---
      // Trocamos o 'upsert' por 'findFirst' + 'create'
      // Isso não depende de uma chave única no schema.
      
      let produtoBase = await prisma.produtoBase.findFirst({
        where: {
          nome: produtoNome,
          marcaId: marca.id,
        },
      });

      if (!produtoBase) {
        produtoBase = await prisma.produtoBase.create({
          data: {
            nome: produtoNome,
            marcaId: marca.id,
            categoriaId: categoria.id,
          },
        });
        produtosCriados++;
      }
      
      // --- PROCESSAR AS COLUNAS DE TAMANHO ---
      
      for (const headerName of Object.keys(row)) {
        const headerUpper = headerName.toUpperCase();
        
        if (COLUNAS_DE_DADOS.includes(headerUpper)) {
          continue;
        }

        const tamanhoNome = normalizeString(headerName);
        const quantidade = parseInt(row[headerName]) || 0;

        if (quantidade <= 0) {
          continue;
        }

        const tamanho = await prisma.tamanho.upsert({
          where: { nome: tamanhoNome },
          update: {},
          create: { nome: tamanhoNome },
        });
        
        // --- CORREÇÃO DO ERRO 2 (produtoBase.id) ---
        // Trocamos 'produtoBase.id' por 'produtoBase.id_produto_base'
        
        await prisma.varianteProduto.create({
          data: {
            produtoBaseId: produtoBase.id_produto_base, // <-- CORRIGIDO
            corId: cor.id,
            tamanhoId: tamanho.id,
            valorCusto: valorCusto,
            valorVenda: valorVenda,
            quantidade: quantidade,
            estoqueMin: estoqueMin,
            sku: skuBase ? `${skuBase}-${tamanhoNome}` : null,
          },
        });
        
        variantesCriadas++;
        
        if (!cabecalhosDeTamanho.includes(tamanhoNome)) {
          cabecalhosDeTamanho.push(tamanhoNome);
        }
      }

    } catch (error: any) {
      // Verifica se é um erro de variante duplicada
      if (error.code === 'P2002') { // Código de erro do Prisma para 'Unique constraint failed'
        console.warn(`Variante duplicada ignorada: ${produtoNome} - ${corNome} - (Tamanho já existe)`);
        linhasIgnoradas++;
      } else {
        console.error(`Falha ao importar produto "${produtoNome} - ${corNome}": ${error.message}`);
        linhasIgnoradas++;
      }
    }
  }

  console.log('--- Importação Concluída ---');
  console.log(`Linhas do Excel processadas: ${rows.length}`);
  console.log(`Linhas ignoradas (erros ou duplicadas): ${linhasIgnoradas}`);
  console.log(`Produtos Base criados/encontrados: ${produtosCriados}`);
  console.log(`Variantes de Produto (Tamanhos) criadas: ${variantesCriadas}`);
  console.log(`Tamanhos processados: ${cabecalhosDeTamanho.join(', ')}`);
}

// Executa a função
main()
  .catch((e) => {
    console.error('Erro fatal no script de importação:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });