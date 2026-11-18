"use client"

import * as React from "react"
import { FileIcon, UploadSimpleIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatNumber, formatPercent, plural } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Progress } from "@/registry/ui/progress"

type Unit = "B" | "KB" | "MB" | "GB"

type FileUploadLabels = {
  title: string
  dragging: string
  accept: string
  maxSize: string
  maxFiles: (n: number) => string
  remove: string
  removed: string
  added: (n: number) => string
  rejectType: string
  rejectSize: string
  rejectCount: string
  progress: string
  units: Record<Unit, string>
}

const fileUploadLabels: FileUploadLabels = {
  title: "Drop files here or browse",
  dragging: "Release to add files",
  accept: "Accepted: {accept}",
  maxSize: "Up to {size} each",
  maxFiles: (n) => plural(n, { one: "Up to {n} file", other: "Up to {n} files" }, { lang: "en" }),
  remove: "Remove {name}",
  removed: "{name} removed",
  added: (n) => plural(n, { one: "{n} file added", other: "{n} files added" }, { lang: "en" }),
  rejectType: "{name}: file type is not allowed",
  rejectSize: "{name}: larger than {size}",
  rejectCount: "{name}: file limit reached",
  progress: "Uploading {name}",
  units: { B: "B", KB: "KB", MB: "MB", GB: "GB" },
}

const fileUploadLabelsAr: FileUploadLabels = {
  title: "أفلت الملفات هنا أو تصفح",
  dragging: "أفلت لإضافة الملفات",
  accept: "المسموح: {accept}",
  maxSize: "حتى {size} للملف",
  maxFiles: (n) =>
    plural(
      n,
      { zero: "حتى {n} ملف", one: "حتى ملف واحد", two: "حتى ملفين", few: "حتى {n} ملفات", many: "حتى {n} ملفًا", other: "حتى {n} ملف" },
      { lang: "ar" }
    ),
  remove: "إزالة {name}",
  removed: "تمت إزالة {name}",
  added: (n) =>
    plural(
      n,
      {
        zero: "لم تتم إضافة ملفات",
        one: "تمت إضافة ملف واحد",
        two: "تمت إضافة ملفين",
        few: "تمت إضافة {n} ملفات",
        many: "تمت إضافة {n} ملفًا",
        other: "تمت إضافة {n} ملف",
      },
      { lang: "ar" }
    ),
  rejectType: "{name}: نوع الملف غير مسموح",
  rejectSize: "{name}: أكبر من {size}",
  rejectCount: "{name}: تم بلوغ حد الملفات",
  progress: "جارٍ رفع {name}",
  units: { B: "بايت", KB: "ك.ب", MB: "م.ب", GB: "ج.ب" },
}

type RejectReason = "type" | "size" | "count"
type FileRejection = { file: File; reason: RejectReason }
type Limits = { accept?: string; maxSize?: number; maxFiles?: number; multiple?: boolean }

const fileKey = (f: File) => `${f.name}:${f.size}:${f.lastModified}`

function matchesAccept(file: File, accept?: string) {
  const rules = accept?.split(",").map((r) => r.trim().toLowerCase()).filter(Boolean)
  if (!rules?.length) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return rules.some((r) =>
    r.startsWith(".") ? name.endsWith(r) : r.endsWith("/*") ? type.startsWith(r.slice(0, -1)) : type === r
  )
}

function validateFiles(incoming: File[], current: File[], { accept, maxSize, maxFiles, multiple = true }: Limits) {
  const seen = new Set(current.map(fileKey))
  const room = multiple ? (maxFiles ?? Infinity) - current.length : 1
  const accepted: File[] = []
  const rejected: FileRejection[] = []
  for (const file of incoming) {
    if (seen.has(fileKey(file))) continue
    if (!matchesAccept(file, accept)) rejected.push({ file, reason: "type" })
    else if (maxSize !== undefined && file.size > maxSize) rejected.push({ file, reason: "size" })
    else if (multiple ? accepted.length >= room : accepted.length >= 1) rejected.push({ file, reason: "count" })
    else {
      accepted.push(file)
      seen.add(fileKey(file))
    }
  }
  return { accepted, rejected, next: multiple ? [...current, ...accepted] : accepted.length ? accepted : current }
}

function formatSize(bytes: number, units: Record<Unit, string>) {
  const order: Unit[] = ["B", "KB", "MB", "GB"]
  let i = 0
  let n = bytes
  while (n >= 1024 && i < order.length - 1) {
    n /= 1024
    i++
  }
  return `${formatNumber(n, { lang: "en" }, { maximumFractionDigits: i ? 1 : 0 })} ${units[order[i]]}`
}

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "")

type FileUploadProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> &
  Limits & {
    value?: File[]
    defaultValue?: File[]
    onValueChange?: (files: File[]) => void
    onReject?: (rejections: FileRejection[]) => void
    progress?: Record<string, number>
    disabled?: boolean
    labels?: Partial<FileUploadLabels>
  }

