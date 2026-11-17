"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsDownUpIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  StarIcon,
  UserIcon,
  type Icon,
} from "@phosphor-icons/react"
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"

import { formatDate, formatNumber, type Lang, type Locale } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/ui/input-group"
import { Price } from "@/registry/ui/price"
import { Separator } from "@/registry/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/registry/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

export type DataTable03Labels = {
  title: string
  description: string
  search: string
  customerColumn: string
  cityColumn: string
  ordersColumn: string
  spentColumn: string
  lastOrderColumn: string
  segmentColumn: string
  segmentVip: string
  segmentRegular: string
  segmentNew: string
  profileDescription: string
  contact: string
  joined: string
  totalOrders: string
  totalSpent: string
  lastOrder: string
  recentOrders: string
  notes: string
  close: string
  showing: string
  pageOf: string
  previous: string
  next: string
  noResults: string
  clearSearch: string
}

export const labelsEn: DataTable03Labels = {
  title: "Customers",
  description: "Select a customer to see their profile and recent orders.",
  search: "Search customers",
  customerColumn: "Customer",
  cityColumn: "City",
  ordersColumn: "Orders",
  spentColumn: "Total spent",
  lastOrderColumn: "Last order",
  segmentColumn: "Segment",
  segmentVip: "VIP",
  segmentRegular: "Regular",
  segmentNew: "New",
  profileDescription: "Customer profile and recent orders.",
  contact: "Contact",
  joined: "Customer since",
  totalOrders: "Orders",
  totalSpent: "Total spent",
  lastOrder: "Last order",
  recentOrders: "Recent orders",
  notes: "Notes",
  close: "Close",
  showing: "Showing {from}–{to} of {total}",
  pageOf: "Page {page} of {pages}",
  previous: "Previous page",
  next: "Next page",
  noResults: "No customers match your search.",
  clearSearch: "Clear search",
}

export const labelsAr: DataTable03Labels = {
  title: "العملاء",
  description: "اختر عميلًا لعرض ملفه وأحدث طلباته.",
  search: "ابحث عن عميل",
  customerColumn: "العميل",
  cityColumn: "المدينة",
  ordersColumn: "الطلبات",
  spentColumn: "إجمالي الإنفاق",
  lastOrderColumn: "آخر طلب",
  segmentColumn: "الفئة",
  segmentVip: "مميز",
  segmentRegular: "منتظم",
  segmentNew: "جديد",
  profileDescription: "ملف العميل وأحدث طلباته.",
  contact: "بيانات التواصل",
  joined: "عميل منذ",
  totalOrders: "الطلبات",
  totalSpent: "إجمالي الإنفاق",
  lastOrder: "آخر طلب",
  recentOrders: "أحدث الطلبات",
  notes: "ملاحظات",
  close: "إغلاق",
  showing: "عرض {from}–{to} من {total}",
  pageOf: "صفحة {page} من {pages}",
  previous: "الصفحة السابقة",
  next: "الصفحة التالية",
  noResults: "لا يوجد عملاء يطابقون بحثك.",
  clearSearch: "مسح البحث",
}

export type Segment = "vip" | "regular" | "new"
export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  joined: string
  orders: number
  spent: number
  lastOrder: string
  segment: Segment
  notes?: string
  recent: { number: string; date: string; total: number }[]
}

export type DataTable03Props = {
  lang?: Lang
  labels?: Partial<DataTable03Labels>
  className?: string
  currency?: string
  customers: Customer[]
  pageSize?: number
}

const SEGMENT: Record<Segment, { icon: Icon; variant: "default" | "secondary" | "outline"; label: keyof DataTable03Labels }> = {
  vip: { icon: StarIcon, variant: "default", label: "segmentVip" },
  regular: { icon: UserIcon, variant: "outline", label: "segmentRegular" },
  new: { icon: SparkleIcon, variant: "secondary", label: "segmentNew" },
}

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
})

const helper = createColumnHelper<typeof features, Customer>()

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => [...word][0])
    .join("")

type Sortable = { getIsSorted: () => false | "asc" | "desc"; getToggleSortingHandler: () => ((event: unknown) => void) | undefined }

function SortButton({ column, label }: { column: Sortable; label: string }) {
  const sorted = column.getIsSorted()
  const Arrow = sorted === "asc" ? ArrowUpIcon : sorted === "desc" ? ArrowDownIcon : ArrowsDownUpIcon
  return (
    <Button variant="ghost" size="sm" className="-ms-2.5" onClick={column.getToggleSortingHandler()}>
      {label}
      <Arrow aria-hidden="true" className={cn(!sorted && "text-muted-foreground")} />
    </Button>
  )
}

