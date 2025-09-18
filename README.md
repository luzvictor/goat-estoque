# GESTOCK - Sistema de Controle de Estoque para a GOAT Store

## 📖 Sobre o Projeto

**GESTOCK** é um sistema web completo para gerenciamento de estoque, desenvolvido como parte do projeto da disciplina de Projeto de Software. A aplicação permite o controle detalhado de produtos com múltiplas variações (cor, tamanho), registro de entradas de estoque, criação de pedidos com baixa automática de estoque, e um dashboard para visualização de métricas importantes.

Este projeto foi construído com foco em uma arquitetura moderna, robusta e escalável, utilizando as melhores práticas do ecossistema JavaScript/TypeScript.

---

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** [Next.js](https://nextjs.org/) (com App Router) e [React](https://react.dev/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/) e [shadcn/ui](https://ui.shadcn.com/) para componentes
-   **Backend:** [Next.js](https://nextjs.org/) (API Routes)
-   **ORM:** [Prisma](https://www.prisma.io/) para uma comunicação segura e tipada com o banco de dados
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)

---

## 🚀 Como Instalar e Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### 1. Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas na sua máquina:
-   [Node.js](https://nodejs.org/) (versão 18.x ou superior)
-   [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
-   Um servidor [PostgreSQL](https://www.postgresql.org/download/) rodando localmente.

### 2. Instalação

**a. Clone o Repositório**
```bash
git clone <https://github.com/luzvictor/goat-estoque.git>
cd goat-estoque

b. Instale as Dependências
Este comando irá instalar todos os pacotes necessários listados no package.json.

npm install

c. Configure as Variáveis de Ambiente

Na raiz do projeto, crie um arquivo chamado .env.

Copie e cole o conteúdo abaixo, substituindo os valores pelas suas credenciais do PostgreSQL.

# Exemplo de string de conexão para o PostgreSQL
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/goat_estoque?schema=public"

d. Crie o Banco de Dados

Conecte-se ao seu servidor PostgreSQL (usando psql, pgAdmin, ou outra ferramenta).

Execute o seguinte comando SQL para criar o banco de dados:

CREATE DATABASE goat_estoque;

e. Aplique as Migrações do Banco
Este comando irá ler seu arquivo prisma/schema.prisma e criar todas as tabelas, colunas e relacionamentos no banco de dados que acabamos de criar.

npx prisma migrate dev

O Prisma pode pedir para você dar um nome para a migração. Pode ser qualquer nome (ex: initial_setup).

3. Executando a Aplicação
Com tudo configurado, inicie o servidor de desenvolvimento:

npm run dev

Abra seu navegador e acesse http://localhost:3000. A aplicação estará rodando!

✨ Ferramentas Úteis
Prisma Studio
O Prisma vem com uma interface gráfica incrível para visualizar e manipular os dados do seu banco diretamente no navegador. Para usá-la, rode o seguinte comando em um novo terminal:

npx prisma studio

Isso abrirá o Prisma Studio,