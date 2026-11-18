"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import type { Plural } from "@/registry/lib/block-types"
import { plural, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { FieldError } from "@/registry/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/ui/input-otp"

export type Otp01Labels = {
  title: string
  description: string
  code: string
  verify: string
  verifying: string
  invalid: string
  resend: string
  resendIn: Plural
  changeNumber: string
}

export const labelsEn: Otp01Labels = {
  title: "Enter the verification code",
  description: "Enter the 6-digit code we sent to",
  code: "Verification code",
  verify: "Verify",
  verifying: "Verifying…",
  invalid: "The code is not correct. Check it and try again.",
  resend: "Resend code",
  resendIn: (n) =>
    plural(n, { one: "Resend code in {n} second", other: "Resend code in {n} seconds" }, { lang: "en" }),
  changeNumber: "Change number",
}

export const labelsAr: Otp01Labels = {
  title: "أدخل رمز التحقق",
  description: "أدخل الرمز المكوّن من 6 أرقام الذي أرسلناه إلى",
  code: "رمز التحقق",
  verify: "تحقق",
  verifying: "جارٍ التحقق…",
  invalid: "الرمز غير صحيح. تأكد منه وحاول مرة أخرى.",
  resend: "إعادة إرسال الرمز",
  resendIn: (n) =>
    plural(
      n,
      {
        one: "إعادة الإرسال بعد ثانية",
        two: "إعادة الإرسال بعد ثانيتين",
        few: "إعادة الإرسال بعد {n} ثوانٍ",
        many: "إعادة الإرسال بعد {n} ثانية",
        other: "إعادة الإرسال بعد {n} ثانية",
      },
      { lang: "ar" }
    ),
  changeNumber: "تغيير الرقم",
}

export type Otp01Props = {
  lang?: Lang
  labels?: Partial<Otp01Labels>
  className?: string
  brand?: React.ReactNode
  maskedTarget: string
  length?: number
  resendSeconds?: number
  changeHref?: string
  onVerify?: (code: string) => Promise<{ ok: boolean }> | { ok: boolean } | void
  onResend?: () => void
}

export function Otp01({
  lang = "en",
  labels,
  className,
  brand,
  maskedTarget,
  length = 6,
  resendSeconds = 60,
  changeHref = "#change",
  onVerify,
  onResend,
}: Otp01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const [code, setCode] = React.useState("")
  const [invalid, setInvalid] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [seconds, setSeconds] = React.useState(resendSeconds)

  React.useEffect(() => {
    if (seconds <= 0) return
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  // Screen readers hear the countdown in 10 second steps, not every second.
  const announced = seconds <= 0 ? 0 : Math.ceil(seconds / 10) * 10

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (code.length < length) return
    setPending(true)
    setInvalid(false)
    const result = await onVerify?.(code)
    setPending(false)
    if (result && !result.ok) setInvalid(true)
  }

  const resend = () => {
    onResend?.()
    setSeconds(resendSeconds)
    setCode("")
    setInvalid(false)
  }

  return (
    <Container size="narrow" dir={dir} className={cn("flex justify-center py-12 md:py-16", className)}>
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-3">
          {brand}
          <CardTitle role="heading" aria-level={1} className="text-xl">
            {t.title}
          </CardTitle>
          <CardDescription>
            {t.description} <bdi dir="ltr">{maskedTarget}</bdi>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form aria-busy={pending} onSubmit={submit} className="flex flex-col items-center gap-4">
            <div dir="ltr">
              <InputOTP
                maxLength={length}
                value={code}
                onChange={(value) => {
                  setCode(value)
                  setInvalid(false)
                }}
                pattern="^[0-9]*$"
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label={t.code}
                aria-invalid={invalid || undefined}
                autoFocus
              >
                <InputOTPGroup>
                  {Array.from({ length }, (_, index) => (
                    <InputOTPSlot key={index} index={index} aria-invalid={invalid || undefined} className="size-10 text-base" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            {invalid ? <FieldError>{t.invalid}</FieldError> : null}
            <Button type="submit" size="lg" disabled={pending || code.length < length} className="w-full">
              {pending ? t.verifying : t.verify}
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
              {seconds > 0 ? (
                <span aria-hidden="true" className="text-muted-foreground">
                  {t.resendIn(seconds)}
                </span>
              ) : (
                <Button type="button" variant="link" onClick={resend}>
                  {t.resend}
                </Button>
              )}
              <span role="status" className="sr-only">
                {seconds > 0 ? t.resendIn(announced) : t.resend}
              </span>
              <a href={changeHref} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                {t.changeNumber}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Otp01

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

export const demo: { en: Otp01Props; ar: Otp01Props } = {
  en: { lang: "en", labels: labelsEn, brand: <Brand name="Mizan Store" />, maskedTarget: "+966 5• ••• ••12" },
  ar: { lang: "ar", labels: labelsAr, brand: <Brand name="متجر ميزان" />, maskedTarget: "+966 5• ••• ••12" },
}
