"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Search, Undo2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export type SearchMode = "protocolo" | "cpf";

export interface ResultData {
  protocolo: string;
  nome: string;
  especialidade: string;
  data: string;
  hora: string;
  status: "confirmado" | "pendente" | "cancelado";
}

interface CommonProps { onSubmit: () => void; isLoading: boolean; }

export function SearchModeToggle({ mode, setMode }: { mode: SearchMode; setMode: (m: SearchMode) => void }) {
  return (
    <div className="inline-flex rounded-md border bg-background p-1 text-sm">
      {(["protocolo","cpf"] as SearchMode[]).map(m => (
        <Button
          key={m}
            type="button"
          variant={mode === m ? "default" : "ghost"}
          className={cn("h-8 rounded-sm px-3", mode === m && "shadow")}
          onClick={() => setMode(m)}
        >
          {m === "protocolo" ? "Protocolo" : "CPF + Nascimento"}
        </Button>
      ))}
    </div>
  );
}

export function ProtocolForm({ onSubmit, isLoading, value, setValue }: CommonProps & { value: string; setValue: (v: string) => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="protocolo">Protocolo</Label>
        <Input id="protocolo" placeholder="AGD-20250912-ABC123" value={value} onChange={(e) => setValue(e.target.value.toUpperCase())} />
        <p className="text-xs text-muted-foreground">Digite exatamente o código recebido após o agendamento.</p>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full"><Search className="mr-2 size-4" /> Consultar</Button>
    </form>
  );
}

export function CpfDobForm({ onSubmit, isLoading, cpf, setCpf, dob, setDob }: CommonProps & { cpf: string; setCpf: (v: string) => void; dob: string; setDob: (v: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const dateObj = dob ? new Date(dob + "T00:00:00") : undefined;
  function dateToISO(d: Date) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" placeholder="Somente números" value={cpf} inputMode="numeric" onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").slice(0,11))} />
          <p className="text-xs text-muted-foreground">Digite os 11 números do CPF usado no agendamento.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Data de nascimento</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button id="date" variant="outline" type="button" className="w-full justify-between font-normal">
                {dateObj ? dateObj.toLocaleDateString("pt-BR") : "Escolha uma data"}
                <ChevronDown className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden" align="start">
              <Calendar
                mode="single"
                selected={dateObj}
                captionLayout="dropdown"
                disabled={(d) => d > new Date()}
                onSelect={(d) => { if (d) { setDob(dateToISO(d)); setOpen(false); } }}
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">Formato: dd/mm/aaaa</p>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full"><Search className="mr-2 size-4" /> Consultar</Button>
    </form>
  );
}

export function ResultArea({ state, single, list, onReset, errorMessage, onSelectFromHistory, onBackToHistory }: {
  state: "idle" | "loading" | "success" | "empty" | "error";
  single?: ResultData | null;
  list?: ResultData[] | null;
  errorMessage?: string;
  onReset: () => void;
  onSelectFromHistory?: (item: ResultData) => void;
  onBackToHistory?: () => void;
}) {
  if (state === "idle") return <div className="text-sm text-muted-foreground">Preencha os dados e clique em &quot;Consultar&quot; para visualizar detalhes.</div>;
  if (state === "loading") return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    </div>
  );
  if (state === "empty") return (
    <div className="rounded-md border p-4 text-sm">Nenhum agendamento encontrado.<Button variant="link" onClick={onReset} className="px-1">Tentar novamente</Button></div>
  );
  if (state === "error") return (
    <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
      <p className="font-medium text-destructive">{errorMessage || "Ocorreu um erro ao consultar."}</p>
      <div><Button size="sm" variant="outline" className="mt-3" onClick={onReset}>Nova consulta</Button></div>
    </div>
  );
  if (state === "success" && list && list.length > 1 && !single) return <ResultHistory list={list} onReset={onReset} onSelect={onSelectFromHistory} />;
  if (state === "success" && single) return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2 rounded-md border p-3">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 size-4 text-green-600" />
          <div className="text-sm">
            <p className="font-medium">Agendamento localizado</p>
            <p className="text-muted-foreground">Confira abaixo os detalhes.</p>
          </div>
        </div>
        {onBackToHistory && list && list.length > 1 && (
          <Button size="sm" variant="ghost" onClick={onBackToHistory}>Voltar para histórico</Button>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <InfoItem label="Protocolo" value={single.protocolo} />
        <InfoItem label="Status" value={<StatusBadge status={single.status} />} />
        <InfoItem label="Nome" value={single.nome} />
        <InfoItem label="Especialidade" value={single.especialidade} />
        <InfoItem label="Data" value={single.data} />
        <InfoItem label="Horário" value={single.hora} />
      </div>
      <div className="pt-2"><Button variant="outline" size="sm" onClick={onReset}><Undo2 className="mr-1 size-4" /> Nova consulta</Button></div>
    </div>
  );
  return null;
}

// Helpers
function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md border p-3 text-sm">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium leading-tight break-words">{value}</p>
    </div>
  );
}

function statusLabel(s: ResultData["status"]) {
  switch (s) {
    case "confirmado": return "Confirmado";
    case "pendente": return "Pendente";
    case "cancelado": return "Cancelado";
  }
}

export function StatusBadge({ status }: { status: ResultData["status"] }) {
  const map: Record<ResultData["status"], string> = {
    confirmado: "bg-emerald-600/15 text-emerald-500 border-emerald-600/30",
    pendente: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    cancelado: "bg-red-600/15 text-red-500 border-red-600/30",
  };
  return <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", map[status])}>{statusLabel(status)}</span>;
}

export function ResultHistory({ list, onReset, onSelect }: { list: ResultData[]; onReset: () => void; onSelect?: (item: ResultData) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-md border p-3">
        <CheckCircle2 className="mt-0.5 size-4 text-green-600" />
        <div className="text-sm">
          <p className="font-medium">{list.length} agendamentos encontrados</p>
          <p className="text-muted-foreground">Histórico completo do paciente.</p>
        </div>
      </div>
      <div className="flex flex-col divide-y rounded-md border">
        {list.map(item => (
          <div key={item.protocolo} className="grid gap-4 p-4 sm:grid-cols-6">
            <div className="sm:col-span-2 space-y-1">
              <p className="text-xs text-muted-foreground">Protocolo</p>
              <p className="font-medium text-sm break-all">{item.protocolo}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Data</p>
              <p className="font-medium text-sm">{item.data} • {item.hora}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Especialidade</p>
              <p className="font-medium text-sm">{item.especialidade}</p>
            </div>
            <div className="flex items-center"><StatusBadge status={item.status} /></div>
            <div className="flex items-center justify-end">
              {onSelect && (
                <Button size="sm" variant="outline" onClick={() => onSelect(item)}>Ver detalhes</Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onReset}><Undo2 className="mr-1 size-4" /> Nova consulta</Button>
      </div>
    </div>
  );
}
