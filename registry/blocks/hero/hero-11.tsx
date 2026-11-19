import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Hero11Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  eyebrow?: React.ReactNode
  title: string
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  // Without a src the box shows the placeholder.
  media: Omit<Media, "src"> & { src?: string }
  // Short facts under the buttons, for example a region, a phase count and a delivery year.
  facts?: React.ReactNode[]
}

const labelsEn = {}
const labelsAr = {}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

function Hero11({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  facts,
  headingLevel = 1,
  id,
  className,
}: Hero11Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="flex flex-col gap-12">
        <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted">
          {media.src ? (
            <img src={media.src} alt={media.alt} width={media.width} height={media.height} className="size-full object-cover" />
          ) : (
            <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
              <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
            </div>
          )}
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
            <Heading id={`${sid}-heading`} className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
              {title}
            </Heading>
          </div>
          <div className="flex flex-col items-start gap-6">
            {description ? <p className="text-lg text-muted-foreground md:text-xl">{description}</p> : null}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
        </div>
        {facts?.length ? (
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-6 text-sm text-muted-foreground">
            {facts.map((fact, i) => (
              <li key={i} className="flex items-center gap-4">
                {i > 0 ? <span aria-hidden="true">·</span> : null}
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  )
}

const demo: { en: Hero11Props; ar: Hero11Props } = {
  en: {
    eyebrow: "New residential project",
    title: "Villas in the north of Riyadh with room to breathe",
    description: "Plots from 450 sqm, wide streets and a park within five minutes of every home.",
    primaryCta: { label: "Book a site visit", href: "#visit" },
    secondaryCta: { label: "Download the brochure", href: "#brochure" },
    media: { alt: "Villas in the north of Riyadh", width: 1600, height: 900 },
    facts: ["Riyadh region", <>4 phases</>, <>Delivery <bdi>2027</bdi></>],
  },
  ar: {
    eyebrow: "مشروع سكني جديد",
    title: "فلل شمال الرياض بمساحات تتسع لك",
    description: "قطع من 450 م² وشوارع عريضة وحديقة على بُعد خمس دقائق من كل منزل.",
    primaryCta: { label: "احجز زيارة للموقع", href: "#visit" },
    secondaryCta: { label: "حمّل الكتيّب", href: "#brochure" },
    media: { alt: "فلل شمال الرياض", width: 1600, height: 900 },
    facts: ["منطقة الرياض", <><bdi>4</bdi> مراحل</>, <>تسليم <bdi>2027</bdi></>],
  },
}

export { Hero11, labelsEn, labelsAr, demo }
export type { Hero11Props }
export default Hero11
