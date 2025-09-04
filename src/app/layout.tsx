import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./components/themeProvider"

export const metadata: Metadata = {
  title: "AgendAI",
  description: "AgendAI - página inicial",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}