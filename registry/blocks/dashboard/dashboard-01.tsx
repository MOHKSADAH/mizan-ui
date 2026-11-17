"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  MinusIcon,
  PackageIcon,
  TruckIcon,
  XCircleIcon,
  type Icon,
} from "@phosphor-icons/react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { cn } from "@/registry/lib/utils"
import type { Plural } from "@/registry/lib/block-types"
import {
  formatCompact,
  formatDate,
  formatNumber,
  formatPercent,
  formatSigned,
  plural,
  type Lang,
  type Locale,
} from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/registry/ui/chart"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

export type Dashboard01Labels = {
  title: string
  subtitle: string
  range: Plural
  rangeLabel: string
  vsPrevious: string
  revenue: string
  orders: string
  aov: string
  conversion: string
  revenueChartTitle: string
  revenueChartDescription: string
  currentPeriod: string
  previousPeriod: string
  viewAsTable: string
  viewAsChart: string
  dateColumn: string
  categoriesTitle: string
  categoriesDescription: string
  recentOrdersTitle: string
  orderColumn: string
  customerColumn: string
  statusColumn: string
  totalColumn: string
  statusNew: string
  statusProcessing: string
  statusShipped: string
  statusDelivered: string
  statusCancelled: string
}

export const labelsEn: Dashboard01Labels = {
  title: "Sales",
  subtitle: "How your store is performing.",
  range: (n) => plural(n, { one: "Last day", other: "Last {n} days" }, { lang: "en" }),
  rangeLabel: "Date range",
  vsPrevious: "vs previous period",
  revenue: "Revenue",
  orders: "Orders",
  aov: "Average order value",
  conversion: "Conversion rate",
  revenueChartTitle: "Revenue",
  revenueChartDescription: "Daily revenue compared with the previous period.",
  currentPeriod: "Current period",
  previousPeriod: "Previous period",
  viewAsTable: "View as table",
  viewAsChart: "View as chart",
  dateColumn: "Date",
  categoriesTitle: "Revenue by category",
  categoriesDescription: "Share of revenue in the selected range.",
  recentOrdersTitle: "Recent orders",
  orderColumn: "Order",
  customerColumn: "Customer",
  statusColumn: "Status",
  totalColumn: "Total",
  statusNew: "New",
  statusProcessing: "Processing",
  statusShipped: "Shipped",
  statusDelivered: "Delivered",
  statusCancelled: "Cancelled",
}

export const labelsAr: Dashboard01Labels = {
  title: "المبيعات",
  subtitle: "أداء متجرك في لمحة.",
  range: (n) =>
    plural(
      n,
      { one: "آخر يوم", two: "آخر يومين", few: "آخر {n} أيام", many: "آخر {n} يومًا", other: "آخر {n} يوم" },
      { lang: "ar" }
    ),
  rangeLabel: "الفترة الزمنية",
  vsPrevious: "مقارنة بالفترة السابقة",
  revenue: "الإيرادات",
  orders: "الطلبات",
  aov: "متوسط قيمة الطلب",
  conversion: "معدل التحويل",
  revenueChartTitle: "الإيرادات",
  revenueChartDescription: "الإيرادات اليومية مقارنة بالفترة السابقة.",
  currentPeriod: "الفترة الحالية",
  previousPeriod: "الفترة السابقة",
  viewAsTable: "عرض كجدول",
  viewAsChart: "عرض كرسم بياني",
  dateColumn: "التاريخ",
  categoriesTitle: "الإيرادات حسب الفئة",
  categoriesDescription: "حصة كل فئة من الإيرادات في الفترة المحددة.",
  recentOrdersTitle: "أحدث الطلبات",
  orderColumn: "الطلب",
  customerColumn: "العميل",
  statusColumn: "الحالة",
  totalColumn: "الإجمالي",
  statusNew: "جديد",
  statusProcessing: "قيد التجهيز",
  statusShipped: "تم الشحن",
  statusDelivered: "تم التسليم",
  statusCancelled: "ملغي",
}

export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled"
// One row per day. Revenue is orders x aov, so every total on the page derives from these three numbers.
export type DayPoint = { date: string; orders: number; aov: number; visits: number }
export type RecentOrder = { id: string; customer: string; date: string; status: OrderStatus; total: number }

export type Dashboard01Props = {
  lang?: Lang
  labels?: Partial<Dashboard01Labels>
  className?: string
  currency?: string
  // Chronological and at least twice the longest range, so each range has a previous period to compare with.
  daily: DayPoint[]
  categories: { id: string; label: string; share: number }[]
  orders: RecentOrder[]
  defaultRange?: 7 | 30 | 90
}

