import { requireAuth } from "@/lib/require-auth";
import DashboardClient from "./_client";

export default async function DashboardPage() {
  await requireAuth();
  return <DashboardClient />;
}
