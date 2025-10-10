"use client";
import React from "react";
import { HeaderMinimal } from "../_components/headerMinimal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useScheduleForm } from "./_hooks/useScheduleForm";
import { ProgressCard } from "./_components/shared/ProgressCard";
import { SidebarInfo } from "./_components/shared/SidebarInfo";
import { IdentificationStep } from "./_components/steps/IdentificationStep";
import { UserDataStep } from "./_components/steps/UserDataStep";
import { SpecialtyStep } from "./_components/steps/SpecialtyStep";
import { DateTimeStep } from "./_components/steps/DateTimeStep";
import { ReviewStep } from "./_components/steps/ReviewStep";
import { FoundUserDialog } from "./_components/dialogs/FoundUserDialog";
import { SuccessDialog } from "./_components/dialogs/SuccessDialog";

export default function SchedulePage() {
  const {
    step, totalSteps, progress, form, update, next, back, confirmarAgendamento,
    attemptedNext, setAttemptedNext, isLoading, userFound, protocol,
    dialogOpen, setDialogOpen, foundDialogOpen, setFoundDialogOpen, isStepValid
  } = useScheduleForm();

  const titles = ["Identificação","Seus dados","Escolha da especialidade","Data e horário","Revisão e confirmação"];
  const descriptions = [
    "Informe seu CPF para identificação",
    "Preencha todos os campos para continuar.",
    "Selecione a área desejada.",
    "Escolha a melhor data e um horário disponível.",
    "Revise as informações antes de confirmar o agendamento.",
  ];

  return (
    <>
      <HeaderMinimal />
      <main className="pt-16">
        <section className="container mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Agende seu atendimento</h1>
            <p className="text-muted-foreground mt-1">Preencha as informações para marcar sua consulta.</p>
          </header>

          <ProgressCard step={step} totalSteps={totalSteps} progress={progress} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">{titles[step + 1]}</CardTitle>
                  <CardDescription>{descriptions[step + 1]}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {step === -1 && (
                    <IdentificationStep
                      value={form.cpf}
                      onChange={(v) => { update("cpf", v); if (userFound !== null) {} }}
                      attemptedNext={attemptedNext}
                      valid={isStepValid}
                      userFound={userFound}
                    />
                  )}
                  {step === 0 && (
                    <UserDataStep
                      nome={form.nome}
                      email={form.email}
                      telefone={form.telefone}
                      update={(k, v) => update(k as keyof typeof form, v)}
                      attemptedNext={attemptedNext}
                      step={step}
                    />
                  )}
                  {step === 1 && (
                    <SpecialtyStep
                      value={form.especialidade}
                      onChange={(v) => update("especialidade", v)}
                      attemptedNext={attemptedNext}
                      valid={isStepValid}
                      step={step}
                    />
                  )}
                  {step === 2 && (
                    <DateTimeStep
                      dateISO={form.data}
                      hour={form.hora}
                      setDate={(v) => update("data", v)}
                      setHour={(v) => update("hora", v)}
                      attemptedNext={attemptedNext}
                      step={step}
                    />
                  )}
                  {step === 3 && <ReviewStep form={form} />}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Button variant="outline" onClick={back} disabled={step === -1}>Voltar</Button>
                  {step < totalSteps - 1 ? (
                    <Button onClick={next} disabled={step === -1 && isLoading}>
                      {isLoading ? (<><Loader2 className="mr-2 size-4 animate-spin" />Verificando...</>) : "Avançar"}
                    </Button>
                  ) : (
                    <Button onClick={confirmarAgendamento}>Confirmar agendamento</Button>
                  )}
                </CardFooter>
              </Card>
              <div className="space-y-6">
                <SidebarInfo />
              </div>
            </div>
        </section>
        <FoundUserDialog open={foundDialogOpen} onOpenChange={setFoundDialogOpen} />
        <SuccessDialog open={dialogOpen} onOpenChange={setDialogOpen} protocol={protocol} />
      </main>
    </>
  );
}
