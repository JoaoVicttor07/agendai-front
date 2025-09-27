import { Metadata } from "next";
import { SectionCards } from "@/components/sections-card";
import { QuickActions } from "@/components/quick-actions";
import { ChartAreaInteractive } from "@/components/chart-interactive";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AgendAI - Dashboard",
};

// export const iframeHeight = "800px";
// export const description = "A sidebar with a header and a search form.";

export default function Page() {
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
        <div className="">
          <ChartAreaInteractive />
        </div>
      </main>
    </div>
  );
}
