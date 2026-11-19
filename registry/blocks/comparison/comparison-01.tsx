import * as React from "react"
import { CheckIcon, MinusIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { Badge } from "@/registry/ui/badge"
import { buttonVariants } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

type Column = { id: string; name: string; badge?: string; cta?: Action }
// `true` and `false` draw a check and a dash. Anything else is shown as text.
type Cell = boolean | React.ReactNode
type Row = { id: string; label: string; cells: Cell[] }

type Comparison01Labels = { feature: string; included: string; notIncluded: string }

type Comparison01Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  columns: Column[]
  // Each row has one cell per column, in the same order.
  rows: Row[]
  labels?: Partial<Comparison01Labels>
}

const labelsEn: Comparison01Labels = { feature: "Feature", included: "Included", notIncluded: "Not included" }
const labelsAr: Comparison01Labels = { feature: "الميزة", included: "متوفر", notIncluded: "غير متوفر" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Comparison01({
  eyebrow,
  title,
  description,
  columns,
  rows,
  headingLevel = 2,
  labels,
  id,
  className,
}: Comparison01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const hasCta = columns.some((c) => c.cta)
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <Card className="py-0">
          <Table className="min-w-xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead scope="col" className="sticky start-0 z-10 h-14 min-w-36 bg-card px-4 text-muted-foreground">
                  {t.feature}
                </TableHead>
                {columns.map((c) => (
                  <TableHead key={c.id} scope="col" className="h-14 min-w-32 px-4 text-center">
                    <span className="inline-flex flex-wrap items-center justify-center gap-2 text-base font-semibold">
                      {c.name}
                      {c.badge ? <Badge>{c.badge}</Badge> : null}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-transparent">
                  <TableHead
                    scope="row"
                    className="sticky start-0 z-10 h-auto min-w-36 bg-card px-4 py-3 font-normal whitespace-normal"
                  >
                    {row.label}
                  </TableHead>
                  {row.cells.map((cell, i) => (
                    <TableCell key={columns[i].id} className="px-4 py-3 text-center">
                      {cell === true ? (
                        <>
                          <CheckIcon aria-hidden="true" weight="bold" className="mx-auto size-5" />
                          <span className="sr-only">{t.included}</span>
                        </>
                      ) : cell === false ? (
                        <>
                          <MinusIcon aria-hidden="true" className="mx-auto size-5 text-muted-foreground" />
                          <span className="sr-only">{t.notIncluded}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">{cell}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {hasCta ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell className="sticky start-0 z-10 bg-card" />
                  {columns.map((c) => (
                    <TableCell key={c.id} className="px-4 py-4 text-center">
                      {c.cta ? (
                        <a
                          href={c.cta.href}
                          {...external(c.cta)}
                          className={buttonVariants({ size: "lg", className: "h-10 px-4" })}
                        >
                          {c.cta.label}
                        </a>
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </Card>
      </Container>
    </Section>
  )
}

const demo: { en: Comparison01Props; ar: Comparison01Props } = {
  en: {
    eyebrow: "Compare",
    title: "Why teams move to Rafid",
    description: "See what changes when invoicing, stock and payments live in one place.",
    columns: [
      { id: "rafid", name: "Rafid", badge: "Recommended", cta: { label: "Start free trial", href: "#start" } },
      { id: "sheets", name: "Spreadsheets" },
      { id: "other", name: "Other systems" },
    ],
    rows: [
      { id: "zatca", label: "ZATCA e-invoicing with QR code", cells: [true, false, true] },
      { id: "stock", label: "Live stock across branches", cells: [true, false, true] },
      { id: "mada", label: "mada and Apple Pay payments", cells: [true, false, false] },
      { id: "arabic", label: "Arabic interface and reports", cells: [true, true, false] },
      { id: "support", label: "Support on WhatsApp", cells: [true, false, false] },
      {
        id: "price",
        label: "Starting price",
        cells: [<bdi key="a">SAR 99 / month</bdi>, "Free", <bdi key="b">SAR 250 / month</bdi>],
      },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "قارن",
    title: "لماذا تنتقل الفرق إلى رافد",
    description: "شاهد ما يتغير حين تجتمع الفوترة والمخزون والمدفوعات في مكان واحد.",
    columns: [
      { id: "rafid", name: "رافد", badge: "الأنسب", cta: { label: "ابدأ تجربتك المجانية", href: "#start" } },
      { id: "sheets", name: "الجداول اليدوية" },
      { id: "other", name: "أنظمة أخرى" },
    ],
    rows: [
      { id: "zatca", label: "فوترة إلكترونية متوافقة مع هيئة الزكاة برمز QR", cells: [true, false, true] },
      { id: "stock", label: "مخزون لحظي بين الفروع", cells: [true, false, true] },
      { id: "mada", label: "مدفوعات مدى وأبل باي", cells: [true, false, false] },
      { id: "arabic", label: "واجهة وتقارير بالعربية", cells: [true, true, false] },
      { id: "support", label: "دعم عبر واتساب", cells: [true, false, false] },
      {
        id: "price",
        label: "السعر يبدأ من",
        cells: [<bdi key="a">99 ر.س شهريًا</bdi>, "مجاني", <bdi key="b">250 ر.س شهريًا</bdi>],
      },
    ],
    labels: labelsAr,
  },
}

export { Comparison01, labelsEn, labelsAr, demo }
export type { Comparison01Props, Comparison01Labels, Column, Row }
export default Comparison01
