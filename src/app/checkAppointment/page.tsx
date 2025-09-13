"use client";
import React from "react";
import { HeaderMinimal } from "../_components/headerMinimal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchModeToggle, ProtocolForm, CpfDobForm, ResultArea, SearchMode, ResultData } from "./_components/SearchForms";
import { Button } from "@/components/ui/button";

export default function CheckAppointmentPage() {
  const [mode, setMode] = React.useState<SearchMode>("protocolo");
  const [protocolo, setProtocolo] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "success" | "empty" | "error">("idle");
  const [single, setSingle] = React.useState<ResultData | null>(null);
  const [history, setHistory] = React.useState<ResultData[] | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  function fakeFetch() {
    setErrorMessage(null);
    if (mode === "cpf") {
      if (!cpf && !dob) {
        setErrorMessage("Preencha o CPF e a data de nascimento.");
        setState("error");
        return;
      }
      if (!cpf) {
        setErrorMessage("CPF não informado.");
        setState("error");
        return;
      }
      if (cpf.replace(/\D/g, "").length !== 11) {
        setErrorMessage("CPF deve conter 11 dígitos.");
        setState("error");
        return;
      }
      if (!dob) {
        setErrorMessage("Data de nascimento não informada.");
        setState("error");
        return;
      }
    }

    setState("loading");
    setTimeout(() => {
      if (mode === "protocolo") {
        const success = protocolo.trim().length > 5;
        if (success) {
          setSingle({
            protocolo: protocolo || "AGD-20250912-ABC123",
            nome: "João da Silva",
            especialidade: "Nutrição",
            data: "12/09/2025",
            hora: "09:30",
            status: "concluido"
          });
          setHistory(null);
          setState("success");
        } else {
          clearResults();
          setErrorMessage("Protocolo não localizado ou inválido.");
          setState("error");
        }
      } else {
        const digits = cpf.replace(/\D/g, "");
        const validCombo = digits.length === 11 && !!dob;
        if (validCombo) {
          setHistory([
            { protocolo: "AGD-20250801-AAAA11", nome: "João da Silva", especialidade: "Nutrição", data: "01/08/2025", hora: "09:00", status: "concluido" },
            { protocolo: "AGD-20250801-AAAA12", nome: "João da Silva", especialidade: "Nutrição", data: "01/08/2025", hora: "09:00", status: "concluido" },
            { protocolo: "AGD-20250801-AAAA13", nome: "João da Silva", especialidade: "Nutrição", data: "01/08/2025", hora: "09:00", status: "concluido" },
            { protocolo: "AGD-20250715-BBBB22", nome: "João da Silva", especialidade: "Psicologia", data: "15/07/2025", hora: "10:30", status: "pendente" },
            { protocolo: "AGD-20250610-CCCC33", nome: "João da Silva", especialidade: "Direito", data: "10/06/2025", hora: "14:00", status: "cancelado" },
          ]);
          setSingle(null);
          setState("success");
        } else {
          clearResults();
          setErrorMessage("Dados incorretos ou inexistentes.");
          setState("error");
        }
      }
    }, 800);
  }

  function resetAll() {
    setState("idle");
    setErrorMessage(null);
    clearResults();
  }

  function clearResults() {
    setSingle(null);
    setHistory(null);
  }

  return (
    <>
      <HeaderMinimal />
      <main className="pt-16">
        <section className="container mx-auto max-w-5xl px-4 py-8 lg:py-10 space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Consultar agendamento</h1>
            <p className="text-muted-foreground text-sm">Localize seu agendamento usando o protocolo ou seus dados pessoais.</p>
          </header>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <SearchModeToggle mode={mode} setMode={(m) => { setMode(m); resetAll(); }} />
            {state !== "idle" && (
              <Button variant="ghost" size="sm" onClick={resetAll}>Limpar resultado</Button>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {mode === "protocolo" ? "Buscar por protocolo" : "Buscar por CPF e nascimento"}
                </CardTitle>
                <CardDescription>
                  {mode === "protocolo" ? "Informe o código de protocolo recebido." : "Informe CPF e data de nascimento para localizar o agendamento."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mode === "protocolo" ? (
                  <ProtocolForm value={protocolo} setValue={setProtocolo} isLoading={state === "loading"} onSubmit={fakeFetch} />
                ) : (
                  <CpfDobForm cpf={cpf} setCpf={setCpf} dob={dob} setDob={setDob} isLoading={state === "loading"} onSubmit={fakeFetch} />
                )}
              </CardContent>
            </Card>

            <Card className="max-h-[600px] overflow-y-auto pr-1">
              <CardHeader>
                <CardTitle className="text-lg">Resultado</CardTitle>
                <CardDescription>Visualize os detalhes quando a busca retornar um agendamento.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResultArea
                  state={state}
                  single={single}
                  list={history}
                  errorMessage={errorMessage || undefined}
                  onReset={resetAll}
                  onBackToHistory={() => setSingle(null)}
                  onSelectFromHistory={(item) => setSingle(item)}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
