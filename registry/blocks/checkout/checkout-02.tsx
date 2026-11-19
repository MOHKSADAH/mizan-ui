"use client"

import * as React from "react"
import { WarningCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { Action, BlockBase, Currency, Lang, Vat } from "@/registry/lib/block-types"
import { formatDate, formatPercent } from "@/registry/lib/format"
import { saudiRegions } from "@/registry/lib/gulf/saudi-regions"
import { Alert, AlertDescription } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { CardInput, cardInputLabelsAr, type CardValue } from "@/registry/ui/card-input"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Field, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Installments, installmentsLabelsAr } from "@/registry/ui/installments"
import { OrderStepper, orderStepperLabelsAr } from "@/registry/ui/order-stepper"
import { PaymentMethodSelect, paymentMethodSelectLabelsAr, type PaymentMethod } from "@/registry/ui/payment-method-select"
import { PhoneInput, phoneInputLabelsAr } from "@/registry/ui/phone-input"
import { Price } from "@/registry/ui/price"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { SaudiAddressForm, saudiAddressFormLabelsAr, type SaudiAddress } from "@/registry/ui/saudi-address-form"
import { Section } from "@/registry/ui/section"
import { Spinner } from "@/registry/ui/spinner"
import { computeVat } from "@/registry/ui/vat-summary"

export type CheckoutMethod = "apple-pay" | "card" | "stc-pay" | "tabby" | "tamara" | "cod"
type StepId = "contact" | "address" | "shipping" | "payment" | "review"

export type Checkout02Labels = {
  title: string
  steps: Record<StepId, string>
  back: string
  next: string
  edit: string
  phone: string
  name: string
  free: string
  arrives: (date: string) => string
  methods: Record<CheckoutMethod, { label: string; description?: string }>
  applePayNote: string
  redirectNote: (provider: string) => string
  codNote: string
  rangeNote: (min: React.ReactNode, max: React.ReactNode) => React.ReactNode
  errors: Record<Exclude<StepId, "review">, string>
  reviewHint: string
  placeOrder: string
  processing: string
  vatNote: (rate: string) => string
  termsIntro: string
  failedTitle: string
  failedBody: string
}

export const labelsEn: Checkout02Labels = {
  title: "Checkout",
  steps: { contact: "Contact", address: "Address", shipping: "Shipping", payment: "Payment", review: "Review" },
  back: "Back",
  next: "Continue",
  edit: "Edit",
  phone: "Mobile number",
  name: "Full name",
  free: "Free",
  arrives: (date) => `Arrives ${date}`,
  methods: {
    "apple-pay": { label: "Apple Pay" },
    card: { label: "mada or credit card", description: "mada, Visa and Mastercard" },
    "stc-pay": { label: "STC Pay" },
    tabby: { label: "Tabby", description: "Split into 4 payments" },
    tamara: { label: "Tamara", description: "Split into 4 payments" },
    cod: { label: "Cash on delivery", description: "Pay the courier when it arrives" },
  },
  applePayNote: "You confirm with Face ID or Touch ID on the next step.",
  redirectNote: (provider) => `We take you to ${provider} to confirm, then bring you back to the store.`,
  codNote: "Pay the courier in cash or by card when your order arrives. A fee applies.",
  rangeNote: (min, max) => (
    <>
      Available for orders from {min} to {max}.
    </>
  ),
  errors: {
    contact: "Enter your full name and a valid mobile number.",
    address: "Pick a region and a city, then enter the district and the street.",
    shipping: "Choose a shipping method.",
    payment: "Check the card details, or choose another payment method.",
  },
  reviewHint: "Check your order. You can still change any step.",
  placeOrder: "Place order",
  processing: "Processing your payment",
  vatNote: (rate) => `Prices include ${rate} VAT.`,
  termsIntro: "By placing your order you agree to the",
  failedTitle: "The payment did not go through",
  failedBody: "Your cart and your details are saved. Try again, or pick another payment method.",
}

