"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import { isolateLtr, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/registry/ui/input-group"

export type Login02Labels = {
  title: string
  description: string
  phone: string
  phoneHint: string
  invalid: string
  send: string
  sending: string
  channelSms: string
  channelWhatsapp: string
  termsIntro: string
  terms: string
  and: string
  privacy: string
}

export const labelsEn: Login02Labels = {
  title: "Sign in with your phone",
  description: "We will send a verification code to your mobile number.",
  phone: "Mobile number",
  phoneHint: `Example: ${isolateLtr("50 123 4567")}`,
  invalid: "Enter a valid Saudi mobile number that starts with 5.",
  send: "Send code",
  sending: "Sending…",
  channelSms: "by SMS",
  channelWhatsapp: "on WhatsApp",
  termsIntro: "By continuing you agree to our",
  terms: "Terms",
  and: "and",
  privacy: "Privacy Policy",
}

export const labelsAr: Login02Labels = {
  title: "تسجيل الدخول برقم الجوال",
  description: "سنرسل رمز التحقق إلى رقم جوالك.",
  phone: "رقم الجوال",
  phoneHint: `مثال: ${isolateLtr("50 123 4567")}`,
  invalid: "أدخل رقم جوال سعوديًا صحيحًا يبدأ بالرقم 5.",
  send: "إرسال رمز التحقق",
  sending: "جارٍ الإرسال…",
  channelSms: "برسالة نصية",
  channelWhatsapp: "عبر واتساب",
  termsIntro: "بمتابعتك فأنت توافق على",
  terms: "الشروط والأحكام",
  and: "و",
  privacy: "سياسة الخصوصية",
}

const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩"

// Accepts 05x, 5x, 9665x and 009665x, with Latin or Arabic-Indic digits. Returns the 9 national digits or null.
export function normalizeSaudiMobile(input: string): string | null {
  const digits = input
    .replace(/[٠-٩]/g, (d) => String(ARABIC_INDIC.indexOf(d)))
    .replace(/\D/g, "")
    .replace(/^(?:00)?966/, "")
    .replace(/^0/, "")
  return /^5\d{8}$/.test(digits) ? digits : null
}

export type Login02Props = {
  lang?: Lang
  labels?: Partial<Login02Labels>
  className?: string
  brand?: React.ReactNode
  channel?: "sms" | "whatsapp"
  termsHref?: string
  privacyHref?: string
  onRequestOtp?: (phone: string, channel: "sms" | "whatsapp") => Promise<void> | void
}

export function Login02({
  lang = "en",
  labels,
  className,
  brand,
  channel = "sms",
  termsHref = "#terms",
  privacyHref = "#privacy",
  onRequestOtp,
}: Login02Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const id = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [invalid, setInvalid] = React.useState(false)
  const [pending, setPending] = React.useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const national = normalizeSaudiMobile(String(new FormData(event.currentTarget).get("phone")))
    setInvalid(!national)
    if (!national) {
      inputRef.current?.focus()
      return
    }
    setPending(true)
    await onRequestOtp?.(`+966${national}`, channel)
    setPending(false)
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
          <form noValidate aria-busy={pending} onSubmit={submit}>
            <FieldGroup>
              <Field data-invalid={invalid || undefined}>
                <FieldLabel htmlFor={`${id}-phone`}>{t.phone}</FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupAddon>
                    <InputGroupText>+966</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    ref={inputRef}
                    id={`${id}-phone`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-invalid={invalid || undefined}
                    aria-describedby={`${id}-hint`}
                    placeholder="50 123 4567"
                  />
                </InputGroup>
                {invalid ? <FieldError>{t.invalid}</FieldError> : null}
                <FieldDescription id={`${id}-hint`}>{t.phoneHint}</FieldDescription>
              </Field>
              <Button type="submit" size="lg" disabled={pending} className="w-full">
                {pending ? t.sending : `${t.send} ${channel === "sms" ? t.channelSms : t.channelWhatsapp}`}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {t.termsIntro}{" "}
                <a href={termsHref} className={link}>
                  {t.terms}
                </a>{" "}
                {t.and}{" "}
                <a href={privacyHref} className={link}>
                  {t.privacy}
                </a>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login02

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

export const demo: { en: Login02Props; ar: Login02Props } = {
  en: { lang: "en", labels: labelsEn, brand: <Brand name="Mizan Store" />, channel: "whatsapp" },
  ar: { lang: "ar", labels: labelsAr, brand: <Brand name="متجر ميزان" />, channel: "whatsapp" },
}
