"use client"

import * as React from "react"
import { BellIcon, ChatCircleIcon, PackageIcon, WarningIcon, GearIcon, type Icon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { Plural } from "@/registry/lib/block-types"
import { formatDate, formatNumber, plural, type Lang, type Locale } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export type Notifications01Labels = {
  bell: Plural
  title: string
  markAllRead: string
  unread: string
  empty: string
  viewAll: string
}

export const labelsEn: Notifications01Labels = {
  bell: (n) => (n === 0 ? "Notifications" : plural(n, { other: "Notifications, {n} unread" }, { lang: "en" })),
  title: "Notifications",
  markAllRead: "Mark all as read",
  unread: "Unread",
  empty: "You are all caught up.",
  viewAll: "View all notifications",
}

export const labelsAr: Notifications01Labels = {
  bell: (n) =>
    plural(
      n,
      {
        zero: "الإشعارات",
        one: "الإشعارات، إشعار واحد غير مقروء",
        two: "الإشعارات، إشعاران غير مقروءين",
        few: "الإشعارات، {n} إشعارات غير مقروءة",
        many: "الإشعارات، {n} إشعارًا غير مقروء",
        other: "الإشعارات، {n} إشعار غير مقروء",
      },
      { lang: "ar" }
    ),
  title: "الإشعارات",
  markAllRead: "تحديد الكل كمقروء",
  unread: "غير مقروء",
  empty: "لا توجد إشعارات جديدة.",
  viewAll: "عرض كل الإشعارات",
}

export type NotificationKind = "order" | "system" | "message" | "alert"
export type NotificationItem = {
  id: string
  title: string
  body?: string
  at: string
  read: boolean
  kind: NotificationKind
}

export type Notifications01Props = {
  lang?: Lang
  labels?: Partial<Notifications01Labels>
  className?: string
  items: NotificationItem[]
  viewAllHref?: string
  defaultOpen?: boolean
  onRead?: (id: string) => void
  onReadAll?: () => void
  children?: React.ReactNode
}

const KIND: Record<NotificationKind, Icon> = {
  order: PackageIcon,
  system: GearIcon,
  message: ChatCircleIcon,
  alert: WarningIcon,
}

export function Notifications01({
  lang = "en",
  labels,
  className,
  items,
  viewAllHref = "#notifications",
  defaultOpen,
  onRead,
  onReadAll,
  children,
}: Notifications01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const locale: Locale = { lang }
  const [readIds, setReadIds] = React.useState(() => new Set(items.filter((item) => item.read).map((item) => item.id)))
  const unread = items.filter((item) => !readIds.has(item.id)).length

  const read = (id: string) => {
    setReadIds((current) => new Set(current).add(id))
    onRead?.(id)
  }
  const readAll = () => {
    setReadIds(new Set(items.map((item) => item.id)))
    onReadAll?.()
  }

  return (
    <Container size="wide" dir={dir} className={className}>
      <div className="flex h-14 items-center gap-3 border-b">
        <div className="min-w-0 flex-1 truncate">{children}</div>
        <Popover defaultOpen={defaultOpen}>
          <PopoverTrigger render={<Button variant="ghost" size="icon" className="relative" aria-label={t.bell(unread)} />}>
            <BellIcon />
            {unread > 0 ? (
              <span
                aria-hidden="true"
                className="absolute end-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-xs leading-none font-medium text-destructive-foreground tabular-nums"
              >
                {unread > 99 ? `${formatNumber(99, locale)}+` : formatNumber(unread, locale)}
              </span>
            ) : null}
          </PopoverTrigger>
          <PopoverContent align="end" dir={dir} className="w-[min(24rem,calc(100vw-2rem))] gap-0 p-0">
            <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
              <h2 className="text-sm font-medium">{t.title}</h2>
              <Button variant="ghost" size="xs" disabled={unread === 0} onClick={readAll}>
                {t.markAllRead}
              </Button>
            </div>
            {items.length ? (
              <ul className="max-h-80 divide-y overflow-y-auto">
                {items.map((item) => {
                  const Kind = KIND[item.kind]
                  const isUnread = !readIds.has(item.id)
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => read(item.id)}
                        className="flex w-full items-start gap-3 px-3 py-2.5 text-start outline-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
                      >
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <Kind aria-hidden="true" className="size-4" />
                        </span>
                        <span className="grid min-w-0 flex-1 gap-0.5">
                          <span className={cn("text-sm", isUnread && "font-medium")}>{item.title}</span>
                          {item.body ? <span className="text-xs text-muted-foreground">{item.body}</span> : null}
                          <span className="text-xs text-muted-foreground">
                            {formatDate(new Date(item.at), locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </span>
                        {isUnread ? (
                          <span className="mt-2 flex shrink-0 items-center">
                            <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
                            <span className="sr-only">{t.unread}</span>
                          </span>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">{t.empty}</p>
            )}
            <div className="border-t px-3 py-2 text-center">
              <a href={viewAllHref} className="text-sm font-medium underline-offset-4 hover:underline">
                {t.viewAll}
              </a>
            </div>
          </PopoverContent>
        </Popover>
        <span role="status" className="sr-only">
          {t.bell(unread)}
        </span>
      </div>
    </Container>
  )
}

export default Notifications01

export const demo: { en: Notifications01Props; ar: Notifications01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    defaultOpen: true,
    children: <span className="font-medium">Mizan Store</span>,
    items: [
      { id: "n1", kind: "order", title: "New order #10482", body: "Abdullah Al-Qahtani paid SAR 349 by mada.", at: "2026-11-16T14:20:00Z", read: false },
      { id: "n2", kind: "alert", title: "Low stock", body: "Leather wallet has 3 items left.", at: "2026-11-16T11:05:00Z", read: false },
      { id: "n3", kind: "message", title: "Message from Noura Al-Harbi", body: "Can I change the delivery address?", at: "2026-11-16T09:41:00Z", read: false },
      { id: "n4", kind: "order", title: "Order #10478 delivered", at: "2026-11-15T19:12:00Z", read: true },
      { id: "n5", kind: "system", title: "Payout sent", body: "SAR 12,480 is on its way to your bank account.", at: "2026-11-15T08:00:00Z", read: true },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    defaultOpen: true,
    children: <span className="font-medium">متجر ميزان</span>,
    items: [
      { id: "n1", kind: "order", title: "طلب جديد #10482", body: "دفع عبدالله القحطاني مبلغ 349 ريالًا عبر مدى.", at: "2026-11-16T14:20:00Z", read: false },
      { id: "n2", kind: "alert", title: "مخزون منخفض", body: "تبقّت 3 قطع من المحفظة الجلدية.", at: "2026-11-16T11:05:00Z", read: false },
      { id: "n3", kind: "message", title: "رسالة من نورة الحربي", body: "هل يمكنني تغيير عنوان التوصيل؟", at: "2026-11-16T09:41:00Z", read: false },
      { id: "n4", kind: "order", title: "تم تسليم الطلب #10478", at: "2026-11-15T19:12:00Z", read: true },
      { id: "n5", kind: "system", title: "تم إرسال المستحقات", body: "مبلغ 12,480 ريالًا في طريقه إلى حسابك البنكي.", at: "2026-11-15T08:00:00Z", read: true },
    ],
  },
}
