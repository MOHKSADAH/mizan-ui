"use client"

import * as React from "react"
import { ImageIcon, PlayIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Section } from "@/registry/ui/section"

type VideoTrack = { src: string; srcLang: string; label: string; kind?: "captions" | "subtitles" }
type HeroVideo = { poster: Media | React.ReactNode; src: string; title: string; tracks: VideoTrack[] }

type Hero07Labels = { play: string; close: string }

type Hero07Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  eyebrow?: string
  title: string
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  video: HeroVideo
  labels?: Partial<Hero07Labels>
}

const labelsEn: Hero07Labels = { play: "Play video", close: "Close" }
const labelsAr: Hero07Labels = { play: "تشغيل الفيديو", close: "إغلاق" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

const isMedia = (m: Media | React.ReactNode): m is Media =>
  typeof m === "object" && m !== null && !React.isValidElement(m) && "src" in m

function Hero07({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  video,
  headingLevel = 1,
  labels,
  id,
  className,
}: Hero07Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
            {title}
          </Heading>
          {description ? <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{description}</p> : null}
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
            <a href={primaryCta.href} {...external(primaryCta)} className={cn(buttonVariants(), cta)}>
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a href={secondaryCta.href} {...external(secondaryCta)} className={cn(buttonVariants({ variant: "outline" }), cta)}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        <Dialog>
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            {isMedia(video.poster) ? (
              <img src={video.poster.src} alt="" width={video.poster.width} height={video.poster.height} className="size-full object-cover" />
            ) : (
              video.poster
            )}
            <DialogTrigger
              aria-label={`${t.play}: ${video.title}`}
              className="absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <PlayIcon aria-hidden="true" weight="fill" className="size-7" />
              </span>
            </DialogTrigger>
          </div>
          <DialogContent labels={{ close: t.close }} className="sm:max-w-3xl">
            <DialogTitle>{video.title}</DialogTitle>
            <DialogDescription className="sr-only">{video.title}</DialogDescription>
            <video controls preload="none" src={video.src} className="aspect-video w-full rounded-lg bg-muted">
              {video.tracks.map((track) => (
                <track key={track.src} src={track.src} srcLang={track.srcLang} label={track.label} kind={track.kind ?? "captions"} />
              ))}
            </video>
          </DialogContent>
        </Dialog>
      </Container>
    </Section>
  )
}

const poster = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const demo: { en: Hero07Props; ar: Hero07Props } = {
  en: {
    eyebrow: "Product tour",
    title: "See Rafid at work in two minutes",
    description: "Watch how a Saudi retailer issues invoices, tracks stock and closes the month without spreadsheets.",
    primaryCta: { label: "Start free trial", href: "#start" },
    secondaryCta: { label: "Contact sales", href: "#sales" },
    video: {
      poster,
      src: "/videos/rafid-tour.mp4",
      title: "Rafid product tour",
      tracks: [{ src: "/videos/rafid-tour.en.vtt", srcLang: "en", label: "English" }],
    },
    labels: labelsEn,
  },
  ar: {
    eyebrow: "جولة في المنتج",
    title: "شاهد رافد في العمل خلال دقيقتين",
    description: "تعرّف كيف يصدر تاجر سعودي فواتيره ويتابع مخزونه ويقفل الشهر دون جداول يدوية.",
    primaryCta: { label: "ابدأ تجربتك المجانية", href: "#start" },
    secondaryCta: { label: "تواصل مع المبيعات", href: "#sales" },
    video: {
      poster,
      src: "/videos/rafid-tour.mp4",
      title: "جولة في منتج رافد",
      tracks: [{ src: "/videos/rafid-tour.ar.vtt", srcLang: "ar", label: "العربية" }],
    },
    labels: labelsAr,
  },
}

export { Hero07, labelsEn, labelsAr, demo }
export type { Hero07Props, Hero07Labels, HeroVideo, VideoTrack }
export default Hero07
