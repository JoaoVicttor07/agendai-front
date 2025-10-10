import { Metadata } from "next";
import { SectionCards } from "@/components/sections-card";
import { QuickActions } from "@/components/quick-actions";
import { ChartAreaInteractive } from "@/components/chart-interactive";
import { RecentAppointments } from "@/components/recent-appointments";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AgendAI - Dashboard",
};

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral dos agendamentos e métricas do sistema
            </p>
          </div>
          <QuickActions />
        </div>
        <SectionCards />
        <div className="flex flex-col gap-5">
          <ChartAreaInteractive />
          <RecentAppointments />
        </div>
      </main>
    </div>
  );
}
