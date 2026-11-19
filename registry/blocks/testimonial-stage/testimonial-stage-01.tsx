"use client"

import * as React from "react"
import { ImageIcon, PauseIcon, PlayIcon } from "@phosphor-icons/react"

import type { BlockBase, Media } from "@/registry/lib/block-types"
import { Button } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type StageStat = { value: string; label: string }

type StageTestimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
  portrait?: Media
  // Two stats read best, for example "+38%" and "sales".
  stats: StageStat[]
}

type TestimonialStage01Labels = {
  // Names the thumbnail rail.
  rail: string
  pause: string
  play: string
}

type TestimonialStage01Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  items: StageTestimonial[]
  defaultItem?: string
  // "auto" switches by itself; "static" only switches when the visitor picks a thumbnail.
  variant?: "auto" | "static"
  // Milliseconds each testimonial stays on screen in the auto variant.
  interval?: number
  labels?: Partial<TestimonialStage01Labels>
}

const labelsEn: TestimonialStage01Labels = {
  rail: "Choose a testimonial",
  pause: "Pause automatic switching",
  play: "Resume automatic switching",
}

const labelsAr: TestimonialStage01Labels = {
  rail: "اختر شهادة عميل",
  pause: "إيقاف التبديل التلقائي",
  play: "استئناف التبديل التلقائي",
}

const query = "(prefers-reduced-motion: reduce)"

function useReducedMotion() {
  return React.useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

// Autoplay runs only in the auto variant, with more than one item, and never while the visitor hovers, focuses
// or has paused it, or prefers reduced motion.
function shouldAutoplay(state: { variant: "auto" | "static"; count: number; hovered: boolean; focused: boolean; stopped: boolean; reduced: boolean }) {
  return state.variant === "auto" && state.count > 1 && !state.hovered && !state.focused && !state.stopped && !state.reduced
}

function Portrait({ portrait, className, icon }: { portrait?: Media; className?: string; icon: string }) {
  return (
    <div className={className}>
      {portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} loading="lazy" className="size-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
          <ImageIcon aria-hidden="true" weight="duotone" className={icon} />
        </div>
      )}
    </div>
  )
}

