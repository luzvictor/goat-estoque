import { requireAuth } from "@/lib/require-auth";
import DashboardPageClient from "./_client";

export default async function DashboardPage() {
  await requireAuth();
  return <DashboardPageClient />;
}