export const labelsAr: Checkout02Labels = {
  title: "إتمام الطلب",
  steps: { contact: "التواصل", address: "العنوان", shipping: "الشحن", payment: "الدفع", review: "المراجعة" },
  back: "رجوع",
  next: "متابعة",
  edit: "تعديل",
  phone: "رقم الجوال",
  name: "الاسم الكامل",
  free: "مجاني",
  arrives: (date) => `يصل ${date}`,
  methods: {
    "apple-pay": { label: "Apple Pay" },
    card: { label: "مدى أو بطاقة ائتمانية", description: "مدى، فيزا، ماستركارد" },
    "stc-pay": { label: "STC Pay" },
    tabby: { label: "تابي", description: "قسّمها على 4 دفعات" },
    tamara: { label: "تمارا", description: "قسّمها على 4 دفعات" },
    cod: { label: "الدفع عند الاستلام", description: "ادفع للمندوب عند وصول الطلب" },
  },
  applePayNote: "تؤكد الدفع ببصمة الوجه أو الإصبع في الخطوة التالية.",
  redirectNote: (provider) => `ننقلك إلى ${provider} لتأكيد الدفع، ثم تعود إلى المتجر.`,
  codNote: "ادفع للمندوب نقدًا أو بالبطاقة عند وصول طلبك. تُضاف رسوم الدفع عند الاستلام.",
  rangeNote: (min, max) => (
    <>
      متاحة للطلبات من {min} إلى {max}.
    </>
  ),
  errors: {
    contact: "أدخل اسمك الكامل ورقم جوال صحيحًا.",
    address: "اختر المنطقة والمدينة، ثم أدخل الحي والشارع.",
    shipping: "اختر طريقة الشحن.",
    payment: "تحقق من بيانات البطاقة، أو اختر طريقة دفع أخرى.",
  },
  reviewHint: "راجع طلبك. يمكنك تعديل أي خطوة قبل الإتمام.",
  placeOrder: "إتمام الطلب",
  processing: "جارٍ معالجة الدفع",
  vatNote: (rate) => `الأسعار شاملة ضريبة القيمة المضافة ${rate}.`,
  termsIntro: "بإتمام الطلب فأنت توافق على",
  failedTitle: "لم تتم عملية الدفع",
  failedBody: "سلتك وبياناتك محفوظة. أعد المحاولة أو اختر طريقة دفع أخرى.",
}

export type ShippingOption = {
  id: string
  label: string
  // An ISO date: the day the order arrives.
  date: string
  price: number | "free"
}

export type CheckoutValue = {
  // E.164.
  phone?: string
  name: string
  address: SaudiAddress
  shippingId: string
  paymentId: string
  card: CardValue
}

export type Checkout02Props = BlockBase & {
  lang?: Lang
  labels?: Partial<Checkout02Labels>
  currency?: Currency
  vat?: Vat
  // The items total after any discount, in the same VAT mode as `vat`. Shipping and the cash on delivery fee are added here.
  subtotal: number
  shippingOptions: ShippingOption[]
  methods?: CheckoutMethod[]
  codFee?: number
  // The order total range in which Tabby and Tamara are offered, and the date of the first payment.
  installments?: { min: number; max: number; startDate?: string }
  // Current mada BIN prefixes, from your acquirer.
  madaBins?: readonly string[]
  // The step to open on. Defaults to the first.
  defaultStep?: StepId
  status?: "idle" | "pending"
  paymentFailed?: boolean
  terms?: Action
  onSubmit?: (value: CheckoutValue) => void
}

const defaultMethods: CheckoutMethod[] = ["apple-pay", "card", "stc-pay", "tabby", "tamara", "cod"]
const stepIds: StepId[] = ["contact", "address", "shipping", "payment", "review"]

const emptyAddress: SaudiAddress = {
  region: null,
  city: null,
  district: "",
  street: "",
  buildingNumber: "",
  postalCode: "",
  additionalNumber: "",
  shortAddress: "",
}

function addressLine(address: SaudiAddress, lang: Lang) {
  const region = saudiRegions.find((r) => r.code === address.region)
  const city = region?.cities.find((c) => c.nameEn === address.city)
  const cityName = city ? (lang === "ar" ? city.nameAr : city.nameEn) : undefined
  return [address.street, address.district, cityName].filter(Boolean).join(lang === "ar" ? "، " : ", ")
}

