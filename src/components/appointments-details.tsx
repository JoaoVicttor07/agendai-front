"use client";

import {
  Calendar,
  User,
  Stethoscope,
  X,
  CalendarClock,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  completed: {
    label: "Concluído",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  absent: {
    label: "Ausente",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
};

// interface Appointment {
//   id: string | number;
//   status: "pending" | "completed" | "cancelled" | "absent";
//   patient: {
//     name: string;
//     phone: string;
//   };
//   professional: {
//     name: string;
//     specialty: string;
//     studentResponsible: string;
//   };
//   type: string;
//   date: string | Date;
//   time: string;
//   department: string;
//   createdBy: string;
//   createdAt: string | Date;
// }

interface AppointmentDetailsProps {
  appointment: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentDetails({
  appointment,
  open,
  onOpenChange,
}: AppointmentDetailsProps) {
  if (!appointment) return null;

  const statusInfo =
    statusConfig[appointment.status as keyof typeof statusConfig];

  const canCancel = !["absent", "cancelled", "completed"].includes(
    appointment.status
  );
  const canReschedule = appointment.status === "pending";

  const handleCancel = () => {
    console.log("[v0] Cancelando agendamento:", appointment.id);
    // Lógica de cancelamento será implementada aqui
  };

  const handleReschedule = () => {
    console.log("[v0] Reagendando:", appointment.id);
    // Lógica de reagendamento será implementada aqui
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col h-full p-0">
        <div className="px-6 pt-6 pb-4 border-b shrink-0">
          <SheetHeader>
            <SheetTitle>Detalhes do Agendamento</SheetTitle>
            <SheetDescription>
              Informações completas sobre o agendamento
            </SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-6 py-6 px-6">
            {/* Status */}
            <div>
              <Badge
                variant="outline"
                className={cn("border", statusInfo.color)}
              >
                {statusInfo.label}
              </Badge>
            </div>

            {/* Informações do Paciente */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Informações do Paciente
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nome</span>
                  <span className="text-sm font-medium">
                    {appointment.patient.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Telefone
                  </span>
                  <span className="text-sm font-medium">
                    {appointment.patient.phone}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Informações do Profissional */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Informações do Responsável
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nome</span>
                  <span className="text-sm font-medium">
                    {appointment.professional.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Especialidade
                  </span>
                  <span className="text-sm font-medium">
                    {appointment.professional.specialty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Professor Responsável
                  </span>
                  <span className="text-sm font-medium">
                    {appointment.professional.responsibleProfessor}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Detalhes do Agendamento */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Detalhes do Agendamento
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Data</span>
                  <span className="text-sm font-medium">
                    {new Date(appointment.date).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Horário</span>
                  <span className="text-sm font-medium">
                    {appointment.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Setor</span>
                  <span className="text-sm font-medium">
                    {appointment.department}
                  </span>
                </div>
              </div>
            </div>



            {/* <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Aluno Responsável
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nome</span>
                  <span className="text-sm font-medium">
                    {appointment.studentResponsible}
                  </span>
                </div>
              </div>
            </div> */}


           
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t bg-background shrink-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={!canCancel}
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar Agendamento
            </Button>
            <Button
              className="flex-1"
              disabled={!canReschedule}
              onClick={handleReschedule}
            >
              <CalendarClock className="h-4 w-4 mr-2" />
              Reagendar
            </Button>
          </div>
          {!canCancel && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Agendamentos {statusInfo.label.toLowerCase()}s não podem ser
              cancelados
            </p>
          )}
          {!canReschedule && appointment.status !== "pending" && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Apenas agendamentos pendentes podem ser reagendados
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
