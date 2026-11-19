import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Bubble, BubbleContent, BubbleGroup } from "@/registry/ui/bubble"
import { Container } from "@/registry/ui/container"
import { OrderStepper, orderStepperLabelsAr } from "@/registry/ui/order-stepper"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { StatCard, statCardLabelsAr } from "@/registry/ui/stat-card"
import { StockIndicator, stockIndicatorLabelsAr, type StockStatus } from "@/registry/ui/stock-indicator"

type BentoTone = "default" | "muted"
type BentoTile = { title: string; description: string; visual: React.ReactNode; tone?: BentoTone }

// Four tiles on four columns: tall, wide, tall, wide. The tall tiles flank the two wide ones.
type Bento03Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  tiles: BentoTile[]
}

const labelsEn = {}
const labelsAr = {}

const AREAS = ["lg:row-span-2", "md:col-span-2", "lg:row-span-2", "md:col-span-2"]
const TONES: Record<BentoTone, string> = { default: "bg-card text-card-foreground ring-1 ring-foreground/10", muted: "bg-muted" }

function Bento03({ eyebrow, title, description, tiles, headingLevel = 2, id, className }: Bento03Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const TileHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ title: tileTitle, description: tileDescription, visual, tone = "default" }, i) => (
            <li key={tileTitle} className={cn("flex flex-col justify-between gap-8 overflow-hidden rounded-xl p-6", TONES[tone], AREAS[i])}>
              <div className="flex flex-1 flex-col justify-center gap-4">{visual}</div>
              <div className="flex flex-col gap-2">
                <TileHeading className="text-lg font-semibold">{tileTitle}</TileHeading>
                <p className="text-base text-muted-foreground">{tileDescription}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function StockVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const rows: { name: string; status: StockStatus; count?: number }[] = ar
    ? [
        { name: "عطر عود ملكي", status: "in" },
        { name: "دهن عود كمبودي", status: "low", count: 4 },
        { name: "مبخرة سيراميك", status: "out" },
        { name: "بخور معمول", status: "in" },
        { name: "مسك الطهارة", status: "low", count: 2 },
      ]
    : [
        { name: "Royal oud perfume", status: "in" },
        { name: "Cambodian oud oil", status: "low", count: 4 },
        { name: "Ceramic incense burner", status: "out" },
        { name: "Maamoul incense", status: "in" },
        { name: "Musk Al-Tahara", status: "low", count: 2 },
      ]
  return (
    <ul className="grid">
      {rows.map((row) => (
        <li key={row.name} className="grid gap-1 border-b py-3 first:pt-0 last:border-b-0 last:pb-0">
          <span className="font-medium">{row.name}</span>
          <StockIndicator status={row.status} count={row.count} lang={lang} labels={ar ? stockIndicatorLabelsAr : undefined} />
        </li>
      ))}
    </ul>
  )
}

function StatsVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const labels = ar ? statCardLabelsAr : undefined
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard label={ar ? "مبيعات الأسبوع" : "Sales this week"} value={<Price amount={68240} lang={lang} />} delta={18.6} spark={[6, 8, 7, 11, 9, 14, 13]} lang={lang} labels={labels} />
      <StatCard label={ar ? "متوسط السلة" : "Average basket"} value={<Price amount={144} lang={lang} />} delta={-2.3} spark={[9, 8, 8, 7, 8, 7, 6]} lang={lang} labels={labels} />
    </div>
  )
}

function ChatVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  return (
    <BubbleGroup>
      <Bubble variant="tinted" align="end">
        <BubbleContent>
          {ar ? (
            <>مرحبًا فهد، تم شحن طلبك <bdi>#10482</bdi> وسيصلك خلال يومين.</>
          ) : (
            <>Hello Fahad, your order <bdi>#10482</bdi> has shipped and arrives in two days.</>
          )}
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>{ar ? "الله يعطيكم العافية، ممكن أغيّر العنوان؟" : "Thank you, can I change the address?"}</BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>{ar ? "أكيد، أرسل لنا الحي والشارع وراح نحدّثه." : "Of course, send the district and street and we will update it."}</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}

function TrackingVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const steps = ar
    ? [{ id: "placed", label: "تم الطلب" }, { id: "packing", label: "قيد التجهيز" }, { id: "courier", label: "مع المندوب" }, { id: "delivered", label: "تم التسليم" }]
    : [{ id: "placed", label: "Placed" }, { id: "packing", label: "Packing" }, { id: "courier", label: "With courier" }, { id: "delivered", label: "Delivered" }]
  return (
    <>
      <p className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">
          {ar ? "الطلب" : "Order"} <bdi>#10482</bdi>
        </span>
        <span className="text-muted-foreground">{ar ? "الخبر، حي الراكة" : "Khobar, Al-Rakah"}</span>
      </p>
      <OrderStepper steps={steps} current="courier" lang={lang} labels={ar ? orderStepperLabelsAr : undefined} />
    </>
  )
}

const visuals = (lang: Lang) => [
  <StockVisual key="stock" lang={lang} />,
  <StatsVisual key="stats" lang={lang} />,
  <ChatVisual key="chat" lang={lang} />,
  <TrackingVisual key="tracking" lang={lang} />,
]
const tones: BentoTone[] = ["muted", "default", "muted", "default"]
const enVisuals = visuals("en")
const arVisuals = visuals("ar")

const demo: { en: Bento03Props; ar: Bento03Props } = {
  en: {
    eyebrow: "Daily operations",
    title: (
      <>
        <span>Four things you check</span> <span className="font-normal">before noon</span>
      </>
    ),
    description: "Stock, sales, customer messages and deliveries, each on its own tile.",
    tiles: [
      { title: "Stock that warns you", description: "Low items are flagged before they cost you a sale." },
      { title: "This week against the last", description: "Sales and average basket, with the trend line." },
      { title: "Updates customers read", description: "Shipping messages go out on WhatsApp, and replies come back to you." },
      { title: "Deliveries without phone calls", description: "Every order shows its current step, so nobody has to ask." },
    ].map((tile, i) => ({ ...tile, visual: enVisuals[i], tone: tones[i] })),
  },
  ar: {
    eyebrow: "العمليات اليومية",
    title: (
      <>
        <span>أربعة أشياء تتفقدها</span> <span className="font-normal">قبل الظهر</span>
      </>
    ),
    description: "المخزون والمبيعات ورسائل العملاء والتوصيل، كلٌّ في بطاقته.",
    tiles: [
      { title: "مخزون ينبّهك", description: "نشير إلى الأصناف القليلة قبل أن تخسر بسببها عملية بيع." },
      { title: "هذا الأسبوع مقابل الذي قبله", description: "المبيعات ومتوسط السلة مع خط الاتجاه." },
      { title: "تحديثات يقرؤها العميل", description: "رسائل الشحن تصل على واتساب، وتعود إليك الردود." },
      { title: "توصيل بلا اتصالات", description: "يعرض كل طلب خطوته الحالية، فلا يحتاج أحد أن يسأل." },
    ].map((tile, i) => ({ ...tile, visual: arVisuals[i], tone: tones[i] })),
  },
}

export { Bento03, labelsEn, labelsAr, demo }
export type { Bento03Props, BentoTile, BentoTone }
export default Bento03
