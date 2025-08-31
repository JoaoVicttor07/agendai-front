import { Button } from "@/components/ui/button"
import { Calendar, FileText, UserSearch } from "lucide-react"

export function Hero() {
    return(
        <section
          className="
            relative isolate
            min-h-[72vh]
            grid grid-cols-1 lg:grid-cols-2
            place-items-center
            gap-12 lg:gap-20
            px-6 lg:px-12
            py-5 lg:py-16
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
    )
}