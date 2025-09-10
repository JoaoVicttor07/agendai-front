"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressCard({ step, totalSteps, progress }: { step: number; totalSteps: number; progress: number }) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            {step === -1 ? "Identificação" : `Passo ${step + 1} de ${totalSteps}`}
          </p>
          <p className="text-sm font-medium">{Math.round(progress)}%</p>
        </div>
        <Progress value={Math.max(0, progress)} />
      </CardContent>
    </Card>
  );
}
