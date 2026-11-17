import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Hero02Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  eyebrow?: string
  title: string
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  media: Media | React.ReactNode
}

const labelsEn = {}
const labelsAr = {}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

const isMedia = (m: Media | React.ReactNode): m is Media =>
  typeof m === "object" && m !== null && !React.isValidElement(m) && "src" in m

function Hero02({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  headingLevel = 1,
  id,
  className,
}: Hero02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
          <Heading
            id={`${sid}-heading`}
            className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl"
          >
            {title}
          </Heading>
          {description ? <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{description}</p> : null}
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
            <a href={primaryCta.href} {...external(primaryCta)} className={cn(buttonVariants(), cta)}>
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a
                href={secondaryCta.href}
                {...external(secondaryCta)}
                className={cn(buttonVariants({ variant: "outline" }), cta)}
              >
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-lg border">
          {isMedia(media) ? (
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              fetchPriority="high"
              className="size-full object-cover"
            />
          ) : (
            media
          )}
        </div>
      </Container>
    </Section>
  )
}

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const demo: { en: Hero02Props; ar: Hero02Props } = {
  en: {
    eyebrow: "For companies",
    title: "Everything your company needs in one place",
    description:
      "Track sales, expenses and teams from a single dashboard and make decisions on accurate numbers as they happen.",
    primaryCta: { label: "Book a demo", href: "#demo" },
    secondaryCta: { label: "See pricing", href: "#pricing" },
    media: placeholder,
  },
  ar: {
    eyebrow: "حلول الشركات",
    title: "كل ما تحتاجه شركتك في مكان واحد",
    description:
      "تابع المبيعات والمصروفات والفرق من لوحة واحدة، واتخذ قراراتك بناءً على أرقام دقيقة تصلك لحظة بلحظة.",
    primaryCta: { label: "احجز عرضًا تجريبيًا", href: "#demo" },
    secondaryCta: { label: "اطلع على الأسعار", href: "#pricing" },
    media: placeholder,
  },
}

export { Hero02, labelsEn, labelsAr, demo }
export type { Hero02Props }
export default Hero02
