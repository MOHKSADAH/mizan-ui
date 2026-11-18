"use client"

import * as React from "react"
import { HeartIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { Toggle } from "@/registry/ui/toggle"

type WishlistButtonLabels = {
  label: string
  added: string
  removed: string
}

const defaultLabels: WishlistButtonLabels = {
  label: "Save to wishlist",
  added: "Added to wishlist",
  removed: "Removed from wishlist",
}

const wishlistButtonLabelsAr: WishlistButtonLabels = {
  label: "حفظ في المفضلة",
  added: "تمت الإضافة إلى المفضلة",
  removed: "تمت الإزالة من المفضلة",
}

type WishlistButtonProps = Omit<
  React.ComponentProps<typeof Toggle>,
  "children" | "pressed" | "defaultPressed" | "onPressedChange" | "aria-label"
> & {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  labels?: Partial<WishlistButtonLabels>
}

// The name stays the same and aria-pressed carries the state. The live region announces the change.
function WishlistButton({
  pressed,
  defaultPressed = false,
  onPressedChange,
  labels,
  variant = "outline",
  size = "lg",
  className,
  ...props
}: WishlistButtonProps) {
  const t = { ...defaultLabels, ...labels }
  const [internal, setInternal] = React.useState(defaultPressed)
  const [announcement, setAnnouncement] = React.useState("")
  const on = pressed ?? internal

  return (
    <span data-slot="wishlist-button" className="inline-flex">
      <Toggle
        aria-label={t.label}
        pressed={on}
        variant={variant}
        size={size}
        onPressedChange={(next) => {
          setInternal(next)
          setAnnouncement(next ? t.added : t.removed)
          onPressedChange?.(next)
        }}
        className={cn("rounded-full", className)}
        {...props}
      >
        <HeartIcon aria-hidden="true" weight={on ? "fill" : "regular"} className={cn("size-5", on && "text-destructive")} />
      </Toggle>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </span>
  )
}

export { WishlistButton, wishlistButtonLabelsAr }
export type { WishlistButtonLabels }
