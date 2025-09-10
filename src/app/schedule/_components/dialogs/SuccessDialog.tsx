"use client";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function SuccessDialog({ open, onOpenChange, protocol }: { open: boolean; onOpenChange: (o: boolean) => void; protocol: string | null }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agendamento confirmado!</AlertDialogTitle>
          <AlertDialogDescription>
            Seu atendimento foi agendado com sucesso.
            {protocol && (
              <span className="mt-2 block font-medium text-foreground">Protocolo: {protocol}</span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>Fechar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="/" className="inline-flex items-center justify-center">Ir para a página inicial</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
