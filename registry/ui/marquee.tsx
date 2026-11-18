"use client"

import * as React from "react"
import { PauseIcon, PlayIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"

type MarqueeLabels = {
  region: string
  pause: string
  play: string
}

const defaultLabels: MarqueeLabels = { region: "Scrolling list", pause: "Pause scrolling", play: "Resume scrolling" }
const marqueeLabelsAr: MarqueeLabels = { region: "قائمة متحركة", pause: "إيقاف الحركة", play: "استئناف الحركة" }

const REDUCED = "(prefers-reduced-motion: reduce)"
const subscribeReduced = (onChange: () => void) => {
  const mql = window.matchMedia(REDUCED)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}
const prefersReduced = () => window.matchMedia(REDUCED).matches

type MarqueeProps = Omit<React.ComponentProps<"div">, "children"> & {
  // Each child is one entry, for example a logo or a short announcement.
  children: React.ReactNode
  // Pixels per second.
  speed?: number
  // Scroll against the reading direction.
  reverse?: boolean
  gap?: string
  labels?: Partial<MarqueeLabels>
}

function Marquee({ children, speed = 40, reverse, gap = "2rem", labels, className, style, ...props }: MarqueeProps) {
  const l = { ...defaultLabels, ...labels }
  const reduced = React.useSyncExternalStore(subscribeReduced, prefersReduced, () => false)
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [userPaused, setUserPaused] = React.useState(false)
  const track = React.useRef<HTMLDivElement>(null)
  const copy = React.useRef<HTMLUListElement>(null)
  const animation = React.useRef<Animation | null>(null)
  const entries = React.Children.toArray(children)
  const paused = userPaused || hovered || focused

  React.useEffect(() => {
    const el = track.current
    const first = copy.current
    if (reduced || !el || !first) return
    // Content moves toward the inline start: left in LTR, right in RTL.
    const shift = getComputedStyle(el).direction === "rtl" ? "50%" : "-50%"
    const anim = el.animate([{ transform: "translateX(0)" }, { transform: `translateX(${shift})` }], {
      duration: 1,
      iterations: Infinity,
      easing: "linear",
      direction: reverse ? "reverse" : "normal",
    })
    animation.current = anim
    const observer = new ResizeObserver(() => {
      anim.effect?.updateTiming({ duration: Math.max(1, (first.offsetWidth / speed) * 1000) })
    })
    observer.observe(first)
    return () => {
      observer.disconnect()
      anim.cancel()
      animation.current = null
    }
  }, [reduced, reverse, speed])

  React.useEffect(() => {
    if (paused) animation.current?.pause()
    else animation.current?.play()
  }, [paused, reduced, reverse, speed])

  const list = (hidden: boolean) => (
    <ul
      ref={hidden ? undefined : copy}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className="flex shrink-0 items-center"
      style={{ gap, paddingInlineEnd: gap }}
    >
      {entries.map((entry, i) => (
        <li key={i} className="shrink-0">
          {entry}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      data-slot="marquee"
      role="group"
      aria-label={l.region}
      className={cn("flex flex-col gap-1", className)}
      style={style}
      {...props}
    >
      {reduced ? (
        <ul className="flex flex-wrap items-center justify-center" style={{ gap }}>
          {entries.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      ) : (
        <>
          <div
            className="overflow-hidden"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
            }}
          >
            <div ref={track} className="flex w-max">
              {list(false)}
              {list(true)}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="self-end"
            aria-label={userPaused ? l.play : l.pause}
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
          </Button>
        </>
      )}
    </div>
  )
}

export { Marquee, marqueeLabelsAr }
export type { MarqueeLabels }
