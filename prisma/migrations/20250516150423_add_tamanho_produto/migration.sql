/*
  Warnings:

  - Added the required column `tamanho` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "tamanho" TEXT NOT NULL;
