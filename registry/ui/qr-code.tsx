import * as React from "react"
import { encode } from "uqr"
import { cn } from "@/registry/lib/utils"

// One path of horizontal runs: fewer nodes than one rect per module.
function modulesPath(data: boolean[][]) {
  let d = ""
  data.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (!row[x]) continue
      let end = x
      while (row[end + 1]) end++
      d += `M${x} ${y}h${end - x + 1}v1h-${end - x + 1}z`
      x = end
    }
  })
  return d
}

type QrCodeProps = Omit<React.ComponentProps<"div">, "children"> & {
  value: string
  // Says what the code is for, not the payload. Screen readers read it.
  label: string
  size?: number
  ecc?: "L" | "M" | "Q" | "H"
  // Quiet zone in modules. Scanners need at least 4.
  margin?: number
  logo?: React.ReactNode
}

function QrCode({ value, label, size = 160, ecc, margin = 4, logo, className, style, ...props }: QrCodeProps) {
  const { data, size: modules } = encode(value, { ecc: ecc ?? (logo ? "H" : "M"), border: 0 })
  const total = modules + margin * 2
  return (
    // Scanners need dark modules on a light background, so the chip stays black on white in every theme.
    <div
      data-slot="qr-code"
      role="img"
      aria-label={label}
      dir="ltr"
      className={cn("relative inline-block shrink-0 bg-white text-black", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <svg viewBox={`${-margin} ${-margin} ${total} ${total}`} width={size} height={size} aria-hidden="true">
        <path d={modulesPath(data)} fill="currentColor" shapeRendering="crispEdges" />
      </svg>
      {logo && (
        <div
          data-slot="qr-code-logo"
          className="absolute inset-0 m-auto flex size-1/5 items-center justify-center overflow-hidden rounded-md bg-white"
        >
          {logo}
        </div>
      )}
    </div>
  )
}

export { QrCode }
