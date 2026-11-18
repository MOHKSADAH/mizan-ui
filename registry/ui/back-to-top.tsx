"use client"

import * as React from "react"
import { ArrowUpIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"

type BackToTopLabels = { label: string }

const defaultLabels: BackToTopLabels = { label: "Back to top" }
const backToTopLabelsAr: BackToTopLabels = { label: "العودة إلى الأعلى" }

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

type BackToTopProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "children"> & {
  // Scroll distance in pixels before the button shows.
  threshold?: number
  labels?: Partial<BackToTopLabels>
}

// Sits above StickyActionBar by reading its --sticky-bar-height variable.
function BackToTop({ threshold = 400, labels, className, ...props }: BackToTopProps) {
  const visible = React.useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  )
  if (!visible) return null
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-lg"
      data-slot="back-to-top"
      aria-label={{ ...defaultLabels, ...labels }.label}
      className={cn("fixed end-4 bottom-[calc(1rem+var(--sticky-bar-height,0px))] z-30 shadow-md", className)}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })
      }
      {...props}
    >
      <ArrowUpIcon aria-hidden="true" />
    </Button>
  )
}

export { BackToTop, backToTopLabelsAr }
export type { BackToTopLabels }
