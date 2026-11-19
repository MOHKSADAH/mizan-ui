"use client"

import * as React from "react"
import { CaretDownIcon, CheckIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { Action, BlockBase, Currency, Lang, Vat } from "@/registry/lib/block-types"
import { formatDate, formatNumber, formatPercent } from "@/registry/lib/format"
import { saudiRegions } from "@/registry/lib/gulf/saudi-regions"
import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { CardInput, cardInputLabelsAr, type CardValue } from "@/registry/ui/card-input"
import { Checkbox } from "@/registry/ui/checkbox"
import { Container } from "@/registry/ui/container"
import { CouponInput, couponInputLabelsAr, type CouponStatus } from "@/registry/ui/coupon-input"
import { Field, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Installments, installmentsLabelsAr } from "@/registry/ui/installments"
import { PaymentMethodSelect, paymentMethodSelectLabelsAr, type PaymentMethod } from "@/registry/ui/payment-method-select"
import { PhoneInput, phoneInputLabelsAr } from "@/registry/ui/phone-input"
import { Price } from "@/registry/ui/price"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { SaudiAddressForm, saudiAddressFormLabelsAr, type SaudiAddress } from "@/registry/ui/saudi-address-form"
import { Section } from "@/registry/ui/section"
import { Spinner, spinnerLabelsAr } from "@/registry/ui/spinner"
import { computeVat } from "@/registry/ui/vat-summary"

export type CheckoutMethod = "apple-pay" | "card" | "stc-pay" | "tabby" | "tamara" | "cod"

export type Checkout01Labels = {
  title: string
  completed: string
  contact: string
  contactHint: string
  phone: string
  name: string
  delivery: string
  shipping: string
  free: string
  arrives: (date: string) => string
  payment: string
  paymentHint: string
  methods: Record<CheckoutMethod, { label: string; description?: string }>
  applePayNote: string
  redirectNote: (provider: string) => string
  codNote: string
  rangeNote: (min: React.ReactNode, max: React.ReactNode) => React.ReactNode
  billingSame: string
  billing: string
  couponLink: string
  placeOrder: string
  processing: string
  vatNote: (rate: string) => string
  termsIntro: string
  failedTitle: string
  failedBody: string
  incomplete: string
}

export const labelsEn: Checkout01Labels = {
  title: "Checkout",
  completed: "Completed",
  contact: "Contact",
  contactHint: "We send the order status to this number.",
  phone: "Mobile number",
  name: "Full name",
  delivery: "Delivery address",
  shipping: "Shipping method",
  free: "Free",
  arrives: (date) => `Arrives ${date}`,
  payment: "Payment",
  paymentHint: "Every payment is encrypted. We never store your card.",
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
  billingSame: "Billing address is the same as the delivery address",
  billing: "Billing address",
  couponLink: "Have a coupon code?",
  placeOrder: "Place order",
  processing: "Processing your payment",
  vatNote: (rate) => `Prices include ${rate} VAT.`,
  termsIntro: "By placing your order you agree to the",
  failedTitle: "The payment did not go through",
  failedBody: "Your cart and your details are saved. Try again, or pick another payment method.",
  incomplete: "Complete these sections to place your order:",
}

export const labelsAr: Checkout01Labels = {
  title: "إتمام الطلب",
  completed: "مكتمل",
  contact: "بيانات التواصل",
  contactHint: "نرسل حالة الطلب على هذا الرقم.",
  phone: "رقم الجوال",
  name: "الاسم الكامل",
  delivery: "عنوان التوصيل",
  shipping: "طريقة الشحن",
  free: "مجاني",
  arrives: (date) => `يصل ${date}`,
  payment: "الدفع",
  paymentHint: "جميع عمليات الدفع مشفّرة، ولا نحفظ بيانات بطاقتك.",
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
  billingSame: "عنوان الفواتير هو نفسه عنوان التوصيل",
  billing: "عنوان الفواتير",
  couponLink: "لديك رمز خصم؟",
  placeOrder: "إتمام الطلب",
  processing: "جارٍ معالجة الدفع",
  vatNote: (rate) => `الأسعار شاملة ضريبة القيمة المضافة ${rate}.`,
  termsIntro: "بإتمام الطلب فأنت توافق على",
  failedTitle: "لم تتم عملية الدفع",
  failedBody: "سلتك وبياناتك محفوظة. أعد المحاولة أو اختر طريقة دفع أخرى.",
  incomplete: "أكمل هذه الأقسام لإتمام الطلب:",
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

export type Checkout01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<Checkout01Labels>
  currency?: Currency
  vat?: Vat
  // The items total after any discount, in the same VAT mode as `vat`. Shipping and the cash on delivery fee are added here.
  subtotal: number
  shippingOptions: ShippingOption[]
  defaultShippingId?: string
  // Payment methods in the order shown. Lead with Apple Pay and mada, put cash on delivery last.
  methods?: CheckoutMethod[]
  defaultPayment?: CheckoutMethod
  codFee?: number
  // The order total range in which Tabby and Tamara are offered, and the date of the first payment.
  installments?: { min: number; max: number; startDate?: string }
  // Current mada BIN prefixes, from your acquirer.
  madaBins?: readonly string[]
  status?: "idle" | "pending"
  paymentFailed?: boolean
  couponStatus?: CouponStatus
  appliedCoupon?: string
  couponMessage?: string
  terms?: Action
  onApplyCoupon?: (code: string) => void
  onRemoveCoupon?: () => void
  onSubmit?: (value: CheckoutValue) => void
}

const defaultMethods: CheckoutMethod[] = ["apple-pay", "card", "stc-pay", "tabby", "tamara", "cod"]

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

const emptyCard: CardValue = { number: "", expiry: "", cvc: "" }

type SectionKey = "contact" | "delivery" | "shipping" | "payment"

function addressLine(address: SaudiAddress, lang: Lang) {
  const region = saudiRegions.find((r) => r.code === address.region)
  const city = region?.cities.find((c) => c.nameEn === address.city)
  const cityName = city ? (lang === "ar" ? city.nameAr : city.nameEn) : undefined
  return [address.street, address.district, cityName].filter(Boolean).join(lang === "ar" ? "، " : ", ")
}

function Marker({ index, done, label, lang }: { index: number; done: boolean; label: string; lang: Lang }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums",
        done ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
      )}
    >
      {done ? (
        <>
          <CheckIcon aria-hidden="true" weight="bold" className="size-3.5" />
          <span className="sr-only">{label}</span>
        </>
      ) : (
        <span aria-hidden="true">{formatNumber(index, { lang })}</span>
      )}
    </span>
  )
}

