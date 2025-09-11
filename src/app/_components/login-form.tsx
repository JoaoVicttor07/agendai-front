"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});

  function validate(values = { email, password }) {
    let emailError: string | undefined;
    let passwordError: string | undefined;

    if (!values.email) emailError = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(values.email)) emailError = "Email inválido";

    if (!values.password) passwordError = "Senha é obrigatória";

    setErrors({
      email: emailError,
      password: passwordError,
      global: undefined,
    });

    return !emailError && !passwordError;
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => {
      if (!prev.email) return prev;
      let emailError: string | undefined;
      if (!value) emailError = "Email é obrigatório";
      else if (!/\S+@\S+\.\S+/.test(value)) emailError = "Email inválido";
      return { ...prev, email: emailError };
    });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => {
      if (!prev.password) return prev;
      let passwordError: string | undefined;
      if (!value) passwordError = "Senha é obrigatória";
      return { ...prev, password: passwordError };
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      await new Promise((request) => setTimeout(request, 900));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        global: "Erro no servidor. Por favor, tente novamente.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <Card className="relative max-w-sm w-full overflow-hidden shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl font-semibold">
            Entre na sua conta
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            Preencha o seu e-email e senha nos campos abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form
            className="space-y-4"
            noValidate
            onSubmit={onSubmit}
            aria-describedby={errors.global ? "erro form" : undefined}
          >
            {errors.global && (
              <div
                id="erro-form"
                role="alert"
                className="rounded-md border border-destructive/50 bg-destructive/5 px-3 py-2 text-xs text-destructive"
              >
                {errors.global}
              </div>
            )}

            <div className="grid gap-2">
              <Label className="text-md" htmlFor="email">Email</Label>
              <Input
                className={cn(
                  "border-accent-foreground/30",
                  errors.email &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="joao@agendai.com"
                required
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-[11px] text-destructive mt-1"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-md" htmlFor="password">
                  Senha
                </Label>
              </div>
              <Input
                className={cn(
                  " border-accent-foreground/30",
                  errors.password &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="*******"
                onChange={handlePasswordChange}
                required
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="text-[11px] text-destructive mt-1"
                >
                  {errors.password}
                </p>
              )}
            </div>
            <div className="pt-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Entrando" : "Entrar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
