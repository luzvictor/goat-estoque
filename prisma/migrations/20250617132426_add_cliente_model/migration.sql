/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Pedido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "usuarioId",
ADD COLUMN     "clienteId" TEXT,
ADD COLUMN     "criadoPorUsuarioId" TEXT;

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "endereco" TEXT,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_criadoPorUsuarioId_fkey" FOREIGN KEY ("criadoPorUsuarioId") REFERENCES "Usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;
