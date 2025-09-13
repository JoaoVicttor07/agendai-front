"use client";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
  attemptedNext: boolean;
  valid: boolean;
  userFound: boolean | null;
}

export function IdentificationStep({ value, onChange, attemptedNext, valid, userFound }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">CPF</label>
        <Input
          placeholder="000.000.000-00"
            value={value}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 11);
              onChange(onlyDigits);
            }}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <p className="text-xs text-muted-foreground mt-2">Informe seu CPF (somente números).</p>
          {attemptedNext && !valid && (
            <p className="mt-1 text-xs text-red-500">CPF deve conter 11 números.</p>
          )}
        </div>
        {userFound === false && (
          <div className="text-sm text-amber-500">Usuário não encontrado. Você precisará fornecer seus dados no próximo passo.</div>
        )}
    </div>
  );
}
