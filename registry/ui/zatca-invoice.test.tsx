import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/zatca-invoice"
import { renderExamples } from "@/scripts/render-examples"
import { ZatcaInvoice, invoiceTotals, zatcaInvoiceLabelsAr } from "./zatca-invoice"

const seller = { name: "Al Noor", nameAr: "النور", vatNumber: "300000000000003" }
const lines = [
  { description: "Coffee", quantity: 2, unitPrice: 45 },
  { description: "Dates", quantity: 3, unitPrice: 32.5 },
]
const issuedAt = new Date("2026-03-04T10:30:00Z")

describe("invoiceTotals", () => {
  test("rounds per line in halalas and sums the lines", () => {
    const t = invoiceTotals(lines, 0.15)
    expect(t.rows).toEqual([
      { net: 9000, vat: 1350, total: 10350 },
      { net: 9750, vat: 1463, total: 11213 },
    ])
    expect([t.net, t.vat, t.total]).toEqual([18750, 2813, 21563])
  })

  test("takes the VAT rate as a prop", () => {
    expect(invoiceTotals([{ description: "x", quantity: 1, unitPrice: 100 }], 0.05).total).toBe(10500)
  })

  test("avoids floating point drift", () => {
    expect(invoiceTotals([{ description: "x", quantity: 3, unitPrice: 0.1 }], 0.15).net).toBe(30)
  })
})

describe("ZatcaInvoice", () => {
  test("renders both languages, the QR code and the Phase 1 disclaimer", () => {
    const html = renderToString(<ZatcaInvoice seller={seller} invoiceNumber="INV-1" issuedAt={issuedAt} lines={lines} />)
    expect(html).toContain("Simplified Tax Invoice")
    expect(html).toContain(zatcaInvoiceLabelsAr.title)
    expect(html).toContain("300000000000003")
    expect(html).toContain('role="img"')
    expect(html).toContain("Phase 1")
    expect(html).toContain("print:")
  })

  test("puts Arabic first and sets RTL when lang is ar", () => {
    const html = renderToString(<ZatcaInvoice lang="ar" seller={seller} invoiceNumber="INV-1" issuedAt={issuedAt} lines={lines} />)
    expect(html).toContain('dir="rtl"')
    expect(html.indexOf(zatcaInvoiceLabelsAr.title)).toBeLessThan(html.indexOf("Simplified Tax Invoice"))
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