const RANGES = [7, 30, 90] as const

const CHART_MARGIN = { top: 20, right: 4, bottom: 0, left: 4 } // mizan-allow-physical

const STATUS: Record<OrderStatus, { icon: Icon; variant: "secondary" | "outline" | "destructive"; label: keyof Dashboard01Labels }> = {
  new: { icon: ClockIcon, variant: "secondary", label: "statusNew" },
  processing: { icon: PackageIcon, variant: "secondary", label: "statusProcessing" },
  shipped: { icon: TruckIcon, variant: "outline", label: "statusShipped" },
  delivered: { icon: CheckCircleIcon, variant: "outline", label: "statusDelivered" },
  cancelled: { icon: XCircleIcon, variant: "destructive", label: "statusCancelled" },
}

const revenueOf = (p: DayPoint) => p.orders * p.aov

function totals(points: DayPoint[]) {
  const revenue = points.reduce((sum, p) => sum + revenueOf(p), 0)
  const orders = points.reduce((sum, p) => sum + p.orders, 0)
  const visits = points.reduce((sum, p) => sum + p.visits, 0)
  return { revenue, orders, aov: revenue / orders, conversion: orders / visits }
}

const change = (now: number, before: number) => (now - before) / before

export function Dashboard01({
  lang = "en",
  labels,
  className,
  currency = "SAR",
  daily,
  categories,
  orders,
  defaultRange = 30,
}: Dashboard01Props) {
  const t = { ...labelsEn, ...labels }
  const rtl = lang === "ar"
  const locale: Locale = { lang, timeZone: "UTC" }
  const [range, setRange] = React.useState<number>(defaultRange)
  const [asTable, setAsTable] = React.useState(false)
  const titleId = React.useId()

  const { now, before, chart } = React.useMemo(() => {
    const current = daily.slice(-range)
    const previous = daily.slice(-2 * range, -range)
    return {
      now: totals(current),
      before: totals(previous),
      chart: current.map((p, i) => ({
        date: p.date,
        revenue: revenueOf(p),
        previous: previous[i] ? revenueOf(previous[i]) : null,
      })),
    }
  }, [daily, range])

  const byCategory = React.useMemo(() => {
    const rows = categories.map((category) => ({ label: category.label, revenue: Math.round(now.revenue * category.share) }))
    // The last category absorbs the rounding, so the bars add up to the revenue KPI.
    rows[rows.length - 1].revenue += now.revenue - rows.reduce((sum, row) => sum + row.revenue, 0)
    return rows
  }, [categories, now.revenue])

  const revenueConfig = {
    revenue: { label: t.currentPeriod, color: "var(--series-1)" },
    previous: { label: t.previousPeriod, color: "var(--muted-foreground)" },
  } satisfies ChartConfig
  const categoryConfig = { revenue: { label: t.revenue, color: "var(--series-1)" } } satisfies ChartConfig

  const day = (date: string, options: Intl.DateTimeFormatOptions) => formatDate(new Date(`${date}T00:00:00Z`), locale, options)
  const money = (value: number) => <Price amount={value} currency={currency} lang={lang} />

  const kpis = [
    { id: "revenue", label: t.revenue, value: money(now.revenue), delta: change(now.revenue, before.revenue) },
    { id: "orders", label: t.orders, value: formatNumber(now.orders, locale), delta: change(now.orders, before.orders) },
    { id: "aov", label: t.aov, value: money(Math.round(now.aov)), delta: change(now.aov, before.aov) },
    {
      id: "conversion",
      label: t.conversion,
      value: formatPercent(now.conversion, locale, { max: 2 }),
      delta: change(now.conversion, before.conversion),
    },
  ]

  return (
    <Container size="wide" dir={rtl ? "rtl" : "ltr"} className={cn("flex flex-col gap-6 py-6 md:py-8", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>
        <Select
          value={String(range)}
          onValueChange={(value) => setRange(Number(value))}
          items={RANGES.map((r) => ({ value: String(r), label: t.range(r) }))}
        >
          <SelectTrigger aria-label={t.rangeLabel} className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" alignItemWithTrigger={false} dir={rtl ? "rtl" : "ltr"}>
            {RANGES.map((r) => (
              <SelectItem key={r} value={String(r)}>
                {t.range(r)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} size="sm">
            <CardContent>
              <dl className="grid gap-1">
                <dt className="text-sm text-muted-foreground">{kpi.label}</dt>
                <dd className="text-xl font-semibold tabular-nums md:text-2xl">{kpi.value}</dd>
                <dd className="flex flex-wrap items-center gap-x-1.5 text-xs">
                  <Delta value={kpi.delta} locale={locale} />
                  <span className="text-muted-foreground">{t.vsPrevious}</span>
                </dd>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle id={titleId} role="heading" aria-level={2}>
              {t.revenueChartTitle}
            </CardTitle>
            <CardDescription>
              {t.revenueChartDescription}
            </CardDescription>
            <CardAction>
              <Button variant="outline" size="sm" aria-pressed={asTable} onClick={() => setAsTable((v) => !v)}>
                {asTable ? t.viewAsChart : t.viewAsTable}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-0.5 w-4 bg-series-1" />
                {t.currentPeriod}
              </li>
              <li className="flex items-center gap-1.5">
                <span aria-hidden="true" className="w-4 border-t-2 border-dashed border-muted-foreground" />
                {t.previousPeriod}
              </li>
            </ul>
            {asTable ? (
              <div tabIndex={0} role="region" aria-labelledby={titleId} className="max-h-72 overflow-auto rounded-lg border outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                <Table>
                  <TableHeader className="sticky top-0 bg-card">
                    <TableRow>
                      <TableHead>{t.dateColumn}</TableHead>
                      <TableHead className="text-end">{t.currentPeriod}</TableHead>
                      <TableHead className="text-end">{t.previousPeriod}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chart.map((row) => (
                      <TableRow key={row.date}>
                        <TableCell>{day(row.date, { dateStyle: "medium" })}</TableCell>
                        <TableCell className="text-end">{money(row.revenue)}</TableCell>
                        <TableCell className="text-end">{row.previous === null ? "—" : money(row.previous)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <ChartContainer
                config={revenueConfig}
                role="group"
                aria-labelledby={titleId}
                className="aspect-auto h-64 w-full justify-start"
              >
                <AreaChart data={chart} accessibilityLayer margin={CHART_MARGIN}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    reversed={rtl}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(date: string) => day(date, { day: "numeric", month: "short" })}
                  />
                  <YAxis
                    orientation={rtl ? "right" : "left"}
                    width={44}
                    tickCount={4}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => formatCompact(value, locale)}
                  />
                  <ChartTooltip
                    reverseDirection={{ x: rtl }}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelFormatter={(date) => day(String(date), { dateStyle: "medium" })}
                        formatter={(value, name, item) => (
                          <div className="flex w-full items-center gap-2">
                            <span aria-hidden="true" className="h-0.5 w-3 shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-muted-foreground">{revenueConfig[name as keyof typeof revenueConfig]?.label}</span>
                            <span className="ms-auto font-medium tabular-nums">{money(Number(value))}</span>
                          </div>
                        )}
                      />
                    }
                  />
                  <Area
                    dataKey="previous"
                    type="monotone"
                    stroke="var(--color-previous)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="none"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Area
                    dataKey="revenue"
                    type="monotone"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    fill="var(--color-revenue)"
                    fillOpacity={0.1}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              {t.categoriesTitle}
            </CardTitle>
            <CardDescription>
              {t.categoriesDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryConfig} role="img" aria-label={t.categoriesTitle} className="aspect-auto h-64 w-full justify-start">
              <BarChart data={byCategory} margin={CHART_MARGIN}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" reversed={rtl} interval={0} tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  reverseDirection={{ x: rtl }}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      formatter={(value, _name, item) => (
                        <div className="flex w-full items-center justify-between gap-3">
                          <span className="text-muted-foreground">{item.payload.label}</span>
                          <span className="font-medium tabular-nums">{money(Number(value))}</span>
                        </div>
                      )}
                    />
                  }
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} maxBarSize={24} isAnimationActive={false}>
                  <LabelList
                    dataKey="revenue"
                    position="top"
                    className="fill-foreground text-xs"
                    formatter={(value) => formatCompact(Number(value), locale)}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
            <ul className="sr-only">
              {byCategory.map((row) => (
                <li key={row.label}>
                  {row.label}: {money(row.revenue)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            {t.recentOrdersTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">{t.orderColumn}</TableHead>
                <TableHead>{t.customerColumn}</TableHead>
                <TableHead className="hidden sm:table-cell">{t.dateColumn}</TableHead>
                <TableHead>{t.statusColumn}</TableHead>
                <TableHead className="text-end">{t.totalColumn}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const status = STATUS[order.status]
                return (
                  <TableRow key={order.id}>
                    <TableCell className="hidden font-medium sm:table-cell">
                      <bdi dir="ltr">{order.id}</bdi>
                    </TableCell>
                    <TableCell>
                      {order.customer}
                      <bdi dir="ltr" className="block text-xs text-muted-foreground sm:hidden">
                        {order.id}
                      </bdi>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {formatDate(new Date(order.date), { lang }, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        <status.icon aria-hidden="true" />
                        {t[status.label] as string}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-end">{money(order.total)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Dashboard01

function Delta({ value, locale }: { value: number; locale: Locale }) {
  const Arrow = value > 0 ? ArrowUpIcon : value < 0 ? ArrowDownIcon : MinusIcon
  const text = formatSigned(value, locale, { style: "percent", maximumFractionDigits: 1 }).replace("٪", "%")
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-medium",
        value > 0 && "text-success",
        value < 0 && "text-destructive",
        value === 0 && "text-muted-foreground"
      )}
    >
      <Arrow aria-hidden="true" className="size-3" />
      {text}
    </span>
  )
}

const DAY_MS = 86_400_000

// Sample data: 180 days ending 2026-11-16, with weekend peaks and slow growth.
function sampleDaily(): DayPoint[] {
  const start = Date.UTC(2026, 4, 21)
  const weekday = [1.1, 0.92, 0.88, 0.94, 1.02, 1.28, 1.2]
  return Array.from({ length: 180 }, (_, i) => {
    const d = new Date(start + i * DAY_MS)
    const orders = Math.round(38 * (1 + i / 400) * weekday[d.getUTCDay()] * (1 + 0.08 * Math.sin(i * 1.7)))
    const aov = Math.round(200 + 20 * Math.sin(i / 9 + 1) + i / 5)
    const visits = Math.round(orders / (0.028 + 0.004 * Math.sin(i / 11)))
    return { date: d.toISOString().slice(0, 10), orders, aov, visits }
  })
}

const SHARES = [0.34, 0.26, 0.2, 0.12, 0.08]

export const demo: { en: Dashboard01Props; ar: Dashboard01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    daily: sampleDaily(),
    categories: [
      { id: "electronics", label: "Electronics", share: SHARES[0] },
      { id: "fashion", label: "Fashion", share: SHARES[1] },
      { id: "home", label: "Home", share: SHARES[2] },
      { id: "beauty", label: "Beauty", share: SHARES[3] },
      { id: "other", label: "Other", share: SHARES[4] },
    ],
    orders: [
      { id: "#10482", customer: "Abdullah Al-Qahtani", date: "2026-11-16T14:20:00Z", status: "new", total: 349 },
      { id: "#10481", customer: "Noura Al-Harbi", date: "2026-11-16T12:05:00Z", status: "processing", total: 1280 },
      { id: "#10480", customer: "Faisal Al-Dosari", date: "2026-11-16T09:41:00Z", status: "shipped", total: 215 },
      { id: "#10479", customer: "Reem Al-Ghamdi", date: "2026-11-15T19:12:00Z", status: "delivered", total: 674 },
      { id: "#10478", customer: "Khalid Al-Mutairi", date: "2026-11-15T16:30:00Z", status: "cancelled", total: 129 },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    daily: sampleDaily(),
    categories: [
      { id: "electronics", label: "إلكترونيات", share: SHARES[0] },
      { id: "fashion", label: "أزياء", share: SHARES[1] },
      { id: "home", label: "المنزل", share: SHARES[2] },
      { id: "beauty", label: "العناية", share: SHARES[3] },
      { id: "other", label: "أخرى", share: SHARES[4] },
    ],
    orders: [
      { id: "#10482", customer: "عبدالله القحطاني", date: "2026-11-16T14:20:00Z", status: "new", total: 349 },
      { id: "#10481", customer: "نورة الحربي", date: "2026-11-16T12:05:00Z", status: "processing", total: 1280 },
      { id: "#10480", customer: "فيصل الدوسري", date: "2026-11-16T09:41:00Z", status: "shipped", total: 215 },
      { id: "#10479", customer: "ريم الغامدي", date: "2026-11-15T19:12:00Z", status: "delivered", total: 674 },
      { id: "#10478", customer: "خالد المطيري", date: "2026-11-15T16:30:00Z", status: "cancelled", total: 129 },
    ],
  },
}