export function DataTable03({
  lang = "en",
  labels,
  className,
  currency = "SAR",
  customers,
  pageSize = 8,
}: DataTable03Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const locale: Locale = { lang }
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [last, setLast] = React.useState<Customer | null>(null)
  const open = (customer: Customer) => {
    setLast(customer)
    setOpenId(customer.id)
  }

  const columns = React.useMemo(
    () =>
      helper.columns([
        helper.accessor("name", {
          id: "name",
          header: ({ column }) => <SortButton column={column} label={t.customerColumn} />,
          cell: ({ row }) => (
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>{initials(row.original.name)}</AvatarFallback>
              </Avatar>
              <div className="grid text-start">
                <button
                  type="button"
                  onClick={() => open(row.original)}
                  className="w-fit rounded-sm text-start font-medium outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {row.original.name}
                </button>
                <p className="text-start text-xs text-muted-foreground"><bdi dir="ltr">{row.original.email}</bdi></p>
              </div>
            </div>
          ),
        }),
        helper.accessor("city", {
          id: "city",
          header: ({ column }) => <SortButton column={column} label={t.cityColumn} />,
        }),
        helper.accessor("orders", {
          id: "orders",
          enableGlobalFilter: false,
          header: ({ column }) => <SortButton column={column} label={t.ordersColumn} />,
          cell: ({ getValue }) => <span className="tabular-nums">{formatNumber(getValue(), locale)}</span>,
        }),
        helper.accessor("spent", {
          id: "spent",
          enableGlobalFilter: false,
          header: ({ column }) => (
            <div className="flex justify-end">
              <SortButton column={column} label={t.spentColumn} />
            </div>
          ),
          cell: ({ getValue }) => (
            <div className="text-end">
              <Price amount={getValue()} currency={currency} lang={lang} />
            </div>
          ),
        }),
        helper.accessor("lastOrder", {
          id: "lastOrder",
          enableGlobalFilter: false,
          header: ({ column }) => <SortButton column={column} label={t.lastOrderColumn} />,
          cell: ({ getValue }) => (
            <span className="text-muted-foreground">
              {formatDate(new Date(getValue()), locale, { day: "numeric", month: "short", year: "numeric" })}
            </span>
          ),
        }),
        helper.accessor("segment", {
          id: "segment",
          enableGlobalFilter: false,
          header: t.segmentColumn,
          enableSorting: false,
          cell: ({ getValue }) => {
            const segment = SEGMENT[getValue()]
            return (
              <Badge variant={segment.variant}>
                <segment.icon aria-hidden="true" />
                {t[segment.label] as string}
              </Badge>
            )
          },
        }),
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labels, lang, currency]
  )

  const table = useTable({
    features,
    columns,
    data: customers,
    getRowId: (customer) => customer.id,
    initialState: { pagination: { pageIndex: 0, pageSize } },
  })

  const { pageIndex } = table.state.pagination
  const filtered = table.getPrePaginatedRowModel().rows.length
  const pageRows = table.getRowModel().rows
  const from = filtered === 0 ? 0 : pageIndex * pageSize + 1
  const to = pageIndex * pageSize + pageRows.length

  return (
    <Container size="wide" dir={dir} className={cn("flex flex-col gap-4 py-6 md:py-8", className)}>
      <div>
        <h1 className="text-2xl font-semibold">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </div>

      <InputGroup className="w-full sm:max-w-xs">
        <InputGroupAddon>
          <MagnifyingGlassIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          aria-label={t.search}
          placeholder={t.search}
          value={(table.state.globalFilter as string | undefined) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
        />
      </InputGroup>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="hover:bg-transparent">
                {group.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  return (
                    <TableHead
                      key={header.id}
                      aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                    >
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.original.id === openId ? "selected" : undefined}
                  onClick={() => open(row.original)}
                  className="cursor-pointer"
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-32 text-center whitespace-normal">
                  <p className="text-muted-foreground">{t.noResults}</p>
                  <Button variant="link" onClick={() => table.setGlobalFilter("")}>
                    {t.clearSearch}
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <p role="status">
          {fill(t.showing, {
            from: formatNumber(from, locale),
            to: formatNumber(to, locale),
            total: formatNumber(filtered, locale),
          })}
        </p>
        <div className="flex items-center gap-2">
          <span>
            {fill(t.pageOf, {
              page: formatNumber(pageIndex + 1, locale),
              pages: formatNumber(Math.max(table.getPageCount(), 1), locale),
            })}
          </span>
          <Button variant="outline" size="sm" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            {t.previous}
          </Button>
          <Button variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            {t.next}
          </Button>
        </div>
      </div>

      <Sheet open={openId !== null} onOpenChange={(next) => !next && setOpenId(null)}>
        <SheetContent side={dir === "rtl" ? "left" : "right"} dir={dir} labels={{ close: t.close }} className="overflow-y-auto">
          {last ? (
            <>
              <SheetHeader className="flex-row items-center gap-3 pe-12">
                <Avatar size="lg">
                  <AvatarFallback>{initials(last.name)}</AvatarFallback>
                </Avatar>
                <div className="grid">
                  <SheetTitle>{last.name}</SheetTitle>
                  <SheetDescription>{t.profileDescription}</SheetDescription>
                </div>
              </SheetHeader>
              <div className="flex flex-col gap-5 px-4 pb-6">
                <dl className="grid grid-cols-3 gap-3 text-sm">
                  <div className="grid gap-0.5">
                    <dt className="text-muted-foreground">{t.totalOrders}</dt>
                    <dd className="font-semibold tabular-nums">{formatNumber(last.orders, locale)}</dd>
                  </div>
                  <div className="grid gap-0.5">
                    <dt className="text-muted-foreground">{t.totalSpent}</dt>
                    <dd className="font-semibold">
                      <Price amount={last.spent} currency={currency} lang={lang} />
                    </dd>
                  </div>
                  <div className="grid gap-0.5">
                    <dt className="text-muted-foreground">{t.lastOrder}</dt>
                    <dd className="font-semibold">
                      {formatDate(new Date(last.lastOrder), locale, { day: "numeric", month: "short" })}
                    </dd>
                  </div>
                </dl>
                <Separator />
                <section aria-labelledby="customer-contact" className="grid gap-1 text-sm">
                  <h3 id="customer-contact" className="font-medium">
                    {t.contact}
                  </h3>
                  <p className="text-start text-muted-foreground"><bdi dir="ltr">{last.email}</bdi></p>
                  <p className="text-start text-muted-foreground"><bdi dir="ltr">{last.phone}</bdi></p>
                  <p className="text-muted-foreground">
                    {last.city} · {t.joined} {formatDate(new Date(last.joined), locale, { month: "long", year: "numeric" })}
                  </p>
                </section>
                <section aria-labelledby="customer-orders" className="grid gap-2 text-sm">
                  <h3 id="customer-orders" className="font-medium">
                    {t.recentOrders}
                  </h3>
                  <ul className="grid divide-y rounded-lg border">
                    {last.recent.map((order) => (
                      <li key={order.number} className="flex items-center justify-between gap-3 px-3 py-2">
                        <div className="grid">
                          <p className="text-start font-medium"><bdi dir="ltr">{order.number}</bdi></p>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(new Date(order.date), locale, { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <Price amount={order.total} currency={currency} lang={lang} />
                      </li>
                    ))}
                  </ul>
                </section>
                {last.notes ? (
                  <section aria-labelledby="customer-notes" className="grid gap-1 text-sm">
                    <h3 id="customer-notes" className="font-medium">
                      {t.notes}
                    </h3>
                    <p className="text-muted-foreground">{last.notes}</p>
                  </section>
                ) : null}
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </Container>
  )
}

export default DataTable03

type Seed = { name: string; email: string; city: string; notes?: string }

const PROFILE: { orders: number; spent: number; segment: Segment; joined: string; recent: [number, number, number][] }[] = [
  { orders: 42, spent: 18420, segment: "vip", joined: "2024-02-11", recent: [[10482, 349, 0], [10440, 1280, 9], [10397, 515, 21]] },
  { orders: 27, spent: 9860, segment: "vip", joined: "2024-06-03", recent: [[10475, 899, 1], [10431, 640, 12], [10388, 305, 24]] },
  { orders: 12, spent: 3140, segment: "regular", joined: "2025-01-19", recent: [[10470, 215, 2], [10419, 460, 15], [10352, 180, 33]] },
  { orders: 9, spent: 2275, segment: "regular", joined: "2025-03-08", recent: [[10466, 674, 3], [10412, 388, 18], [10340, 129, 40]] },
  { orders: 2, spent: 604, segment: "new", joined: "2026-10-02", recent: [[10459, 456, 4], [10447, 148, 10]] },
  { orders: 18, spent: 6120, segment: "regular", joined: "2024-11-27", recent: [[10455, 1520, 5], [10401, 760, 20], [10366, 242, 30]] },
  { orders: 31, spent: 12980, segment: "vip", joined: "2024-04-15", recent: [[10451, 980, 6], [10409, 425, 17], [10359, 530, 35]] },
  { orders: 5, spent: 1380, segment: "regular", joined: "2025-09-30", recent: [[10444, 210, 7], [10403, 95, 22]] },
  { orders: 1, spent: 305, segment: "new", joined: "2026-11-09", recent: [[10463, 305, 3]] },
  { orders: 14, spent: 4410, segment: "regular", joined: "2025-02-22", recent: [[10438, 1180, 8], [10391, 330, 26]] },
]

const DAY = 86_400_000
const BASE = Date.UTC(2026, 10, 16, 12, 0)

function sampleCustomers(seeds: Seed[]): Customer[] {
  return seeds.map((seed, i) => {
    const p = PROFILE[i]
    const recent = p.recent.map(([number, total, daysAgo]) => ({
      number: `#${number}`,
      date: new Date(BASE - daysAgo * DAY).toISOString(),
      total,
    }))
    return {
      id: `customer-${i + 1}`,
      name: seed.name,
      email: seed.email,
      phone: `+966 5${i % 2 ? 5 : 0} ${100 + i * 37} ${4000 + i * 211}`,
      city: seed.city,
      joined: new Date(`${p.joined}T00:00:00Z`).toISOString(),
      orders: p.orders,
      spent: p.spent,
      lastOrder: recent[0].date,
      segment: p.segment,
      notes: seed.notes,
      recent,
    }
  })
}

export const demo: { en: DataTable03Props; ar: DataTable03Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    pageSize: 8,
    customers: sampleCustomers([
      { name: "Abdullah Al-Qahtani", email: "abdullah.q@example.sa", city: "Riyadh", notes: "Prefers delivery after 6 pm." },
      { name: "Noura Al-Harbi", email: "noura.h@example.sa", city: "Jeddah", notes: "Wholesale enquiry pending." },
      { name: "Faisal Al-Dosari", email: "faisal.d@example.sa", city: "Dammam" },
      { name: "Reem Al-Ghamdi", email: "reem.g@example.sa", city: "Madinah" },
      { name: "Khalid Al-Mutairi", email: "khalid.m@example.sa", city: "Riyadh" },
      { name: "Lama Al-Zahrani", email: "lama.z@example.sa", city: "Makkah" },
      { name: "Turki Al-Shehri", email: "turki.s@example.sa", city: "Abha", notes: "Asked for an invoice with the VAT number." },
      { name: "Hessa Al-Otaibi", email: "hessa.o@example.sa", city: "Buraydah" },
      { name: "Majed Al-Anazi", email: "majed.a@example.sa", city: "Tabuk" },
      { name: "Salma Al-Shammari", email: "salma.s@example.sa", city: "Hail" },
    ]),
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    pageSize: 8,
    customers: sampleCustomers([
      { name: "عبدالله القحطاني", email: "abdullah.q@example.sa", city: "الرياض", notes: "يفضّل التوصيل بعد السادسة مساءً." },
      { name: "نورة الحربي", email: "noura.h@example.sa", city: "جدة", notes: "استفسار عن الشراء بالجملة قيد المتابعة." },
      { name: "فيصل الدوسري", email: "faisal.d@example.sa", city: "الدمام" },
      { name: "ريم الغامدي", email: "reem.g@example.sa", city: "المدينة المنورة" },
      { name: "خالد المطيري", email: "khalid.m@example.sa", city: "الرياض" },
      { name: "لمى الزهراني", email: "lama.z@example.sa", city: "مكة المكرمة" },
      { name: "تركي الشهري", email: "turki.s@example.sa", city: "أبها", notes: "طلب فاتورة تتضمن الرقم الضريبي." },
      { name: "حصة العتيبي", email: "hessa.o@example.sa", city: "بريدة" },
      { name: "ماجد العنزي", email: "majed.a@example.sa", city: "تبوك" },
      { name: "سلمى الشمري", email: "salma.s@example.sa", city: "حائل" },
    ]),
  },
}
