"use client"

import * as React from "react"
import { CaretLeftIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/registry/ui/dialog"

type ImageLightboxLabels = {
  close: string
  previous: string
  next: string
  zoomIn: string
  zoomOut: string
  // Contains {current} and {total}.
  counter: string
}

const defaultLabels: ImageLightboxLabels = {
  close: "Close",
  previous: "Previous image",
  next: "Next image",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  counter: "{current} of {total}",
}

const imageLightboxLabelsAr: ImageLightboxLabels = {
  close: "إغلاق",
  previous: "الصورة السابقة",
  next: "الصورة التالية",
  zoomIn: "تكبير",
  zoomOut: "تصغير",
  counter: "{current} من {total}",
}

type LightboxImage = {
  src: string
  // Required: the thumbnail name and the dialog title.
  alt: string
  thumb?: string
}

const MAX_ZOOM = 4
const clamp = (n: number) => Math.min(MAX_ZOOM, Math.max(1, Math.round(n * 100) / 100))
const distance = (points: { x: number; y: number }[]) => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)

type ImageLightboxProps = Omit<React.ComponentProps<"ul">, "children"> & {
  images: LightboxImage[]
  // Wheel, pinch, +/- keys and buttons.
  zoom?: boolean
  lang?: Lang
  digits?: Digits
  labels?: Partial<ImageLightboxLabels>
}

function ImageLightbox({ images, zoom, lang = "en", digits = "latn", labels, className, ...props }: ImageLightboxProps) {
  const l = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const [scale, setScale] = React.useState(1)
  const thumbs = React.useRef<(HTMLButtonElement | null)[]>([])
  const pointers = React.useRef(new Map<number, { x: number; y: number }>())
  const pinch = React.useRef<{ start: number; scale: number } | null>(null)
  const total = images.length
  const image = images[index]

  const go = (to: number) => {
    setIndex((to + total) % total)
    setScale(1)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const forward = (event.key === "ArrowRight") !== rtl
      go(index + (forward ? 1 : -1))
    } else if (zoom && (event.key === "+" || event.key === "=")) setScale((s) => clamp(s + 0.5))
    else if (zoom && (event.key === "-" || event.key === "_")) setScale((s) => clamp(s - 0.5))
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pinch.current && pointers.current.size === 2) {
      setScale(clamp((pinch.current.scale * distance([...pointers.current.values()])) / pinch.current.start))
    }
  }

  function onPointerDown(event: React.PointerEvent) {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.current.size === 2) pinch.current = { start: distance([...pointers.current.values()]), scale }
  }

  function onPointerEnd(event: React.PointerEvent) {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size < 2) pinch.current = null
  }

  return (
    <>
      <ul data-slot="image-lightbox" className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)} {...props}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              ref={(el) => {
                thumbs.current[i] = el
              }}
              aria-haspopup="dialog"
              className="block w-full overflow-hidden rounded-lg outline-none ring-1 ring-foreground/10 focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => {
                setIndex(i)
                setScale(1)
                setOpen(true)
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.thumb ?? img.src} alt={img.alt} className="aspect-square size-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          labels={{ close: l.close }}
          className="max-w-[calc(100%-1rem)] gap-2 p-2 sm:max-w-4xl"
          finalFocus={() => thumbs.current[index]}
          onKeyDown={onKeyDown}
        >
          <DialogTitle className="sr-only">{image?.alt}</DialogTitle>
          <div className="relative flex items-center justify-center">
            <div
              className="flex max-h-[80vh] w-full touch-pan-x touch-pan-y justify-center overflow-auto"
              onWheel={zoom ? (e) => setScale((s) => clamp(s + (e.deltaY < 0 ? 0.25 : -0.25))) : undefined}
              onPointerDown={zoom ? onPointerDown : undefined}
              onPointerMove={zoom ? onPointerMove : undefined}
              onPointerUp={zoom ? onPointerEnd : undefined}
              onPointerCancel={zoom ? onPointerEnd : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image?.src}
                alt={image?.alt}
                draggable={false}
                className={cn("rounded-lg object-contain", scale === 1 && "max-h-[80vh] max-w-full")}
                style={scale === 1 ? undefined : { width: `${scale * 100}%`, maxWidth: "none" }}
              />
            </div>
            {total > 1 && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute start-2"
                  aria-label={l.previous}
                  onClick={() => go(index - 1)}
                >
                  <CaretLeftIcon aria-hidden="true" className="rtl:rotate-180" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute end-2"
                  aria-label={l.next}
                  onClick={() => go(index + 1)}
                >
                  <CaretLeftIcon aria-hidden="true" className="rotate-180 rtl:rotate-0" />
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            <span className="tabular-nums">
              {l.counter
                .replace("{current}", formatNumber(index + 1, locale))
                .replace("{total}", formatNumber(total, locale))}
            </span>
            {zoom && (
              <span className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={l.zoomOut}
                  onClick={() => setScale((s) => clamp(s - 0.5))}
                >
                  <MagnifyingGlassMinusIcon aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={l.zoomIn}
                  onClick={() => setScale((s) => clamp(s + 0.5))}
                >
                  <MagnifyingGlassPlusIcon aria-hidden="true" />
                </Button>
              </span>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { ImageLightbox, imageLightboxLabelsAr }
export type { ImageLightboxLabels, LightboxImage }
