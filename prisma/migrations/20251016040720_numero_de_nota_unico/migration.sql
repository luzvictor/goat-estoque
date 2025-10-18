/*
  Warnings:

  - A unique constraint covering the columns `[numeroNota,varianteId]` on the table `EntradaEstoque` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EntradaEstoque" ALTER COLUMN "data" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "EntradaEstoque_numeroNota_varianteId_key" ON "EntradaEstoque"("numeroNota", "varianteId");
