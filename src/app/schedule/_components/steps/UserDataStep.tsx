"use client";
import { Input } from "@/components/ui/input";

interface Props {
  nome: string; email: string; telefone: string;
  update: (key: string, value: string) => void;
  attemptedNext: boolean; step: number;
}

export function UserDataStep({ nome, email, telefone, update, attemptedNext, step }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Nome completo</label>
        <Input placeholder="Seu nome" value={nome} onChange={(e) => update("nome", e.target.value)} />
        {attemptedNext && step === 0 && nome.trim().length < 3 && (
          <p className="mt-1 text-xs text-red-500">Informe seu nome.</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">E-mail</label>
        <Input type="email" placeholder="voce@email.com" value={email} onChange={(e) => update("email", e.target.value)} />
        {attemptedNext && step === 0 && !/^\S+@\S+\.\S+$/.test(email) && (
          <p className="mt-1 text-xs text-red-500">Informe um e-mail válido.</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Telefone</label>
        <Input type="tel" placeholder="(11) 99999-9999" value={telefone} onChange={(e) => update("telefone", e.target.value)} />
        {attemptedNext && step === 0 && telefone.trim().length < 8 && (
          <p className="mt-1 text-xs text-red-500">Informe um telefone válido.</p>
        )}
      </div>
    </div>
  );
}
