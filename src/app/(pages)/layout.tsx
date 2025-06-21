// Em: src/app/(pages)/layout.tsx

import { requireAuth } from "@/lib/require-auth";
import { AppShell } from "@/components/AppShell";

export default async function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Esta linha protege TODAS as páginas dentro da pasta (pages)
  // Se o usuário não estiver logado, ele será redirecionado para /login.
  await requireAuth();

  // 2. Este AppShell (com a sidebar) agora envolve TODAS as suas páginas automaticamente.
  return <AppShell>{children}</AppShell>;
}