function FileUpload({
  value,
  defaultValue,
  onValueChange,
  onReject,
  progress,
  accept,
  maxSize,
  maxFiles,
  multiple = true,
  disabled,
  labels,
  className,
  ...props
}: FileUploadProps) {
  const l = { ...fileUploadLabels, ...labels }
  const id = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inner, setInner] = React.useState<File[]>(defaultValue ?? [])
  const [rejections, setRejections] = React.useState<FileRejection[]>([])
  const [dragging, setDragging] = React.useState(false)
  const [status, setStatus] = React.useState("")
  const files = value ?? inner

  const commit = (next: File[]) => {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }

  const add = (incoming: File[]) => {
    const { accepted, rejected, next } = validateFiles(incoming, files, { accept, maxSize, maxFiles, multiple })
    setRejections(rejected)
    if (rejected.length) onReject?.(rejected)
    if (accepted.length) {
      commit(next)
      setStatus(l.added(accepted.length))
    }
  }

  const remove = (file: File) => {
    commit(files.filter((f) => f !== file))
    setRejections([])
    setStatus(fill(l.removed, { name: file.name }))
  }

  const rejectText = ({ file, reason }: FileRejection) =>
    fill(reason === "type" ? l.rejectType : reason === "size" ? l.rejectSize : l.rejectCount, {
      name: file.name,
      size: maxSize === undefined ? "" : formatSize(maxSize, l.units),
    })

  const hints = [
    accept && fill(l.accept, { accept }),
    maxSize !== undefined && fill(l.maxSize, { size: formatSize(maxSize, l.units) }),
    maxFiles !== undefined && multiple && l.maxFiles(maxFiles),
  ].filter(Boolean)

  return (
    <div data-slot="file-upload" className={cn("flex w-full flex-col gap-3", className)} {...props}>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          add(Array.from(e.target.files ?? []))
          e.target.value = ""
        }}
      />
      <button
        type="button"
        data-slot="file-upload-dropzone"
        data-dragging={dragging}
        disabled={disabled}
        aria-describedby={`${id}-hint ${id}-errors`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled) add(Array.from(e.dataTransfer.files))
        }}
        className="flex w-full flex-col items-center gap-1.5 rounded-lg border border-dashed border-field-border bg-transparent p-6 text-center text-sm transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[dragging=true]:border-ring data-[dragging=true]:bg-muted"
      >
        <UploadSimpleIcon aria-hidden="true" className="size-5 text-muted-foreground" />
        <span className="font-medium">{dragging ? l.dragging : l.title}</span>
        {hints.length > 0 && (
          <span id={`${id}-hint`} className="text-xs text-muted-foreground">
            <bdi>{hints.join(" · ")}</bdi>
          </span>
        )}
      </button>
      <ul id={`${id}-errors`} aria-live="polite" className="flex flex-col gap-1">
        {rejections.map((r, i) => (
          <li key={i} className="flex items-center gap-1.5 text-sm text-destructive">
            <WarningCircleIcon aria-hidden="true" className="size-4 shrink-0" />
            <bdi>{rejectText(r)}</bdi>
          </li>
        ))}
      </ul>
      {files.length > 0 && (
        <ul data-slot="file-upload-list" className="flex flex-col gap-2">
          {files.map((file) => {
            const pct = progress?.[fileKey(file)]
            return (
              <li key={fileKey(file)} className="flex items-center gap-2 rounded-lg border border-border p-2">
                <FileIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-baseline gap-2 text-sm">
                    <bdi dir="auto" className="truncate font-medium">
                      {file.name}
                    </bdi>
                    <bdi className="shrink-0 text-xs text-muted-foreground tabular-nums">
                      {formatSize(file.size, l.units)}
                    </bdi>
                  </div>
                  {pct !== undefined && pct < 100 && (
                    <div className="flex items-center gap-2">
                      <Progress value={pct} aria-label={fill(l.progress, { name: file.name })} className="flex-1" />
                      <bdi className="text-xs text-muted-foreground tabular-nums">
                        {formatPercent(pct / 100, { lang: "en" })}
                      </bdi>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  disabled={disabled}
                  aria-label={fill(l.remove, { name: file.name })}
                  onClick={(e) => {
                    const root = e.currentTarget.closest("[data-slot=file-upload]")
                    const buttons = Array.from(root?.querySelectorAll<HTMLElement>("[data-slot=file-upload-list] button") ?? [])
                    const i = buttons.indexOf(e.currentTarget)
                    ;(buttons[i + 1] ?? buttons[i - 1] ?? root?.querySelector<HTMLElement>("[data-slot=file-upload-dropzone]"))?.focus()
                    remove(file)
                  }}
                >
                  <XIcon aria-hidden="true" />
                </Button>
              </li>
            )
          })}
        </ul>
      )}
      <div role="status" aria-live="polite" className="sr-only">
        {status}
      </div>
    </div>
  )
}

export { FileUpload, fileUploadLabels, fileUploadLabelsAr, fileKey, matchesAccept, validateFiles }
export type { FileRejection, FileUploadLabels, FileUploadProps }
