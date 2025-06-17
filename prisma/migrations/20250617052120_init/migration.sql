/*
  Warnings:

  - You are about to drop the column `produtoId` on the `EntradaEstoque` table. All the data in the column will be lost.
  - The primary key for the `Pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_pedido` on the `Pedido` table. All the data in the column will be lost.
  - The `status` column on the `Pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `produtoId` on the `PedidoProduto` table. All the data in the column will be lost.
  - You are about to drop the `Produto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId,notificacaoId]` on the table `NotificacaoUsuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `varianteId` to the `EntradaEstoque` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Pedido` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `varianteId` to the `PedidoProduto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('Pendente', 'Enviado', 'Concluido', 'Cancelado');

-- DropForeignKey
ALTER TABLE "EntradaEstoque" DROP CONSTRAINT "EntradaEstoque_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoProduto" DROP CONSTRAINT "PedidoProduto_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoProduto" DROP CONSTRAINT "PedidoProduto_produtoId_fkey";

-- AlterTable
ALTER TABLE "EntradaEstoque" DROP COLUMN "produtoId",
ADD COLUMN     "varianteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NotificacaoUsuario" ADD COLUMN     "dataLeitura" TIMESTAMP(3),
ADD COLUMN     "lida" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_pkey",
DROP COLUMN "id_pedido",
ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusPedido" NOT NULL DEFAULT 'Pendente',
ADD CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PedidoProduto" DROP COLUMN "produtoId",
ADD COLUMN     "varianteId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Produto";

-- CreateTable
CREATE TABLE "ProdutoBase" (
    "id_produto_base" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProdutoBase_pkey" PRIMARY KEY ("id_produto_base")
);

-- CreateTable
CREATE TABLE "VarianteProduto" (
    "id_variante" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "tamanho" TEXT,
    "valorCusto" DOUBLE PRECISION NOT NULL,
    "valorVenda" DOUBLE PRECISION NOT NULL,
    "estoqueMin" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "sku" TEXT,
    "imageUrl" TEXT,
    "produtoBaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VarianteProduto_pkey" PRIMARY KEY ("id_variante")
);

-- CreateIndex
CREATE UNIQUE INDEX "VarianteProduto_sku_key" ON "VarianteProduto"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "VarianteProduto_produtoBaseId_cor_tamanho_key" ON "VarianteProduto"("produtoBaseId", "cor", "tamanho");

-- CreateIndex
CREATE UNIQUE INDEX "NotificacaoUsuario_usuarioId_notificacaoId_key" ON "NotificacaoUsuario"("usuarioId", "notificacaoId");

-- AddForeignKey
ALTER TABLE "VarianteProduto" ADD CONSTRAINT "VarianteProduto_produtoBaseId_fkey" FOREIGN KEY ("produtoBaseId") REFERENCES "ProdutoBase"("id_produto_base") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntradaEstoque" ADD CONSTRAINT "EntradaEstoque_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "VarianteProduto"("id_variante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "VarianteProduto"("id_variante") ON DELETE RESTRICT ON UPDATE CASCADE;
