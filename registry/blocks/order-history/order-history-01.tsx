"use client"

import * as React from "react"
import { ArrowsClockwiseIcon, ImageIcon, PackageIcon, ReceiptIcon, TruckIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { BlockBase, Currency, Lang, Plural } from "@/registry/lib/block-types"
import { formatDate, formatNumber, plural } from "@/registry/lib/format"
import { Button, buttonVariants } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"
import { Price } from "@/registry/ui/price"
import { Section } from "@/registry/ui/section"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"

export type OrderHistory01Labels = {
  title: string
  filter: string
  all: string
  order: string
  status: Record<OrderStatus, string>
  total: string
  reorder: string
  reorderOrder: (number: string) => string
  invoice: string
  invoiceOrder: (number: string) => string
  track: string
  trackOrder: (number: string) => string
  list: string
  results: Plural
  emptyTitle: string
  emptyDescription: string
  shop: string
}

export const labelsEn: OrderHistory01Labels = {
  title: "My orders",
  filter: "Filter by status",
  all: "All",
  order: "Order",
  status: { pending: "Pending", paid: "Paid", shipped: "Shipped", delivered: "Delivered", cancelled: "Cancelled", refunded: "Refunded" },
  total: "Total",
  reorder: "Reorder",
  reorderOrder: (number) => `Reorder the items of order ${number}`,
  invoice: "Invoice",
  invoiceOrder: (number) => `Download the invoice of order ${number}`,
  track: "Track",
  trackOrder: (number) => `Track order ${number}`,
  list: "Your orders",
  results: (n) => plural(n, { zero: "No orders", one: "{n} order", other: "{n} orders" }, { lang: "en" }),
  emptyTitle: "You have no orders yet",
  emptyDescription: "Your orders and their invoices will show here.",
  shop: "Start shopping",
}

export const labelsAr: OrderHistory01Labels = {
  title: "طلباتي",
  filter: "تصفية حسب الحالة",
  all: "الكل",
  order: "طلب رقم",
  status: statusBadgeLabelsAr,
  total: "الإجمالي",
  reorder: "اطلب مرة أخرى",
  reorderOrder: (number) => `إعادة طلب منتجات الطلب ${number}`,
  invoice: "الفاتورة",
  invoiceOrder: (number) => `تنزيل فاتورة الطلب ${number}`,
  track: "تتبّع",
  trackOrder: (number) => `تتبّع الطلب ${number}`,
  list: "طلباتك",
  results: (n) =>
    plural(
      n,
      { zero: "لا توجد طلبات", one: "طلب واحد", two: "طلبان", few: "{n} طلبات", many: "{n} طلبًا", other: "{n} طلب" },
      { lang: "ar" }
    ),
  emptyTitle: "لا توجد طلبات بعد",
  emptyDescription: "ستظهر طلباتك وفواتيرها هنا.",
  shop: "ابدأ التسوق",
}

export type HistoryOrder = {
  id: string
  number: string
  // An ISO date.
  date: string
  status: OrderStatus
  // The order total with VAT.
  total: number
  items: { title: string; image?: { src: string; alt: string } }[]
  // Cancelled orders have no invoice.
  invoiceHref?: string
  // Shown on a shipped order.
  trackHref?: string
}

export type OrderHistory01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<OrderHistory01Labels>
  currency?: Currency
  orders: HistoryOrder[]
  shopHref?: string
  onReorder?: (id: string) => void
}

const statusOrder: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled", "refunded"]
const MAX_THUMBS = 4

