import { requireAuth } from "@/lib/require-auth";
import ProdutosPageClient from "./_client";

export default async function ProdutosPage() {
  await requireAuth();
  return <ProdutosPageClient />;
}
