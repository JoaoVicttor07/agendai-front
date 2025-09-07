"use client";

import React from "react";
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
  CheckCircle2,
  CalendarClock,
  HelpCircle,
  ShieldCheck,
  Link,
  Loader2,
} from "lucide-react";
import clsx from "clsx";
import { normalize } from "path";

type FormData = {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  tipo: "Online" | "Presencial" | "";
  data: string; // yyyy-mm-dd
  hora: string;
};

const ESPECIALIDADES = [
  "Clínico Geral",
  "Cardiologia",
  "Dermatologia",
  "Ginecologia",
  "Neurologia",
  "Nutrição",
  "Odontologia",
  "Oftalmologia",
  "Ortopedia",
  "Pediatria",
  "Psicologia",
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
async function verificarUsuario(
  cpf: string
): Promise<{ exists: boolean; userData?: Partial<FormData> }> {
  // Simula delay da api
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // dados falso temporários
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

function hojeISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}

function gerarProtocolo() {
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
    tipo: "",
    data: "",
    hora: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [userFound, setUserFound] = React.useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [protocolo, setProtocolo] = React.useState<string | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Validation per step
  const isStepValid = React.useMemo(() => {
    if (step === -1) {
      // CPF validation - basic check for demo purposes
      return form.cpf.replace(/\D/g, "").length === 11;
    }
    if (step === 0) {
      return (
        form.nome.trim().length >= 3 &&
        /^\S+@\S+\.\S+$/.test(form.email) &&
        form.telefone.trim().length >= 8
      );
    }
    // ...existing validation code...

    return true;
  }, [step, form]);

  async function checkUserAndProceed() {
    if (!isStepValid) return;

    setIsLoading(true);
    try {
      const result = await verificarUsuario(normalizeCPF(form.cpf));
      setUserFound(result.exists);

      // If user exists, prefill their data
      if (result.exists && result.userData) {
        setForm((prev) => ({
          ...prev,
          ...result.userData,
        }));
        setStep(0);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setUserFound(false);
    } finally {
      setIsLoading(false);
    }
  }

  function next() {
    if (step === -1) {
      if (userFound === false) {
        setStep(0);
      } else {
        checkUserAndProceed();
      }
      return;
    }

    if (step < totalSteps - 1 && isStepValid) setStep((s) => s + 1);
  }

  function back() {
    if (step === 0) {
      setForm((prev) => ({
        cpf: prev.cpf,
        nome: "",
        email: "",
        telefone: "",
        especialidade: "",
        tipo: "",
        data: "",
        hora: "",
      }));
      setUserFound(null);
      setStep(-1);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  function handleCPFChange(value: string) {
    update("cpf", value);
    if (userFound !== null) {
      setUserFound(null);
    }
  }

  function confirmarAgendamento() {
    const p = gerarProtocolo();
    setProtocolo(p);
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
                      "Informe seus dados básicos para contato.",
                      "Selecione a área desejada e o tipo de atendimento.",
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
                        onChange={(e) => update("cpf", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Informe seu CPF.
                      </p>
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
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-sm font-medium">
                        Especialidade
                      </label>
                      <select
                        className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        value={form.especialidade}
                        onChange={(e) =>
                          update("especialidade", e.target.value)
                        }
                      >
                        <option value="">Selecione…</option>
                        {ESPECIALIDADES.map((esp) => (
                          <option key={esp} value={esp}>
                            {esp}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="mb-2 block text-sm font-medium">
                        Tipo de atendimento
                      </span>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {(["Online", "Presencial"] as const).map((tipo) => {
                          const selected = form.tipo === tipo;
                          return (
                            <button
                              key={tipo}
                              type="button"
                              onClick={() => update("tipo", tipo)}
                              className={clsx(
                                "flex items-center justify-between rounded-md border px-4 py-3 text-left text-sm shadow-xs transition",
                                selected
                                  ? "border-ring bg-primary text-primary-foreground"
                                  : "border-input hover:bg-accent"
                              )}
                              aria-pressed={selected}
                            >
                              <span className="font-medium">{tipo}</span>
                              <CheckCircle2
                                className={clsx(
                                  "size-5",
                                  selected ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
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
                        <Input
                          type="date"
                          min={hojeISO()}
                          value={form.data}
                          onChange={(e) => {
                            update("data", e.target.value);
                            // Limpar horário ao trocar a data
                            update("hora", "");
                          }}
                        />
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
                        <p className="text-xs text-muted-foreground mt-2">
                          Os horários são ilustrativos (dados falsos).
                        </p>
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
                      value={form.data && formatarData(form.data)}
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
                  <Button onClick={next} disabled={!isStepValid || isLoading}>
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
                  <Button
                    onClick={confirmarAgendamento}
                    disabled={!isStepValid}
                  >
                    Confirmar agendamento
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Right - Info / Benefits / Help */}
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
                    <a
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                      href="mailto:suporte@agendai.com"
                    >
                      Fale com o suporte
                    </a>
                  </div>
                </CardFooter>
              </Card>

              {/* Live summary */}
              {/* <Card>
                <CardHeader className="border-b">
                  <CardTitle>Resumo</CardTitle>
                  <CardDescription>Veja o que já foi preenchido.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-2 text-sm">
                  <ResumoLinha label="Nome" value={form.nome} />
                  <ResumoLinha label="Especialidade" value={form.especialidade} />
                  <ResumoLinha label="Tipo" value={form.tipo} />
                  <ResumoLinha label="Data" value={form.data && formatarData(form.data)} />
                  <ResumoLinha label="Horário" value={form.hora} />
                </CardContent>
              </Card> */}
            </div>
          </div>
        </section>

        {/* Success Dialog */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Agendamento confirmado!</AlertDialogTitle>
              <AlertDialogDescription>
                Seu atendimento foi agendado com sucesso.
                {protocolo && (
                  <span className="mt-2 block font-medium text-foreground">
                    Protocolo: {protocolo}
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

// function ResumoLinha({ label, value }: { label: string; value?: string | null }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <span className="text-muted-foreground">{label}</span>
//       <span className="font-medium">{value || "—"}</span>
//     </div>
//   )
// }

function formatarData(iso: string) {
  // yyyy-mm-dd -> dd/mm/yyyy
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
