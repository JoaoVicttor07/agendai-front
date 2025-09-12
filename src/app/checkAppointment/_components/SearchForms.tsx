"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Search, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchMode = "protocolo" | "cpf";

export interface ResultData {
  protocolo: string;
  nome: string;
  especialidade: string;
  data: string;
  hora: string;
  status: "confirmado" | "pendente" | "cancelado";
}

interface CommonProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export function SearchModeToggle({
  mode,
  setMode,
}: {
  mode: SearchMode;
  setMode: (m: SearchMode) => void;
}) {
  return (
    <div className="inline-flex rounded-md border bg-background p-1 text-sm">
      <Button
        type="button"
        variant={mode === "protocolo" ? "default" : "ghost"}
        className={cn("h-8 rounded-sm px-3", mode === "protocolo" && "shadow")}
        onClick={() => setMode("protocolo")}
      >
        Protocolo
      </Button>
      <Button
        type="button"
        variant={mode === "cpf" ? "default" : "ghost"}
        className={cn("h-8 rounded-sm px-3", mode === "cpf" && "shadow")}
        onClick={() => setMode("cpf")}
      >
        CPF + Nascimento
      </Button>
    </div>
  );
}

export function ProtocolForm({
  onSubmit,
  isLoading,
  value,
  setValue,
}: CommonProps & { value: string; setValue: (v: string) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="protocolo">Protocolo</Label>
        <Input
          id="protocolo"
          placeholder="AGD-20250912-ABC123"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
        />
        <p className="text-xs text-muted-foreground">
          Digite exatamente o código recebido após o agendamento.
        </p>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        <Search className="mr-2 size-4" /> Consultar
      </Button>
    </form>
  );
}

export function CpfDobForm({
  onSubmit,
  isLoading,
  cpf,
  setCpf,
  dob,
  setDob,
}: CommonProps & {
  cpf: string;
  setCpf: (v: string) => void;
  dob: string;
  setDob: (v: string) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            placeholder="Somente números"
            value={cpf}
            inputMode="numeric"
            onChange={(e) =>
              setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))
            }
          />
          <p className="text-xs text-muted-foreground">
            Digite os 11 números do CPF usado no agendamento.
          </p>
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="dob">Data de nascimento</Label>
          <Input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          /> */}
          <p className="text-xs text-muted-foreground">Formato: dd/mm/aaaa</p>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        <Search className="mr-2 size-4" /> Consultar
      </Button>
    </form>
  );
}

export function ResultArea({
  state,
  data,
  onReset,
}: {
  state: "idle" | "loading" | "success" | "empty" | "error";
  data?: ResultData | null;
  onReset: () => void;
}) {
  if (state === "idle") {
    return (
      <div className="text-sm text-muted-foreground">
        Preencha os dados e clique em &quot;Consultar&quot; para visualizar
        detalhes do agendamento.
      </div>
    );
  }
  if (state === "loading") {
    return (
      <div className="flex flex-col space-y-3">
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    </div>
    );
  }
  if (state === "empty") {
    return (
      <div className="rounded-md border p-4 text-sm">
        Nenhum agendamento encontrado para os dados informados.
        <Button variant="link" onClick={onReset} className="px-1">
          Tentar novamente
        </Button>
      </div>
    );
  }
  if (state === "error") {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
        Ocorreu um erro ao consultar. Tente novamente em instantes.
        <div>
          <Button
            size="sm"
            variant="outline"
            className="mt-3"
            onClick={onReset}
          >
            Nova consulta
          </Button>
        </div>
      </div>
    );
  }
  if (state === "success" && data) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-2 rounded-md border p-3">
          <CheckCircle2 className="mt-0.5 size-4 text-green-600" />
          <div className="text-sm">
            <p className="font-medium">Agendamento localizado</p>
            <p className="text-muted-foreground">Confira abaixo os detalhes.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoItem label="Protocolo" value={data.protocolo} />
          <InfoItem label="Status" value={statusLabel(data.status)} />
          <InfoItem label="Nome" value={data.nome} />
          <InfoItem label="Especialidade" value={data.especialidade} />
          <InfoItem label="Data" value={data.data} />
          <InfoItem label="Horário" value={data.hora} />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <Undo2 className="mr-1 size-4" /> Nova consulta
          </Button>
          
        </div>
      </div>
    );
  }
  return null;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-3 text-sm">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium leading-tight">{value}</p>
    </div>
  );
}

function statusLabel(s: ResultData["status"]) {
  switch (s) {
    case "confirmado":
      return "Confirmado";
    case "pendente":
      return "Pendente";
    case "cancelado":
      return "Cancelado";
  }
}
