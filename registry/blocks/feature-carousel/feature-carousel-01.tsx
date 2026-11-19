"use client"

import * as React from "react"
import { ChartBarIcon, ImageIcon, PauseIcon, PlayIcon, ReceiptIcon, StackIcon, TruckIcon } from "@phosphor-icons/react"

import type { BlockBase, Lang, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type CarouselFeature = {
  id: string
  label: string
  description: string
  icon?: React.ReactNode
  // The picture for this feature. Without it the slot shows the placeholder.
  media?: Media
}

type FeatureCarousel01Labels = {
  pause: string
  play: string
}

type FeatureCarousel01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  features: CarouselFeature[]
  defaultFeature?: string
  // Cycle through the features on a timer. It pauses on hover and focus and never runs under reduced motion.
  autoplay?: boolean
  // Milliseconds each feature stays.
  interval?: number
  labels?: Partial<FeatureCarousel01Labels>
}

const labelsEn: FeatureCarousel01Labels = { pause: "Pause the slideshow", play: "Play the slideshow" }
const labelsAr: FeatureCarousel01Labels = { pause: "إيقاف العرض مؤقتًا", play: "تشغيل العرض" }

const reducedQuery = "(prefers-reduced-motion: reduce)"
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

// The chips are tabs: arrow keys move between them and select on focus, and the slot is their panel.
function FeatureCarousel01({
  lang = "en",
  eyebrow,
  title,
  description,
  features,
  defaultFeature,
  autoplay = true,
  interval = 5000,
  labels,
  headingLevel = 2,
  id,
  className,
}: FeatureCarousel01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const [current, setCurrent] = React.useState(defaultFeature ?? features[0]?.id)
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [stopped, setStopped] = React.useState(false)
  const reduced = React.useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false
  )
  const running = autoplay && !reduced && features.length > 1
  const playing = running && !hovered && !focused && !stopped

  React.useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setCurrent((id) => features[(features.findIndex((f) => f.id === id) + 1) % features.length].id)
    }, interval)
    return () => clearInterval(timer)
  }, [playing, interval, features, current])

  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <div
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
          }}
        >
          <Tabs
            orientation="vertical"
            value={current}
            onValueChange={(value) => setCurrent(String(value))}
            className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-14"
          >
            <div className="flex flex-col items-start gap-4 lg:col-start-1 lg:row-start-1">
              <TabsList variant="line" activateOnFocus className="h-auto w-full flex-col items-stretch gap-2 p-0">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className="h-auto flex-none flex-col items-start justify-start gap-0 rounded-xl border-border px-4 py-3 text-start whitespace-normal text-foreground after:hidden data-active:border-primary data-active:bg-card"
                  >
                    <span className="flex items-center gap-3 text-lg font-semibold md:text-xl">
                      {feature.icon ? <span aria-hidden="true" className="text-muted-foreground group-data-active/tabs-list:text-foreground">{feature.icon}</span> : null}
                      {feature.label}
                    </span>
                    <span
                      className={cn(
                        "grid w-full transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
                        feature.id === current ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <span className="min-h-0 overflow-hidden">
                        <span className="block pt-1 text-base font-normal text-muted-foreground">{feature.description}</span>
                      </span>
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {running ? (
                <Button type="button" variant="ghost" size="sm" onClick={() => setStopped((s) => !s)}>
                  {stopped ? <PlayIcon aria-hidden="true" data-icon="inline-start" /> : <PauseIcon aria-hidden="true" data-icon="inline-start" />}
                  {stopped ? t.play : t.pause}
                </Button>
              ) : null}
            </div>
            {features.map((feature) => (
              <TabsContent
                key={feature.id}
                value={feature.id}
                aria-live={playing ? "off" : "polite"}
                className="lg:col-start-2 lg:row-start-1"
              >
                <div className="aspect-video overflow-hidden rounded-xl border bg-muted animate-in fade-in-0 duration-300 motion-reduce:animate-none">
                  {feature.media ? (
                    <img
                      src={feature.media.src}
                      alt={feature.media.alt}
                      width={feature.media.width}
                      height={feature.media.height}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                      <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Container>
    </Section>
  )
}

const icons: Record<string, React.ReactNode> = {
  orders: <TruckIcon aria-hidden="true" className="size-5" />,
  stock: <StackIcon aria-hidden="true" className="size-5" />,
  invoices: <ReceiptIcon aria-hidden="true" className="size-5" />,
  reports: <ChartBarIcon aria-hidden="true" className="size-5" />,
}

const demo: { en: FeatureCarousel01Props; ar: FeatureCarousel01Props } = {
  en: {
    lang: "en",
    eyebrow: "Features",
    title: "One workspace for the whole store",
    description: "Pick a feature to see it. The list moves on by itself until you point at it.",
    features: [
      { id: "orders", label: "Orders and delivery", description: "Track every order from payment to the courier, with Aramex, SMSA and J&T in one list." },
      { id: "stock", label: "Stock by branch", description: "See what is left in Riyadh, Jeddah and Dammam and get a warning before an item runs out." },
      { id: "invoices", label: "E-invoices", description: "Every invoice carries the ZATCA QR code and goes to the customer on WhatsApp." },
      { id: "reports", label: "Daily reports", description: "Sales, VAT and top products at 8 AM, compared with the day before." },
    ].map((f) => ({ ...f, icon: icons[f.id] })),
  },
  ar: {
    lang: "ar",
    eyebrow: "المزايا",
    title: "مساحة عمل واحدة للمتجر كله",
    description: "اختر ميزة لتراها. تنتقل القائمة تلقائيًا إلى أن تشير إليها.",
    features: [
      { id: "orders", label: "الطلبات والتوصيل", description: "تابع كل طلب من الدفع إلى المندوب، مع أرامكس وسمسا وجي آند تي في قائمة واحدة." },
      { id: "stock", label: "المخزون حسب الفرع", description: "اعرف ما تبقى في الرياض وجدة والدمام، وتلقَّ تنبيهًا قبل أن ينفد صنف." },
      { id: "invoices", label: "الفواتير الإلكترونية", description: "تحمل كل فاتورة رمز هيئة الزكاة والضريبة والجمارك، وتصل العميل عبر واتساب." },
      { id: "reports", label: "تقارير يومية", description: "المبيعات والضريبة وأفضل المنتجات عند الثامنة صباحًا، مقارنةً باليوم السابق." },
    ].map((f) => ({ ...f, icon: icons[f.id] })),
    labels: labelsAr,
  },
}

export { FeatureCarousel01, labelsEn, labelsAr, demo }
export type { FeatureCarousel01Props, FeatureCarousel01Labels, CarouselFeature }
export default FeatureCarousel01
