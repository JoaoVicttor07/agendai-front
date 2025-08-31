import Link from "next/link"
import {
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 bg-[#1F2536] text-white dark:bg-[#1F2536]">
      {/* Top grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-14 md:gap-10 md:grid-cols-4">
        {/* Coluna 1: Logo + Tagline + Social */}
        <div className="space-y-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-semibold tracking-tight hover:opacity-90 transition"
            >
              AgendAI
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Agendamentos acadêmicos gratuitos supervisionados.
            </p>
          </div>

            <div className="flex gap-4">
              <SocialIcon href="#" label="Facebook">
                <FaFacebookF className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <FaInstagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <FaYoutube className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://github.com/JoaoVicttor07/agendai-front" label="GitHub">
                <FaGithub className="h-4 w-4" />
              </SocialIcon>
            </div>
        </div>

        {/* Coluna 2: Localização */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Localização
          </h4>
          <address className="not-italic text-sm leading-relaxed text-white/70">
            Rua Exemplo, 123<br />
            Bairro Centro<br />
            Cidade - UF
          </address>
        </div>

        {/* Coluna 3: Contato */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Contato
          </h4>
          <ul className="space-y-4 text-sm text-white/80">
            <li>
              <span className="font-medium text-white">Telefone: </span>
              (00) 0000-0000
            </li>
            <li>
              <span className="font-medium text-white">Geral: </span>
              <Link href="mailto:agendai@exemplo.edu.br" className="hover:text-white">
                agendai@exemplo.edu.br
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Soluções / Navegação */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Navegação
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="#como-funciona" className="text-white/80 hover:text-white transition">
                Como funciona
              </Link>
            </li>
            <li>
              <Link href="#consultar" className="text-white/80 hover:text-white transition">
                Consultar agendamentos
              </Link>
            </li>
            <li>
              <Link href="#contato" className="text-white/80 hover:text-white transition">
                Contato
              </Link>
            </li>
            
          </ul>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-white/60">
          © {year} AgendAI. Todos os direitos reservados.
        </p>
        <div className="flex flex-wrap gap-6 text-xs text-white/60">
          <Link href="#" className="hover:text-white">Área restrita</Link>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({
  href,
  label,
  children,
  newTab = true,
}: {
  href: string
  label: string
  children: React.ReactNode
  newTab?: boolean
}) {
  return (
    <Link
      aria-label={label}
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="
        group inline-flex h-11 w-11 items-center justify-center
        rounded-full border border-white/15
        bg-white/5 text-white/80
        backdrop-blur-sm
        transition
        hover:bg-white/10 hover:text-white
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
      "
    >
      {children}
    </Link>
  )
}