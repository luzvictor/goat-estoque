// Em: src/app/layout.tsx

import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
// Não precisamos mais importar o AppShell aqui

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
    // A classe 'dark' foi removida para usar o tema claro como padrão
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
        {/* Apenas renderizamos os 'children'. O layout específico virá das subpastas. */}
        {children}

        <Toaster richColors position="top-right" /> 
        </ThemeProvider>
      </body>
    </html>
  );
}