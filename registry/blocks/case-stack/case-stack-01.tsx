import * as React from "react"
import { ArrowRightIcon, ImageIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Media } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type CaseStat = { value: string; label: string }

type CaseStudy = {
  id: string
  client: string
  sector: string
  title: string
  summary: string
  // Two stats read best: a result and the label that explains it, for example "+38%" and "sales".
  stats: CaseStat[]
  link: Action
  media?: Media
}

type CaseStack01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  items: CaseStudy[]
}

const labelsEn = {}
const labelsAr = {}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

// Each card pins below the one before it with position: sticky, so they stack as the page scrolls.
// Phones and reduced motion get a plain list: no pinning, every card in full.
function CaseStack01({ lang = "en", eyebrow, title, description, items, headingLevel = 2, id, className }: CaseStack01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ol className="grid gap-6">
          {items.map((item, i) => (
            <li
              key={item.id}
              className="md:motion-safe:sticky"
              style={{ top: `calc(var(--case-stack-top, 5rem) + ${i * 3}rem)` }}
            >
              <Card className="md:min-h-96 md:[--card-spacing:--spacing(6)]">
                <CardContent className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border md:order-last">
                    {item.media ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} loading="lazy" className="size-full object-cover" />
                    ) : (
                      <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
                        <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                      <bdi>{formatNumber(i + 1, { lang }, { minimumIntegerDigits: 2 })}</bdi>
                      <span aria-hidden="true"> · </span>
                      <span className="font-medium text-foreground">{item.client}</span>
                      <span aria-hidden="true"> · </span>
                      {item.sector}
                    </p>
                    <h3 className="text-lg font-semibold text-balance md:text-xl">{item.title}</h3>
                    <p className="text-muted-foreground">{item.summary}</p>
                    <dl className="grid grid-cols-2 gap-4 border-y py-4">
                      {item.stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1">
                          <dd className="order-first text-3xl font-semibold">
                            <bdi dir="ltr">{stat.value}</bdi>
                          </dd>
                          <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                        </div>
                      ))}
                    </dl>
                    <a href={item.link.href} {...external(item.link)} className={cn(buttonVariants({ variant: "outline" }), "h-10 w-fit px-4")}>
                      {item.link.label}
                      <span className="sr-only"> ({item.client})</span>
                      <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

const demo: { en: CaseStack01Props; ar: CaseStack01Props } = {
  en: {
    lang: "en",
    eyebrow: "Case studies",
    title: "Real results from Saudi stores and businesses",
    description: "Four teams, four cities, and what changed once they moved their daily work to one system.",
    items: [
      {
        id: "sidra",
        client: "Sidra Restaurants",
        sector: "Restaurants and cafes",
        title: "Delivery orders now run from one screen",
        summary: "Six Riyadh branches share one system for orders and stock. Lost phone calls are gone and kitchens prepare orders faster.",
        stats: [{ value: "+38%", label: "Sales" }, { value: "-22%", label: "Preparation time" }],
        link: { label: "Read the case study", href: "#case-sidra" },
      },
      {
        id: "dirah",
        client: "Al-Dirah Perfumes",
        sector: "Online stores",
        title: "A full store, live two weeks before Eid",
        summary: "The brand moved from Instagram and WhatsApp orders to a store that takes mada and Tamara, ready before the season.",
        stats: [{ value: "+54%", label: "Order completion" }, { value: "4.8", label: "Customer rating" }],
        link: { label: "Read the case study", href: "#case-dirah" },
      },
      {
        id: "nada",
        client: "Nada Clinics",
        sector: "Healthcare",
        title: "Fewer forgotten appointments, with reminders on WhatsApp",
        summary: "Patients get a reminder the day before and can rebook in one tap. The reception team stopped calling to confirm.",
        stats: [{ value: "-41%", label: "Missed appointments" }, { value: "+27%", label: "Direct bookings" }],
        link: { label: "Read the case study", href: "#case-nada" },
      },
      {
        id: "najd",
        client: "Najd Logistics",
        sector: "Delivery and logistics",
        title: "Shipment tracking for customers in three cities",
        summary: "Customers follow their shipment from Riyadh, Jeddah and Dammam in one page, so the support line stays free for real problems.",
        stats: [{ value: "-35%", label: "Inquiry calls" }, { value: "96%", label: "On-time delivery" }],
        link: { label: "Read the case study", href: "#case-najd" },
      },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "قصص نجاح",
    title: "نتائج حقيقية من متاجر وأعمال سعودية",
    description: "أربعة فرق في أربع مدن، وما تغيّر بعد أن نقلت عملها اليومي إلى نظام واحد.",
    items: [
      {
        id: "sidra",
        client: "مطاعم سدرة",
        sector: "مطاعم وكافيهات",
        title: "طلبات التوصيل أصبحت تُدار من شاشة واحدة",
        summary: "ربطنا ستة فروع في الرياض بنظام واحد للطلبات والمخزون، فاختفت المكالمات الضائعة وقلّ وقت تجهيز الطلبات.",
        stats: [{ value: "+38%", label: "مبيعات" }, { value: "-22%", label: "وقت التجهيز" }],
        link: { label: "اقرأ دراسة الحالة", href: "#case-sidra" },
      },
      {
        id: "dirah",
        client: "عطور الديرة",
        sector: "متاجر إلكترونية",
        title: "متجر متكامل جاهز قبل العيد بأسبوعين",
        summary: "انتقلت العلامة من الطلبات عبر إنستغرام وواتساب إلى متجر يقبل مدى وتمارا، وجاهز قبل الموسم.",
        stats: [{ value: "+54%", label: "إتمام الطلبات" }, { value: "4.8", label: "تقييم العملاء" }],
        link: { label: "اقرأ دراسة الحالة", href: "#case-dirah" },
      },
      {
        id: "nada",
        client: "عيادات ندى",
        sector: "رعاية صحية",
        title: "مواعيد أقل نسيانًا بتذكيرات عبر واتساب",
        summary: "يصل المريض تذكير قبل الموعد بيوم ويعيد الحجز بنقرة واحدة، وتوقف فريق الاستقبال عن الاتصال للتأكيد.",
        stats: [{ value: "-41%", label: "مواعيد فائتة" }, { value: "+27%", label: "حجوزات مباشرة" }],
        link: { label: "اقرأ دراسة الحالة", href: "#case-nada" },
      },
      {
        id: "najd",
        client: "نجد للخدمات اللوجستية",
        sector: "توصيل ولوجستيات",
        title: "تتبّع الشحنات لعملاء في ثلاث مدن",
        summary: "يتابع العملاء شحناتهم من الرياض وجدة والدمام في صفحة واحدة، فيبقى خط الدعم متاحًا للمشكلات الحقيقية.",
        stats: [{ value: "-35%", label: "مكالمات الاستفسار" }, { value: "96%", label: "تسليم في الموعد" }],
        link: { label: "اقرأ دراسة الحالة", href: "#case-najd" },
      },
    ],
  },
}

export { CaseStack01, labelsEn, labelsAr, demo }
export type { CaseStack01Props, CaseStudy, CaseStat }
export default CaseStack01