type PanelProps = {
  id: string
  index: number
  title: string
  summary?: React.ReactNode
  done: boolean
  open: boolean
  onToggle: () => void
  completed: string
  lang: Lang
  heading: "h2" | "h3" | "h4"
  children: React.ReactNode
}

// From the lg breakpoint every section stays open. Below it, each section collapses behind its header and the header shows a summary.
function Panel({ id, index, title, summary, done, open, onToggle, completed, lang, heading: Heading, children }: PanelProps) {
  return (
    <Card id={id} role="region" aria-label={title} className="scroll-mt-4 gap-0 py-0">
      <Heading className="hidden items-center gap-3 p-5 pb-4 text-base font-semibold lg:flex">
        <Marker index={index} done={done} label={completed} lang={lang} />
        {title}
      </Heading>
      <Heading className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-xl p-4 text-start outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
        >
          <Marker index={index} done={done} label={completed} lang={lang} />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-base font-semibold">{title}</span>
            {!open && summary ? <span className="truncate text-sm text-muted-foreground">{summary}</span> : null}
          </span>
          <CaretDownIcon aria-hidden="true" className={cn("size-4 shrink-0", open && "rotate-180")} />
        </button>
      </Heading>
      <div id={`${id}-panel`} className={cn("flex flex-col gap-4 px-4 pb-4 sm:px-5 sm:pb-5", !open && "max-lg:hidden")}>
        {children}
      </div>
    </Card>
  )
}

