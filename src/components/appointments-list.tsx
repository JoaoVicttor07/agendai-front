"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Stethoscope,
  Building2,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AppointmentDetails } from "./appointments-details";
import { cn } from "@/lib/utils";
import { FilterValues } from "./appointments-filters";

// Mock data - todos os agendamentos disponíveis
const allAppointments = [
  {
    id: "1",
    patient: {
      name: "Carlos Eduardo Silva",
      age: 45,
      phone: "(11) 98765-4321",
    },
    professional: {
      name: "João Silva",
      specialty: "Nutrição",
      responsibleProfessor: "Liliane Souza",
    },
    department: "Núcleo de Práticas Integradas",
    date: "2025-01-15",
    time: "09:00",
    status: "pending",
  },
  {
    id: "2",
    patient: {
      name: "Ana Paula Oliveira",
      age: 32,
      phone: "(11) 91234-5678",
    },
    professional: {
      name: "Maria Santos",
      specialty: "Direito Trabalhista",
      responsibleProfessor: "Carlos Pereira",
    },
    department: "Núcleo de Práticas Jurídicas",
    date: "2025-01-15",
    time: "10:30",
    status: "completed",
  },
  {
    id: "3",
    patient: {
      name: "Roberto Mendes",
      age: 58,
      phone: "(11) 99876-5432",
    },
    professional: {
      name: "Pedro Oliveira",
      specialty: "Psicologia",
      responsibleProfessor: "Ana Costa",
    },
    department: "Núcleo de Práticas Integradas",
    date: "2025-01-15",
    time: "14:00",
    status: "cancelled",
  },
  {
    id: "4",
    patient: {
      name: "Juliana Costa",
      age: 28,
      phone: "(11) 97654-3210",
    },
    professional: {
      name: "Ana Costa",
      specialty: "Veterinária",
      responsibleProfessor: "Marcos Lima",
    },
    department: "Medicina Veterinária",
    date: "2025-01-15",
    time: "15:30",
    status: "absent",
  },
  {
    id: "5",
    patient: {
      name: "Fernando Alves",
      age: 51,
      phone: "(11) 96543-2109",
    },
    professional: {
      name: "João Silva",
      specialty: "Direito do consumidor",
      responsibleProfessor: "Flávia Barretos",
    },
    department: "Núcleo de Práticas Jurídicas",
    date: "2025-01-16",
    time: "08:30",
    status: "pending",
  },
  {
    id: "6",
    patient: {
      name: "Mariana Souza",
      age: 35,
      phone: "(11) 95432-1098",
    },
    professional: {
      name: "João Silva",
      specialty: "Nutrição",
      responsibleProfessor: "Liliane Souza",
    },
    department: "Núcleo de Práticas Integradas",
    date: "2025-01-17",
    time: "11:00",
    status: "completed",
  },
  {
    id: "7",
    patient: {
      name: "Paulo Santos",
      age: 42,
      phone: "(11) 94321-0987",
    },
    professional: {
      name: "Maria Santos",
      specialty: "Direito Trabalhista",
      responsibleProfessor: "Carlos Pereira",
    },
    department: "Núcleo de Práticas Jurídicas",
    date: "2025-01-18",
    time: "09:30",
    status: "cancelled",
  },
  {
    id: "8",
    patient: {
      name: "Beatriz Lima",
      age: 29,
      phone: "(11) 93210-9876",
    },
    professional: {
      name: "Pedro Oliveira",
      specialty: "Psicologia",
      responsibleProfessor: "Ana Costa",
    },
    department: "Núcleo de Práticas Integradas",
    date: "2025-01-20",
    time: "14:30",
    status: "pending",
  },
  {
    id: "9",
    patient: {
      name: "Ricardo Ferreira",
      age: 55,
      phone: "(11) 92109-8765",
    },
    professional: {
      name: "Ana Costa",
      specialty: "Veterinária",
      responsibleProfessor: "Marcos Lima",
    },
    department: "Medicina Veterinária",
    date: "2025-01-22",
    time: "10:00",
    status: "absent",
  },
  {
    id: "10",
    patient: {
      name: "Camila Rodrigues",
      age: 38,
      phone: "(11) 91098-7654",
    },
    professional: {
      name: "João Silva",
      specialty: "Nutrição",
      responsibleProfessor: "Liliane Souza",
    },
    department: "Núcleo de Práticas Integradas",
    date: "2025-02-01",
    time: "08:00",
    status: "pending",
  },
];

