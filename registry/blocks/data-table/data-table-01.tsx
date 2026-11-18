"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsDownUpIcon,
  CaretDownIcon,
  CheckCircleIcon,
  ClockIcon,
  DotsThreeIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  TruckIcon,
  XCircleIcon,
  XIcon,
  type Icon,
} from "@phosphor-icons/react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"

import type { Plural } from "@/registry/lib/block-types"
import { formatDate, formatNumber, plural, type Lang, type Locale } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Container } from "@/registry/ui/container"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/ui/input-group"
import { Price } from "@/registry/ui/price"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

export type DataTable01Labels = {
  title: string
  description: string
  search: string
  columns: string
  orderColumn: string
  customerColumn: string
  dateColumn: string
  statusColumn: string
  totalColumn: string
  selectAll: string
  selectRow: string
  rowActions: string
  viewOrder: string
  printInvoice: string
  cancelOrder: string
  statusNew: string
  statusProcessing: string
  statusShipped: string
  statusDelivered: string
  statusCancelled: string
  selected: Plural
  markShipped: string
  exportSelected: string
  cancelSelected: string
  clearSelection: string
  showing: string
  pageOf: string
  previous: string
  next: string
  noResults: string
  clearSearch: string
}

export const labelsEn: DataTable01Labels = {
  title: "Orders",
  description: "Search, sort and manage the orders placed in your store.",
  search: "Search orders or customers",
  columns: "Columns",
  orderColumn: "Order",
  customerColumn: "Customer",
  dateColumn: "Date",
  statusColumn: "Status",
  totalColumn: "Total",
  selectAll: "Select all orders on this page",
  selectRow: "Select order {name}",
  rowActions: "Actions for order {name}",
  viewOrder: "View order",
  printInvoice: "Print invoice",
  cancelOrder: "Cancel order",
  statusNew: "New",
  statusProcessing: "Processing",
  statusShipped: "Shipped",
  statusDelivered: "Delivered",
  statusCancelled: "Cancelled",
  selected: (n) => plural(n, { one: "{n} order selected", other: "{n} orders selected" }, { lang: "en" }),
  markShipped: "Mark as shipped",
  exportSelected: "Export",
  cancelSelected: "Cancel orders",
  clearSelection: "Clear selection",
  showing: "Showing {from}–{to} of {total}",
  pageOf: "Page {page} of {pages}",
  previous: "Previous page",
  next: "Next page",
  noResults: "No orders match your search.",
  clearSearch: "Clear search",
}

export const labelsAr: DataTable01Labels = {
  title: "الطلبات",
  description: "ابحث في الطلبات الواردة إلى متجرك ورتّبها وأدرها.",
  search: "ابحث عن طلب أو عميل",
  columns: "الأعمدة",
  orderColumn: "الطلب",
  customerColumn: "العميل",
  dateColumn: "التاريخ",
  statusColumn: "الحالة",
  totalColumn: "الإجمالي",
  selectAll: "تحديد كل الطلبات في هذه الصفحة",
  selectRow: "تحديد الطلب {name}",
  rowActions: "إجراءات الطلب {name}",
  viewOrder: "عرض الطلب",
  printInvoice: "طباعة الفاتورة",
  cancelOrder: "إلغاء الطلب",
  statusNew: "جديد",
  statusProcessing: "قيد التجهيز",
  statusShipped: "تم الشحن",
  statusDelivered: "تم التسليم",
  statusCancelled: "ملغي",
  selected: (n) =>
    plural(
      n,
      {
        zero: "لا طلبات محددة",
        one: "تم تحديد طلب واحد",
        two: "تم تحديد طلبين",
        few: "تم تحديد {n} طلبات",
        many: "تم تحديد {n} طلبًا",
        other: "تم تحديد {n} طلب",
      },
      { lang: "ar" }
    ),
  markShipped: "تعيين كمشحون",
  exportSelected: "تصدير",
  cancelSelected: "إلغاء الطلبات",
  clearSelection: "إلغاء التحديد",
  showing: "عرض {from}–{to} من {total}",
  pageOf: "صفحة {page} من {pages}",
  previous: "الصفحة السابقة",
  next: "الصفحة التالية",
  noResults: "لا توجد طلبات تطابق بحثك.",
  clearSearch: "مسح البحث",
}

