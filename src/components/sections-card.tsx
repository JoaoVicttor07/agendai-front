import { TrendingUp, TrendingDown, Check, Clock, X, ChartNoAxesCombined, ChartNoAxesColumnIncreasing } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Agendamentos de hoje</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12
          </CardTitle>
          <CardAction>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="cursor-default">
                  <TrendingUp className="size-4 text-green-500" />
                  +15%
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comparado a terça feira passada</p>
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex flex-wrap gap-2 font-medium">
            <Badge variant="outline">
              <Check className="size-4 text-green-500" />3 concluídos
            </Badge>
            <Badge variant="outline">
              <Clock className="size-4 text-yellow-500" />8 pendentes
            </Badge>
            <Badge variant="outline">
              <X className="size-4 text-red-500" />1 cancelado
            </Badge>
          </div>
          <div className="text-muted-foreground">Ultima atualização: 12:05</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Atendimentos realizados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            56
          </CardTitle>
          <CardAction>
            <Select>
              <SelectTrigger className="h-9 rounded-lg border border-border/60 bg-card/80 px-2 text-sm font-medium text-muted-foreground shadow-none backdrop-blur transition hover:text-foreground focus:ring-2 focus:ring-primary/40 focus:ring-offset-0 dark:border-white/10 dark:text-muted-foreground">
                <SelectValue placeholder="Filtro" />
              </SelectTrigger>
              <SelectContent align="end" className="min-w-[180px] rounded-lg border border-border/50 bg-card/95 p-2 shadow-lg">
                <SelectGroup>
                  <SelectLabel className="px-2 text-xs uppercase tracking-wide text-muted-foreground/70">
                    Filtrar por
                  </SelectLabel>
                  <SelectItem value="week" className="rounded-lg text-sm font-medium data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary">
                    Semana
                  </SelectItem>
                  <SelectItem value="month" className="rounded-lg text-sm font-medium data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary">
                    Mês
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Badge variant="outline">
              <TrendingUp className="size-4 text-green-500" />
              ?
            </Badge> */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <Badge variant="outline">
              <ChartNoAxesColumnIncreasing className="size-4 text-green-500" />+15% em relação ao mês passado
            </Badge>
          </div>
          <div className="text-muted-foreground">Taxa de comparecimento: 78%</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Novos pacientes (este mês)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            31
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp className="size-4 text-green-500" />
              ?
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Lorem Ipsum
          </div>
          <div className="text-muted-foreground">Lorem Ipsum</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Especialidade mais procurada</CardDescription>
          {/* <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Psicologia
          </CardTitle> */}
          {/* <CardAction>
            <Badge variant="outline">
              <TrendingUp className="size-4 text-green-500" />
              ?
            </Badge>
          </CardAction> */}
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <Badge variant="outline">
              <Check className="size-4 text-green-500" />45 atendimentos (30% do total)
            </Badge>
          </div>
          <div className="text-muted-foreground">Segunda mais procurada: Nutrição (28)</div>
        </CardFooter> */}
        <CardContent>
          <div className="flex flex-col  w-full border-2 rounded-lg">
            <p>1 - Posicologia</p>
            <p>2 - Direito</p>
            <p>3 - Nutrição</p>
            

          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
