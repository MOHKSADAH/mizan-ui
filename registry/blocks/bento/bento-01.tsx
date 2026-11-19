import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { AvatarStack, avatarStackLabelsAr } from "@/registry/ui/avatar-group"
import { Badge } from "@/registry/ui/badge"
import { Bubble, BubbleContent, BubbleGroup } from "@/registry/ui/bubble"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Progress } from "@/registry/ui/progress"
import { Section, SectionHeader } from "@/registry/ui/section"
import { StatCard, statCardLabelsAr } from "@/registry/ui/stat-card"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"

type BentoTone = "default" | "muted"
type BentoTile = { title: string; description: string; visual: React.ReactNode; tone?: BentoTone }

// Five tiles. The first is tall; the others pair 5 and 7 columns so no two rows share a split.
type Bento01Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  tiles: BentoTile[]
}

const labelsEn = {}
const labelsAr = {}

const AREAS = ["lg:col-span-7 lg:row-span-2", "lg:col-span-5", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"]
const TONES: Record<BentoTone, string> = { default: "", muted: "bg-muted ring-0" }

function Bento01({ eyebrow, title, description, tiles, headingLevel = 2, id, className }: Bento01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const TileHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ul className="grid gap-4 lg:grid-cols-12">
          {tiles.map(({ title: tileTitle, description: tileDescription, visual, tone = "default" }, i) => (
            <li key={tileTitle} className={AREAS[i]}>
              <Card data-slot="bento-tile" className={cn("h-full justify-between gap-8 md:[--card-spacing:--spacing(6)]", TONES[tone])}>
                <CardContent className="flex flex-1 flex-col justify-center gap-3">{visual}</CardContent>
                <CardContent className="flex flex-col gap-2">
                  <TileHeading className="text-lg font-semibold md:text-xl">{tileTitle}</TileHeading>
                  <p className="text-base text-muted-foreground">{tileDescription}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

type Order = { name: string; number: string; amount: number; status: OrderStatus }

function OrdersVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const orders: Order[] = ar
    ? [
        { name: "فهد القحطاني", number: "#10482", amount: 1250, status: "paid" },
        { name: "نورة العتيبي", number: "#10481", amount: 385, status: "delivered" },
        { name: "مؤسسة الراشد للتجارة", number: "#10480", amount: 4720, status: "pending" },
        { name: "ريم الغامدي", number: "#10479", amount: 640, status: "shipped" },
        { name: "سلطان الحربي", number: "#10478", amount: 215, status: "refunded" },
        { name: "هند الشمري", number: "#10477", amount: 980, status: "paid" },
      ]
    : [
        { name: "Fahad Al-Qahtani", number: "#10482", amount: 1250, status: "paid" },
        { name: "Noura Al-Otaibi", number: "#10481", amount: 385, status: "delivered" },
        { name: "Al-Rashed Trading", number: "#10480", amount: 4720, status: "pending" },
        { name: "Reem Al-Ghamdi", number: "#10479", amount: 640, status: "shipped" },
        { name: "Sultan Al-Harbi", number: "#10478", amount: 215, status: "refunded" },
        { name: "Hind Al-Shammari", number: "#10477", amount: 980, status: "paid" },
      ]
  return (
    <ul className="grid gap-2">
      {orders.map((o) => (
        <li key={o.number}>
          <Card size="sm" className="flex-row items-center gap-3 px-3 text-sm">
            <div className="grid min-w-0 flex-1">
              <span className="truncate font-medium">{o.name}</span>
              <span className="text-xs text-muted-foreground"><bdi>{o.number}</bdi></span>
            </div>
            <Price amount={o.amount} lang={lang} className="font-medium" />
            <StatusBadge status={o.status} labels={ar ? statusBadgeLabelsAr : undefined} />
          </Card>
        </li>
      ))}
    </ul>
  )
}

function SalesVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  return (
    <StatCard
      label={ar ? "مبيعات اليوم" : "Sales today"}
      value={<Price amount={12430} lang={lang} />}
      delta={12.4}
      showPrevious
      spark={[4, 6, 5, 8, 7, 11, 12]}
      lang={lang}
      labels={ar ? statCardLabelsAr : undefined}
    />
  )
}

function TeamVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const people = ar
    ? ["فهد سعد", "نورة خالد", "سلطان محمد", "ريم عبدالله", "خالد فهد", "هند ناصر", "ماجد علي"]
    : ["Fahad Saad", "Noura Khalid", "Sultan Mohammed", "Reem Abdullah", "Khalid Fahad", "Hind Nasser", "Majed Ali"]
  const roles = ar ? ["كاشير", "مستودع", "محاسب"] : ["Cashier", "Warehouse", "Accountant"]
  return (
    <>
      <AvatarStack people={people.map((name) => ({ name }))} max={5} size="lg" lang={lang} labels={ar ? avatarStackLabelsAr : undefined} />
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <Badge key={role} variant="secondary">
            {role}
          </Badge>
        ))}
      </div>
    </>
  )
}

function ChatVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  return (
    <BubbleGroup>
      <Bubble variant="outline">
        <BubbleContent>{ar ? "السلام عليكم، وين وصل طلبي؟" : "Hello, where is my order?"}</BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>
          {ar ? (
            <>وعليكم السلام يا نورة، طلبك <bdi>#10482</bdi> مع المندوب وراح يوصلك اليوم.</>
          ) : (
            <>Hello Noura, your order <bdi>#10482</bdi> is with the courier and arrives today.</>
          )}
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>{ar ? "ممتاز، يعطيكم العافية" : "Perfect, thank you"}</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}

function CitiesVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const cities = ar
    ? [["الرياض", 42], ["جدة", 27], ["الدمام والخبر", 16], ["المدينة المنورة", 9]] as const
    : [["Riyadh", 42], ["Jeddah", 27], ["Dammam and Khobar", 16], ["Madinah", 9]] as const
  return (
    <ul className="grid gap-4">
      {cities.map(([city, share]) => (
        <li key={city} className="grid gap-1.5">
          <p className="flex justify-between text-sm">
            <span className="font-medium">{city}</span>
            <bdi className="text-muted-foreground tabular-nums">{share}%</bdi>
          </p>
          <Progress value={share} aria-label={city} className="gap-0" />
        </li>
      ))}
    </ul>
  )
}

const visuals = (lang: Lang) => [
  <OrdersVisual key="orders" lang={lang} />,
  <SalesVisual key="sales" lang={lang} />,
  <TeamVisual key="team" lang={lang} />,
  <ChatVisual key="chat" lang={lang} />,
  <CitiesVisual key="cities" lang={lang} />,
]
const tones: BentoTone[] = ["muted", "default", "default", "muted", "default"]
const enVisuals = visuals("en")
const arVisuals = visuals("ar")

const demo: { en: Bento01Props; ar: Bento01Props } = {
  en: {
    eyebrow: "One dashboard",
    title: "Your whole store in five tiles",
    description: "These are the same screens your team opens every morning.",
    tiles: [
      { title: "Orders as they arrive", description: "Payment, shipping and refund status on every row." },
      { title: "Sales, live", description: "Compared with yesterday, updated with each order." },
      { title: "Roles for your team", description: "Each employee sees only what their job needs." },
      { title: "WhatsApp built in", description: "Reply to customers next to their order." },
      { title: "Where your customers are", description: "Share of orders by city, for planning your next branch." },
    ].map((tile, i) => ({ ...tile, visual: enVisuals[i], tone: tones[i] })),
  },
  ar: {
    eyebrow: "لوحة واحدة",
    title: "متجرك كله في خمس بطاقات",
    description: "هذه الشاشات نفسها التي يفتحها فريقك كل صباح.",
    tiles: [
      { title: "الطلبات فور وصولها", description: "حالة الدفع والشحن والاسترجاع على كل سطر." },
      { title: "المبيعات لحظة بلحظة", description: "مقارنةً بالأمس، وتتحدث مع كل طلب." },
      { title: "صلاحيات لكل موظف", description: "يرى كل موظف ما تحتاجه مهمته فقط." },
      { title: "واتساب داخل النظام", description: "رُدّ على العميل بجانب طلبه." },
      { title: "أين يقع عملاؤك", description: "نسبة الطلبات حسب المدينة، لتخطيط فرعك القادم." },
    ].map((tile, i) => ({ ...tile, visual: arVisuals[i], tone: tones[i] })),
  },
}

export { Bento01, labelsEn, labelsAr, demo }
export type { Bento01Props, BentoTile, BentoTone }
export default Bento01