export function Checkout02({
  lang = "en",
  labels,
  currency = "SAR",
  vat = { rate: 0.15, included: true },
  subtotal,
  shippingOptions,
  methods = defaultMethods,
  codFee,
  installments,
  madaBins,
  defaultStep = "contact",
  status = "idle",
  paymentFailed,
  terms,
  onSubmit,
  id,
  headingLevel = 2,
  className,
}: Checkout02Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const dir = ar ? "rtl" : "ltr"
  const uid = React.useId()
  const sid = id ?? uid
  const Title = `h${headingLevel}` as "h2" | "h3"
  const Sub = `h${headingLevel + 1}` as "h3" | "h4"

  const [step, setStep] = React.useState<StepId>(defaultStep)
  const [phone, setPhone] = React.useState<string>()
  const [phoneValid, setPhoneValid] = React.useState(false)
  const [name, setName] = React.useState("")
  const [address, setAddress] = React.useState(emptyAddress)
  const [addressValid, setAddressValid] = React.useState(true)
  const [shippingId, setShippingId] = React.useState(shippingOptions[0]?.id ?? "")
  const [paymentId, setPaymentId] = React.useState<string>(methods[0])
  const [card, setCard] = React.useState<CardValue>({ number: "", expiry: "", cvc: "" })
  const [cardValid, setCardValid] = React.useState(false)
  const [tried, setTried] = React.useState(false)
  const heading = React.useRef<HTMLHeadingElement>(null)
  const moved = React.useRef(false)

  // After a step change, focus moves to the new step heading so a screen reader announces it.
  React.useEffect(() => {
    if (moved.current) heading.current?.focus()
  }, [step])

  const shipping = shippingOptions.find((o) => o.id === shippingId)
  const shippingCost = typeof shipping?.price === "number" ? shipping.price : 0
  const beforeFee = subtotal + shippingCost
  const fee = paymentId === "cod" ? (codFee ?? 0) : 0
  const total = computeVat(beforeFee + fee, vat, currency).total
  const installable = computeVat(beforeFee, vat, currency).total
  const outOfRange = installments !== undefined && (installable < installments.min || installable > installments.max)
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} decimals />
  const date = (iso: string) => formatDate(new Date(iso), { lang, timeZone: "Asia/Riyadh" }, { weekday: "short", day: "numeric", month: "short" })

  const valid: Record<Exclude<StepId, "review">, boolean> = {
    contact: name.trim() !== "" && phoneValid,
    address: !!address.region && !!address.city && address.district.trim() !== "" && address.street.trim() !== "" && addressValid,
    shipping: shipping !== undefined,
    payment: paymentId !== "card" || cardValid,
  }
  const index = stepIds.indexOf(step)
  const go = (next: StepId) => {
    moved.current = true
    setTried(false)
    setStep(next)
  }
  const next = () => {
    if (step === "review") return
    if (!valid[step]) return setTried(true)
    go(stepIds[index + 1])
  }

  const method = (key: CheckoutMethod): PaymentMethod => {
    const copy = t.methods[key]
    const bnpl = key === "tabby" || key === "tamara"
    return {
      id: key,
      label: copy.label,
      description: copy.description,
      fee: key === "cod" ? codFee : undefined,
      disabledReason: bnpl && outOfRange && installments ? t.rangeNote(price(installments.min), price(installments.max)) : undefined,
      details:
        key === "card" ? (
          <CardInput
            value={card}
            madaBins={madaBins}
            labels={ar ? cardInputLabelsAr : undefined}
            onValueChange={(nextCard, state) => {
              setCard(nextCard)
              setCardValid(state.valid)
            }}
          />
        ) : key === "apple-pay" ? (
          <p className="text-muted-foreground">{t.applePayNote}</p>
        ) : key === "stc-pay" ? (
          <p className="text-muted-foreground">{t.redirectNote(copy.label)}</p>
        ) : bnpl ? (
          <div className="flex flex-col gap-3">
            <Installments
              total={installable}
              currency={currency}
              lang={lang}
              provider={<span className="text-sm font-medium">{copy.label}</span>}
              startDate={installments?.startDate ? new Date(installments.startDate) : undefined}
              timeZone="Asia/Riyadh"
              labels={ar ? installmentsLabelsAr : undefined}
            />
            <p className="text-muted-foreground">{t.redirectNote(copy.label)}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">{t.codNote}</p>
        ),
    }
  }

  const review: { id: Exclude<StepId, "review">; label: string; value: React.ReactNode }[] = [
    {
      id: "contact",
      label: t.steps.contact,
      value: (
        <>
          {name} <bdi dir="ltr">{phone}</bdi>
        </>
      ),
    },
    { id: "address", label: t.steps.address, value: addressLine(address, lang) },
    {
      id: "shipping",
      label: t.steps.shipping,
      value: shipping ? (
        <>
          {shipping.label}, {t.arrives(date(shipping.date))}
          {" · "}
          {shipping.price === "free" ? t.free : price(shipping.price)}
        </>
      ) : null,
    },
    { id: "payment", label: t.steps.payment, value: t.methods[paymentId as CheckoutMethod]?.label },
  ]
  const failed = paymentFailed && status === "idle"
  const last = step === "review"

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="flex max-w-2xl flex-col gap-6">
        <Title className="text-2xl font-semibold">{t.title}</Title>
        <OrderStepper
          aria-label={t.title}
          steps={stepIds.map((stepId) => ({ id: stepId, label: t.steps[stepId] }))}
          current={step}
          lang={lang}
          labels={ar ? orderStepperLabelsAr : undefined}
        />
        <Card>
          <CardContent>
            <form
              noValidate
              className="flex flex-col gap-5"
              onSubmit={(event) => {
                event.preventDefault()
                if (!last) return next()
                if (status === "pending") return
                onSubmit?.({ phone, name, address, shippingId, paymentId, card })
              }}
            >
              <Sub ref={heading} tabIndex={-1} className="text-lg font-semibold outline-none">
                {t.steps[step]}
              </Sub>
              <div hidden={step !== "contact"} className="flex flex-col gap-4">
                <PhoneInput
                  lang={lang}
                  label={t.phone}
                  labels={ar ? phoneInputLabelsAr : undefined}
                  onValueChange={(e164, ok) => {
                    setPhone(e164)
                    setPhoneValid(ok)
                  }}
                />
                <Field>
                  <FieldLabel htmlFor={`${sid}-name`}>{t.name}</FieldLabel>
                  <Input id={`${sid}-name`} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
                </Field>
              </div>
              <div hidden={step !== "address"}>
                <SaudiAddressForm
                  lang={lang}
                  labels={ar ? saudiAddressFormLabelsAr : undefined}
                  onValueChange={(nextAddress, ok) => {
                    setAddress(nextAddress)
                    setAddressValid(ok)
                  }}
                />
              </div>
              <div hidden={step !== "shipping"}>
                <RadioGroup aria-label={t.steps.shipping} value={shippingId} onValueChange={(v) => setShippingId(v as string)} className="gap-3">
                  {shippingOptions.map((option) => {
                    const selected = option.id === shippingId
                    const base = `${sid}-ship-${option.id}`
                    return (
                      <div
                        key={option.id}
                        data-selected={selected || undefined}
                        className={cn(
                          "rounded-lg border border-border bg-card text-card-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                          selected && "border-foreground ring-1 ring-foreground"
                        )}
                      >
                        <label className="flex cursor-pointer items-center gap-3 p-3">
                          <RadioGroupItem value={option.id} aria-labelledby={`${base}-label`} aria-describedby={`${base}-date`} className="focus-visible:ring-0" />
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span id={`${base}-label`} className="text-sm font-medium">
                              {option.label}
                            </span>
                            <span id={`${base}-date`} className="text-xs text-muted-foreground">
                              {t.arrives(date(option.date))}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-medium">{option.price === "free" ? t.free : price(option.price)}</span>
                        </label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>
              <div hidden={step !== "payment"} className="flex flex-col gap-4">
                {failed && (
                  <Alert variant="destructive">
                    <WarningCircleIcon aria-hidden="true" weight="fill" />
                    <AlertDescription>
                      <strong className="font-medium">{t.failedTitle}.</strong> {t.failedBody}
                    </AlertDescription>
                  </Alert>
                )}
                <PaymentMethodSelect
                  label={t.steps.payment}
                  methods={methods.map(method)}
                  value={paymentId}
                  onValueChange={setPaymentId}
                  currency={currency}
                  lang={lang}
                  labels={ar ? paymentMethodSelectLabelsAr : undefined}
                />
              </div>
              <div hidden={!last} className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">{t.reviewHint}</p>
                <dl className="flex flex-col divide-y divide-border text-sm">
                  {review.map((row) => (
                    <div key={row.id} className="flex items-start justify-between gap-4 py-3 first:pt-0">
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <dt className="text-muted-foreground">{row.label}</dt>
                        <dd className="font-medium">{row.value}</dd>
                      </div>
                      <Button type="button" variant="link" size="sm" onClick={() => go(row.id)}>
                        {t.edit}
                        <span className="sr-only"> {row.label}</span>
                      </Button>
                    </div>
                  ))}
                </dl>
              </div>
              {tried && !last && (
                <p role="alert" className="flex items-center gap-1.5 text-sm text-destructive">
                  <WarningCircleIcon aria-hidden="true" weight="fill" className="size-4 shrink-0" />
                  {t.errors[step]}
                </p>
              )}
              <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                {index > 0 ? (
                  <Button type="button" variant="outline" className="h-11 px-4" onClick={() => go(stepIds[index - 1])}>
                    {t.back}
                  </Button>
                ) : (
                  <span />
                )}
                {last ? (
                  <Button type="submit" className="h-11 flex-1 text-base sm:max-w-xs sm:flex-none sm:px-6" disabled={status === "pending"}>
                    {status === "pending" ? (
                      <>
                        <Spinner aria-hidden="true" role={undefined} className="motion-reduce:animate-none" />
                        {t.processing}
                      </>
                    ) : (
                      <>
                        {t.placeOrder}
                        <span aria-hidden="true">·</span>
                        {price(total)}
                      </>
                    )}
                  </Button>
                ) : (
                  <Button type="submit" className="h-11 px-6 text-base">
                    {t.next}
                  </Button>
                )}
              </div>
              {last && (
                <p className="text-center text-xs text-muted-foreground">
                  {t.vatNote(formatPercent(vat.rate, { lang }))}{" "}
                  {terms ? (
                    <>
                      {t.termsIntro}{" "}
                      <a href={terms.href} className="underline underline-offset-4">
                        {terms.label}
                      </a>
                      .
                    </>
                  ) : null}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default Checkout02

const shippingOptions = {
  en: [
    { id: "standard", label: "Standard shipping", date: "2026-11-24", price: 25 },
    { id: "express", label: "Express, next working day", date: "2026-11-22", price: 45 },
    { id: "pickup", label: "Pick up from the Olaya store", date: "2026-11-21", price: "free" },
  ],
  ar: [
    { id: "standard", label: "شحن عادي", date: "2026-11-24", price: 25 },
    { id: "express", label: "شحن سريع، يوم العمل التالي", date: "2026-11-22", price: 45 },
    { id: "pickup", label: "استلام من معرض العليا", date: "2026-11-21", price: "free" },
  ],
} satisfies Record<Lang, ShippingOption[]>

export const demo: { en: Checkout02Props; ar: Checkout02Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    subtotal: 1013.4,
    shippingOptions: shippingOptions.en,
    codFee: 15,
    installments: { min: 100, max: 5000, startDate: "2026-11-19" },
    terms: { label: "terms and conditions", href: "#terms" },
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    subtotal: 1013.4,
    shippingOptions: shippingOptions.ar,
    codFee: 15,
    installments: { min: 100, max: 5000, startDate: "2026-11-19" },
    terms: { label: "الشروط والأحكام", href: "#terms" },
  },
}
