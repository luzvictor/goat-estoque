// Em: src/app/layout.tsx

import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen w-screen overflow-hidden bg-background font-sans antialiased",
          inter.variable
        )}
      >
     <ThemeProvider
     attribute="class"
     defaultTheme="light"
     enableSystem
     disableTransitionOnChange
     >
       {children}
       <Toaster richColors position="top-right" /> 
     </ThemeProvider>
 </body>
 </html>
  );
}