import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Stethoscope,
  CircleCheckBig,
  AlarmClockCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  {
    title: "Agendamentos de hoje",
    value: "12",
    change: "+15%",
    trend: "up",
    icon: Calendar,
    gradient: "gradient-blue",
    details: "3 concluídos • 8 pendentes • 1 cancelado",
    lastUpdate: "Última atualização: 12:05",
  },
  {
    title: "Atendimentos realizados",
    value: "176",
    change: "+15%",
    trend: "up",
    icon: CircleCheckBig,
    gradient: "gradient-green",
    details: "Este mês",
    subtitle: "Média de três atendimentos por dia útil",
  },
  {
    title: "Novos pacientes",
    value: "31",
    change: "+7%",
    trend: "up",
    icon: Users,
    gradient: "gradient-cyan-vibrant",
    details: "Este mês",
    subtitle: "Taxa de crescimento mensal",
  },
  {
    title: "Taxa de comparecimento",
    value: "88%",
    change: "+2%",
    trend: "up",
    icon: AlarmClockCheck,
    gradient: "gradient-purple",
    details: "(176 de 200 agendamentos compareceram)",
    subtitle: "Total de 24 ausências registradas.",
  },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="metric-card animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.gradient}`}>
              <metric.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1">
              {metric.value}
            </div>
            <div className="flex items-center space-x-2 text-xs">
              {metric.trend === "up" && (
                <div className="flex items-center text-green-500">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {metric.change}
                </div>
              )}
              {metric.trend === "down" && (
                <div className="flex items-center text-red-500">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {metric.change}
                </div>
              )}
              {metric.trend === "neutral" && (
                <div className="text-muted-foreground">{metric.change}</div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {metric.details}
            </p>
            {metric.subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {metric.subtitle}
              </p>
            )}
            {metric.lastUpdate && (
              <p className="text-xs text-muted-foreground mt-1">
                {metric.lastUpdate}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
