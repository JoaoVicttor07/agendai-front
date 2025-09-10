"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ESPECIALIDADES } from "../../_lib/constants";

interface Props { value: string; onChange: (v: string) => void; attemptedNext: boolean; valid: boolean; step: number; }
export function SpecialtyStep({ value, onChange, attemptedNext, valid, step }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Especialidade</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Especialidades</SelectLabel>
              {ESPECIALIDADES.map((esp) => (
                <SelectItem key={esp} value={esp}>{esp}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {attemptedNext && step === 1 && !valid && (
          <p className="mt-1 text-xs text-red-500">Selecione uma especialidade.</p>
        )}
      </div>
    </div>
  );
}
