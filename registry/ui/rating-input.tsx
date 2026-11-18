"use client"

import * as React from "react"
import { StarIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits, type Lang } from "@/registry/lib/format"

type RatingInputLabels = { value: string; none: string }

const ratingInputLabels: RatingInputLabels = { value: "{value} out of {max}", none: "No rating" }

const ratingInputLabelsAr: RatingInputLabels = { value: "{value} من {max}", none: "بدون تقييم" }

type RatingInputProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  max?: number
  half?: boolean
  showValue?: boolean
  name?: string
  disabled?: boolean
  lang?: Lang
  digits?: Digits
  labels?: Partial<RatingInputLabels>
}

// Native radios in DOM order, so arrow keys follow the page direction. Each star's fill starts at the inline start.
function RatingInput({
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  half = false,
  showValue,
  name,
  disabled,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: RatingInputProps) {
  const l = { ...ratingInputLabels, ...labels }
  const group = React.useId()
  const [inner, setInner] = React.useState(defaultValue)
  const [hover, setHover] = React.useState<number | null>(null)
  const current = value ?? inner
  const shown = hover ?? current
  const locale = { lang, digits }
  const text = (n: number) =>
    l.value.replace("{value}", formatNumber(n, locale)).replace("{max}", formatNumber(max, locale))

  const radio = (v: number, cls: string, label: string) => (
    <label
      key={v}
      onMouseEnter={() => !disabled && setHover(v)}
      className={cn(
        "absolute inset-y-0 rounded-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        cls
      )}
    >
      <input
        type="radio"
        name={name ?? group}
        value={v}
        disabled={disabled}
        checked={current === v}
        aria-label={label}
        className="sr-only"
        onChange={() => {
          if (value === undefined) setInner(v)
          onValueChange?.(v)
        }}
      />
    </label>
  )

  return (
    <div
      role="radiogroup"
      data-slot="rating-input"
      data-disabled={disabled || undefined}
      onMouseLeave={() => setHover(null)}
      className={cn("inline-flex items-center gap-2 text-sm data-disabled:opacity-50", className)}
      {...props}
    >
      <span className="inline-flex">
        <label className="sr-only">
          <input
            type="radio"
            name={name ?? group}
            value={0}
            disabled={disabled}
            checked={current === 0}
            aria-label={l.none}
            onChange={() => {
              if (value === undefined) setInner(0)
              onValueChange?.(0)
            }}
          />
        </label>
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className={cn("relative inline-flex items-center justify-center text-warning", half ? "size-12" : "size-6")}>
            <StarIcon weight="regular" aria-hidden="true" className={cn("text-muted-foreground", half ? "size-10" : "size-5")} />
            <span
              className="absolute inset-y-0 start-0 flex items-center overflow-hidden"
              style={{ width: `${Math.min(Math.max(shown - i, 0), 1) * 100}%` }}
            >
              <StarIcon weight="fill" aria-hidden="true" className={cn("max-w-none shrink-0", half ? "ms-1 size-10" : "ms-0.5 size-5")} />
            </span>
            {half
              ? [
                  radio(i + 0.5, "start-0 w-1/2", text(i + 0.5)),
                  radio(i + 1, "end-0 w-1/2", text(i + 1)),
                ]
              : radio(i + 1, "start-0 w-full", text(i + 1))}
          </span>
        ))}
      </span>
      {showValue && current > 0 && (
        <bdi className="font-medium tabular-nums" aria-hidden="true">
          {text(current)}
        </bdi>
      )}
    </div>
  )
}

export { RatingInput, ratingInputLabels, ratingInputLabelsAr }
export type { RatingInputLabels, RatingInputProps }
