"use client"

import * as React from "react"
import {
  DotsThreeIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/ui/alert-dialog"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Input } from "@/registry/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/ui/input-group"

type Group = "today" | "yesterday" | "week" | "older"

export type ConversationList01Labels = {
  nav: string
  newChat: string
  search: string
  groups: Record<Group, string>
  options: (title: string) => string
  rename: string
  delete: string
  deleteTitle: (title: string) => string
  deleteDescription: string
  cancel: string
  empty: string
  renamed: string
  deleted: (title: string) => string
}

export const labelsEn: ConversationList01Labels = {
  nav: "Chat history",
  newChat: "New chat",
  search: "Search chats",
  groups: { today: "Today", yesterday: "Yesterday", week: "Previous 7 days", older: "Older" },
  options: (title) => `Options for ${title}`,
  rename: "Rename",
  delete: "Delete",
  deleteTitle: (title) => `Delete "${title}"?`,
  deleteDescription: "The chat and all its messages are deleted for good.",
  cancel: "Cancel",
  empty: "No chats match your search.",
  renamed: "Chat renamed",
  deleted: (title) => `${title} deleted`,
}

export const labelsAr: ConversationList01Labels = {
  nav: "سجل المحادثات",
  newChat: "محادثة جديدة",
  search: "ابحث في المحادثات",
  groups: { today: "اليوم", yesterday: "أمس", week: "آخر 7 أيام", older: "أقدم" },
  options: (title) => `خيارات المحادثة: ${title}`,
  rename: "إعادة تسمية",
  delete: "حذف",
  deleteTitle: (title) => `حذف «${title}»؟`,
  deleteDescription: "ستُحذف المحادثة وكل رسائلها نهائيًا.",
  cancel: "إلغاء",
  empty: "لا توجد محادثات مطابقة.",
  renamed: "تمت إعادة تسمية المحادثة",
  deleted: (title) => `تم حذف «${title}»`,
}

export type Conversation = {
  id: string
  title: string
  // An ISO date and time.
  updatedAt: string
}

export type ConversationList01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<ConversationList01Labels>
  conversations: Conversation[]
  activeId?: string
  // The moment the groups count from. It defaults to the current time.
  now?: string
  timeZone?: string
  onSelect?: (id: string) => void
  onNew?: () => void
  onRename?: (id: string, title: string) => void
  onDelete?: (id: string) => void
}

const GROUPS: Group[] = ["today", "yesterday", "week", "older"]

// Days between two moments, counted on the calendar of the time zone, not in 24 hour steps.
function groupOf(date: Date, now: Date, timeZone: string): Group {
  const day = (d: Date) =>
    Date.parse(new Intl.DateTimeFormat("en-CA", { timeZone }).format(d))
  const days = Math.round((day(now) - day(date)) / 86_400_000)
  return days <= 0 ? "today" : days === 1 ? "yesterday" : days <= 7 ? "week" : "older"
}

function RenameField({
  title,
  label,
  onDone,
}: {
  title: string
  label: string
  onDone: (value: string | null) => void
}) {
  const done = React.useRef(false)
  const finish = (value: string | null) => {
    if (done.current) return
    done.current = true
    onDone(value)
  }
  return (
    <Input
      autoFocus
      dir="auto"
      defaultValue={title}
      aria-label={label}
      onFocus={(event) => event.currentTarget.select()}
      onBlur={(event) => finish(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") finish(event.currentTarget.value)
        else if (event.key === "Escape") finish(null)
      }}
    />
  )
}

