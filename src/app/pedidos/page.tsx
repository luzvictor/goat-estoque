import { requireAuth } from "@/lib/require-auth";
import PedidosPageClient from "./_client";

export default async function PedidosPage() {
  await requireAuth();
  return <PedidosPageClient />;
}
