"use client";
import React from "react";
import type { FormData } from "../_lib/types";
import { checkUser } from "../_lib/api";
import { normalizeCPF, generateProtocol } from "../_lib/utils";

export function useScheduleForm() {
  const [step, setStep] = React.useState(-1);
  const totalSteps = 4;
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
  const progress = ((step + 1) / totalSteps) * 100;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const isStepValid = React.useMemo(() => {
    if (step === -1) return form.cpf.replace(/\D/g, "").length === 11;
    if (step === 0)
      return (
        form.nome.trim().length >= 3 &&
        /\^?\S+@\S+\.\S+$/.test(form.email) &&
        form.telefone.trim().length >= 8
      );
    if (step === 1) return form.especialidade.trim().length > 0;
    if (step === 2) return form.data.length === 10 && form.hora.length > 0;
    return true;
  }, [step, form]);

  async function checkUserAndProceed() {
    if (!isStepValid) return;
    setIsLoading(true);
    try {
      const result = await checkUser(normalizeCPF(form.cpf));
      setUserFound(result.exists);
      if (result.exists && result.userData) {
        setForm((prev) => ({ ...prev, ...result.userData }));
        setStep(0);
        setFoundDialogOpen(true);
      }
    } catch (e) {
      setUserFound(false);
    } finally {
      setIsLoading(false);
    }
  }

  function next() {
    setAttemptedNext(true);
    if (step === -1) {
      if (!isStepValid) return;
      if (userFound === false) {
        setAttemptedNext(false);
        setStep(0);
      } else {
        void checkUserAndProceed();
      }
      return;
    }
    if (!isStepValid) return;
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
    } else if (step > 0) setStep((s) => s - 1);
  }

  function confirmarAgendamento() {
    const p = generateProtocol();
    setProtocol(p);
    setDialogOpen(true);
  }

  return {
    step,
    totalSteps,
    progress,
    form,
    update,
    isStepValid,
    next,
    back,
    confirmarAgendamento,
    isLoading,
    userFound,
    attemptedNext,
    setAttemptedNext,
    dialogOpen,
    setDialogOpen,
    protocol,
    foundDialogOpen,
    setFoundDialogOpen,
  };
}
