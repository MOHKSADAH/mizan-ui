"use client"

import * as React from "react"
import { ArrowUUpLeftIcon, EraserIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

type SignaturePadLabels = {
  draw: string
  type: string
  canvas: string
  hint: string
  typeLabel: string
  undo: string
  clear: string
  undone: string
  cleared: string
}

const signaturePadLabels: SignaturePadLabels = {
  draw: "Draw",
  type: "Type",
  canvas: "Signature area",
  hint: "Draw your signature with a mouse, pen or finger. To use the keyboard, switch to Type.",
  typeLabel: "Type your name",
  undo: "Undo",
  clear: "Clear",
  undone: "Last stroke removed",
  cleared: "Signature cleared",
}

const signaturePadLabelsAr: SignaturePadLabels = {
  draw: "رسم",
  type: "كتابة",
  canvas: "منطقة التوقيع",
  hint: "ارسم توقيعك بالفأرة أو القلم أو الإصبع. لاستخدام لوحة المفاتيح انتقل إلى الكتابة.",
  typeLabel: "اكتب اسمك",
  undo: "تراجع",
  clear: "مسح",
  undone: "أُزيل آخر خط",
  cleared: "تم مسح التوقيع",
}

type Point = { x: number; y: number }
type Mode = "draw" | "type"

// Quadratic curves through the midpoints of the sampled points give a smooth stroke.
function strokePath(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (!points.length) return
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  if (points.length === 1) ctx.lineTo(points[0].x + 0.01, points[0].y)
  for (let i = 1; i < points.length - 1; i++) {
    const mid = { x: (points[i].x + points[i + 1].x) / 2, y: (points[i].y + points[i + 1].y) / 2 }
    ctx.quadraticCurveTo(points[i].x, points[i].y, mid.x, mid.y)
  }
  if (points.length > 1) ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)
  ctx.stroke()
}

type SignaturePadProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  onValueChange?: (dataUrl: string | null) => void
  penColor?: string
  penWidth?: number
  name?: string
  labels?: Partial<SignaturePadLabels>
}

// Exports a PNG data URL of what is on screen: the ink is currentColor unless penColor is set.
function SignaturePad({
  onValueChange,
  penColor = "currentColor",
  penWidth = 2.5,
  name,
  labels,
  className,
  ...props
}: SignaturePadProps) {
  const l = { ...signaturePadLabels, ...labels }
  const id = React.useId()
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const strokes = React.useRef<Point[][]>([])
  const live = React.useRef<Point[] | null>(null)
  const [mode, setMode] = React.useState<Mode>("draw")
  const [typed, setTyped] = React.useState("")
  const [count, setCount] = React.useState(0)
  const [data, setData] = React.useState("")
  const [status, setStatus] = React.useState("")

  const render = (m: Mode, text: string) => {
    const el = canvas.current
    const ctx = el?.getContext("2d")
    if (!el || !ctx) return
    const dpr = window.devicePixelRatio || 1
    const { width, height } = el.getBoundingClientRect()
    if (el.width !== Math.round(width * dpr) || el.height !== Math.round(height * dpr)) {
      el.width = Math.round(width * dpr)
      el.height = Math.round(height * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = penColor
    ctx.fillStyle = penColor
    if (m === "type") {
      ctx.font = `italic 40px ${getComputedStyle(el).fontFamily}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, width / 2, height / 2, width - 24)
      return
    }
    ctx.lineWidth = penWidth
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    for (const s of [...strokes.current, ...(live.current ? [live.current] : [])]) strokePath(ctx, s)
  }

  const emit = (empty: boolean) => {
    const url = empty ? null : (canvas.current?.toDataURL("image/png") ?? null)
    setData(url ?? "")
    onValueChange?.(url)
  }

  React.useEffect(() => {
    const el = canvas.current
    if (!el) return
    const observer = new ResizeObserver(() => render(mode, typed))
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, typed, penColor, penWidth])

  const pointAt = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const box = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - box.left, y: e.clientY - box.top }
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    render(next, typed)
    emit(next === "draw" ? !strokes.current.length : !typed.trim())
  }

  const empty = mode === "draw" ? count === 0 : !typed

  return (
    <div data-slot="signature-pad" className={cn("flex w-full max-w-md flex-col gap-2", className)} {...props}>
      <div className="flex items-center justify-between gap-2">
        <div role="group" className="flex gap-1">
          {(["draw", "type"] as const).map((m) => (
            <Button
              key={m}
              type="button"
              size="sm"
              variant={mode === m ? "secondary" : "ghost"}
              aria-pressed={mode === m}
              onClick={() => switchMode(m)}
            >
              {l[m]}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          {mode === "draw" && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={count === 0}
              onClick={() => {
                strokes.current.pop()
                setCount(strokes.current.length)
                render(mode, typed)
                emit(!strokes.current.length)
                setStatus(l.undone)
              }}
            >
              <ArrowUUpLeftIcon aria-hidden="true" data-icon="inline-start" className="rtl:-scale-x-100" />
              {l.undo}
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={empty}
            onClick={() => {
              strokes.current = []
              setCount(0)
              setTyped("")
              render(mode, "")
              emit(true)
              setStatus(l.cleared)
            }}
          >
            <EraserIcon aria-hidden="true" data-icon="inline-start" />
            {l.clear}
          </Button>
        </div>
      </div>
      <canvas
        ref={canvas}
        dir="ltr"
        role="img"
        aria-label={l.canvas}
        aria-describedby={`${id}-hint`}
        data-mode={mode}
        onPointerDown={(e) => {
          if (mode !== "draw") return
          e.currentTarget.setPointerCapture(e.pointerId)
          live.current = [pointAt(e)]
          render(mode, typed)
        }}
        onPointerMove={(e) => {
          if (!live.current) return
          live.current.push(pointAt(e))
          render(mode, typed)
        }}
        onPointerUp={() => {
          if (!live.current) return
          strokes.current.push(live.current)
          live.current = null
          setCount(strokes.current.length)
          emit(false)
        }}
        onPointerCancel={() => {
          live.current = null
          render(mode, typed)
        }}
        className="h-40 w-full touch-none rounded-lg border border-field-border bg-transparent text-foreground data-[mode=draw]:cursor-crosshair"
      />
      {mode === "type" && (
        <Input
          dir="auto"
          aria-label={l.typeLabel}
          placeholder={l.typeLabel}
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value)
            render("type", e.target.value)
            emit(!e.target.value.trim())
          }}
        />
      )}
      <p id={`${id}-hint`} className="text-xs text-muted-foreground">
        {l.hint}
      </p>
      <div role="status" aria-live="polite" className="sr-only">
        {status}
      </div>
      {name !== undefined && <input type="hidden" name={name} value={data} />}
    </div>
  )
}

export { SignaturePad, signaturePadLabels, signaturePadLabelsAr }
export type { SignaturePadLabels, SignaturePadProps }
