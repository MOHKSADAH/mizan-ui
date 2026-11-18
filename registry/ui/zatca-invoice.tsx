import * as React from "react"
import { encode } from "uqr"
import { cn } from "@/registry/lib/utils"
import { formatDate, formatNumber, formatPercent, type Digits, type Lang } from "@/registry/lib/format"
import { encodeZatcaTlv } from "@/registry/lib/gulf/zatca-qr"
import { Price } from "@/registry/ui/price"

type ZatcaInvoiceLabels = {
  title: string
  invoiceNumber: string
  issuedAt: string
  seller: string
  buyer: string
  vatNumber: string
  description: string
  quantity: string
  unitPrice: string
  vat: string
  lineTotal: string
  subtotal: string
  totalVat: string
  total: string
  qr: string
  disclaimer: string
}

const zatcaInvoiceLabels: ZatcaInvoiceLabels = {
  title: "Simplified Tax Invoice",
  invoiceNumber: "Invoice number",
  issuedAt: "Issue date",
  seller: "Seller",
  buyer: "Buyer",
  vatNumber: "VAT number",
  description: "Description",
  quantity: "Qty",
  unitPrice: "Unit price (excl. VAT)",
  vat: "VAT",
  lineTotal: "Total (incl. VAT)",
  subtotal: "Total excluding VAT",
  totalVat: "Total VAT",
  total: "Total amount due",
  qr: "ZATCA QR code",
  disclaimer:
    "This layout and its QR code follow ZATCA Phase 1 (generation) only. It has no Phase 2 cryptographic stamp, invoice hash or clearance, so it is not a complete e-invoicing solution.",
}

const zatcaInvoiceLabelsAr: ZatcaInvoiceLabels = {
  title: "فاتورة ضريبية مبسطة",
  invoiceNumber: "رقم الفاتورة",
  issuedAt: "تاريخ الإصدار",
  seller: "البائع",
  buyer: "المشتري",
  vatNumber: "الرقم الضريبي",
  description: "الوصف",
  quantity: "الكمية",
  unitPrice: "سعر الوحدة (بدون الضريبة)",
  vat: "الضريبة",
  lineTotal: "الإجمالي (شامل الضريبة)",
  subtotal: "الإجمالي بدون الضريبة",
  totalVat: "إجمالي الضريبة",
  total: "المبلغ الإجمالي المستحق",
  qr: "رمز الاستجابة السريعة لهيئة الزكاة والضريبة والجمارك",
  disclaimer:
    "هذا التصميم ورمز الاستجابة السريعة يتبعان المرحلة الأولى (الإصدار) من متطلبات هيئة الزكاة والضريبة والجمارك فقط. لا يتضمن ختم المرحلة الثانية التشفيري ولا تجزئة الفاتورة ولا الإجازة، فهو ليس حلاً متكاملاً للفوترة الإلكترونية.",
}

type InvoiceParty = { name: string; nameAr?: string; address?: string; vatNumber?: string }

type InvoiceLine = {
  description: string
  descriptionAr?: string
  quantity: number
  // The price of one unit, excluding VAT.
  unitPrice: number
}

type ZatcaInvoiceProps = Omit<React.ComponentProps<"article">, "children"> & {
  seller: InvoiceParty & { vatNumber: string }
  buyer?: InvoiceParty
  invoiceNumber: string
  issuedAt: Date
  lines: InvoiceLine[]
  vatRate?: number
  currency?: string
  // `lang` is the main language: it sets the direction and the order of the two languages.
  lang?: Lang
  digits?: Digits
  timeZone?: string
  labels?: Partial<ZatcaInvoiceLabels>
  secondaryLabels?: Partial<ZatcaInvoiceLabels>
}