export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled"
export type Order = { id: string; number: string; customer: string; date: string; status: OrderStatus; total: number }
export type OrderAction = "view" | "invoice" | "cancel"
export type BulkAction = "ship" | "export" | "cancel"

export type DataTable01Props = {
  lang?: Lang
  labels?: Partial<DataTable01Labels>
  className?: string
  currency?: string
  orders: Order[]
  pageSize?: number
  onRowAction?: (action: OrderAction, order: Order) => void
  onBulkAction?: (action: BulkAction, ids: string[]) => void
}

const STATUS: Record<OrderStatus, { icon: Icon; variant: "secondary" | "outline" | "destructive"; label: keyof DataTable01Labels }> = {
  new: { icon: ClockIcon, variant: "secondary", label: "statusNew" },
  processing: { icon: PackageIcon, variant: "secondary", label: "statusProcessing" },
  shipped: { icon: TruckIcon, variant: "outline", label: "statusShipped" },
  delivered: { icon: CheckCircleIcon, variant: "outline", label: "statusDelivered" },
  cancelled: { icon: XCircleIcon, variant: "destructive", label: "statusCancelled" },
}

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
})

const helper = createColumnHelper<typeof features, Order>()

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")

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

export function DataTable01({
  lang = "en",
  labels,
  className,
  currency = "SAR",
  orders,
  pageSize = 8,
  onRowAction,
  onBulkAction,
}: DataTable01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const locale: Locale = { lang }

  const columns = React.useMemo(
    () =>
      helper.columns([
        helper.display({
          id: "select",
          enableHiding: false,
          enableSorting: false,
          header: ({ table }) => (
            <Checkbox
              aria-label={t.selectAll}
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={table.getIsSomePageRowsSelected()}
              onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              aria-label={fill(t.selectRow, { name: row.original.number })}
              checked={row.getIsSelected()}
              onCheckedChange={(checked) => row.toggleSelected(checked)}
            />
          ),
        }),
        helper.accessor("number", {
          id: "number",
          enableHiding: false,
          header: ({ column }) => <SortButton column={column} label={t.orderColumn} />,
          cell: ({ getValue }) => (
            <bdi dir="ltr" className="font-medium">
              {getValue()}
            </bdi>
          ),
        }),
        helper.accessor("customer", {
          id: "customer",
          header: ({ column }) => <SortButton column={column} label={t.customerColumn} />,
        }),
        helper.accessor("date", {
          id: "date",
          enableGlobalFilter: false,
          header: ({ column }) => <SortButton column={column} label={t.dateColumn} />,
          cell: ({ getValue }) => (
            <span className="text-muted-foreground">
              {formatDate(new Date(getValue()), locale, { day: "numeric", month: "short", year: "numeric" })}
            </span>
          ),
        }),
        helper.accessor("status", {
          id: "status",
          enableGlobalFilter: false,
          header: ({ column }) => <SortButton column={column} label={t.statusColumn} />,
          cell: ({ getValue }) => {
            const status = STATUS[getValue()]
            return (
              <Badge variant={status.variant}>
                <status.icon aria-hidden="true" />
                {t[status.label] as string}
              </Badge>
            )
          },
        }),
        helper.accessor("total", {
          id: "total",
          enableGlobalFilter: false,
          header: ({ column }) => (
            <div className="flex justify-end">
              <SortButton column={column} label={t.totalColumn} />
            </div>
          ),
          cell: ({ getValue }) => (
            <div className="text-end">
              <Price amount={getValue()} currency={currency} lang={lang} />
            </div>
          ),
        }),
        helper.display({
          id: "actions",
          enableHiding: false,
          header: () => null,
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon-sm" aria-label={fill(t.rowActions, { name: row.original.number })} />
                }
              >
                <DotsThreeIcon weight="bold" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" dir={dir} className="w-44">
                <DropdownMenuItem onClick={() => onRowAction?.("view", row.original)}>{t.viewOrder}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRowAction?.("invoice", row.original)}>{t.printInvoice}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onRowAction?.("cancel", row.original)}>
                  {t.cancelOrder}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        }),
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labels, lang, currency, onRowAction]
  )

  const table = useTable({
    features,
    columns,
    data: orders,
    getRowId: (order) => order.id,
    initialState: { pagination: { pageIndex: 0, pageSize } },
  })

  const { pageIndex } = table.state.pagination
  const filtered = table.getPrePaginatedRowModel().rows.length
  const pageRows = table.getRowModel().rows
  const from = filtered === 0 ? 0 : pageIndex * pageSize + 1
  const to = pageIndex * pageSize + pageRows.length
  const selectedIds = Object.keys(table.state.rowSelection)
  const columnNames: Record<string, string> = {
    customer: t.customerColumn,
    date: t.dateColumn,
    status: t.statusColumn,
    total: t.totalColumn,
  }
  const visibleCount = table.getVisibleLeafColumns().length

  return (
    <Container size="wide" dir={dir} className={cn("flex flex-col gap-4 py-6 md:py-8", className)}>
      <div>
        <h1 className="text-2xl font-semibold">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
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
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" className="ms-auto" />}>
            {t.columns}
            <CaretDownIcon aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" dir={dir} className="w-44">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(checked) => column.toggleVisibility(checked)}
                >
                  {columnNames[column.id]}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedIds.length > 0 ? (
        <div role="status" className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted px-3 py-2 text-sm">
          <span className="me-auto font-medium">{t.selected(selectedIds.length)}</span>
          <Button size="sm" variant="outline" onClick={() => onBulkAction?.("ship", selectedIds)}>
            {t.markShipped}
          </Button>
          <Button size="sm" variant="outline" onClick={() => onBulkAction?.("export", selectedIds)}>
            {t.exportSelected}
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onBulkAction?.("cancel", selectedIds)}>
            {t.cancelSelected}
          </Button>
          <Button size="icon-sm" variant="ghost" aria-label={t.clearSelection} onClick={() => table.resetRowSelection(true)}>
            <XIcon />
          </Button>
        </div>
      ) : null}

      <div className="rounded-xl border bg-card">
        <Table>
          <TableCaption className="sr-only">{t.title}</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="hover:bg-transparent">
                {group.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  return (
                    <TableHead
                      key={header.id}
                      aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                      className={header.column.id === "select" ? "w-10" : undefined}
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
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={visibleCount} className="h-32 text-center whitespace-normal">
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
    </Container>
  )
}

