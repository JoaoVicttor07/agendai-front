"use client";

import React from "react";
import Link from "next/link";

import { HeaderMinimal } from "../_components/headerMinimal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  CalendarClock,
  HelpCircle,
  ShieldCheck,
  Loader2,
  CalendarIcon
} from "lucide-react";

type FormData = {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  data: string; // yyyy-mm-dd
  hora: string;
};

// Dados temporários enquanto não tem API

const ESPECIALIDADES = [
  "Nutrição",
  "Psicologia",
  "Direito",
];

const HORARIOS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function normalizeCPF(cpf: string): string {
  const numericCPF = cpf.replace(/\D/g, "");
  return numericCPF;
}

// Será implementado o endpoint da API
async function checkUser(
  cpf: string
): Promise<{ exists: boolean; userData?: Partial<FormData> }> {
  // Simula delay da api
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // dados falsos temporários
  if (cpf === "12345678900") {
    return {
      exists: true,
      userData: {
        nome: "João da Silva",
        email: "joao.silva@email.com",
        telefone: "(84) 99999-9999",
      },
    };
  }

  return { exists: false };
}


function generateProtocol() {
  const ts = new Date();
  const stamp = `${ts.getFullYear()}${String(ts.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(ts.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AGD-${stamp}-${rand}`;
}

