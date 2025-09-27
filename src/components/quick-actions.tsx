import { Button } from "@/components/ui/button";
import { Users, FileText, Settings, ClipboardClock } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex space-x-2 hidden lg:block">
      <Button className="cursor-pointer" variant="outline" size="sm">
        <ClipboardClock className="w-4 h-4 mr-2" />
        Agendamentos
      </Button>
      <Button className="cursor-pointer" variant="outline" size="sm">
        <Users className="w-4 h-4 mr-2" />
        Pacientes
      </Button>
      <Button className="cursor-pointer" variant="outline" size="sm">
        <FileText className="w-4 h-4 mr-2" />
        Relatórios
      </Button>
      <Button className="cursor-pointer" variant="ghost" size="sm">
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  );
}
