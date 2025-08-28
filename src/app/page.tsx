import { Navbar } from "./components/navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
            py-16
            max-w-7xl mx-auto
          "
        >
          {/* Gradiente amplo adicional para o tema claro (usa novo token) */}
          <div
            className="
              pointer-events-none
              absolute inset-y-0 right-0 w-[60%]
              hidden lg:block dark:hidden
              [background:var(--gradient-hero-light)]
            "
          />
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
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-blue-500 text-white" size="lg">Agendar</Button>
              <Button className="
bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-hover))] active:bg-[hsl(var(--accent-active))]" variant="outline" size="lg">
                Saiba mais
              </Button>
            </div>
          </div>
          {/* Coluna imagem */}
          <div className="relative hidden lg:flex w-full justify-end">
            <div className="relative max-w-md w-full">
              {/* Gradiente para suavizar a borda junto ao texto em telas grandes */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#04070f] dark:to-[#04070f]" />
              <Image
                src="/img.jpg"
                alt="Atendimento remoto em notebook"
                fill
                priority
                className="
                  object-cover
                  rounded-lg
                  opacity-80 hover:opacity-100
                  transition
                  grayscale-[25%] dark:grayscale-[15%]
                "
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}