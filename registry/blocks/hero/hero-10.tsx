import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Media } from "@/registry/lib/block-types"
import { formatDate } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Hero10Labels = { by: string; in: string }

type Hero10Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  lang?: Lang
  // A pill above the title, for example an issue number or a section name.
  eyebrow?: React.ReactNode
  // Mix weights with <strong>: the heading is font-normal, so the strong part stands out.
  title: React.ReactNode
  description?: string
  cta: Action
  // The frame follows the image width and height, so any ratio works.
  media: Media
  meta: { author: string; category: string; date: Date }
  labels?: Partial<Hero10Labels>
}

const labelsEn: Hero10Labels = { by: "By", in: "in" }
const labelsAr: Hero10Labels = { by: "بقلم", in: "في" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Hero10({
  lang = "en",
  eyebrow,
  title,
  description,
  cta,
  media,
  meta,
  labels,
  headingLevel = 1,
  id,
  className,
}: Hero10Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col items-start gap-6">
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium">
              {eyebrow}
            </p>
          ) : null}
          <Heading
            id={`${sid}-heading`}
            className="max-w-4xl text-5xl font-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {title}
          </Heading>
        </div>
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start gap-6 lg:col-span-5">
            {description ? <p className="text-lg text-muted-foreground md:text-xl">{description}</p> : null}
            <a href={cta.href} {...external(cta)} className={cn(buttonVariants(), "h-12 px-6 text-base")}>
              {cta.label}
              <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
            </a>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>{meta.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{t.by}</span>
                <span className="font-medium text-primary">{meta.author}</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>
                {t.in} <span className="font-medium text-foreground">{meta.category}</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <time dateTime={meta.date.toISOString().slice(0, 10)}>
                <bdi>{formatDate(meta.date, { lang }, { dateStyle: "long" })}</bdi>
              </time>
            </p>
          </div>
          <div className="rounded-3xl bg-muted p-3 md:p-4 lg:col-span-7">
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Hero10Props; ar: Hero10Props } = {
  en: {
    lang: "en",
    eyebrow: "Issue 24 · Culture and cities",
    title: (
      <>
        <strong>Riyadh</strong> as you have not read it before
      </>
    ),
    description:
      "A long read on the old quarters of the city and how life changes there, between small cafes, bookshops and mud-brick walls.",
    cta: { label: "Read the story", href: "#story" },
    media: { src: "/examples/editorial.svg", alt: "A mud-brick wall with an arched door and a palm tree at sunset", width: 800, height: 600 },
    meta: { author: "Reem Al-Dosari", category: "Culture and cities", date: new Date("2026-11-18T09:00:00Z") },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "العدد 24 · ثقافة وعمران",
    title: (
      <>
        <strong>الرياض</strong> كما لم تقرأها من قبل
      </>
    ),
    description: "قراءة مطوّلة في أحياء المدينة القديمة، وكيف تتبدّل الحياة فيها بين المقاهي الصغيرة والمكتبات والجدران الطينية.",
    cta: { label: "اقرأ الحكاية", href: "#story" },
    media: { src: "/examples/editorial.svg", alt: "جدار طيني بباب مقوّس ونخلة عند الغروب", width: 800, height: 600 },
    meta: { author: "ريم الدوسري", category: "ثقافة وعمران", date: new Date("2026-11-18T09:00:00Z") },
    labels: labelsAr,
  },
}

export { Hero10, labelsEn, labelsAr, demo }
export type { Hero10Props, Hero10Labels }
export default Hero10
