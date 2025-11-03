// Em: src/app/(pages)/layout.tsx

import { requireAuth } from "@/lib/require-auth";
import { AppShell } from "@/components/AppShell";

export default async function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return <AppShell>{children}</AppShell>;
}