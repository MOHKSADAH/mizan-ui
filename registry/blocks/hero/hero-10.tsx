import * as React from "react"
import { ArrowRightIcon, ImageIcon } from "@phosphor-icons/react/ssr"

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
  eyebrow?: React.ReactNode
  title: string
  description?: string
  cta: Action
  // Without a src the box shows the placeholder. The frame follows the width and height.
  media: Omit<Media, "src"> & { src?: string }
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
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
            {title}
          </Heading>
          {description ? <p className="max-w-xl text-lg text-muted-foreground md:text-xl">{description}</p> : null}
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
              <span className="font-medium text-foreground">{meta.author}</span>
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
        <div
          style={{ aspectRatio: `${media.width} / ${media.height}` }}
          className="w-full overflow-hidden rounded-xl border bg-muted"
        >
          {media.src ? (
            <img src={media.src} alt={media.alt} width={media.width} height={media.height} className="size-full object-cover" />
          ) : (
            <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
              <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Hero10Props; ar: Hero10Props } = {
  en: {
    lang: "en",
    eyebrow: "Issue 24 · Culture and cities",
    title: "Riyadh as you have not read it before",
    description:
      "A long read on the old quarters of the city and how life changes there, between small cafes, bookshops and mud-brick walls.",
    cta: { label: "Read the story", href: "#story" },
    media: { alt: "The old quarter of Riyadh", width: 4, height: 3 },
    meta: { author: "Reem Al-Dosari", category: "Culture and cities", date: new Date("2026-11-18T09:00:00Z") },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "العدد 24 · ثقافة وعمران",
    title: "الرياض كما لم تقرأها من قبل",
    description: "قراءة مطوّلة في أحياء المدينة القديمة، وكيف تتبدّل الحياة فيها بين المقاهي الصغيرة والمكتبات والجدران الطينية.",
    cta: { label: "اقرأ الحكاية", href: "#story" },
    media: { alt: "حي الرياض القديم", width: 4, height: 3 },
    meta: { author: "ريم الدوسري", category: "ثقافة وعمران", date: new Date("2026-11-18T09:00:00Z") },
    labels: labelsAr,
  },
}

export { Hero10, labelsEn, labelsAr, demo }
export type { Hero10Props, Hero10Labels }
export default Hero10
