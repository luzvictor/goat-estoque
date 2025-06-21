-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'VENDEDOR');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'VENDEDOR';
