-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('Pendente', 'Enviado', 'Concluido', 'Cancelado');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADM', 'USUARIO');

-- CreateTable
CREATE TABLE "ProdutoBase" (
    "id_produto_base" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "marcaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProdutoBase_pkey" PRIMARY KEY ("id_produto_base")
);

-- CreateTable
CREATE TABLE "VarianteProduto" (
    "id_variante" TEXT NOT NULL,
    "corId" TEXT NOT NULL,
    "tamanhoId" TEXT,
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

-- CreateTable
CREATE TABLE "EntradaEstoque" (
    "id_entrada" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "numeroNota" TEXT,
    "varianteId" TEXT NOT NULL,

    CONSTRAINT "EntradaEstoque_pkey" PRIMARY KEY ("id_entrada")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusPedido" NOT NULL DEFAULT 'Pendente',
    "clienteId" TEXT,
    "criadoPorUsuarioId" TEXT,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "varianteId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "PedidoProduto_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USUARIO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id_notificacao" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "link" TEXT,
    "dataEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id_notificacao")
);

-- CreateTable
CREATE TABLE "NotificacaoUsuario" (
    "id" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "dataLeitura" TIMESTAMP(3),
    "usuarioId" TEXT NOT NULL,
    "notificacaoId" TEXT NOT NULL,

    CONSTRAINT "NotificacaoUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VarianteProduto_sku_key" ON "VarianteProduto"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "VarianteProduto_produtoBaseId_corId_tamanhoId_key" ON "VarianteProduto"("produtoBaseId", "corId", "tamanhoId");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nome_key" ON "Marca"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cor_nome_key" ON "Cor"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tamanho_nome_key" ON "Tamanho"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "EntradaEstoque_numeroNota_varianteId_key" ON "EntradaEstoque"("numeroNota", "varianteId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NotificacaoUsuario_usuarioId_notificacaoId_key" ON "NotificacaoUsuario"("usuarioId", "notificacaoId");

-- AddForeignKey
ALTER TABLE "ProdutoBase" ADD CONSTRAINT "ProdutoBase_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoBase" ADD CONSTRAINT "ProdutoBase_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarianteProduto" ADD CONSTRAINT "VarianteProduto_corId_fkey" FOREIGN KEY ("corId") REFERENCES "Cor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarianteProduto" ADD CONSTRAINT "VarianteProduto_tamanhoId_fkey" FOREIGN KEY ("tamanhoId") REFERENCES "Tamanho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarianteProduto" ADD CONSTRAINT "VarianteProduto_produtoBaseId_fkey" FOREIGN KEY ("produtoBaseId") REFERENCES "ProdutoBase"("id_produto_base") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntradaEstoque" ADD CONSTRAINT "EntradaEstoque_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "VarianteProduto"("id_variante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_criadoPorUsuarioId_fkey" FOREIGN KEY ("criadoPorUsuarioId") REFERENCES "Usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "VarianteProduto"("id_variante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificacaoUsuario" ADD CONSTRAINT "NotificacaoUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificacaoUsuario" ADD CONSTRAINT "NotificacaoUsuario_notificacaoId_fkey" FOREIGN KEY ("notificacaoId") REFERENCES "Notificacao"("id_notificacao") ON DELETE RESTRICT ON UPDATE CASCADE;
