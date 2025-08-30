import { Navbar } from "./components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Calendar,
  FileText,
  UserSearch,
  Bot,
  MonitorCheck,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section
          className="
            relative isolate
            min-h-[72vh]
            grid grid-cols-1 lg:grid-cols-2
            place-items-center
            gap-12 lg:gap-20
            px-6 lg:px-12
            py-5
            max-w-7xl mx-auto
          "
        >
          {/* Decorativo atrás (blob) */}
          <div
            className="
              pointer-events-none
              absolute -top-24 right-1/3 lg:right-0
              h-72 w-72 lg:h-[32rem] lg:w-[32rem]
              rounded-full
              bg-gradient-to-tr from-blue-500/20 via-blue-400/10 to-blue-300/5
              blur-3xl
            "
          />
          {/* Coluna texto */}
          <div className="w-full">
            <h1
              className="
                text-4xl sm:text-5xl lg:text-6xl
                font-bold tracking-tight
                leading-tight
                max-w-2xl
                text-gray-900 dark:text-gray-100
              "
            >
              Agende sua consulta com facilidade — gratuito para a comunidade.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">
              Atendimentos realizados por alunos supervisionados. Sem
              burocracia: preencha, confirme e compareça.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                className="bg-blue-500 text-white dark:hover:bg-blue-800 cursor-pointer"
                size="lg"
              >
                Agendar
              </Button>
              <Button
                className="border-2 border-black cursor-pointer"
                variant="outline"
                size="lg"
              >
                Consultar agendamento
              </Button>
            </div>
          </div>

          {/* cards informativos */}

          <div className="relative hidden lg:flex w-full justify-end">
            <div className="grid w-full max-w-md gap-5">
              <div className="group flex items-start gap-4 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-sm ring-1 ring-border/60 dark:ring-border/20 p-5 transition shadow-md hover:shadow-lg">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Calendar className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold leading-none">
                    Agendamento rápido
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Escolha horários disponíveis em poucos cliques.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-sm ring-1 ring-border/60 dark:ring-border/20 p-5 transition shadow-md hover:shadow-lg">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold leading-none">
                    Supervisão profissional
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhado por especialistas qualificados.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-4 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-sm ring-1 ring-border/60 dark:ring-border/20 p-5 transition shadow-md hover:shadow-lg">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UserSearch className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold leading-none">Zero custo</h3>
                  <p className="text-sm text-muted-foreground">
                    Serviço gratuito para a comunidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section className="px-6 lg:px-12 py-5 max-w-7xl mx-auto">
          {/* Título e intro */}
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-gray-100">
              Como funciona
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Agendar seu atendimento é simples. Siga os passos abaixo.
            </p>
          </div>

          {/* Wrapper dos cards */}
          {/* Em mobile: empilhado (gap grande). Em desktop: linha com conectores */}
          <div
            className="
              mt-16
              flex flex-col items-center gap-12
              lg:flex-row lg:items-stretch lg:justify-between lg:gap-10
            "
          >
            {/* Card 1 */}
            <div
              className="
                relative
                flex flex-col items-center
              "
            >
              <Card
                className="
                  w-full max-w-[320px] lg:w-full lg:h-full
                  border-0 rounded-2xl
                  bg-primary/9 dark:bg-white/[0.04]
                  px-8 py-12
                  flex flex-col items-center text-center gap-0
                  shadow-sm hover:shadow-md transition
                "
              >
                <CardHeader className="flex flex-col items-center gap-6 p-0">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-primary/20">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    1
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 p-0 mt-6">
                  <h3 className="text-xl font-semibold leading-snug">
                    Inicie o Chatbot
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Clique no botão agendar para iniciar o atendimento com o
                    Chatbot.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Card 2 */}
            <div
              className="
                relative flex flex-col 
                items-center
              "
            >
              <Card
                className="
                  w-full max-w-[320px] lg:w-full lg:h-full
                  border-0 rounded-2xl
                  bg-primary/9 dark:bg-white/[0.04]
                  px-8 py-12
                  flex flex-col items-center text-center gap-0
                  shadow-sm hover:shadow-md transition
                "
              >
                <CardHeader className="flex flex-col items-center gap-6 p-0">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-primary/20">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    2
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 p-0 mt-6">
                  <h3 className="text-xl font-semibold leading-snug">
                    Informe seus dados
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Forneça nome, contato e informações básicas para cadastro.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Card 3 */}
            <div
              className="
                relative flex flex-col items-center"
            >
              <Card
                className="
                  w-full max-w-[320px] lg:w-full lg:h-full
                  border-0 rounded-2xl
                  bg-primary/9 dark:bg-white/[0.04]
                  px-8 py-12
                  flex flex-col items-center text-center gap-0
                  shadow-sm hover:shadow-md transition
                "
              >
                <CardHeader className="flex flex-col items-center gap-6 p-0">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-primary/20">
                    <UserSearch className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    3
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 p-0 mt-6">
                  <h3 className="text-xl font-semibold leading-snug">
                    Escolha a sua área de atendimento
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Selecione a especialidade ou setor desejados.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Card 4 (sem conector) */}
            <div className="relative flex flex-col items-center">
              <Card
                className="
                  w-full max-w-[320px] lg:w-full lg:h-full
                  border-0 rounded-2xl
                  bg-primary/9 dark:bg-white/[0.04]
                  px-8 py-12
                  flex flex-col items-center text-center gap-0
                  shadow-sm hover:shadow-md transition
                "
              >
                <CardHeader className="flex flex-col items-center gap-6 p-0">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-primary/20">
                    <MonitorCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    4
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 p-0 mt-6">
                  <h3 className="text-xl font-semibold leading-snug">
                    Confirme o seu agendamento
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Defina a data e horário disponíveis e finalize o
                    agendamento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
