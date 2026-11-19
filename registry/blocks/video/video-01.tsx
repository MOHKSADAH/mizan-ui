"use client"

import * as React from "react"
import { ClosedCaptioningIcon, ImageIcon, PlayIcon } from "@phosphor-icons/react"

import type { BlockBase, Media } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Section, SectionHeader } from "@/registry/ui/section"

type Video01Labels = { play: string; close: string }

type Video01Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  // The title of the video itself: it names the play button and the dialog.
  videoTitle: string
  poster?: Media
  // The player, an <video> or an <iframe>. It mounts only while the dialog is open.
  video: React.ReactNode
  captionsNote?: string
  labels?: Partial<Video01Labels>
}

const labelsEn: Video01Labels = { play: "Play video", close: "Close" }
const labelsAr: Video01Labels = { play: "تشغيل الفيديو", close: "إغلاق" }

function Video01({
  eyebrow,
  title,
  description,
  videoTitle,
  poster,
  video,
  captionsNote,
  headingLevel = 2,
  labels,
  id,
  className,
}: Video01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const note = captionsNote ? (
    <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <ClosedCaptioningIcon aria-hidden="true" weight="regular" className="size-5 shrink-0" />
      {captionsNote}
    </p>
  ) : null
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <Dialog>
          <DialogTrigger
            aria-label={`${t.play}: ${videoTitle}`}
            className="relative block aspect-video w-full overflow-hidden rounded-xl border bg-muted text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {poster ? (
              <img src={poster.src} alt={poster.alt} width={poster.width} height={poster.height} className="size-full object-cover" />
            ) : (
              <span aria-hidden="true" className="flex size-full items-center justify-center">
                <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
              </span>
            )}
            <span
              aria-hidden="true"
              className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <PlayIcon aria-hidden="true" weight="fill" className="size-7" />
            </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl" labels={{ close: t.close }}>
            <DialogHeader>
              <DialogTitle className="pe-8">{videoTitle}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted [&>iframe]:size-full [&>video]:size-full">
              {video}
            </div>
            {note}
          </DialogContent>
        </Dialog>
        {note ? <div className="mt-4">{note}</div> : null}
      </Container>
    </Section>
  )
}

const demo: { en: Video01Props; ar: Video01Props } = {
  en: {
    eyebrow: "See it in action",
    title: "Two minutes with Rafid",
    description: "Watch how a Riyadh store issues an invoice, scans stock and gets paid.",
    videoTitle: "Rafid product tour",
    video: <video controls preload="none" aria-label="Rafid product tour" />,
    captionsNote: "Arabic and English captions are available in the player.",
    labels: labelsEn,
  },
  ar: {
    eyebrow: "شاهده يعمل",
    title: "دقيقتان مع رافد",
    description: "شاهد كيف يصدر متجر في الرياض فاتورة، ويجرد المخزون، ويستلم المبلغ.",
    videoTitle: "جولة في منتج رافد",
    video: <video controls preload="none" aria-label="جولة في منتج رافد" />,
    captionsNote: "الترجمة العربية والإنجليزية متاحة داخل المشغّل.",
    labels: labelsAr,
  },
}

export { Video01, labelsEn, labelsAr, demo }
export type { Video01Props, Video01Labels }
export default Video01