const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Concluído",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    dot: "bg-green-500",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    dot: "bg-red-500",
  },
  absent: {
    label: "Ausente",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    dot: "bg-orange-500",
  },
};

interface AppointmentsListProps {
  showResults: boolean;
  filters: FilterValues | null;
}

export function AppointmentsList({ showResults, filters }: AppointmentsListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<
    (typeof allAppointments)[0] | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Aplicar filtros aos agendamentos
  const filteredAppointments = useMemo(() => {
    if (!filters) return allAppointments;

    return allAppointments.filter((appointment) => {
      // Filtro de status
      if (filters.status !== "all" && appointment.status !== filters.status) {
        return false;
      }

      // Filtro de especialidade
      if (filters.specialty !== "all") {
        const specialtyMap: Record<string, string> = {
          "nutrition": "Nutrição",
          "labor-law": "Direito Trabalhista",
          "consumer-law": "Direito do consumidor",
          "veterinary": "Veterinária",
          "psychology": "Psicologia",
        };
        if (appointment.professional.specialty !== specialtyMap[filters.specialty]) {
          return false;
        }
      }

      // Filtro de setor
      if (filters.sector !== "all") {
        const sectorMap: Record<string, string> = {
          "integrated-pratices": "Núcleo de Práticas Integradas",
          "juridical-practice": "Núcleo de Práticas Jurídicas",
          "veterinary-medicine": "Medicina Veterinária",
        };
        if (appointment.department !== sectorMap[filters.sector]) {
          return false;
        }
      }

      // Filtro de responsável (profissional)
      if (filters.professional !== "all") {
        const professionalMap: Record<string, string> = {
          "silva": "João Silva",
          "santos": "Maria Santos",
          "oliveira": "Pedro Oliveira",
          "costa": "Ana Costa",
        };
        if (appointment.professional.name !== professionalMap[filters.professional]) {
          return false;
        }
      }

      // Filtro de data inicial
      if (filters.dateFrom) {
        const appointmentDate = new Date(appointment.date);
        const filterDateFrom = new Date(filters.dateFrom);
        filterDateFrom.setHours(0, 0, 0, 0);
        if (appointmentDate < filterDateFrom) {
          return false;
        }
      }

      // Filtro de data final
      if (filters.dateTo) {
        const appointmentDate = new Date(appointment.date);
        const filterDateTo = new Date(filters.dateTo);
        filterDateTo.setHours(23, 59, 59, 999);
        if (appointmentDate > filterDateTo) {
          return false;
        }
      }

      // Filtro de termo de busca (nome do paciente ou telefone)
      if (filters.searchTerm && filters.searchTerm.trim() !== "") {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchName = appointment.patient.name.toLowerCase().includes(searchLower);
        const matchPhone = appointment.patient.phone.includes(searchLower);
        if (!matchName && !matchPhone) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleAppointmentClick = (appointment: (typeof allAppointments)[0]) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  if (!showResults) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card border border-border rounded-lg">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Nenhuma busca realizada</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Selecione os filtros desejados e clique em &quot;Buscar agendamentos&quot; para visualizar os resultados.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredAppointments.length} agendamento{filteredAppointments.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card border border-border rounded-lg">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Não foram encontrados agendamentos com os filtros selecionados. Tente ajustar os filtros.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAppointments.map((appointment) => {
            const statusInfo =
              statusConfig[appointment.status as keyof typeof statusConfig];

            return (
              <button
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className="w-full bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200 hover:shadow-lg group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn("h-2 w-2 rounded-full", statusInfo.dot)}
                        />
                        <div className="text-left">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {appointment.patient.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.patient.phone}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("border", statusInfo.color)}
                      >
                        {statusInfo.label}
                      </Badge>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Stethoscope className="h-4 w-4" />
                        <span>{appointment.professional.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{appointment.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(appointment.date).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </button>
            );
          })}
          </div>
        )}
      </div>

      <AppointmentDetails
        appointment={selectedAppointment}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  );
}