export function ConversationList01({
  lang = "en",
  labels,
  conversations,
  activeId,
  now,
  timeZone = "Asia/Riyadh",
  onSelect,
  onNew,
  onRename,
  onDelete,
  className,
}: ConversationList01Props) {
  const t = { ...labelsEn, ...labels, groups: { ...labelsEn.groups, ...labels?.groups } }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const [items, setItems] = React.useState(conversations)
  const [query, setQuery] = React.useState("")
  const [renaming, setRenaming] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState<Conversation | null>(null)
  const [announcement, setAnnouncement] = React.useState("")
  const [moment] = React.useState(() => new Date(now ?? Date.now()))

  const needle = query.trim().toLowerCase()
  const shown = items.filter((item) => item.title.toLowerCase().includes(needle))

  function rename(id: string, value: string | null) {
    setRenaming(null)
    const title = value?.trim()
    if (!title) return
    setItems((current) => current.map((item) => (item.id === id ? { ...item, title } : item)))
    setAnnouncement(t.renamed)
    onRename?.(id, title)
  }

  return (
    <Container
      size="prose"
      dir={dir}
      className={cn("max-w-sm py-6 md:py-8", className)}
    >
      <nav
        aria-label={t.nav}
        className="flex h-full min-h-0 flex-col gap-3 rounded-xl border bg-card p-2 text-card-foreground"
      >
        <Button variant="outline" className="w-full justify-start" onClick={onNew}>
          <PlusIcon data-icon="inline-start" />
          {t.newChat}
        </Button>
        <InputGroup>
          <InputGroupInput
            type="search"
            dir="auto"
            value={query}
            placeholder={t.search}
            aria-label={t.search}
            onChange={(event) => setQuery(event.target.value)}
          />
          <InputGroupAddon>
            <MagnifyingGlassIcon />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          {shown.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">{t.empty}</p>
          )}
          {GROUPS.map((group) => {
            const rows = shown.filter(
              (item) => groupOf(new Date(item.updatedAt), moment, timeZone) === group
            )
            if (rows.length === 0) return null
            return (
              <section key={group} aria-label={t.groups[group]}>
                <h3 className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">
                  {t.groups[group]}
                </h3>
                <ul className="flex flex-col gap-0.5">
                  {rows.map((item) => (
                    <li key={item.id} className="group/row relative">
                      {renaming === item.id ? (
                        <RenameField
                          title={item.title}
                          label={t.rename}
                          onDone={(value) => rename(item.id, value)}
                        />
                      ) : (
                        <>
                          <button
                            type="button"
                            aria-current={item.id === activeId ? "true" : undefined}
                            onClick={() => onSelect?.(item.id)}
                            className="flex w-full min-w-0 items-center rounded-lg py-2 ps-2.5 pe-9 text-start text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=true]:bg-muted aria-[current=true]:font-medium"
                          >
                            <span dir="auto" className="truncate">
                              {item.title}
                            </span>
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label={t.options(item.title)}
                                  className="absolute end-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100 aria-expanded:opacity-100 pointer-coarse:opacity-100"
                                />
                              }
                            >
                              <DotsThreeIcon weight="bold" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem onClick={() => setTimeout(() => setRenaming(item.id), 0)}>
                                <PencilSimpleIcon />
                                {t.rename}
                              </DropdownMenuItem>
                              <DropdownMenuItem variant="destructive" onClick={() => setPending(item)}>
                                <TrashIcon />
                                {t.delete}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </nav>
      <AlertDialog open={pending !== null} onOpenChange={(open) => !open && setPending(null)}>
        <AlertDialogContent dir={dir}>
          <AlertDialogHeader>
            <AlertDialogTitle>{pending && t.deleteTitle(pending.title)}</AlertDialogTitle>
            <AlertDialogDescription>{t.deleteDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (!pending) return
                setItems((current) => current.filter((item) => item.id !== pending.id))
                setAnnouncement(t.deleted(pending.title))
                onDelete?.(pending.id)
                setPending(null)
              }}
            >
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p role="status" className="sr-only">
        {announcement}
      </p>
    </Container>
  )
}

export default ConversationList01

const NOW = "2026-11-19T10:30:00+03:00"

const en: Conversation[] = [
  { id: "c1", title: "Summarize this week's sales", updatedAt: "2026-11-19T09:41:00+03:00" },
  { id: "c2", title: "Reply to a customer with a late order", updatedAt: "2026-11-19T08:05:00+03:00" },
  { id: "c3", title: "Description for Royal Oud Perfume", updatedAt: "2026-11-18T21:12:00+03:00" },
  { id: "c4", title: "Why do carts get abandoned?", updatedAt: "2026-11-18T13:30:00+03:00" },
  { id: "c5", title: "National Day campaign ideas", updatedAt: "2026-11-16T17:48:00+03:00" },
  { id: "c6", title: "VAT report for October", updatedAt: "2026-11-14T11:20:00+03:00" },
  { id: "c7", title: "Reorder the stock list", updatedAt: "2026-11-13T15:02:00+03:00" },
  { id: "c8", title: "Ramadan plan for the store", updatedAt: "2026-10-28T10:00:00+03:00" },
]

const ar: Conversation[] = [
  { id: "c1", title: "لخّص مبيعات الأسبوع", updatedAt: "2026-11-19T09:41:00+03:00" },
  { id: "c2", title: "رد على عميل تأخّر طلبه", updatedAt: "2026-11-19T08:05:00+03:00" },
  { id: "c3", title: "وصف منتج عطر عود ملكي", updatedAt: "2026-11-18T21:12:00+03:00" },
  { id: "c4", title: "لماذا تُترك السلات دون شراء؟", updatedAt: "2026-11-18T13:30:00+03:00" },
  { id: "c5", title: "أفكار حملة اليوم الوطني", updatedAt: "2026-11-16T17:48:00+03:00" },
  { id: "c6", title: "تقرير ضريبة القيمة المضافة لأكتوبر", updatedAt: "2026-11-14T11:20:00+03:00" },
  { id: "c7", title: "ترتيب قائمة المخزون", updatedAt: "2026-11-13T15:02:00+03:00" },
  { id: "c8", title: "خطة رمضان للمتجر", updatedAt: "2026-10-28T10:00:00+03:00" },
]

export const demo: { en: ConversationList01Props; ar: ConversationList01Props } = {
  en: { lang: "en", labels: labelsEn, conversations: en, activeId: "c1", now: NOW },
  ar: { lang: "ar", labels: labelsAr, conversations: ar, activeId: "c1", now: NOW },
}
