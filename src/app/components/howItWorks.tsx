import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot, FileText, UserSearch, MonitorCheck } from "lucide-react"

export function HowItWorks() {
    return (
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
    )
}