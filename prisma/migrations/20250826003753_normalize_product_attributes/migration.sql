/*
  Warnings:

  - You are about to drop the column `categoria` on the `ProdutoBase` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `ProdutoBase` table. All the data in the column will be lost.
  - You are about to drop the column `cor` on the `VarianteProduto` table. All the data in the column will be lost.
  - You are about to drop the column `tamanho` on the `VarianteProduto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produtoBaseId,corId,tamanhoId]` on the table `VarianteProduto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoriaId` to the `ProdutoBase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marcaId` to the `ProdutoBase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corId` to the `VarianteProduto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VarianteProduto_produtoBaseId_cor_tamanho_key";

-- AlterTable
ALTER TABLE "ProdutoBase" DROP COLUMN "categoria",
DROP COLUMN "marca",
ADD COLUMN     "categoriaId" TEXT NOT NULL,
ADD COLUMN     "marcaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VarianteProduto" DROP COLUMN "cor",
DROP COLUMN "tamanho",
ADD COLUMN     "corId" TEXT NOT NULL,
ADD COLUMN     "tamanhoId" TEXT;

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Cor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tamanho" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tamanho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nome_key" ON "Marca"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cor_nome_key" ON "Cor"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tamanho_nome_key" ON "Tamanho"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "VarianteProduto_produtoBaseId_corId_tamanhoId_key" ON "VarianteProduto"("produtoBaseId", "corId", "tamanhoId");

-- AddForeignKey
ALTER TABLE "ProdutoBase" ADD CONSTRAINT "ProdutoBase_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoBase" ADD CONSTRAINT "ProdutoBase_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarianteProduto" ADD CONSTRAINT "VarianteProduto_corId_fkey" FOREIGN KEY ("corId") REFERENCES "Cor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarianteProduto" ADD CONSTRAINT "VarianteProduto_tamanhoId_fkey" FOREIGN KEY ("tamanhoId") REFERENCES "Tamanho"("id") ON DELETE SET NULL ON UPDATE CASCADE;
