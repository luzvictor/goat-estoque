import { requireAuth } from "@/lib/require-auth";
import EntradasPageClient from "./_client";

export default async function EntradasPage() {
  await requireAuth();
  return <EntradasPageClient />;
}
