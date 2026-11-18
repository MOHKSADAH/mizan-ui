"use client"

import * as React from "react"
import { EyeIcon, EyeSlashIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { Alert, AlertDescription } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/ui/input-group"

export type Login01Labels = {
  title: string
  description: string
  email: string
  password: string
  forgot: string
  showPassword: string
  submit: string
  submitting: string
  or: string
  noAccount: string
  signUp: string
  invalid: string
}

export const labelsEn: Login01Labels = {
  title: "Sign in to your store",
  description: "Enter your email and password to continue.",
  email: "Email",
  password: "Password",
  forgot: "Forgot your password?",
  showPassword: "Show password",
  submit: "Sign in",
  submitting: "Signing in…",
  or: "or",
  noAccount: "Don't have an account?",
  signUp: "Create an account",
  invalid: "The email or password is not correct.",
}

export const labelsAr: Login01Labels = {
  title: "تسجيل الدخول إلى متجرك",
  description: "أدخل بريدك الإلكتروني وكلمة المرور للمتابعة.",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  forgot: "نسيت كلمة المرور؟",
  showPassword: "إظهار كلمة المرور",
  submit: "تسجيل الدخول",
  submitting: "جارٍ تسجيل الدخول…",
  or: "أو",
  noAccount: "ليس لديك حساب؟",
  signUp: "أنشئ حسابًا",
  invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
}

export type AuthResult = { ok: true } | { ok: false; message?: string }

export type Login01Props = {
  lang?: Lang
  labels?: Partial<Login01Labels>
  className?: string
  brand?: React.ReactNode
  ssoSlot?: React.ReactNode
  forgotHref?: string
  signUpHref?: string
  onSubmit?: (values: { email: string; password: string }) => Promise<AuthResult> | AuthResult | void
}

export function Login01({
  lang = "en",
  labels,
  className,
  brand,
  ssoSlot,
  forgotHref = "#forgot",
  signUpHref = "#signup",
  onSubmit,
}: Login01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const id = React.useId()
  const emailRef = React.useRef<HTMLInputElement>(null)
  const [visible, setVisible] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError(null)
    const result = await onSubmit?.({ email: String(form.get("email")), password: String(form.get("password")) })
    setPending(false)
    if (result && !result.ok) {
      setError(result.message ?? t.invalid)
      emailRef.current?.focus()
    }
  }

  return (
    <Container size="narrow" dir={dir} className={cn("flex justify-center py-12 md:py-16", className)}>
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-3">
          {brand}
          <CardTitle role="heading" aria-level={1} className="text-xl">
            {t.title}
          </CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form aria-busy={pending} onSubmit={submit}>
            <FieldGroup>
              {error ? (
                <Alert variant="destructive">
                  <WarningCircleIcon aria-hidden="true" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              <Field>
                <FieldLabel htmlFor={`${id}-email`}>{t.email}</FieldLabel>
                <Input
                  ref={emailRef}
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  dir="ltr"
                  required
                  autoComplete="username"
                  aria-invalid={error ? true : undefined}
                  className="rtl:text-end"
                />
              </Field>
              <Field>
                <div className="flex items-center justify-between gap-2">
                  <FieldLabel htmlFor={`${id}-password`}>{t.password}</FieldLabel>
                  <a href={forgotHref} className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    {t.forgot}
                  </a>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id={`${id}-password`}
                    name="password"
                    type={visible ? "text" : "password"}
                    dir="ltr"
                    required
                    autoComplete="current-password"
                    aria-invalid={error ? true : undefined}
                    className="rtl:text-end"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={t.showPassword}
                      aria-pressed={visible}
                      onClick={() => setVisible((v) => !v)}
                    >
                      {visible ? <EyeSlashIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Button type="submit" size="lg" disabled={pending} className="w-full">
                {pending ? t.submitting : t.submit}
              </Button>
              {ssoSlot ? (
                <>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">{t.or}</FieldSeparator>
                  {ssoSlot}
                </>
              ) : null}
              <p className="text-center text-sm text-muted-foreground">
                {t.noAccount}{" "}
                <a href={signUpHref} className="font-medium text-foreground underline-offset-4 hover:underline">
                  {t.signUp}
                </a>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login01

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

export const demo: { en: Login01Props; ar: Login01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    brand: <Brand name="Mizan Store" />,
    ssoSlot: (
      <Button type="button" variant="outline" size="lg" className="w-full">
        Continue with Nafath
      </Button>
    ),
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    brand: <Brand name="متجر ميزان" />,
    ssoSlot: (
      <Button type="button" variant="outline" size="lg" className="w-full">
        المتابعة عبر نفاذ
      </Button>
    ),
  },
}
