"use client"

import * as React from "react"
import { EyeIcon, EyeSlashIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { Alert, AlertDescription } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Checkbox } from "@/registry/ui/checkbox"
import { Container } from "@/registry/ui/container"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/ui/input-group"

export type Signup01Labels = {
  title: string
  description: string
  name: string
  email: string
  password: string
  passwordHint: string
  showPassword: string
  termsIntro: string
  terms: string
  and: string
  privacy: string
  termsRequired: string
  submit: string
  submitting: string
  haveAccount: string
  signIn: string
  failed: string
}

export const labelsEn: Signup01Labels = {
  title: "Create your store account",
  description: "Start selling in a few minutes.",
  name: "Full name",
  email: "Email",
  password: "Password",
  passwordHint: "Use at least 8 characters.",
  showPassword: "Show password",
  termsIntro: "I agree to the",
  terms: "Terms",
  and: "and",
  privacy: "Privacy Policy",
  termsRequired: "You need to accept the terms to continue.",
  submit: "Create account",
  submitting: "Creating account…",
  haveAccount: "Already have an account?",
  signIn: "Sign in",
  failed: "We could not create the account. Try again.",
}

export const labelsAr: Signup01Labels = {
  title: "أنشئ حساب متجرك",
  description: "ابدأ البيع خلال دقائق.",
  name: "الاسم الكامل",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  passwordHint: "استخدم 8 أحرف على الأقل.",
  showPassword: "إظهار كلمة المرور",
  termsIntro: "أوافق على",
  terms: "الشروط والأحكام",
  and: "و",
  privacy: "سياسة الخصوصية",
  termsRequired: "يجب قبول الشروط للمتابعة.",
  submit: "إنشاء الحساب",
  submitting: "جارٍ إنشاء الحساب…",
  haveAccount: "لديك حساب بالفعل؟",
  signIn: "تسجيل الدخول",
  failed: "تعذّر إنشاء الحساب. حاول مرة أخرى.",
}

export type Signup01Props = {
  lang?: Lang
  labels?: Partial<Signup01Labels>
  className?: string
  brand?: React.ReactNode
  termsHref?: string
  privacyHref?: string
  signInHref?: string
  onSubmit?: (values: { name: string; email: string; password: string }) => Promise<{ ok: boolean; message?: string }> | void
}

export function Signup01({
  lang = "en",
  labels,
  className,
  brand,
  termsHref = "#terms",
  privacyHref = "#privacy",
  signInHref = "#login",
  onSubmit,
}: Signup01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const id = React.useId()
  const [visible, setVisible] = React.useState(false)
  const [accepted, setAccepted] = React.useState(false)
  const [termsError, setTermsError] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTermsError(!accepted)
    if (!accepted) return
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError(null)
    const result = await onSubmit?.({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    })
    setPending(false)
    if (result && !result.ok) setError(result.message ?? t.failed)
  }

  const link = "font-medium text-foreground underline-offset-4 hover:underline"

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
                <FieldLabel htmlFor={`${id}-name`}>{t.name}</FieldLabel>
                <Input id={`${id}-name`} name="name" required autoComplete="name" />
              </Field>
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
              <Field>
                <FieldLabel htmlFor={`${id}-password`}>{t.password}</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={`${id}-password`}
                    name="password"
                    type={visible ? "text" : "password"}
                    dir="ltr"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    aria-describedby={`${id}-hint`}
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
                <FieldDescription id={`${id}-hint`}>{t.passwordHint}</FieldDescription>
              </Field>
              <Field orientation="horizontal" data-invalid={termsError || undefined}>
                <Checkbox
                  id={`${id}-terms`}
                  checked={accepted}
                  aria-invalid={termsError || undefined}
                  aria-describedby={termsError ? `${id}-terms-error` : undefined}
                  onCheckedChange={(checked) => {
                    setAccepted(checked)
                    if (checked) setTermsError(false)
                  }}
                />
                <FieldContent>
                  <FieldLabel htmlFor={`${id}-terms`} className="inline font-normal">
                    {t.termsIntro}{" "}
                    <a href={termsHref} className={link}>
                      {t.terms}
                    </a>{" "}
                    {t.and}{" "}
                    <a href={privacyHref} className={link}>
                      {t.privacy}
                    </a>
                  </FieldLabel>
                  {termsError ? <FieldError id={`${id}-terms-error`}>{t.termsRequired}</FieldError> : null}
                </FieldContent>
              </Field>
              <Button type="submit" size="lg" disabled={pending} className="w-full">
                {pending ? t.submitting : t.submit}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {t.haveAccount}{" "}
                <a href={signInHref} className={link}>
                  {t.signIn}
                </a>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Signup01

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

export const demo: { en: Signup01Props; ar: Signup01Props } = {
  en: { lang: "en", labels: labelsEn, brand: <Brand name="Mizan Store" /> },
  ar: { lang: "ar", labels: labelsAr, brand: <Brand name="متجر ميزان" /> },
}
