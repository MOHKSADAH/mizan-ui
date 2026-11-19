import * as React from "react"
import { ArrowsCounterClockwiseIcon, HandCoinsIcon, ReceiptIcon, ShieldCheckIcon, TruckIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang, Money, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section } from "@/registry/ui/section"

type TrustKey = "shipping" | "returns" | "cod" | "payment" | "vat"

type StoreTrust01Labels = {
  list: string
  shipping: string
  shippingNote: string
  returns: string
  returnsNote: Plural
  cod: string
  codNote: string
  payment: string
  paymentNote: string
  vat: string
  vatNote: string
}

type StoreTrust01Props = BlockBase & {
  lang?: Lang
  // The order total that unlocks free shipping.
  freeShippingOver: Money
  returnDays: number
  show?: TrustKey[]
  labels?: Partial<StoreTrust01Labels>
}

const labelsEn: StoreTrust01Labels = {
  list: "Why shop with us",
  shipping: "Free shipping",
  shippingNote: "On orders over",
  returns: "Easy returns",
  returnsNote: (n) => plural(n, { one: "Return within {n} day", other: "Return within {n} days" }, { lang: "en" }),
  cod: "Cash on delivery",
  codNote: "Pay the courier when it arrives",
  payment: "Secure payment",
  paymentNote: "Mada, Visa, Apple Pay and Tamara",
  vat: "VAT included",
  vatNote: "No extra tax at checkout",
}

const labelsAr: StoreTrust01Labels = {
  list: "مزايا التسوق من المتجر",
  shipping: "شحن مجاني",
  shippingNote: "للطلبات فوق",
  returns: "إرجاع سهل",
  returnsNote: (n) =>
    plural(n, { one: "استرجاع خلال يوم واحد", two: "استرجاع خلال يومين", few: "استرجاع خلال {n} أيام", many: "استرجاع خلال {n} يومًا", other: "استرجاع خلال {n} يوم" }, { lang: "ar" }),
  cod: "الدفع عند الاستلام",
  codNote: "ادفع للمندوب عند وصول طلبك",
  payment: "دفع آمن",
  paymentNote: "مدى وفيزا وApple Pay وتمارا",
  vat: "الأسعار شاملة الضريبة",
  vatNote: "لا رسوم إضافية عند الدفع",
}

const ICONS = {
  shipping: TruckIcon,
  returns: ArrowsCounterClockwiseIcon,
  cod: HandCoinsIcon,
  payment: ShieldCheckIcon,
  vat: ReceiptIcon,
}

const FLIP = new Set<TrustKey>(["shipping", "returns"])
const ALL: TrustKey[] = ["shipping", "returns", "cod", "payment", "vat"]

function StoreTrust01({ lang = "en", freeShippingOver, returnDays, show = ALL, labels, id, className }: StoreTrust01Props) {
  const t = { ...labelsEn, ...labels }
  const note: Record<TrustKey, React.ReactNode> = {
    shipping: (
      <>
        {t.shippingNote} <Price amount={freeShippingOver.amount} currency={freeShippingOver.currency} lang={lang} />
      </>
    ),
    returns: t.returnsNote(returnDays),
    cod: t.codNote,
    payment: t.paymentNote,
    vat: t.vatNote,
  }
  return (
    <Section as="div" id={id} spacing="compact" className={className}>
      <Container>
        <ul
          aria-label={t.list}
          className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col"
        >
          {show.map((key) => {
            const Icon = ICONS[key]
            return (
              <li key={key} className="flex items-start gap-3 bg-background p-4 sm:max-lg:odd:last:col-span-2">
                <Icon aria-hidden="true" weight="regular" className={cn("mt-0.5 size-6 shrink-0 text-primary", FLIP.has(key) && "rtl:-scale-x-100")} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">{t[key]}</p>
                  <p className="text-xs text-muted-foreground">{note[key]}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

const demo: { en: StoreTrust01Props; ar: StoreTrust01Props } = {
  en: { lang: "en", freeShippingOver: { amount: 200, currency: "SAR" }, returnDays: 14, labels: labelsEn },
  ar: { lang: "ar", freeShippingOver: { amount: 200, currency: "SAR" }, returnDays: 14, labels: labelsAr },
}

export { StoreTrust01, labelsEn, labelsAr, demo }
export type { StoreTrust01Props, StoreTrust01Labels, TrustKey }
export default StoreTrust01
