'use client'

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Package } from "lucide-react";
import { Sidebar } from "./Sidebar"; // Reutilizamos a sidebar!

export function MobileHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden" // Só aparece em telas menores que 'md'
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu de navegação</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          {/* Reutilizamos o mesmo componente Sidebar aqui dentro */}
          <Sidebar />
        </SheetContent>
      </Sheet>
      
      {/* Você pode adicionar outros elementos no header mobile aqui, como um campo de busca global */}
      <div className="w-full flex-1">
        {/* Exemplo: <Search /> */}
      </div>
    </header>
  );
}