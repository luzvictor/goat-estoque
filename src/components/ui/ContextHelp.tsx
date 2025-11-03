'use client'

import {
  Popover,
  PopoverContent,
  // --- 1. REMOVIDO O 'PopoverPortal' DO IMPORT ---
  PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

type ContextHelpProps = {
  content: React.ReactNode;
  title?: string;
};

/**
 * Um ícone de (?) que abre um Popover com conteúdo de ajuda contextual.
 */
export function ContextHelp({ content, title }: ContextHelpProps) {
  return (
    <Popover>
     <PopoverTrigger asChild>
  <button
    type="button"
    className="cursor-help rounded-full ..."
  >
    {/* Estes estão DENTRO do botão, o que é correto */}
    <HelpCircle className="h-4 w-4" />
    <span className="sr-only">Abrir ajuda</span>
  </button>
</PopoverTrigger>
      
      {/* --- 2. REMOVIDO O WRAPPER <PopoverPortal> --- */}
      {/* O PopoverContent do shadcn/ui já gerencia seu próprio portal. */}
      <PopoverContent
        // Mantemos o z-[100] para garantir que apareça sobre os modais (z-50)
        className="w-80 z-100"
        side="top"
        align="start"
        // Impede que cliques dentro da ajuda fechem o popover
        onClick={(e) => e.stopPropagation()}

        // Impede o clique "fora" (no overlay do modal) de fechar o modal
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          {title && <h4 className="font-medium leading-none">{title}</h4>}
          <div className="text-sm text-muted-foreground">{content}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