// Amounts are counted in halalas (whole minor units) and rounded per line, so the totals always equal the sum of the lines.
function invoiceTotals(lines: InvoiceLine[], vatRate: number) {
  const rows = lines.map((l) => {
    const net = Math.round(l.quantity * l.unitPrice * 100)
    const vat = Math.round(net * vatRate)
    return { net, vat, total: net + vat }
  })
  const sum = (key: "net" | "vat" | "total") => rows.reduce((acc, r) => acc + r[key], 0)
  return { rows, net: sum("net"), vat: sum("vat"), total: sum("total") }
}

function QrCode({ value, label, className }: { value: string; label: string; className?: string }) {
  const { size, data } = encode(value, { ecc: "M", border: 0 })
  // One horizontal run of dark modules per path segment.
  const path = data
    .map((row, y) => {
      let d = ""
      for (let x = 0; x < size; x++) {
        if (!row[x]) continue
        let w = 1
        while (row[x + w]) w++
        d += `M${x} ${y}h${w}v1h-${w}z`
        x += w - 1
      }
      return d
    })
    .join("")
  // Scanners need dark modules on a light background, so the chip stays light in every theme.
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`-4 -4 ${size + 8} ${size + 8}`}
      shapeRendering="crispEdges"
      className={cn("bg-white fill-current text-black", className)}
    >
      <path d={path} />
    </svg>
  )
}

