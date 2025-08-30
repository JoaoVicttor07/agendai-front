import Link from "next/link"
import { FaGithub } from 'react-icons/fa';

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="text-xl font-semibold">AgendAI</div>
            <p className="text-sm text-muted-foreground">
              Agendamentos acadêmicos gratuitos supervisionados.
            </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#hero" className="hover:text-primary">Início</Link></li>
            <li><Link href="#como-funciona" className="hover:text-primary">Como funciona</Link></li>
            <li><Link href="#consultar" className="hover:text-primary">Consultar</Link></li>
            <li><Link href="#contato" className="hover:text-primary">Contato</Link></li>
          </ul>
        </div>
        {/* <div>
          <h4 className="mb-3 text-sm font-semibold">Recursos</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link href="/suporte" className="hover:text-primary">Suporte</Link></li>
            <li><Link href="/privacidade" className="hover:text-primary">Privacidade</Link></li>
            <li><Link href="/termos" className="hover:text-primary">Termos</Link></li>
          </ul>
        </div> */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Contato</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            agendai@exemplo.edu.br<br />
            (00) 0000-0000<br />
          </p>
          <div className="flex gap-3">
            <Link aria-label="GitHub" href="https://github.com">
              <span className="text-muted-foreground hover:text-primary text-sm">GitHub</span>
            </Link>
            <Link aria-label="Instagram" href="#">
              <span className="text-muted-foreground hover:text-primary text-sm">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} AgendAI. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link href="/acesso-restrito" className="hover:text-primary">Acesso restrito</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}