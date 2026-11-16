'use client'

import { ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { useRef, useState } from 'react'

const projectTypes = ['Лендінг', 'Сайт-візитівка', 'Інтернет-магазин', 'Редизайн', 'Інше']

type Field = 'name' | 'email' | 'message' | 'telegram'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full rounded-2xl border border-void/15 bg-void/[0.07] px-5 py-4 text-base font-semibold text-void outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-void/45 focus:border-void/60 focus:bg-void/[0.1] focus:ring-4 focus:ring-void/10 aria-[invalid=true]:border-red-800'

function validate(data: FormData): Errors {
  const errors: Errors = {}
  const name = String(data.get('name') ?? '').trim()
  const email = String(data.get('email') ?? '').trim()
  const message = String(data.get('message') ?? '').trim()
  const telegram = String(data.get('telegram') ?? '').trim()
  if (name.length < 2) errors.name = 'Вкажіть ім’я (мінімум 2 символи)'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Вкажіть коректну електронну адресу'
  if (message.length < 10) errors.message = 'Опишіть проєкт хоча б кількома реченнями'
  if (telegram && !/^@?[A-Za-z0-9_]{5,32}$/.test(telegram))
    errors.telegram = 'Формат: @username (5–32 символи, латиниця, цифри, _)'
  return errors
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow mb-2 block text-void/75">
      {children}
      {optional && <span className="ml-2 text-void/50 normal-case">— необов’язково</span>}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-bold text-red-900">
      {message}
    </p>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [notice, setNotice] = useState('')
  const submitting = useRef(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return

    const form = event.currentTarget
    const data = new FormData(form)
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    submitting.current = true
    setStatus('loading')
    setNotice('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (response.ok) {
        form.reset()
        setStatus('success')
        return
      }
      const { error } = (await response.json().catch(() => ({}))) as { error?: string }
      setNotice(
        error === 'not_configured'
          ? 'Форма ще не підключена до пошти, тому заявку не надіслано. Напишіть нам напряму на email або в Telegram.'
          : error === 'validation'
            ? 'Перевірте, будь ласка, заповнені поля.'
            : 'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам напряму.',
      )
      setStatus('error')
    } catch {
      setNotice('Немає зʼєднання з сервером. Перевірте інтернет і спробуйте ще раз.')
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="glass-dark flex min-h-[24rem] flex-col items-start justify-center gap-5 rounded-[2rem] p-8 md:p-12"
      >
        <span className="grid size-14 place-items-center rounded-full bg-void text-lime">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="display text-4xl md:text-5xl">Заявку надіслано</h3>
        <p className="max-w-md text-lg font-semibold text-void/80">
          Дякуємо! Ми прочитаємо повідомлення та відповімо на вашу пошту.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="rounded-full border border-void/30 px-6 py-3 text-sm font-extrabold transition-colors hover:bg-void/10"
        >
          Надіслати ще одну
        </button>
      </div>
    )
  }

  const loading = status === 'loading'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={loading}
      className="glass-dark space-y-5 rounded-[2rem] p-6 md:p-10"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="cf-name">Ім’я</Label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            placeholder="Як до вас звертатись"
            maxLength={100}
            disabled={loading}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            className={inputClass}
          />
          <FieldError id="cf-name-error" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="cf-email">Email</Label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={200}
            disabled={loading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            className={inputClass}
          />
          <FieldError id="cf-email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="cf-type">Тип проєкту</Label>
          <select
            id="cf-type"
            name="projectType"
            defaultValue={projectTypes[0]}
            disabled={loading}
            className={`${inputClass} appearance-none bg-[length:1.25rem] bg-[position:right_1.25rem_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2307080a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")]`}
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="cf-telegram" optional>
            Telegram
          </Label>
          <input
            id="cf-telegram"
            name="telegram"
            autoComplete="off"
            placeholder="@username"
            maxLength={33}
            disabled={loading}
            aria-invalid={!!errors.telegram}
            aria-describedby={errors.telegram ? 'cf-telegram-error' : undefined}
            className={inputClass}
          />
          <FieldError id="cf-telegram-error" message={errors.telegram} />
        </div>
      </div>

      <div>
        <Label htmlFor="cf-message">Опис проєкту</Label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          maxLength={4000}
          placeholder="Чим займається ваша справа, що потрібно від сайту, чи є приклади, які подобаються"
          disabled={loading}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          className={`${inputClass} resize-y`}
        />
        <FieldError id="cf-message-error" message={errors.message} />
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Не заповнюйте це поле
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-2xl bg-red-900/10 px-5 py-4 text-sm font-bold text-red-950">
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex h-16 w-full items-center justify-between gap-4 rounded-full bg-void pr-2.5 pl-8 text-lg font-extrabold text-lime shadow-[0_24px_50px_-20px_rgb(7_8_10/0.8)] transition-[transform,opacity] duration-500 ease-[var(--ease-spring)] enabled:hover:scale-[1.015] disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:justify-center"
      >
        {loading ? 'Надсилаємо…' : 'Надіслати заявку'}
        <span className="grid size-11 place-items-center rounded-full bg-lime text-void">
          {loading ? (
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight
              className="size-5 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          )}
        </span>
      </button>
    </form>
  )
}
