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
  const [data, setData] = React.useState<ResultData | null>(null);

  function fakeFetch() {
    setState("loading");
    setTimeout(() => {
      // Simulação de query
      const success = (mode === "protocolo" && protocolo.includes("AGD")) || (mode === "cpf" && cpf.endsWith("0"));
      if (success) {
        setData({
          protocolo: protocolo || "AGD-20250912-ABC123",
          nome: "João da Silva",
          especialidade: "Nutrição",
          data: "12/09/2025",
            hora: "09:30",
          status: "confirmado"
        });
        setState("success");
      } else {
        setData(null);
        setState("empty");
      }
    }, 1000);
  }

  function resetAll() {
    setState("idle");
    setData(null);
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
                  <ProtocolForm
                    value={protocolo}
                    setValue={setProtocolo}
                    isLoading={state === "loading"}
                    onSubmit={fakeFetch}
                  />
                ) : (
                  <CpfDobForm
                    cpf={cpf}
                    setCpf={setCpf}
                    dob={dob}
                    setDob={setDob}
                    isLoading={state === "loading"}
                    onSubmit={fakeFetch}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resultado</CardTitle>
                <CardDescription>Visualize os detalhes quando a busca retornar um agendamento.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResultArea state={state} data={data} onReset={resetAll} />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
