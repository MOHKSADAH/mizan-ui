import { percentOf, renderBar } from "@/registry/lib/ascii"
import { cn } from "@/registry/lib/utils"

type AsciiProgressProps = {
  value: number
  max?: number
  width?: number
  fill?: string
  empty?: string
  showPercent?: boolean
  className?: string
}

export function AsciiProgress({
  value,
  max = 100,
  width = 20,
  fill = "#",
  empty = "-",
  showPercent = true,
  className,
}: AsciiProgressProps) {
  const percent = percentOf(value, max)

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(Math.max(value, 0), max) || 0}
      aria-valuetext={`${percent}%`}
      className={cn("inline-flex gap-[1ch] font-mono whitespace-pre", className)}
    >
      <bdi dir="ltr">{`[${renderBar(value, max, width, fill, empty)}]`}</bdi>
      {showPercent && <bdi dir="ltr">{`${percent}%`}</bdi>}
    </div>
  )
}
