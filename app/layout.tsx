import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Onest, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-source-serif',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WILKREY — студія веб-дизайну та розробки',
  description:
    'WILKREY — незалежна студія. Створюємо сучасні сайти та лендінги для малого бізнесу, підприємців і незалежних професіоналів.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#efe9de',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${onest.variable} ${sourceSerif.variable}`}>
      <body className="grain">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
