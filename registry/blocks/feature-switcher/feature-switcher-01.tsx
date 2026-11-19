"use client"

import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { Bubble, BubbleContent, BubbleGroup } from "@/registry/ui/bubble"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { StatCard, statCardLabelsAr } from "@/registry/ui/stat-card"
import { StatusBadge, statusBadgeLabelsAr } from "@/registry/ui/status-badge"
import { StockIndicator, stockIndicatorLabelsAr, type StockStatus } from "@/registry/ui/stock-indicator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { VatSummary, vatSummaryLabelsAr } from "@/registry/ui/vat-summary"

type SwitcherItem = { id: string; title: string; description: string; panel: React.ReactNode }

type FeatureSwitcher01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  items: SwitcherItem[]
  defaultItem?: string
}

const labelsEn = {}
const labelsAr = {}

// Rows are tabs: arrow keys move between them and select on focus, so the panel swaps with the keyboard too.
function FeatureSwitcher01({ lang = "en", eyebrow, title, description, items, defaultItem, headingLevel = 2, id, className }: FeatureSwitcher01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <Tabs
          orientation="vertical"
          defaultValue={defaultItem ?? items[0]?.id}
          className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-14"
        >
          <TabsList
            variant="line"
            activateOnFocus
            className="h-auto w-full flex-col items-stretch gap-2 p-0 lg:col-start-1 lg:row-start-1"
          >
            {items.map((item, i) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="group/row h-auto flex-none after:hidden items-start justify-start gap-4 rounded-xl px-4 py-4 text-start whitespace-normal text-foreground data-active:border-border data-active:bg-card"
              >
                <span aria-hidden="true" className="w-8 shrink-0 text-lg leading-snug font-semibold text-muted-foreground tabular-nums group-data-active/row:text-primary">
                  <bdi>{formatNumber(i + 1, { lang }, { minimumIntegerDigits: 2 })}</bdi>
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold md:text-xl">{item.title}</span>
                  <span className="text-base font-normal text-muted-foreground">{item.description}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((item) => (
            <TabsContent
              key={item.id}
              value={item.id}
              className="flex min-h-[26rem] items-center justify-center rounded-xl border bg-muted p-4 sm:p-8 lg:col-start-2 lg:row-start-1"
            >
              <div className="w-full max-w-md">{item.panel}</div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}

function InvoicePanel({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const lines = ar
    ? [["عطر عود ملكي", 650], ["دهن عود كمبودي", 420], ["مبخرة سيراميك", 130]] as const
    : [["Royal oud perfume", 650], ["Cambodian oud oil", 420], ["Ceramic incense burner", 130]] as const
  return (
    <Card>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="grid">
            <span className="font-medium">{ar ? "فاتورة ضريبية" : "Tax invoice"}</span>
            <span className="text-xs text-muted-foreground"><bdi>INV-2041</bdi></span>
          </div>
          <StatusBadge status="paid" labels={ar ? statusBadgeLabelsAr : undefined} />
        </div>
        <ul className="grid gap-2 border-y py-3 text-sm">
          {lines.map(([name, amount]) => (
            <li key={name} className="flex items-baseline justify-between gap-3">
              <span>{name}</span>
              <Price amount={amount} lang={lang} />
            </li>
          ))}
        </ul>
        <VatSummary subtotal={1200} shipping="free" vat={{ rate: 0.15, included: false }} lang={lang} labels={ar ? vatSummaryLabelsAr : undefined} />
      </CardContent>
    </Card>
  )
}

function StockPanel({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const rows: { name: string; branch: string; status: StockStatus; count?: number }[] = ar
    ? [
        { name: "عطر عود ملكي", branch: "الرياض، العليا", status: "in" },
        { name: "دهن عود كمبودي", branch: "الرياض، العليا", status: "low", count: 4 },
        { name: "مبخرة سيراميك", branch: "جدة، الروضة", status: "out" },
        { name: "بخور معمول", branch: "جدة، الروضة", status: "in" },
      ]
    : [
        { name: "Royal oud perfume", branch: "Riyadh, Al-Olaya", status: "in" },
        { name: "Cambodian oud oil", branch: "Riyadh, Al-Olaya", status: "low", count: 4 },
        { name: "Ceramic incense burner", branch: "Jeddah, Al-Rawdah", status: "out" },
        { name: "Maamoul incense", branch: "Jeddah, Al-Rawdah", status: "in" },
      ]
  return (
    <Card>
      <CardContent className="grid gap-1">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center justify-between gap-3 border-b py-3 last:border-b-0">
            <div className="grid">
              <span className="font-medium">{row.name}</span>
              <span className="text-xs text-muted-foreground">{row.branch}</span>
            </div>
            <StockIndicator status={row.status} count={row.count} lang={lang} labels={ar ? stockIndicatorLabelsAr : undefined} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ChatPanel({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  return (
    <Card>
      <CardContent className="grid gap-4">
        <p className="border-b pb-3 text-sm font-medium">{ar ? "نورة العتيبي" : "Noura Al-Otaibi"}</p>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>{ar ? "السلام عليكم، وين وصل طلبي؟" : "Hello, where is my order?"}</BubbleContent>
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent>
              {ar ? (
                <>وعليكم السلام يا نورة، طلبك <bdi>#10482</bdi> مع المندوب وراح يوصلك اليوم قبل <bdi>8</bdi> مساءً.</>
              ) : (
                <>Hello Noura, your order <bdi>#10482</bdi> is with the courier and arrives today before 8 PM.</>
              )}
            </BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>{ar ? "ممتاز، شكرًا لكم" : "Perfect, thank you"}</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </CardContent>
    </Card>
  )
}

function ReportPanel({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const labels = ar ? statCardLabelsAr : undefined
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <StatCard
        label={ar ? "مبيعات اليوم" : "Sales today"}
        value={<Price amount={12430} lang={lang} />}
        delta={12.4}
        spark={[4, 6, 5, 8, 7, 11, 12]}
        lang={lang}
        labels={labels}
      />
      <StatCard
        label={ar ? "الطلبات" : "Orders"}
        value={86}
        delta={8.1}
        spark={[3, 4, 4, 6, 5, 7, 8]}
        lang={lang}
        labels={labels}
      />
    </div>
  )
}

const panels = (lang: Lang) => [<InvoicePanel key="a" lang={lang} />, <StockPanel key="b" lang={lang} />, <ChatPanel key="c" lang={lang} />, <ReportPanel key="d" lang={lang} />]

const enPanels = panels("en")
const arPanels = panels("ar")

const demo: { en: FeatureSwitcher01Props; ar: FeatureSwitcher01Props } = {
  en: {
    lang: "en",
    eyebrow: "The product",
    title: "Everything on one screen, one tap away",
    description: "Pick a feature to see it working with real store data.",
    items: [
      { id: "invoices", title: "Invoices", description: "Tax invoices with the QR code, ready to send." },
      { id: "stock", title: "Stock by branch", description: "A warning before an item runs out in any branch." },
      { id: "whatsapp", title: "WhatsApp conversations", description: "Answer order questions without leaving the dashboard." },
      { id: "reports", title: "Daily reports", description: "Sales and orders compared with yesterday." },
    ].map((item, i) => ({ ...item, panel: enPanels[i] })),
  },
  ar: {
    lang: "ar",
    eyebrow: "المنتج",
    title: "كل شيء في شاشة واحدة، على بُعد لمسة",
    description: "اختر ميزة لتراها تعمل ببيانات متجر حقيقية.",
    items: [
      { id: "invoices", title: "الفواتير", description: "فواتير ضريبية برمز الاستجابة السريعة، جاهزة للإرسال." },
      { id: "stock", title: "المخزون حسب الفرع", description: "تنبيه قبل أن ينفد صنف في أي فرع." },
      { id: "whatsapp", title: "محادثات واتساب", description: "أجب عن أسئلة الطلبات دون مغادرة لوحة التحكم." },
      { id: "reports", title: "تقارير يومية", description: "المبيعات والطلبات مقارنةً بالأمس." },
    ].map((item, i) => ({ ...item, panel: arPanels[i] })),
  },
}

export { FeatureSwitcher01, labelsEn, labelsAr, demo }
export type { FeatureSwitcher01Props, SwitcherItem }
export default FeatureSwitcher01
