import { PatientsManagement } from "@/components/patients-management";

export default function PatientsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground">
            Consulte os pacientes cadastrados no sistema
          </p>
        </div>
        
      </div>
      <PatientsManagement/>
    </main>
  );
}
