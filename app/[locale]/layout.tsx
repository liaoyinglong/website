import 'tailwindcss/tailwind.css'
import '~/app/globals.css'

import { Manrope, Noto_Sans_SC } from 'next/font/google'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'

import { ThemeProvider } from '~/app/ThemeProvider'

const fontSansEn = Manrope({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans-en',
  fallback: ['ui-sans-serif'],
})
const fontSansZhCN = Noto_Sans_SC({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans-cn',
  fallback: ['ui-sans-serif'],
})

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = useLocale()

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound()
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`font-sans ${fontSansEn.variable} ${fontSansZhCN.variable}`}
    >
      <body className="font-sans">
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
