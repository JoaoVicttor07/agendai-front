"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const description = "Gráfico mensal de agendamentos (total / concluídos / cancelados)";


const monthlyChartData = [
  { month: "2024-07", label: "jul. 2024", total: 420, concluded: 380, canceled: 18, absent: 22 },
  { month: "2024-08", label: "ago. 2024", total: 455, concluded: 405, canceled: 22, absent: 28 },
  { month: "2024-09", label: "set. 2024", total: 502, concluded: 450, canceled: 28, absent: 24 },
  { month: "2024-10", label: "out. 2024", total: 480, concluded: 430, canceled: 24, absent: 26 },
  { month: "2024-11", label: "nov. 2024", total: 510, concluded: 465, canceled: 26, absent: 19 },
  { month: "2024-12", label: "dez. 2024", total: 390, concluded: 350, canceled: 18, absent: 22 },
  { month: "2025-01", label: "jan. 2025", total: 430, concluded: 390, canceled: 20, absent: 20 },
  { month: "2025-02", label: "fev. 2025", total: 460, concluded: 415, canceled: 22, absent: 23 },
  { month: "2025-03", label: "mar. 2025", total: 510, concluded: 470, canceled: 25, absent: 15 },
  { month: "2025-04", label: "abr. 2025", total: 629, concluded: 525, canceled: 54, absent: 50 },
  { month: "2025-05", label: "mai. 2025", total: 1043, concluded: 890, canceled: 144, absent: 9 },
  { month: "2025-06", label: "jun. 2025", total: 1065, concluded: 975, canceled: 84, absent: 6 },
];


const chartConfig = {
  total: { label: "Agendamentos", color: "#2563EB" },
  concluded: { label: "Concluídos", color: "#10B981" },
  absent: { label: "Ausentes", color: "#F97316" },
  canceled: { label: "Cancelados", color: "#EF4444" },
} satisfies ChartConfig;

function monthKeyFromISO(isoDate: string) {
  const d = new Date(isoDate + "T00:00:00");
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  return `${y}-${String(m).padStart(2, "0")}`;
}

function monthLabelFromKey(key: string) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
}

function aggregateMonthly(months: typeof monthlyChartData) {
  const map = new Map<string, { month: string; total: number; concluded: number; canceled: number; absent: number }>();
  for (const w of months) {
    const key = monthKeyFromISO(w.month);
    if (!map.has(key)) map.set(key, { month: key, total: 0, concluded: 0, canceled: 0, absent: 0 });
    const cur = map.get(key)!;
    cur.total += (w.total || 0);
    cur.concluded += (w.concluded || 0);
    cur.canceled += (w.canceled || 0);
    cur.absent += (w.absent || 0);
  }
  return Array.from(map.values())
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(item => ({ ...item, label: monthLabelFromKey(item.month) }));
}

const MAX_BAR_SIZE = 200;

export function ChartAreaInteractive() {
  const [activeMetric, setActiveMetric] = React.useState<keyof typeof chartConfig>("total");
  const [monthsRange, setMonthsRange] = React.useState<"3" | "6" | "12">("6");

  const aggregated = React.useMemo(() => aggregateMonthly(monthlyChartData), []);

  const monthlyData = React.useMemo(() => {
    const n = parseInt(monthsRange, 10);
    return aggregated.slice(-n);
  }, [aggregated, monthsRange]);

  return (
    <Card className="@container/card metric-card animate-slide-in" style={{ animationDelay: `0.5s` }}>
      <CardHeader>
        <CardTitle>Total de agendamentos por mês</CardTitle>
        <CardDescription>{chartConfig[activeMetric].label} nos últimos {monthsRange} meses</CardDescription>

        <CardAction className="flex gap-2 flex-wrap">
          {/* Filtro de status (desktop/tablet) */}
          <ToggleGroup
            type="single"
            value={activeMetric}
            onValueChange={(value) => value && setActiveMetric(value as keyof typeof chartConfig)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            aria-label="Filtrar status"
          >
            <ToggleGroupItem value="total">Total</ToggleGroupItem>
            <ToggleGroupItem value="concluded">Concluídos</ToggleGroupItem>
            <ToggleGroupItem value="absent">Ausentes</ToggleGroupItem>
            <ToggleGroupItem value="canceled">Cancelados</ToggleGroupItem>
          </ToggleGroup>

          <Separator className="hidden @[767px]/card:block" />

          {/* Filtro de meses (desktop/tablet) */}
          <ToggleGroup
            type="single"
            value={monthsRange}
            onValueChange={(value) => value && setMonthsRange(value as "3" | "6" | "12")}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-3 @[767px]/card:flex"
            aria-label="Quantidade de meses"
          >
            <ToggleGroupItem value="3">3 meses</ToggleGroupItem>
            <ToggleGroupItem value="6">6 meses</ToggleGroupItem>
            <ToggleGroupItem value="12">12 meses</ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile: status */}
          <Select value={activeMetric} onValueChange={(v) => setActiveMetric(v as keyof typeof chartConfig)}>
            <SelectTrigger className="flex w-40 @[767px]/card:hidden" size="sm" aria-label="Status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="total">Total</SelectItem>
              <SelectItem value="concluded">Concluídos</SelectItem>
              <SelectItem value="absent">Ausentes</SelectItem>
              <SelectItem value="canceled">Cancelados</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile: meses */}
          <Select value={monthsRange} onValueChange={(v) => setMonthsRange(v as "3" | "6" | "12")}>
            <SelectTrigger className="flex w-40 @[767px]/card:hidden" size="sm" aria-label="Meses">
              <SelectValue placeholder="Meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="3">Últimos 3 meses</SelectItem>
              <SelectItem value="6">Últimos 6 meses</SelectItem>
              <SelectItem value="12">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            data={monthlyData}
            barCategoryGap="28%"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={{ fill: "transparent" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => String(value)}
                  indicator="dot"
                />
              }
            />
            <Bar
              dataKey={activeMetric}
              fill={chartConfig[activeMetric].color}
              radius={[6, 6, 0, 0]}
              isAnimationActive
              maxBarSize={MAX_BAR_SIZE}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}