export function Checkout01({
  lang = "en",
  labels,
  currency = "SAR",
  vat = { rate: 0.15, included: true },
  subtotal,
  shippingOptions,
  defaultShippingId,
  methods = defaultMethods,
  defaultPayment,
  codFee,
  installments,
  madaBins,
  status = "idle",
  paymentFailed,
  couponStatus,
  appliedCoupon,
  couponMessage,
  terms,
  onApplyCoupon,
  onRemoveCoupon,
  onSubmit,
  id,
  headingLevel = 2,
  className,
}: Checkout01Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const dir = ar ? "rtl" : "ltr"
  const uid = React.useId()
  const sid = id ?? uid
  const Title = `h${headingLevel}` as "h2" | "h3"
  const Sub = `h${headingLevel + 1}` as "h3" | "h4"

  const [phone, setPhone] = React.useState<string>()
  const [phoneValid, setPhoneValid] = React.useState(false)
  const [name, setName] = React.useState("")
  const [address, setAddress] = React.useState(emptyAddress)
  const [addressValid, setAddressValid] = React.useState(true)
  const [shippingId, setShippingId] = React.useState(defaultShippingId ?? shippingOptions[0]?.id ?? "")
  const [paymentId, setPaymentId] = React.useState<string>(defaultPayment ?? methods[0])
  const [card, setCard] = React.useState(emptyCard)
  const [cardValid, setCardValid] = React.useState(false)
  const [billingSame, setBillingSame] = React.useState(true)
  const [couponOpen, setCouponOpen] = React.useState(false)
  const [open, setOpen] = React.useState<Record<SectionKey, boolean>>({ contact: true, delivery: true, shipping: true, payment: true })
  const [attempted, setAttempted] = React.useState(false)

  const shipping = shippingOptions.find((o) => o.id === shippingId)
  const shippingCost = typeof shipping?.price === "number" ? shipping.price : 0
  const beforeFee = subtotal + shippingCost
  const fee = paymentId === "cod" ? (codFee ?? 0) : 0
  const total = computeVat(beforeFee + fee, vat, currency).total
  const installable = computeVat(beforeFee, vat, currency).total
  const outOfRange = installments !== undefined && (installable < installments.min || installable > installments.max)
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} decimals />
  const date = (iso: string) => formatDate(new Date(iso), { lang, timeZone: "Asia/Riyadh" }, { weekday: "short", day: "numeric", month: "short" })

  const done: Record<SectionKey, boolean> = {
    contact: name.trim() !== "" && phoneValid,
    delivery: !!address.region && !!address.city && address.district.trim() !== "" && address.street.trim() !== "" && addressValid,
    shipping: shipping !== undefined,
    payment: paymentId !== "card" || cardValid,
  }
  const titles: Record<SectionKey, string> = { contact: t.contact, delivery: t.delivery, shipping: t.shipping, payment: t.payment }
  const missing = (Object.keys(done) as SectionKey[]).filter((key) => !done[key])

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
            onValueChange={(next, state) => {
              setCard(next)
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

  const toggle = (key: SectionKey) => setOpen((o) => ({ ...o, [key]: !o[key] }))
  const panel = (key: SectionKey, index: number, summary: React.ReactNode, children: React.ReactNode) => (
    <Panel
      id={`${sid}-${key}`}
      index={index}
      title={titles[key]}
      summary={summary}
      done={done[key]}
      open={open[key]}
      onToggle={() => toggle(key)}
      completed={t.completed}
      lang={lang}
      heading={Sub}
    >
      {children}
    </Panel>
  )

  const formId = `${sid}-form`
  const failed = paymentFailed && status === "idle"

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="flex max-w-2xl flex-col gap-4">
        <Title className="text-2xl font-semibold">{t.title}</Title>
        <form
          id={formId}
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            if (status === "pending") return
            if (missing.length > 0) {
              setAttempted(true)
              setOpen((o) => ({ ...o, ...Object.fromEntries(missing.map((key) => [key, true])) }))
              return
            }
            onSubmit?.({ phone, name, address, shippingId, paymentId, card })
          }}
        >
          {panel(
            "contact",
            1,
            name || phone ? (
              <>
                {name} {phone ? <bdi dir="ltr">{phone}</bdi> : null}
              </>
            ) : undefined,
            <>
              <p className="text-sm text-muted-foreground">{t.contactHint}</p>
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
                <Input
                  id={`${sid}-name`}
                  autoComplete="name"
                  value={name}
                  aria-invalid={(attempted && name.trim() === "") || undefined}
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>
            </>
          )}
          {panel(
            "delivery",
            2,
            addressLine(address, lang) || undefined,
            <SaudiAddressForm
              lang={lang}
              labels={ar ? saudiAddressFormLabelsAr : undefined}
              onValueChange={(next, valid) => {
                setAddress(next)
                setAddressValid(valid)
              }}
            />
          )}
          {panel(
            "shipping",
            3,
            shipping ? `${shipping.label} · ${shipping.price === "free" ? t.free : formatNumber(shipping.price, { lang })}` : undefined,
            <RadioGroup aria-label={t.shipping} value={shippingId} onValueChange={(next) => setShippingId(next as string)} className="gap-3">
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
          )}
          {panel(
            "payment",
            4,
            t.methods[paymentId as CheckoutMethod]?.label,
            <>
              <p className="text-sm text-muted-foreground">{t.paymentHint}</p>
              {failed && (
                <Alert variant="destructive">
                  <WarningCircleIcon aria-hidden="true" weight="fill" />
                  <AlertTitle>{t.failedTitle}</AlertTitle>
                  <AlertDescription>{t.failedBody}</AlertDescription>
                </Alert>
              )}
              <PaymentMethodSelect
                label={t.payment}
                methods={methods.map(method)}
                value={paymentId}
                onValueChange={setPaymentId}
                currency={currency}
                lang={lang}
                labels={ar ? paymentMethodSelectLabelsAr : undefined}
              />
              <Field orientation="horizontal">
                <Checkbox id={`${sid}-billing`} checked={billingSame} onCheckedChange={(next) => setBillingSame(next === true)} />
                <FieldLabel htmlFor={`${sid}-billing`} className="font-normal">
                  {t.billingSame}
                </FieldLabel>
              </Field>
              {!billingSame && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">{t.billing}</p>
                  <SaudiAddressForm lang={lang} labels={ar ? saudiAddressFormLabelsAr : undefined} />
                </div>
              )}
            </>
          )}
        </form>
        {attempted && missing.length > 0 && (
          <Alert variant="destructive">
            <WarningCircleIcon aria-hidden="true" weight="fill" />
            <AlertTitle>{t.incomplete}</AlertTitle>
            <AlertDescription>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {missing.map((key) => (
                  <li key={key}>
                    <a href={`#${sid}-${key}`} className="underline underline-offset-4">
                      {titles[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-3">
          {couponOpen ? (
            <CouponInput
              status={couponStatus}
              appliedCode={appliedCoupon}
              message={couponMessage}
              onApply={(code) => onApplyCoupon?.(code)}
              onRemove={() => onRemoveCoupon?.()}
              labels={ar ? couponInputLabelsAr : undefined}
            />
          ) : (
            <Button type="button" variant="link" className="w-fit px-0" aria-expanded={false} onClick={() => setCouponOpen(true)}>
              {t.couponLink}
            </Button>
          )}
          <Button type="submit" form={formId} className="h-11 w-full text-base" disabled={status === "pending"}>
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
        </div>
      </Container>
    </Section>
  )
}

export default Checkout01

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

export const demo: { en: Checkout01Props; ar: Checkout01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    subtotal: 1013.4,
    shippingOptions: shippingOptions.en,
    defaultPayment: "card",
    codFee: 15,
    installments: { min: 100, max: 5000, startDate: "2026-11-19" },
    terms: { label: "terms and conditions", href: "#terms" },
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    subtotal: 1013.4,
    shippingOptions: shippingOptions.ar,
    defaultPayment: "card",
    codFee: 15,
    installments: { min: 100, max: 5000, startDate: "2026-11-19" },
    terms: { label: "الشروط والأحكام", href: "#terms" },
  },
}
