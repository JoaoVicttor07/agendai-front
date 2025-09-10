"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function SidebarInfo() {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <CalendarClock className="size-5 text-primary" />
          <CardTitle>Sua consulta</CardTitle>
        </div>
        <CardDescription>Benefícios e informações rápidas.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 text-green-600" />
            <span>Agendamento simples e rápido em poucos passos.</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 size-4 text-primary" />
            <span>Seus dados são tratados com segurança.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 text-green-600" />
            <span>Confirmação imediata com protocolo.</span>
          </li>
        </ul>
        <div className="mt-6 rounded-md border p-3">
          <p className="text-sm font-medium">Info importante</p>
          <p className="text-sm text-muted-foreground">Os horários exibidos são fictícios até a integração com o backend.</p>
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HelpCircle className="size-4" />
            <span>Precisa de ajuda?</span>
          </div>
          <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" href="#">Fale com o suporte</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
