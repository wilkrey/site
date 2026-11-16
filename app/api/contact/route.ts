import { NextResponse } from 'next/server'

const projectTypes = ['Лендінг', 'Сайт-візитівка', 'Інтернет-магазин', 'Редизайн', 'Інше']

type Payload = {
  name?: unknown
  email?: unknown
  projectType?: unknown
  message?: unknown
  telegram?: unknown
  website?: unknown
}

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(request: Request) {
  let body: Payload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot: real visitors never fill this hidden field.
  if (text(body.website, 200)) return NextResponse.json({ ok: true })

  const name = text(body.name, 100)
  const email = text(body.email, 200)
  const projectType = text(body.projectType, 60)
  const message = text(body.message, 4000)
  const telegram = text(body.telegram, 64)

  const valid =
    name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) &&
    message.length >= 10 &&
    projectTypes.includes(projectType) &&
    (telegram === '' || /^@?[A-Za-z0-9_]{5,32}$/.test(telegram))

  if (!valid) return NextResponse.json({ error: 'validation' }, { status: 422 })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'WILKREY <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Нова заявка з сайту — ${name}`,
      text: [
        `Ім'я: ${name}`,
        `Email: ${email}`,
        `Тип проєкту: ${projectType}`,
        `Telegram: ${telegram || '—'}`,
        '',
        message,
      ].join('\n'),
    }),
  }).catch(() => null)

  if (!response?.ok) return NextResponse.json({ error: 'delivery_failed' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
