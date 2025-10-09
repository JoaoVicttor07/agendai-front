import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Clock, MapPin, User } from "lucide-react";

const appointments = [
  {
    id: 1,
    patient: "Maria Silva",
    specialty: "Médicina Veterinária",
    doctor: "Nara Lima",
    time: "09:00",
    status: "pending",
    sector: "Núcleo Veterinário",
  },
  {
    id: 2,
    patient: "Carlos Oliveira",
    specialty: "Direito",
    doctor: "Flavia Souza",
    time: "10:30",
    status: "pending",
    sector: "Núcleo de Práticas Integradas",
  },
  {
    id: 3,
    patient: "Fernanda Lima",
    specialty: "Nutrição",
    doctor: "Antonio Pereira",
    time: "11:00",
    status: "pending",
    sector: "Núcleo de Práticas Integradas",
  },
  {
    id: 4,
    patient: "Roberto Santos",
    specialty: "Nutrição",
    doctor: "Mikaela Costa",
    time: "14:00",
    status: "pending",
    sector: "Núcleo Veterinário",
  },
  {
    id: 5,
    patient: "Ana Paula",
    specialty: "Psicologia",
    doctor: "Clara Albuquerque",
    time: "15:30",
    status: "pending",
    sector: "Núcleo de Práticas Integradas",
  },
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-orange-500" },
  missed: { label: "Ausente", color: "bg-yellow-500" },
  completed: { label: "Concluída", color: "bg-gray-500" },
  cancelled: { label: "Cancelado", color: "bg-red-500" },
}

export function RecentAppointments() {
  return (
    <Card className="chart-container metric-card animate-slide-in" style={{ animationDelay: `0.6s` }}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-foreground">Próximos agendamentos</CardTitle>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Periodo"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="7days">Próximos 7 dias</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="cursor-pointer">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {appointment.patient}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`status-indicator ${statusConfig[appointment.status as keyof typeof statusConfig].color}`}
                    />
                    <Badge variant="secondary" className="text-xs">
                      {statusConfig[appointment.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-1 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{appointment.doctor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{appointment.sector}</span>
                  </div>
                </div>

                <div className="mt-1">
                  <Badge variant="outline" className="text-xs">
                    {appointment.specialty}
                  </Badge>
                </div>
              </div>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
