"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { formatNumber } from "@/registry/lib/format"
import { toAsciiDigits } from "@/registry/lib/mask"
import { Button } from "@/registry/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/ui/input-otp"
import type { ExampleProps } from "@/registry/examples/types"

const SECONDS = 30
const LENGTH = 6

const text = {
  en: {
    label: "Verification code",
    hint: "Enter the 6-digit code we sent by SMS.",
    wait: "You can request a new code in {n} seconds.",
    ready: "You can request a new code now.",
    resend: "Resend code",
    sent: "A new code was sent.",
    wrong: "That code is not correct. Try again.",
    done: "Phone number verified.",
    demo: "Demo: the correct code is 123456.",
  },
  ar: {
    label: "رمز التحقق",
    hint: "أدخل الرمز المكوّن من 6 أرقام الذي أرسلناه برسالة نصية.",
    wait: "يمكنك طلب رمز جديد بعد {n} ثانية.",
    ready: "يمكنك طلب رمز جديد الآن.",
    resend: "إعادة إرسال الرمز",
    sent: "تم إرسال رمز جديد.",
    wrong: "الرمز غير صحيح. حاول مرة أخرى.",
    done: "تم التحقق من رقم الهاتف.",
    demo: "للتجربة: الرمز الصحيح هو 123456.",
  },
}

export function SmsCodeDemo({ lang }: ExampleProps) {
  const t = text[lang]
  const [code, setCode] = React.useState("")
  const [left, setLeft] = React.useState(SECONDS)
  const [state, setState] = React.useState<"idle" | "wrong" | "done" | "sent">("idle")

  React.useEffect(() => {
    if (left <= 0) return
    const id = setTimeout(() => setLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [left])

  const message = state === "wrong" ? t.wrong : state === "done" ? t.done : state === "sent" ? t.sent : ""

  return (
    <div className="flex w-fit max-w-full flex-col gap-3">
      <p id="otp-hint" className="text-sm text-muted-foreground">
        {t.hint}
      </p>
      <div dir="ltr" className="w-fit">
        <InputOTP
          maxLength={LENGTH}
          value={code}
          pattern={REGEXP_ONLY_DIGITS}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label={t.label}
          aria-describedby="otp-hint"
          aria-invalid={state === "wrong" || undefined}
          disabled={state === "done"}
          pasteTransformer={toAsciiDigits}
          onChange={(v) => {
            setCode(v)
            if (state !== "done") setState("idle")
          }}
          onComplete={(v) => {
            if (v === "123456") setState("done")
            else {
              setState("wrong")
              setCode("")
            }
          }}
        >
          <InputOTPGroup>
            {Array.from({ length: LENGTH }, (_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <p role="status" aria-live="polite" className={state === "wrong" ? "text-sm text-destructive" : "text-sm"}>
        {message}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={left > 0 || state === "done"}
          onClick={() => {
            setLeft(SECONDS)
            setCode("")
            setState("sent")
          }}
        >
          {t.resend}
        </Button>
        <span className="text-sm text-muted-foreground">
          {left > 0 ? t.wait.replace("{n}", formatNumber(left, { lang })) : t.ready}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{t.demo}</p>
    </div>
  )
}
