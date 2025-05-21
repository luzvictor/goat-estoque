// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Evita recriar o PrismaClient a cada reload em dev
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // opcional: ajuda no debug
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
