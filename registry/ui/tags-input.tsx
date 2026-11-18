"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { plural } from "@/registry/lib/format"
import { normalizeArabic } from "@/registry/lib/gulf/arabic-normalize"
import { Button } from "@/registry/ui/button"

type TagsInputLabels = {
  remove: string
  added: string
  removed: string
  duplicate: string
  max: (n: number) => string
}

const tagsInputLabels: TagsInputLabels = {
  remove: "Remove {tag}",
  added: "{tag} added",
  removed: "{tag} removed",
  duplicate: "{tag} is already added",
  max: (n) => plural(n, { one: "You can add up to {n} tag", other: "You can add up to {n} tags" }, { lang: "en" }),
}

const tagsInputLabelsAr: TagsInputLabels = {
  remove: "إزالة {tag}",
  added: "تمت إضافة {tag}",
  removed: "تمت إزالة {tag}",
  duplicate: "{tag} مضافة مسبقًا",
  max: (n) =>
    plural(
      n,
      {
        zero: "لا يمكنك إضافة وسوم",
        one: "يمكنك إضافة وسم واحد كحد أقصى",
        two: "يمكنك إضافة وسمين كحد أقصى",
        few: "يمكنك إضافة {n} وسوم كحد أقصى",
        many: "يمكنك إضافة {n} وسمًا كحد أقصى",
        other: "يمكنك إضافة {n} وسم كحد أقصى",
      },
      { lang: "ar" }
    ),
}

const DELIMITERS = [",", "،", ";", "؛"]

function splitTags(text: string, delimiters = DELIMITERS) {
  const pattern = new RegExp(`[${delimiters.map((d) => `\\${d}`).join("")}\\r\\n]`)
  return text.split(pattern).map((t) => t.trim()).filter(Boolean)
}

type Rejection = { tag: string; reason: "duplicate" | "max" }

const tagKey = (tag: string) => normalizeArabic(tag, { taMarbuta: true, hamzaOnWaw: true, hamzaOnYa: true })

function addTags(current: string[], incoming: string[], max = Infinity) {
  const seen = new Set(current.map(tagKey))
  const next = [...current]
  const rejected: Rejection[] = []
  for (const tag of incoming) {
    const key = tagKey(tag)
    if (!key) continue
    if (seen.has(key)) rejected.push({ tag, reason: "duplicate" })
    else if (next.length >= max) rejected.push({ tag, reason: "max" })
    else {
      seen.add(key)
      next.push(tag)
    }
  }
  return { next, rejected }
}

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "")

type TagsInputProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (tags: string[]) => void
  max?: number
  delimiters?: string[]
  placeholder?: string
  disabled?: boolean
  labels?: Partial<TagsInputLabels>
}

function TagsInput({
  value,
  defaultValue,
  onValueChange,
  max,
  delimiters = DELIMITERS,
  placeholder,
  disabled,
  labels,
  className,
  ...props
}: TagsInputProps) {
  const l = { ...tagsInputLabels, ...labels }
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inner, setInner] = React.useState<string[]>(defaultValue ?? [])
  const [draft, setDraft] = React.useState("")
  const [message, setMessage] = React.useState("")
  const tags = value ?? inner

  const commit = (next: string[]) => {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }

  const add = (incoming: string[]) => {
    const { next, rejected } = addTags(tags, incoming, max)
    const addedTags = next.slice(tags.length)
    if (addedTags.length) commit(next)
    const problem = rejected[0]
    setMessage(
      problem
        ? problem.reason === "max"
          ? l.max(max ?? 0)
          : fill(l.duplicate, { tag: problem.tag })
        : addedTags.length
          ? fill(l.added, { tag: addedTags.join(", ") })
          : ""
    )
  }

  const flush = () => {
    if (draft.trim()) add(splitTags(draft, delimiters))
    setDraft("")
  }

  return (
    <div
      role="group"
      data-slot="tags-input"
      data-disabled={disabled || undefined}
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    >
      <div
        onClick={(e) => e.target === e.currentTarget && inputRef.current?.focus()}
        className="flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-1 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-disabled:cursor-not-allowed has-disabled:opacity-50 dark:bg-input/30"
      >
        {tags.map((tag) => (
          <span
            key={tag}
            data-slot="tags-input-chip"
            className="flex h-6 w-fit items-center gap-1 rounded-sm bg-muted ps-1.5 text-xs font-medium whitespace-nowrap text-foreground"
          >
            <bdi dir="auto">{tag}</bdi>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              disabled={disabled}
              aria-label={fill(l.remove, { tag })}
              className="opacity-60 hover:opacity-100"
              onClick={() => {
                commit(tags.filter((t) => t !== tag))
                setMessage(fill(l.removed, { tag }))
                inputRef.current?.focus()
              }}
            >
              <XIcon aria-hidden="true" />
            </Button>
          </span>
        ))}
        <input
          ref={inputRef}
          dir="auto"
          value={draft}
          disabled={disabled}
          placeholder={tags.length ? undefined : placeholder}
          aria-label={props["aria-label"]}
          className="h-6 min-w-24 flex-1 bg-transparent px-1.5 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          onChange={(e) => {
            const text = e.target.value
            if (!delimiters.some((d) => text.includes(d))) return setDraft(text)
            const parts = splitTags(text, delimiters)
            const endsOpen = !delimiters.some((d) => text.endsWith(d))
            const rest = endsOpen ? (parts.pop() ?? "") : ""
            add(parts)
            setDraft(rest)
          }}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text")
            if (!/[\r\n]/.test(text) && !delimiters.some((d) => text.includes(d))) return
            e.preventDefault()
            add(splitTags(draft + text, delimiters))
            setDraft("")
          }}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return
            if (e.key === "Enter") {
              e.preventDefault()
              flush()
            } else if (e.key === "Backspace" && !draft && tags.length) {
              const last = tags[tags.length - 1]
              commit(tags.slice(0, -1))
              setMessage(fill(l.removed, { tag: last }))
            }
          }}
          onBlur={flush}
        />
      </div>
      <p role="status" aria-live="polite" className={cn("text-xs text-muted-foreground", !message && "sr-only")}>
        {message}
      </p>
    </div>
  )
}

export { TagsInput, tagsInputLabels, tagsInputLabelsAr, splitTags, addTags }
export type { TagsInputLabels, TagsInputProps }
