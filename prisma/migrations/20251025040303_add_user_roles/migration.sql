-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADM', 'USUARIO');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USUARIO';
