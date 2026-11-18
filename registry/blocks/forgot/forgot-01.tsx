"use client"

import * as React from "react"
import { ArrowLeftIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Field, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export type Forgot01Labels = {
  title: string
  description: string
  email: string
  submit: string
  submitting: string
  backToLogin: string
  sentTitle: string
  sentDescription: string
  tryAgain: string
}

export const labelsEn: Forgot01Labels = {
  title: "Reset your password",
  description: "Enter your email and we will send you a link to reset your password.",
  email: "Email",
  submit: "Send reset link",
  submitting: "Sending…",
  backToLogin: "Back to sign in",
  sentTitle: "Check your email",
  sentDescription: "If an account exists for that address, a reset link is on its way.",
  tryAgain: "Use a different email",
}

export const labelsAr: Forgot01Labels = {
  title: "إعادة تعيين كلمة المرور",
  description: "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
  email: "البريد الإلكتروني",
  submit: "إرسال رابط إعادة التعيين",
  submitting: "جارٍ الإرسال…",
  backToLogin: "العودة إلى تسجيل الدخول",
  sentTitle: "تحقق من بريدك الإلكتروني",
  sentDescription: "إذا كان هناك حساب مرتبط بهذا العنوان، فسيصلك رابط إعادة التعيين.",
  tryAgain: "استخدم بريدًا آخر",
}

export type Forgot01Props = {
  lang?: Lang
  labels?: Partial<Forgot01Labels>
  className?: string
  brand?: React.ReactNode
  loginHref?: string
  // The sent screen is shown whether or not the account exists, so the form never reveals which emails are registered.
  onSubmit?: (email: string) => Promise<void> | void
}

export function Forgot01({ lang = "en", labels, className, brand, loginHref = "#login", onSubmit }: Forgot01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const id = React.useId()
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const [pending, setPending] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get("email"))
    setPending(true)
    try {
      await onSubmit?.(email)
      setSent(true)
    } finally {
      setPending(false)
    }
  }

  React.useEffect(() => {
    if (sent) headingRef.current?.focus()
  }, [sent])

  const back = (
    <a
      href={loginHref}
      className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      <ArrowLeftIcon aria-hidden="true" className="size-4 rtl:rotate-180" />
      {t.backToLogin}
    </a>
  )

  return (
    <Container size="narrow" dir={dir} className={cn("flex justify-center py-12 md:py-16", className)}>
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-3">
          {brand}
          {sent ? (
            <>
              <EnvelopeSimpleIcon aria-hidden="true" className="size-8 text-muted-foreground" />
              <h1 ref={headingRef} tabIndex={-1} className="text-xl leading-snug font-medium outline-none">
                {t.sentTitle}
              </h1>
              <CardDescription role="status">{t.sentDescription}</CardDescription>
            </>
          ) : (
            <>
              <CardTitle role="heading" aria-level={1} className="text-xl">
                {t.title}
              </CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="flex flex-col gap-4">
              <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => setSent(false)}>
                {t.tryAgain}
              </Button>
              <div className="text-center">{back}</div>
            </div>
          ) : (
            <form aria-busy={pending} onSubmit={submit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor={`${id}-email`}>{t.email}</FieldLabel>
                  <Input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    dir="ltr"
                    required
                    autoComplete="email"
                    className="rtl:text-end"
                  />
                </Field>
                <Button type="submit" size="lg" disabled={pending} className="w-full">
                  {pending ? t.submitting : t.submit}
                </Button>
                <div className="text-center">{back}</div>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default Forgot01

const Brand = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2">
    <span
      aria-hidden="true"
      className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
    >
      {[...name][0]}
    </span>
    <span className="font-medium">{name}</span>
  </div>
)

export const demo: { en: Forgot01Props; ar: Forgot01Props } = {
  en: { lang: "en", labels: labelsEn, brand: <Brand name="Mizan Store" /> },
  ar: { lang: "ar", labels: labelsAr, brand: <Brand name="متجر ميزان" /> },
}
