import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { Interactions } from '@/components/site/interactions'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WILKREY — студія веб-дизайну та розробки',
  description:
    'WILKREY — незалежна студія. Створюємо сучасні сайти та лендінги для малого бізнесу, підприємців і незалежних професіоналів.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/logo-mark.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#07080a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={manrope.variable}>
      <body>
        <div className="scroll-bar" aria-hidden="true" />
        {children}
        <Interactions />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
