"use client";
import { ResumoItem } from "../shared/ResumoItem";
import { formatDate } from "../../_lib/utils";
import type { FormData } from "../../_lib/types";

export function ReviewStep({ form }: { form: FormData }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ResumoItem label="Nome" value={form.nome} />
      <ResumoItem label="E-mail" value={form.email} />
      <ResumoItem label="Telefone" value={form.telefone} />
      <ResumoItem label="Especialidade" value={form.especialidade} />
      <ResumoItem label="Data" value={form.data && formatDate(form.data)} />
      <ResumoItem label="Horário" value={form.hora} />
    </div>
  );
}
