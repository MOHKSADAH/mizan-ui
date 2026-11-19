import * as React from "react"
import { ArrowUpIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { sparklinePoints } from "@/registry/lib/sparkline"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { AvatarStack, avatarStackLabelsAr } from "@/registry/ui/avatar-group"
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

// Five tiles on three columns: a wide tile and a tall one on top, two small tiles, then one full-width tile.
type Bento02Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  tiles: BentoTile[]
}

const labelsEn = {}
const labelsAr = {}

const AREAS = ["md:col-span-2", "lg:row-span-2", "", "", "md:col-span-2 lg:col-span-3"]
const TONES: Record<BentoTone, string> = { default: "", muted: "bg-muted ring-0" }

function Bento02({ eyebrow, title, description, tiles, headingLevel = 2, id, className }: Bento02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const TileHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tiles.map(({ title: tileTitle, description: tileDescription, visual, tone = "default" }, i) => (
            <li key={tileTitle} className={AREAS[i]}>
              <Card data-slot="bento-tile" className={cn("h-full justify-between gap-8 md:[--card-spacing:--spacing(6)]", TONES[tone])}>
                <CardContent className="flex flex-1 flex-col justify-center gap-4">{visual}</CardContent>
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

function RevenueVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const week = ar
    ? [["الأحد", 9820], ["الاثنين", 11040], ["اليوم", 12430]] as const
    : [["Sunday", 9820], ["Monday", 11040], ["Today", 12430]] as const
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div className="grid gap-1">
          <span className="text-sm text-muted-foreground">{ar ? "مبيعات الأسبوع" : "This week's sales"}</span>
          <Price amount={68240} lang={lang} className="text-3xl font-semibold md:text-4xl" />
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-success">
          <ArrowUpIcon aria-hidden="true" weight="bold" className="size-4" />
          <bdi dir="ltr">+{formatNumber(18.6, { lang }, { maximumFractionDigits: 1 })}%</bdi>
        </span>
      </div>
      <svg aria-hidden="true" viewBox="0 0 300 80" preserveAspectRatio="none" className="h-28 w-full flex-auto overflow-visible text-series-1 rtl:-scale-x-100">
        <polyline
          points={sparklinePoints([6, 8, 7, 11, 9, 14, 13, 17, 16, 21], 300, 80, 4)}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <dl className="grid grid-cols-3 gap-4 border-t pt-4 text-sm">
        {week.map(([day, amount]) => (
          <div key={day} className="grid gap-1">
            <dt className="text-muted-foreground">{day}</dt>
            <dd className="font-medium">
              <Price amount={amount} lang={lang} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

function ChatVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  return (
    <>
      <div className="flex items-center gap-3 border-b pb-3">
        <Avatar>
          <AvatarFallback>{ar ? "ن" : "N"}</AvatarFallback>
        </Avatar>
        <div className="grid">
          <span className="text-sm font-medium">{ar ? "نورة العتيبي" : "Noura Al-Otaibi"}</span>
          <span className="text-xs text-muted-foreground">{ar ? "الرياض" : "Riyadh"}</span>
        </div>
      </div>
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>{ar ? "السلام عليكم، عندكم دهن العود الكمبودي؟" : "Hello, do you have the Cambodian oud oil?"}</BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>{ar ? "وعليكم السلام، نعم متوفر في فرع العليا." : "Hello, yes, it is in stock at the Olaya branch."}</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>{ar ? "ممتاز، أبغى اثنين مع التوصيل" : "Great, two please, with delivery"}</BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>{ar ? "التوصيل داخل الرياض خلال يوم واحد." : "Delivery inside Riyadh takes one day."}</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>{ar ? "تمام، أرسلوا الرابط" : "Fine, send the link"}</BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>
            {ar ? (
              <>تم، أرسلنا لك رابط الدفع. المجموع <Price amount={840} lang={lang} /></>
            ) : (
              <>Done, we sent you the payment link. Total <Price amount={840} lang={lang} /></>
            )}
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </>
  )
}

function OrdersStat({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  return <StatCard label={ar ? "طلبات اليوم" : "Orders today"} value={86} delta={8.1} spark={[3, 4, 4, 6, 5, 7, 8]} lang={lang} labels={ar ? statCardLabelsAr : undefined} />
}

function StatusVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const counts: [OrderStatus, number][] = [["paid", 24], ["shipped", 31], ["delivered", 28], ["pending", 3]]
  return (
    <ul className="grid gap-4">
      {counts.map(([status, count]) => (
        <li key={status} className="flex items-center justify-between gap-3">
          <StatusBadge status={status} labels={ar ? statusBadgeLabelsAr : undefined} />
          <span className="text-lg font-semibold tabular-nums">
            <bdi>{formatNumber(count, { lang })}</bdi>
          </span>
        </li>
      ))}
    </ul>
  )
}

function GoalVisual({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const people = ar
    ? ["فهد سعد", "نورة خالد", "سلطان محمد", "ريم عبدالله", "خالد فهد", "هند ناصر"]
    : ["Fahad Saad", "Noura Khalid", "Sultan Mohammed", "Reem Abdullah", "Khalid Fahad", "Hind Nasser"]
  return (
    <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="grid gap-3">
        <p className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
          <span className="font-medium">{ar ? "هدف الشهر" : "Monthly goal"}</span>
          <span className="text-muted-foreground">
            <Price amount={124000} lang={lang} /> / <Price amount={200000} lang={lang} />
          </span>
        </p>
        <Progress value={62} aria-label={ar ? "تقدم الهدف الشهري" : "Monthly goal progress"} className="gap-0" />
      </div>
      <AvatarStack people={people.map((name) => ({ name }))} max={4} size="lg" lang={lang} labels={ar ? avatarStackLabelsAr : undefined} />
    </div>
  )
}

const visuals = (lang: Lang) => [
  <RevenueVisual key="revenue" lang={lang} />,
  <ChatVisual key="chat" lang={lang} />,
  <OrdersStat key="orders" lang={lang} />,
  <StatusVisual key="status" lang={lang} />,
  <GoalVisual key="goal" lang={lang} />,
]
const tones: BentoTone[] = ["default", "default", "muted", "default", "muted"]
const enVisuals = visuals("en")
const arVisuals = visuals("ar")

const demo: { en: Bento02Props; ar: Bento02Props } = {
  en: {
    eyebrow: "Built for daily trade",
    title: "See the day before it ends",
    tiles: [
      { title: "Revenue you can read at a glance", description: "The week's total, the trend and the last three days, in riyals." },
      { title: "Sell on WhatsApp, keep the record", description: "A payment link in the chat, and the order lands in your dashboard." },
      { title: "Orders today", description: "Counted as they arrive, compared with yesterday." },
      { title: "Status of every order", description: "Paid, shipped, delivered or waiting, in one list." },
      { title: "A goal your whole team can see", description: "Set the month's target and watch it fill up." },
    ].map((tile, i) => ({ ...tile, visual: enVisuals[i], tone: tones[i] })),
  },
  ar: {
    eyebrow: "مصمّم للتجارة اليومية",
    title: "شاهد يومك قبل أن ينتهي",
    tiles: [
      { title: "إيراداتك بنظرة واحدة", description: "مجموع الأسبوع والاتجاه وآخر ثلاثة أيام، بالريال." },
      { title: "بِع على واتساب وسجّل كل شيء", description: "رابط الدفع داخل المحادثة، ويصل الطلب إلى لوحتك." },
      { title: "طلبات اليوم", description: "تُحسب فور وصولها، مقارنةً بالأمس." },
      { title: "حالة كل طلب", description: "مدفوع أو مشحون أو مسلّم أو بالانتظار، في قائمة واحدة." },
      { title: "هدف يراه فريقك كله", description: "حدد هدف الشهر وراقبه وهو يمتلئ." },
    ].map((tile, i) => ({ ...tile, visual: arVisuals[i], tone: tones[i] })),
  },
}

export { Bento02, labelsEn, labelsAr, demo }
export type { Bento02Props, BentoTile, BentoTone }
export default Bento02