function ZatcaInvoice({
  seller,
  buyer,
  invoiceNumber,
  issuedAt,
  lines,
  vatRate = 0.15,
  currency = "SAR",
  lang = "en",
  digits = "latn",
  timeZone = "Asia/Riyadh",
  labels,
  secondaryLabels,
  className,
  ...props
}: ZatcaInvoiceProps) {
  const en = { ...zatcaInvoiceLabels, ...(lang === "en" ? labels : secondaryLabels) }
  const ar = { ...zatcaInvoiceLabelsAr, ...(lang === "ar" ? labels : secondaryLabels) }
  const [main, other] = lang === "ar" ? [ar, en] : [en, ar]
  const otherLang = lang === "ar" ? "en" : "ar"
  const locale = { lang, digits }
  const { rows, net, vat, total } = invoiceTotals(lines, vatRate)
  const money = (halalas: number) => <Price amount={halalas / 100} currency={currency} lang={lang} digits={digits} decimals />
  const name = (p: { name: string; nameAr?: string }) => (lang === "ar" ? [p.nameAr ?? p.name, p.nameAr && p.name] : [p.name, p.nameAr])
  const qr = encodeZatcaTlv({
    sellerName: seller.nameAr ?? seller.name,
    vatNumber: seller.vatNumber,
    timestamp: issuedAt.toISOString().replace(/\.\d{3}Z$/, "Z"),
    total: (total / 100).toFixed(2),
    vatTotal: (vat / 100).toFixed(2),
  })

  const both = (key: keyof ZatcaInvoiceLabels) => (
    <>
      <span>{main[key]}</span>
      <span lang={otherLang} className="block text-xs font-normal text-muted-foreground">
        <bdi>{other[key]}</bdi>
      </span>
    </>
  )

  const party = (p: InvoiceParty, key: "seller" | "buyer") => {
    const [first, second] = name(p)
    return (
      <section aria-label={main[key]} className="flex flex-col gap-0.5">
        <h3 className="text-xs font-medium text-muted-foreground">
          {main[key]} · <bdi lang={otherLang}>{other[key]}</bdi>
        </h3>
        <p className="font-medium">
          <bdi>{first}</bdi>
        </p>
        {second && (
          <p lang={otherLang} className="text-muted-foreground">
            <bdi>{second}</bdi>
          </p>
        )}
        {p.address && (
          <p className="text-muted-foreground">
            <bdi>{p.address}</bdi>
          </p>
        )}
        {p.vatNumber && (
          <p>
            <span className="text-muted-foreground">
              {main.vatNumber} · <bdi lang={otherLang}>{other.vatNumber}</bdi>:{" "}
            </span>
            <bdi dir="ltr" className="tabular-nums">
              {p.vatNumber}
            </bdi>
          </p>
        )}
      </section>
    )
  }

  return (
    <article
      data-slot="zatca-invoice"
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
      className={cn(
        "flex w-full max-w-3xl flex-col gap-6 rounded-lg border border-border bg-card p-6 text-sm text-card-foreground print:max-w-none print:rounded-none print:border-0 print:bg-transparent print:p-0",
        className
      )}
      {...props}
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-xl font-semibold">{both("title")}</h2>
        <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1">
          <dt className="text-muted-foreground">{both("invoiceNumber")}</dt>
          <dd>
            <bdi dir="ltr" className="tabular-nums">
              {invoiceNumber}
            </bdi>
          </dd>
          <dt className="text-muted-foreground">{both("issuedAt")}</dt>
          <dd>
            <bdi>{formatDate(issuedAt, { ...locale, timeZone }, { dateStyle: "medium", timeStyle: "short" })}</bdi>
          </dd>
        </dl>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
        {party(seller, "seller")}
        {buyer && party(buyer, "buyer")}
      </div>
      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border text-start">
              <th scope="col" className="py-2 pe-2 text-start font-medium">{both("description")}</th>
              <th scope="col" className="px-2 py-2 text-end font-medium">{both("quantity")}</th>
              <th scope="col" className="px-2 py-2 text-end font-medium">{both("unitPrice")}</th>
              <th scope="col" className="px-2 py-2 text-end font-medium">
                {both("vat")} <bdi>{formatPercent(vatRate, locale)}</bdi>
              </th>
              <th scope="col" className="py-2 ps-2 text-end font-medium">{both("lineTotal")}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="border-b border-border print:break-inside-avoid">
                <td className="py-2 pe-2">
                  <bdi>{lang === "ar" ? (line.descriptionAr ?? line.description) : line.description}</bdi>
                  {(lang === "ar" ? line.descriptionAr && line.description : line.descriptionAr) && (
                    <span lang={otherLang} className="block text-xs text-muted-foreground">
                      <bdi>{lang === "ar" ? line.description : line.descriptionAr}</bdi>
                    </span>
                  )}
                </td>
                <td className="px-2 py-2 text-end tabular-nums">{formatNumber(line.quantity, locale)}</td>
                <td className="px-2 py-2 text-end">{money(Math.round(line.unitPrice * 100))}</td>
                <td className="px-2 py-2 text-end">{money(rows[i].vat)}</td>
                <td className="py-2 ps-2 text-end">{money(rows[i].total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6 print:break-inside-avoid">
        <figure className="flex flex-col gap-1">
          <QrCode value={qr} label={main.qr} className="size-32" />
          <figcaption className="max-w-32 text-xs text-muted-foreground">{main.qr}</figcaption>
        </figure>
        <dl className="grid min-w-64 grid-cols-[1fr_auto] gap-x-6 gap-y-1">
          <dt>{both("subtotal")}</dt>
          <dd className="text-end">{money(net)}</dd>
          <dt>{both("totalVat")}</dt>
          <dd className="text-end">{money(vat)}</dd>
          <dt className="border-t border-border pt-1 font-semibold">{both("total")}</dt>
          <dd className="border-t border-border pt-1 text-end font-semibold">{money(total)}</dd>
        </dl>
      </div>
      <footer className="flex flex-col gap-1 border-t border-border pt-3 text-xs text-muted-foreground">
        <p>{main.disclaimer}</p>
        <p lang={otherLang}>
          <bdi>{other.disclaimer}</bdi>
        </p>
      </footer>
    </article>
  )
}

export { ZatcaInvoice, invoiceTotals, zatcaInvoiceLabels, zatcaInvoiceLabelsAr }
export type { InvoiceLine, InvoiceParty, ZatcaInvoiceLabels, ZatcaInvoiceProps }
