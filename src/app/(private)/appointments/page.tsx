import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agendamentos",
    description: "Consulte seus agendamentos",
};

export default function Appointments() {
    return (
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
              <p className="text-muted-foreground">Consulte e gerencie todos os agendamentos do sistema</p>
            </div>
          </div>
        </main>
    )
}