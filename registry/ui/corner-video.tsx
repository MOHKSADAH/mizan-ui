"use client"

import * as React from "react"
import {
  ArrowsOutSimpleIcon,
  ImageIcon,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  XIcon,
} from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/registry/ui/dialog"

type CornerVideoLabels = {
  play: string
  pause: string
  mute: string
  unmute: string
  expand: string
  close: string
}

const defaultLabels: CornerVideoLabels = {
  play: "Play video",
  pause: "Pause video",
  mute: "Mute",
  unmute: "Unmute",
  expand: "Expand video",
  close: "Close video",
}

const cornerVideoLabelsAr: CornerVideoLabels = {
  play: "تشغيل الفيديو",
  pause: "إيقاف الفيديو مؤقتًا",
  mute: "كتم الصوت",
  unmute: "تشغيل الصوت",
  expand: "تكبير الفيديو",
  close: "إغلاق الفيديو",
}

type CornerVideoProps = Omit<React.ComponentProps<"div">, "title" | "children"> & {
  // Without a src the card shows the poster, or the image placeholder when there is no poster either.
  src?: string
  poster?: string
  // Names the card, the video and the expanded dialog.
  title: string
  description?: string
  // Plays on load unless the visitor prefers reduced motion. Muted until the visitor unmutes.
  autoPlay?: boolean
  open?: boolean
  defaultOpen?: boolean
  onClose?: () => void
  labels?: Partial<CornerVideoLabels>
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

function Placeholder({ poster }: { poster?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (poster) return <img src={poster} alt="" className="size-full object-cover" />
  return (
    <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
      <ImageIcon aria-hidden="true" weight="duotone" className="size-10" />
    </div>
  )
}

// A small video card docked at the inline end, bottom of the screen. Position it with className to dock inside a frame.
function CornerVideo({
  src,
  poster,
  title,
  description,
  autoPlay = true,
  open: openProp,
  defaultOpen = true,
  onClose,
  labels,
  className,
  ...props
}: CornerVideoProps) {
  const t = { ...defaultLabels, ...labels }
  const video = React.useRef<HTMLVideoElement>(null)
  const [inner, setInner] = React.useState(defaultOpen)
  const open = openProp ?? inner
  const reduced = useReducedMotion()
  // null until the visitor presses play or pause. Reduced motion keeps the video paused until then.
  const [chosen, setChosen] = React.useState<boolean | null>(null)
  const playing = chosen ?? (autoPlay && !reduced)
  const [muted, setMuted] = React.useState(true)
  const [expanded, setExpanded] = React.useState(false)

  // Playback also pauses while the expanded copy plays. A blocked autoplay shows the play button.
  React.useEffect(() => {
    const el = video.current
    if (!el) return
    if (playing && !expanded) void el.play().catch(() => setChosen(false))
    else el.pause()
  }, [playing, expanded, open])

  if (!open) return null

  const control = "text-muted-foreground"
  return (
    <div
      data-slot="corner-video"
      role="region"
      aria-label={title}
      className={cn(
        "fixed end-[max(1rem,env(safe-area-inset-right),env(safe-area-inset-left))] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 w-64 overflow-hidden rounded-xl border bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      <div className="aspect-video w-full bg-muted">
        {src ? (
          <video
            ref={video}
            src={src}
            poster={poster}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            aria-label={title}
            className="size-full object-cover"
          />
        ) : (
          <Placeholder poster={poster} />
        )}
      </div>
      <div className="flex items-center gap-0.5 p-1 ps-3">
        <span className="min-w-0 flex-1 truncate text-sm font-medium">{title}</span>
        {src && (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              className={control}
              aria-label={playing ? t.pause : t.play}
              onClick={() => setChosen(!playing)}
            >
              {playing ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className={control}
              aria-label={muted ? t.unmute : t.mute}
              onClick={() => setMuted((value) => !value)}
            >
              {muted ? <SpeakerSlashIcon aria-hidden="true" /> : <SpeakerHighIcon aria-hidden="true" />}
            </Button>
          </>
        )}
        <Button variant="ghost" size="icon-sm" className={control} aria-label={t.expand} onClick={() => setExpanded(true)}>
          <ArrowsOutSimpleIcon aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className={control}
          aria-label={t.close}
          onClick={() => {
            setInner(false)
            onClose?.()
          }}
        >
          <XIcon aria-hidden="true" />
        </Button>
      </div>
      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="sm:max-w-3xl">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            {src ? (
              <video src={src} poster={poster} controls playsInline aria-label={title} className="size-full object-cover" />
            ) : (
              <Placeholder poster={poster} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { CornerVideo, cornerVideoLabelsAr }
export type { CornerVideoLabels, CornerVideoProps }