// One testimonial at a time: portrait, quote and a stat pair, with a rail of thumbnails (tabs) to switch.
function TestimonialStage01({
  eyebrow,
  title,
  items,
  defaultItem,
  variant = "auto",
  interval = 8000,
  headingLevel = 2,
  labels,
  id,
  className,
}: TestimonialStage01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const reduced = useReducedMotion()
  const [active, setActive] = React.useState(defaultItem ?? items[0]?.id)
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [stopped, setStopped] = React.useState(false)
  const running = shouldAutoplay({ variant, count: items.length, hovered, focused, stopped, reduced })

  React.useEffect(() => {
    if (!running) return
    const timer = setTimeout(() => {
      const next = (items.findIndex((item) => item.id === active) + 1) % items.length
      setActive(items[next].id)
    }, interval)
    return () => clearTimeout(timer)
  }, [running, active, items, interval])

  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} headingLevel={headingLevel} align="center" />
        <Tabs
          value={active}
          onValueChange={(next) => setActive(next as string)}
          className="gap-6"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {items.map((item) => (
            <TabsContent key={item.id} value={item.id}>
              <Card className="md:[--card-spacing:--spacing(6)] motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0">
                <CardContent className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
                  <Portrait portrait={item.portrait} icon="size-16" className="aspect-square w-full max-w-xs overflow-hidden rounded-lg border max-md:mx-auto" />
                  <figure className="flex flex-col gap-6">
                    <blockquote>
                      <p className="text-lg text-pretty md:text-xl">{item.quote}</p>
                    </blockquote>
                    <figcaption className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.role} · {item.company}
                      </span>
                    </figcaption>
                    <dl className="mt-auto grid grid-cols-2 gap-4 border-t pt-6">
                      {item.stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1">
                          <dd className="order-first text-3xl font-semibold">
                            <bdi dir="ltr">{stat.value}</bdi>
                          </dd>
                          <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </figure>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
          <div className="flex items-center justify-center gap-3">
            <TabsList variant="line" aria-label={t.rail} className="h-auto w-fit flex-wrap justify-center gap-2 p-0 group-data-horizontal/tabs:h-auto">
              {items.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="h-auto flex-none justify-start gap-3 rounded-lg border-border p-1 text-start after:hidden data-active:border-primary md:pe-3"
                >
                  <Portrait portrait={item.portrait ? { ...item.portrait, alt: "" } : undefined} icon="size-5" className="size-12 shrink-0 overflow-hidden rounded-md" />
                  <span className="sr-only md:not-sr-only md:flex md:flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{item.company}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            {variant === "auto" && !reduced && items.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                aria-label={stopped ? t.play : t.pause}
                onClick={() => setStopped((value) => !value)}
              >
                {stopped ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
              </Button>
            )}
          </div>
        </Tabs>
      </Container>
    </Section>
  )
}

const demo: { en: TestimonialStage01Props; ar: TestimonialStage01Props } = {
  en: {
    eyebrow: "Customers",
    title: "Stores and teams that grew with us",
    labels: labelsEn,
    items: [
      {
        id: "sara",
        quote: "We used to answer orders by hand on WhatsApp until late at night. Now orders arrive in order, and the pressure on my team dropped clearly.",
        name: "Sara Al-Otaibi",
        role: "Founder",
        company: "Al-Dirah Perfumes",
        stats: [{ value: "+38%", label: "Sales" }, { value: "-22%", label: "Preparation time" }],
      },
      {
        id: "mohammed",
        quote: "Six branches and six different tools. Today I see orders and stock on one screen and know what is missing before a customer complains.",
        name: "Mohammed Al-Qahtani",
        role: "Operations Manager",
        company: "Sidra Restaurants",
        stats: [{ value: "+54%", label: "Order completion" }, { value: "-31%", label: "Idle stock" }],
      },
      {
        id: "layla",
        quote: "Reminders reach patients on WhatsApp the day before. Missed appointments fell, and reception no longer spends the morning on the phone.",
        name: "Layla Al-Dosari",
        role: "Clinics Director",
        company: "Nada Clinics",
        stats: [{ value: "-41%", label: "Missed appointments" }, { value: "+27%", label: "Direct bookings" }],
      },
      {
        id: "fahad",
        quote: "Customers track their shipment themselves in Riyadh, Jeddah and Dammam. Our support line is finally free for real problems.",
        name: "Fahad Al-Shammari",
        role: "Marketing Manager",
        company: "Najd Logistics",
        stats: [{ value: "-35%", label: "Inquiry calls" }, { value: "96%", label: "On-time delivery" }],
      },
    ],
  },
  ar: {
    eyebrow: "عملاؤنا",
    title: "متاجر وفرق نمت معنا",
    labels: labelsAr,
    items: [
      {
        id: "sara",
        quote: "كنا نرد على الطلبات يدويًا عبر واتساب حتى ساعات متأخرة. بعد الانتقال للمنصة صارت الطلبات تصل مرتبة، وخفّ الضغط على فريقي بشكل واضح.",
        name: "سارة العتيبي",
        role: "المؤسِّسة",
        company: "عطور الديرة",
        stats: [{ value: "+38%", label: "مبيعات" }, { value: "-22%", label: "وقت التجهيز" }],
      },
      {
        id: "mohammed",
        quote: "ستة فروع وستة أنظمة مختلفة. اليوم أرى الطلبات والمخزون في شاشة واحدة، وأعرف ما ينقص قبل أن يشتكي العميل.",
        name: "محمد القحطاني",
        role: "مدير العمليات",
        company: "مطاعم سدرة",
        stats: [{ value: "+54%", label: "إتمام الطلبات" }, { value: "-31%", label: "مخزون راكد" }],
      },
      {
        id: "layla",
        quote: "تصل التذكيرات إلى المرضى عبر واتساب قبل الموعد بيوم. انخفضت المواعيد الفائتة، ولم يعد الاستقبال يقضي الصباح على الهاتف.",
        name: "ليلى الدوسري",
        role: "مديرة العيادات",
        company: "عيادات ندى",
        stats: [{ value: "-41%", label: "مواعيد فائتة" }, { value: "+27%", label: "حجوزات مباشرة" }],
      },
      {
        id: "fahad",
        quote: "يتتبع العملاء شحناتهم بأنفسهم في الرياض وجدة والدمام، وأصبح خط الدعم عندنا متاحًا للمشكلات الحقيقية أخيرًا.",
        name: "فهد الشمري",
        role: "مدير التسويق",
        company: "نجد للخدمات اللوجستية",
        stats: [{ value: "-35%", label: "مكالمات الاستفسار" }, { value: "96%", label: "تسليم في الموعد" }],
      },
    ],
  },
}

export { TestimonialStage01, labelsEn, labelsAr, demo, shouldAutoplay }
export type { TestimonialStage01Props, TestimonialStage01Labels, StageTestimonial, StageStat }
export default TestimonialStage01
