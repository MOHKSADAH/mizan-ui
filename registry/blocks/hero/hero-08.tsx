"use client"

import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/registry/ui/carousel"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Slide = { media: Media | React.ReactNode; title: string; cta: Action }

type Hero08Labels = {
  slides: string
  previous: string
  next: string
  slide: (index: number, total: number) => string
}

type Hero08Props = BlockBase & {
  title: string
  slides: Slide[]
  labels?: Partial<Hero08Labels>
}

const labelsEn: Hero08Labels = {
  slides: "Slides",
  previous: "Previous slide",
  next: "Next slide",
  slide: (index, total) => `${index} / ${total}`,
}

const labelsAr: Hero08Labels = {
  slides: "الشرائح",
  previous: "الشريحة السابقة",
  next: "الشريحة التالية",
  slide: (index, total) => `${index} / ${total}`,
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

const isMedia = (m: Media | React.ReactNode): m is Media =>
  typeof m === "object" && m !== null && !React.isValidElement(m) && "src" in m

function Dots({ count, label, groupLabel }: { count: number; label: Hero08Labels["slide"]; groupLabel: string }) {
  const { api } = useCarousel()
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      api?.on("select", onChange).on("reInit", onChange)
      return () => {
        api?.off("select", onChange).off("reInit", onChange)
      }
    },
    [api]
  )
  const selected = React.useSyncExternalStore(subscribe, () => api?.selectedScrollSnap() ?? 0, () => 0)
  return (
    <div role="group" aria-label={groupLabel} className="mt-4 flex justify-center">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={label(i + 1, count)}
          aria-current={i === selected ? "true" : undefined}
          onClick={() => api?.scrollTo(i)}
          className="group flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="size-2 rounded-full bg-border group-aria-[current=true]:bg-primary" />
        </button>
      ))}
    </div>
  )
}

function Hero08({ title, slides, headingLevel = 2, labels, id, className }: Hero08Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  const SlideHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} spacing="compact" className={className}>
      <Container>
        <Heading id={`${sid}-heading`} className="sr-only">
          {title}
        </Heading>
        <Carousel aria-labelledby={`${sid}-heading`} labels={{ previous: t.previous, next: t.next }}>
          <CarouselContent className="-ms-0">
            {slides.map((slide, i) => (
              <CarouselItem
                key={slide.title}
                aria-label={t.slide(i + 1, slides.length)}
                className="ps-0"
              >
                <div className="relative overflow-hidden rounded-lg border">
                  <div className="aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5]">
                    {isMedia(slide.media) ? (
                      <img
                        src={slide.media.src}
                        alt={slide.media.alt}
                        width={slide.media.width}
                        height={slide.media.height}
                        className="size-full object-cover"
                      />
                    ) : (
                      slide.media
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-3 border-t bg-background p-4 md:absolute md:start-4 md:bottom-4 md:max-w-sm md:rounded-lg md:border md:p-5">
                    <SlideHeading className="text-xl font-semibold text-balance md:text-2xl">
                      {slide.title}
                    </SlideHeading>
                    <a
                      href={slide.cta.href}
                      {...external(slide.cta)}
                      className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
                    >
                      {slide.cta.label}
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="inset-y-auto start-auto end-14 top-4 my-0 hidden md:flex" />
          <CarouselNext className="inset-y-auto end-4 top-4 my-0 hidden md:flex" />
          <Dots count={slides.length} label={t.slide} groupLabel={t.slides} />
        </Carousel>
      </Container>
    </Section>
  )
}

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const demo: { en: Hero08Props; ar: Hero08Props } = {
  en: {
    title: "Featured offers",
    slides: [
      { media: placeholder, title: "New season collection", cta: { label: "Shop now", href: "#new" } },
      { media: placeholder, title: "Weekend offers", cta: { label: "See the offers", href: "#offers" } },
      { media: placeholder, title: "Gifts for every occasion", cta: { label: "Browse gifts", href: "#gifts" } },
    ],
    labels: labelsEn,
  },
  ar: {
    title: "عروض مميزة",
    slides: [
      { media: placeholder, title: "تشكيلة الموسم الجديد", cta: { label: "تسوق الآن", href: "#new" } },
      { media: placeholder, title: "عروض نهاية الأسبوع", cta: { label: "اكتشف العروض", href: "#offers" } },
      { media: placeholder, title: "هدايا تناسب كل مناسبة", cta: { label: "تصفح الهدايا", href: "#gifts" } },
    ],
    labels: labelsAr,
  },
}

export { Hero08, labelsEn, labelsAr, demo }
export type { Hero08Props, Hero08Labels, Slide }
export default Hero08