export default DataTable01

const STATUSES: OrderStatus[] = ["delivered", "shipped", "processing", "new", "delivered", "cancelled", "delivered", "shipped"]
const TOTALS = [349, 1280, 215, 674, 129, 899, 456, 1520, 242, 388, 760, 95, 1180, 530, 305, 1740, 210, 640, 425, 980]

function sampleOrders(customers: string[]): Order[] {
  return TOTALS.map((total, i) => ({
    id: `order-${10482 - i}`,
    number: `#${10482 - i}`,
    customer: customers[i % customers.length],
    date: new Date(Date.UTC(2026, 10, 16, 14, 20) - i * 7 * 3_600_000).toISOString(),
    status: STATUSES[i % STATUSES.length],
    total,
  }))
}

export const demo: { en: DataTable01Props; ar: DataTable01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    orders: sampleOrders([
      "Abdullah Al-Qahtani",
      "Noura Al-Harbi",
      "Faisal Al-Dosari",
      "Reem Al-Ghamdi",
      "Khalid Al-Mutairi",
      "Lama Al-Zahrani",
      "Turki Al-Shehri",
    ]),
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    orders: sampleOrders([
      "عبدالله القحطاني",
      "نورة الحربي",
      "فيصل الدوسري",
      "ريم الغامدي",
      "خالد المطيري",
      "لمى الزهراني",
      "تركي الشهري",
    ]),
  },
}