export function OrderHistory01({
  lang = "en",
  labels,
  currency = "SAR",
  orders,
  shopHref,
  onReorder,
  id,
  headingLevel = 2,
  className,
}: OrderHistory01Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const dir = ar ? "rtl" : "ltr"
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [filter, setFilter] = React.useState("all")
  const present = statusOrder.filter((status) => orders.some((order) => order.status === status))
  const visible = filter === "all" ? orders : orders.filter((order) => order.status === filter)
  const count = (status?: OrderStatus) => (status ? orders.filter((order) => order.status === status).length : orders.length)
  const option = (value: string, label: string, n: number) => ({
    value,
    label: (
      <>
        {label}
        <span className="text-xs text-muted-foreground tabular-nums">{formatNumber(n, { lang })}</span>
      </>
    ),
  })

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} className="flex max-w-3xl flex-col gap-5">
        <Heading className="text-2xl font-semibold">{t.title}</Heading>
        {orders.length === 0 ? (
          <Empty className="rounded-xl border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageIcon aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>{t.emptyTitle}</EmptyTitle>
              <EmptyDescription>{t.emptyDescription}</EmptyDescription>
            </EmptyHeader>
            {shopHref && (
              <EmptyContent>
                <a href={shopHref} className={cn(buttonVariants(), "h-10 px-4")}>
                  {t.shop}
                </a>
              </EmptyContent>
            )}
          </Empty>
        ) : (
          <>
            <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
              <SegmentedControl
                aria-label={t.filter}
                value={filter}
                onValueChange={setFilter}
                options={[option("all", t.all, count()), ...present.map((s) => option(s, t.status[s], count(s)))]}
              />
            </div>
            <p role="status" className="sr-only">
              {t.results(visible.length)}
            </p>
            <ul aria-label={t.list} className="flex flex-col gap-3">
              {visible.map((order) => (
                <li key={order.id}>
                  <Card className="gap-4 px-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-semibold">
                          {t.order}{" "}
                          <bdi dir="ltr" className="tabular-nums">
                            #{order.number}
                          </bdi>
                        </p>
                        <time dateTime={order.date} className="text-sm text-muted-foreground">
                          {formatDate(new Date(order.date), { lang, timeZone: "Asia/Riyadh" }, { day: "numeric", month: "long", year: "numeric" })}
                        </time>
                      </div>
                      <StatusBadge status={order.status} labels={t.status} />
                    </div>
                    <div className="flex items-center gap-3">
                      <ul className="flex shrink-0 gap-1.5">
                        {order.items.slice(0, MAX_THUMBS).map((item) => (
                          <li key={item.title} className="size-12 overflow-hidden rounded-lg bg-muted">
                            {item.image ? (
                              <img src={item.image.src} alt={item.image.alt} width={48} height={48} className="size-full object-cover" />
                            ) : (
                              <span aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                                <ImageIcon weight="duotone" className="size-5" />
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                      <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                        {order.items.map((item) => item.title).join(ar ? "، " : ", ")}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                      <p className="flex items-baseline gap-2 text-sm">
                        <span className="text-muted-foreground">{t.total}</span>
                        <Price amount={order.total} currency={currency} lang={lang} decimals className="text-base font-semibold" />
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {order.status === "shipped" && order.trackHref && (
                          <a href={order.trackHref} aria-label={t.trackOrder(order.number)} className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}>
                            <TruckIcon aria-hidden="true" data-icon="inline-start" className="rtl:-scale-x-100" />
                            {t.track}
                          </a>
                        )}
                        {order.invoiceHref && (
                          <a href={order.invoiceHref} aria-label={t.invoiceOrder(order.number)} className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-3")}>
                            <ReceiptIcon aria-hidden="true" data-icon="inline-start" />
                            {t.invoice}
                          </a>
                        )}
                        <Button type="button" variant="outline" className="h-9 px-3" aria-label={t.reorderOrder(order.number)} onClick={() => onReorder?.(order.id)}>
                          <ArrowsClockwiseIcon aria-hidden="true" data-icon="inline-start" />
                          {t.reorder}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </Section>
  )
}

export default OrderHistory01

const catalog = {
  oud: { en: "Cambodian oud oil, 12 g", ar: "دهن عود كمبودي 12 جم" },
  thobe: { en: "Men's summer cotton thobe", ar: "ثوب رجالي قطن للصيف" },
  cups: { en: "Arabic coffee cups, set of 6", ar: "فناجين قهوة عربية، طقم 6" },
  tote: { en: "Handmade leather tote", ar: "شنطة جلد يدوية" },
  watch: { en: "Classic watch, leather strap", ar: "ساعة كلاسيك بسوار جلد" },
} as const

const orders: { id: string; number: string; date: string; status: OrderStatus; total: number; items: (keyof typeof catalog)[]; invoice: boolean; track?: boolean }[] = [
  { id: "o1", number: "360251", date: "2026-11-19", status: "paid", total: 1038.4, items: ["oud", "thobe", "cups"], invoice: true },
  { id: "o2", number: "360244", date: "2026-11-16", status: "shipped", total: 599, items: ["oud"], invoice: true, track: true },
  { id: "o3", number: "360198", date: "2026-11-02", status: "delivered", total: 279, items: ["thobe"], invoice: true },
  { id: "o4", number: "360102", date: "2026-10-14", status: "delivered", total: 1145, items: ["watch", "tote"], invoice: true },
  { id: "o5", number: "359977", date: "2026-09-21", status: "cancelled", total: 389, items: ["tote"], invoice: false },
  { id: "o6", number: "359840", date: "2026-09-03", status: "refunded", total: 129, items: ["cups"], invoice: true },
]

const build = (lang: Lang): OrderHistory01Props => ({
  lang,
  labels: lang === "ar" ? labelsAr : labelsEn,
  shopHref: "#shop",
  orders: orders.map((o) => ({
    id: o.id,
    number: o.number,
    date: o.date,
    status: o.status,
    total: o.total,
    items: o.items.map((key) => ({ title: catalog[key][lang] })),
    invoiceHref: o.invoice ? `#invoice-${o.number}` : undefined,
    trackHref: o.track ? "#track" : undefined,
  })),
})

export const demo: { en: OrderHistory01Props; ar: OrderHistory01Props } = { en: build("en"), ar: build("ar") }