export default function SchedulePage() {
  const [step, setStep] = React.useState(-1);
  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const [form, setForm] = React.useState<FormData>({
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    especialidade: "",
    data: "",
    hora: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [userFound, setUserFound] = React.useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [protocol, setProtocol] = React.useState<string | null>(null);

  const [foundDialogOpen, setFoundDialogOpen] = React.useState(false);
  const [attemptedNext, setAttemptedNext] = React.useState(false);
  // Date picker state
  const dateFromForm = form.data ? new Date(form.data + "T00:00:00") : undefined; // safe parse
  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateMonth, setDateMonth] = React.useState<Date | undefined>(dateFromForm);

  function formatDisplayDate(date: Date | undefined) {
    if (!date) return "";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function dateToISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Validation per step
  const isStepValid = React.useMemo(() => {
    if (step === -1) {
      // CPF precisa conter exatamente 11 dígitos
      return form.cpf.replace(/\D/g, "").length === 11;
    }
    if (step === 0) {
      return (
        form.nome.trim().length >= 3 &&
        /^\S+@\S+\.\S+$/.test(form.email) &&
        form.telefone.trim().length >= 8
      );
    }
    if (step === 1) {
      return form.especialidade.trim().length > 0;
    }
    if (step === 2) {
      return form.data.trim().length === 10 && form.hora.trim().length > 0;
    }
    // Step 3 (revisão) depende dos anteriores já válidos
    return true;
  }, [step, form]);

  async function checkUserAndProceed() {
    if (!isStepValid) return;

    setIsLoading(true);
    try {
      const result = await checkUser(normalizeCPF(form.cpf));
      setUserFound(result.exists);

      // If user exists, prefill their data
      if (result.exists && result.userData) {
        setForm((prev) => ({
          ...prev,
          ...result.userData,
        }));
  setStep(0);
  setFoundDialogOpen(true); // abre alerta informativo
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setUserFound(false);
    } finally {
      setIsLoading(false);
    }
  }

  function next() {
    // Marca tentativa para exibir mensagens de erro
    setAttemptedNext(true);
    if (step === -1) {
      if (!isStepValid) return; // CPF inválido
      if (userFound === false) {
        setAttemptedNext(false);
        setStep(0);
      } else {
        checkUserAndProceed();
      }
      return;
    }
    if (!isStepValid) return; // impede avanço mas mantém botão habilitado
    if (step < totalSteps - 1) {
      setAttemptedNext(false);
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (step === 0) {
      setForm((prev) => ({
        cpf: prev.cpf,
        nome: "",
        email: "",
        telefone: "",
        especialidade: "",
        data: "",
        hora: "",
      }));
      setUserFound(null);
      setStep(-1);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  function confirmarAgendamento() {
    const p = generateProtocol();
    setProtocol(p);
    setDialogOpen(true);
  }

  return (
    <>
      <HeaderMinimal />
      <main className="pt-16">
        <section className="container mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Agende seu atendimento
            </h1>
            <p className="text-muted-foreground mt-1">
              Preencha as informações para marcar sua consulta.
            </p>
          </header>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">
                  {step === -1
                    ? "Identificação"
                    : `Passo ${step + 1} de ${totalSteps}`}
                </p>
                <p className="text-sm font-medium">{Math.round(progress)}%</p>
              </div>
              <Progress value={Math.max(0, progress)} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left - Form Steps */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">
                  {
                    [
                      "Identificação",
                      "Seus dados",
                      "Escolha da especialidade",
                      "Data e horário",
                      "Revisão e confirmação",
                    ][step + 1]
                  }
                </CardTitle>
                <CardDescription>
                  {
                    [
                      "Informe seu CPF para identificação",
                      "Preencha todos os campos para continuar.",
                      "Selecione a área desejada.",
                      "Escolha a melhor data e um horário disponível.",
                      "Revise as informações antes de confirmar o agendamento.",
                    ][step + 1]
                  }
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {step === -1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        CPF
                      </label>
                      <Input
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={(e) => {
                          // permitir somente dígitos (limite 11)
                          const onlyDigits = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 11);
                          update("cpf", onlyDigits);
                          if (userFound !== null) setUserFound(null); // reset identificação ao alterar
                        }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Informe seu CPF (somente Números).
                      </p>
                      {attemptedNext && !isStepValid && (
                        <p className="mt-1 text-xs text-red-500">
                          CPF deve conter 11 números.
                        </p>
                      )}
                    </div>

                    {userFound === false && (
                      <div className="text-sm text-amber-500">
                        Usuário não encontrado. Você precisará fornecer seus
                        dados no próximo passo.
                      </div>
                    )}
                  </div>
                )}

                {step === 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-sm font-medium">
                        Nome completo
                      </label>
                      <Input
                        placeholder="Seu nome"
                        value={form.nome}
                        onChange={(e) => update("nome", e.target.value)}
                      />
                      {attemptedNext && step === 0 && form.nome.trim().length < 3 && (
                        <p className="mt-1 text-xs text-red-500">Informe seu nome.</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        E-mail
                      </label>
                      <Input
                        type="email"
                        placeholder="voce@email.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                      {attemptedNext && step === 0 && !/^\S+@\S+\.\S+$/.test(form.email) && (
                        <p className="mt-1 text-xs text-red-500">Informe um e-mail válido.</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Telefone
                      </label>
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={form.telefone}
                        onChange={(e) => update("telefone", e.target.value)}
                      />
                      {attemptedNext && step === 0 && form.telefone.trim().length < 8 && (
                        <p className="mt-1 text-xs text-red-500">Informe um telefone válido.</p>
                      )}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-sm font-medium">
                        Especialidade
                      </label>
                      <Select value={form.especialidade} onValueChange={(val) => update("especialidade", val)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Especialidades</SelectLabel>
                            {ESPECIALIDADES.map((esp) => (
                              <SelectItem key={esp} value={esp}>
                                {esp}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {attemptedNext && step === 1 && !isStepValid && (
                        <p className="mt-1 text-xs text-red-500">
                          Selecione uma especialidade.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Data
                        </label>
                        <div className="relative flex gap-2">
                          <Input
                            id="date"
                            readOnly
                            value={formatDisplayDate(dateFromForm)}
                            placeholder="dd/mm/aaaa"
                            className="bg-background pr-10 cursor-pointer"
                            onClick={() => setDateOpen(true)}
                            onKeyDown={(e) => {
                              if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setDateOpen(true);
                              }
                            }}
                          />
                          <Popover open={dateOpen} onOpenChange={setDateOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                id="date-picker"
                                variant="ghost"
                                type="button"
                                className="absolute top-1/2 right-2 size-7 -translate-y-1/2"
                              >
                                <CalendarIcon className="size-4" />
                                <span className="sr-only">Selecionar data</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                              sideOffset={4}
                            >
                              <Calendar
                                mode="single"
                                selected={dateFromForm}
                                captionLayout="dropdown"
                                month={dateMonth}
                                onMonthChange={setDateMonth}
                                disabled={(date) => {
                                  const today = new Date();
                                  today.setHours(0,0,0,0);
                                  return date < today; // bloqueia dias passados
                                }}
                                onSelect={(date) => {
                                  if (!date) return;
                                  update("data", dateToISO(date));
                                  update("hora", "");
                                  setDateMonth(date);
                                  setDateOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {attemptedNext && step === 2 && !form.data && (
                          <p className="mt-1 text-xs text-red-500">
                            Selecione uma data.
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-1">
                        <label className="mb-1 block text-sm font-medium">
                          Horário
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {HORARIOS.map((h) => {
                            const selected = form.hora === h;
                            const disabled = !form.data; // só permite escolher após selecionar a data
                            return (
                              <Button
                                key={h}
                                type="button"
                                size="sm"
                                variant={selected ? "default" : "outline"}
                                disabled={disabled}
                                onClick={() => update("hora", h)}
                              >
                                {h}
                              </Button>
                            );
                          })}
                        </div>
                        {attemptedNext &&
                          step === 2 &&
                          form.data &&
                          !form.hora && (
                            <p className="mt-1 text-xs text-red-500">
                              Selecione um horário.
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <ResumoItem label="Nome" value={form.nome} />
                    <ResumoItem label="E-mail" value={form.email} />
                    <ResumoItem label="Telefone" value={form.telefone} />
                    <ResumoItem
                      label="Especialidade"
                      value={form.especialidade}
                    />

                    <ResumoItem
                      label="Data"
                      value={form.data && formatDate(form.data)}
                    />
                    <ResumoItem label="Horário" value={form.hora} />
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <Button variant="outline" onClick={back} disabled={step === -1}>
                  Voltar
                </Button>

                {step < totalSteps - 1 ? (
                  <Button onClick={next} disabled={step === -1 && isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      "Avançar"
                    )}
                  </Button>
                ) : (
                  <Button onClick={confirmarAgendamento}>
                    Confirmar agendamento
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Info importantes / Beneficios / Ajuda */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="size-5 text-primary" />
                    <CardTitle>Sua consulta</CardTitle>
                  </div>
                  <CardDescription>
                    Benefícios e informações rápidas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 text-green-600" />
                      <span>
                        Agendamento simples e rápido em poucos passos.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 size-4 text-primary" />
                      <span>Seus dados são tratados com segurança.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 text-green-600" />
                      <span>Confirmação imediata com protocolo.</span>
                    </li>
                  </ul>

                  <div className="mt-6 rounded-md border p-3">
                    <p className="text-sm font-medium">Info importante</p>
                    <p className="text-sm text-muted-foreground">
                      Neque porro quisquam est qui dolorem ipsum quia dolor sit
                      amet, consectetur, adipisci velit.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HelpCircle className="size-4" />
                      <span>Precisa de ajuda?</span>
                    </div>
                    <Link
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                      href="#"
                    >
                      Fale com o suporte
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Dialog: usuário encontrado */}
        <AlertDialog open={foundDialogOpen} onOpenChange={setFoundDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cadastro localizado</AlertDialogTitle>
              <AlertDialogDescription>
                Encontramos seus dados e eles foram preenchidos automaticamente. Revise suas informações e avance para continuar o agendamento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setFoundDialogOpen(false)}>Entendi</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Success Dialog */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Agendamento confirmado!</AlertDialogTitle>
              <AlertDialogDescription>
                Seu atendimento foi agendado com sucesso.
                {protocol && (
                  <span className="mt-2 block font-medium text-foreground">
                    Protocolo: {protocol}
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Fechar
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center"
                >
                  Ir para a página inicial
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </>
  );
}

function ResumoItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-md border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || "—"}</p>
    </div>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
