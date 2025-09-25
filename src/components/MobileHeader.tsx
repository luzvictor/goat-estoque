'use client'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar"; // Reutilizamos a sidebar!

export function MobileHeader() {
  return (
    // O header em si não precisa de um componente <header> aqui, pois já está dentro de um no AppShell
    <div className="flex h-14 items-center md:hidden"> {/* Modificado para não renderizar um header aninhado e só aparecer no mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0" 
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu de navegação</span>
          </Button>
        </SheetTrigger>
        {/* CORREÇÃO APLICADA AQUI */}
        <SheetContent side="left" className="flex flex-col p-0 bg-sidebar border-none">
          {/* Reutilizamos o mesmo componente Sidebar aqui dentro, agora com o fundo correto */}
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
