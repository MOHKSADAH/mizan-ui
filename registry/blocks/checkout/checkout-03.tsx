"use client"

import * as React from "react"
import { WarningCircleIcon } from "@phosphor-icons/react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { Button } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Field, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { PhoneInput, phoneInputLabelsAr } from "@/registry/ui/phone-input"
import { RegionCitySelect, regionCitySelectLabelsAr } from "@/registry/ui/region-city-select"
import { Section } from "@/registry/ui/section"
import { Spinner } from "@/registry/ui/spinner"

export type ExpressMethod = "apple-pay" | "mada" | "stc-pay"

export type Checkout03Labels = {
  title: string
  description: string
  methods: Record<ExpressMethod, string>
  divider: string
  phone: string
  name: string
  district: string
  street: string
  continue: string
  pending: string
  incomplete: string
}

export const labelsEn: Checkout03Labels = {
  title: "Express checkout",
  description: "Express payments use the mobile number and address saved in your wallet.",
  methods: { "apple-pay": "Apple Pay", mada: "mada", "stc-pay": "STC Pay" },
  divider: "or pay another way",
  phone: "Mobile number",
  name: "Full name",
  district: "District",
  street: "Street",
  continue: "Continue to payment",
  pending: "Waiting for your confirmation",
  incomplete: "Enter your mobile number, full name, city, district and street.",
}

export const labelsAr: Checkout03Labels = {
  title: "الدفع السريع",
  description: "الدفع السريع يستخدم رقم الجوال والعنوان المحفوظين في محفظتك.",
  methods: { "apple-pay": "Apple Pay", mada: "مدى", "stc-pay": "STC Pay" },
  divider: "أو ادفع بطريقة أخرى",
  phone: "رقم الجوال",
  name: "الاسم الكامل",
  district: "الحي",
  street: "الشارع",
  continue: "المتابعة إلى الدفع",
  pending: "بانتظار تأكيدك",
  incomplete: "أدخل رقم الجوال والاسم الكامل والمدينة والحي والشارع.",
}

export type Checkout03Details = {
  // E.164.
  phone?: string
  name: string
  region: string | null
  city: string | null
  district: string
  street: string
}

export type Checkout03Props = BlockBase & {
  lang?: Lang
  labels?: Partial<Checkout03Labels>
  // The express buttons in the order shown. Hide Apple Pay on a device without it.
  express?: ExpressMethod[]
  // The method waiting for the wallet or the bank. All the buttons stay disabled until it ends.
  pendingMethod?: ExpressMethod
  onExpress?: (method: ExpressMethod) => void
  onContinue?: (details: Checkout03Details) => void
}

const defaultExpress: ExpressMethod[] = ["apple-pay", "mada", "stc-pay"]

export function Checkout03({
  lang = "en",
  labels,
  express = defaultExpress,
  pendingMethod,
  onExpress,
  onContinue,
  id,
  headingLevel = 2,
  className,
}: Checkout03Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const dir = ar ? "rtl" : "ltr"
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [phone, setPhone] = React.useState<string>()
  const [phoneValid, setPhoneValid] = React.useState(false)
  const [name, setName] = React.useState("")
  const [place, setPlace] = React.useState<{ region: string | null; city: string | null }>({ region: null, city: null })
  const [district, setDistrict] = React.useState("")
  const [street, setStreet] = React.useState("")
  const [tried, setTried] = React.useState(false)
  const complete = phoneValid && name.trim() !== "" && !!place.city && district.trim() !== "" && street.trim() !== ""
  const waiting = pendingMethod !== undefined

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="max-w-md">
        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Heading className="text-lg font-semibold">{t.title}</Heading>
              <p className="text-sm text-muted-foreground">{t.description}</p>
            </div>
            <div role="group" aria-label={t.title} className="grid gap-2">
              {express.map((method, index) => (
                <Button
                  key={method}
                  type="button"
                  variant={index === 0 ? "default" : "outline"}
                  className="h-11 w-full text-base"
                  disabled={waiting}
                  aria-busy={pendingMethod === method || undefined}
                  onClick={() => onExpress?.(method)}
                >
                  {pendingMethod === method && <Spinner aria-hidden="true" role={undefined} className="motion-reduce:animate-none" />}
                  {pendingMethod === method ? t.pending : t.methods[method]}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground" role="separator" aria-label={t.divider}>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
              <span aria-hidden="true">{t.divider}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>
            <form
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                if (!complete) return setTried(true)
                onContinue?.({ phone, name, ...place, district, street })
              }}
            >
              <FieldGroup>
                <PhoneInput
                  lang={lang}
                  label={t.phone}
                  labels={ar ? phoneInputLabelsAr : undefined}
                  onValueChange={(e164, valid) => {
                    setPhone(e164)
                    setPhoneValid(valid)
                  }}
                />
                <Field>
                  <FieldLabel htmlFor={`${sid}-name`}>{t.name}</FieldLabel>
                  <Input id={`${sid}-name`} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
                </Field>
                <RegionCitySelect lang={lang} labels={ar ? regionCitySelectLabelsAr : undefined} value={place} onValueChange={setPlace} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor={`${sid}-district`}>{t.district}</FieldLabel>
                    <Input id={`${sid}-district`} value={district} onChange={(event) => setDistrict(event.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`${sid}-street`}>{t.street}</FieldLabel>
                    <Input id={`${sid}-street`} autoComplete="address-line1" value={street} onChange={(event) => setStreet(event.target.value)} />
                  </Field>
                </div>
                {tried && !complete && (
                  <p role="alert" className="flex items-center gap-1.5 text-sm text-destructive">
                    <WarningCircleIcon aria-hidden="true" weight="fill" className="size-4 shrink-0" />
                    {t.incomplete}
                  </p>
                )}
                <Button type="submit" className="h-11 w-full text-base" disabled={waiting}>
                  {t.continue}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default Checkout03

export const demo: { en: Checkout03Props; ar: Checkout03Props } = {
  en: { lang: "en", labels: labelsEn },
  ar: { lang: "ar", labels: labelsAr },
}
