"use client";

import { useState, useMemo } from "react";
import {
  Search,
  UserCheck,
  UserX,
  Edit,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockPatients = [
  {
    id: "1",
    name: "Maria Silva Santos",
    email: "maria.silva@email.com",
    phone: "(84) 99999-1234",
    cpf: "123.456.789-00",
    active: true,
    registeredAt: "2024-01-15",
    lastAppointment: "2024-06-10",
  },
  {
    id: "2",
    name: "João Pedro Oliveira",
    email: "joao.pedro@email.com",
    phone: "(84) 98888-5678",
    cpf: "987.654.321-00",
    active: true,
    registeredAt: "2024-02-20",
    lastAppointment: "2024-06-08",
  },
  {
    id: "3",
    name: "Ana Carolina Souza",
    email: "ana.souza@email.com",
    phone: "(84) 97777-9012",
    cpf: "456.789.123-00",
    active: false,
    registeredAt: "2023-11-05",
    lastAppointment: "2024-03-15",
  },
  {
    id: "4",
    name: "Carlos Eduardo Lima",
    email: "carlos.lima@email.com",
    phone: "(84) 96666-3456",
    cpf: "789.123.456-00",
    active: true,
    registeredAt: "2024-03-10",
    lastAppointment: "2024-06-12",
  },
  {
    id: "5",
    name: "Beatriz Fernandes Costa",
    email: "beatriz.costa@email.com",
    phone: "(84) 95555-7890",
    cpf: "321.654.987-00",
    active: true,
    registeredAt: "2024-04-01",
    lastAppointment: "2024-06-11",
  },
];

type Patient = (typeof mockPatients)[0];

export function PatientsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState(mockPatients);

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients;

    const search = searchQuery.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(search) ||
        patient.email.toLowerCase().includes(search) ||
        patient.phone.includes(search) ||
        patient.cpf.includes(search)
    );
  }, [patients, searchQuery]);

  const handleEditPatient = (patient: Patient) => {
    console.log("Editar paciente:", patient);
    // TODO: Implementar modal de edição
  };

  const handleToggleStatus = (
    patient: Patient,
    action: "activate" | "deactivate"
  ) => {
    // Atualiza o status diretamente
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id
          ? {
              ...p,
              active: action === "activate",
            }
          : p
      )
    );
  };

  const activeCount = patients.filter((p) => p.active).length;
  const inactiveCount = patients.filter((p) => !p.active).length;

  return (
    <div className="flex-1 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total de Pacientes
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {patients.length}
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Pacientes Ativos
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {activeCount}
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Pacientes Inativos
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {inactiveCount}
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserX className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, e-mail, telefone ou CPF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredPatients.length}{" "}
            {filteredPatients.length === 1 ? "paciente" : "pacientes"}
          </div>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Nenhum paciente encontrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {searchQuery
                ? "Não foram encontrados pacientes com os critérios de busca."
                : "Nenhum paciente cadastrado no sistema."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3 lg:hidden">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {patient.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Cadastrado em{" "}
                        {new Date(patient.registeredAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={patient.active ? "default" : "secondary"}
                        className="font-medium"
                      >
                        {patient.active ? "Ativo" : "Inativo"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleEditPatient(patient)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar informações
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {patient.active ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleStatus(patient, "deactivate")
                              }
                              className="text-red-600"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Desativar cadastro
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleStatus(patient, "activate")
                              }
                              className="text-green-600"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Ativar cadastro
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground truncate">
                        {patient.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{patient.phone}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground font-mono">
                        {patient.cpf}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs">
                          {new Date(patient.lastAppointment).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="hidden lg:block card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Paciente
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Contato
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      CPF
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Última Consulta
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {patient.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Cadastrado em{" "}
                            {new Date(patient.registeredAt).toLocaleDateString(
                              "pt-BR"
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm text-foreground">
                            {patient.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {patient.phone}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground font-mono">
                          {patient.cpf}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={patient.active ? "default" : "secondary"}
                          className="font-medium"
                        >
                          {patient.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">
                          {new Date(patient.lastAppointment).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => handleEditPatient(patient)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar informações
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {patient.active ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleToggleStatus(patient, "deactivate")
                                }
                                className="text-red-600"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Desativar cadastro
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleToggleStatus(patient, "activate")
                                }
                                className="text-green-600"
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Ativar cadastro
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
