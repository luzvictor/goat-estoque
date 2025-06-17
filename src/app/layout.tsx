import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/AppShell"; // 1. Importa o novo componente

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "GOAT Store - Controle de Estoque",
  description: "Sistema de gerenciamento para GOAT Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // A classe "dark" aqui ativa o tema escuro para toda a aplicação.
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {/* 2. O AppShell agora gerencia qual layout será exibido para cada página */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
