import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { VatSummary, computeVat, vatSummaryLabelsAr } from "@/registry/ui/vat-summary"

test("exclusive VAT is added to the base", () => {
  expect(computeVat(100, { rate: 0.15, included: false }, "SAR")).toEqual({ base: 100, vat: 15, total: 115 })
})

test("inclusive VAT is taken out of the base and the total stays", () => {
  expect(computeVat(115, { rate: 0.15, included: true }, "SAR")).toEqual({ base: 115, vat: 15, total: 115 })
  expect(computeVat(10, { rate: 0.15, included: true }, "SAR").vat).toBe(1.3)
})

test("rounds to the minor unit of the currency", () => {
  expect(computeVat(10.01, { rate: 0.05, included: false }, "SAR")).toEqual({ base: 10.01, vat: 0.5, total: 10.51 })
  expect(computeVat(10, { rate: 0.05, included: false }, "OMR").total).toBe(10.5)
  expect(computeVat(1.005, { rate: 0.15, included: true }, "KWD")).toEqual({ base: 1.005, vat: 0.131, total: 1.005 })
  expect(computeVat(10.005, { rate: 0.05, included: false }, "KWD")).toEqual({ base: 10.005, vat: 0.5, total: 10.505 })
})

test("rounds exact halves up despite float error", () => {
  expect(computeVat(3.3, { rate: 0.15, included: false }, "SAR")).toEqual({ base: 3.3, vat: 0.5, total: 3.8 })
  expect(computeVat(0.7, { rate: 0.05, included: false }, "SAR").vat).toBe(0.04)
  expect(computeVat(1.5, { rate: 0.15, included: false }, "SAR").vat).toBe(0.23)
})

test("zero base and zero rate give zero VAT", () => {
  expect(computeVat(0, { rate: 0.15, included: true }, "SAR")).toEqual({ base: 0, vat: 0, total: 0 })
  expect(computeVat(0, { rate: 0.15, included: false }, "SAR")).toEqual({ base: 0, vat: 0, total: 0 })
  expect(computeVat(100, { rate: 0, included: false }, "SAR")).toEqual({ base: 100, vat: 0, total: 100 })
})

test("renders every line in en with Price", () => {
  const html = renderToString(
    <VatSummary subtotal={200} discount={20} shipping="free" codFee={10} vat={{ rate: 0.15, included: true }} />
  )
  for (const text of ["15%", ") included", "Subtotal", "Discount", "Free", "Cash on delivery fee", "Total"]) {
    expect(html).toContain(text)
  }
  expect(html).toContain('data-slot="price"')
})

test("renders in ar and hides VAT at rate 0", () => {
  const ar = renderToString(
    <VatSummary subtotal={200} shipping={25} vat={{ rate: 0.15, included: false }} lang="ar" labels={vatSummaryLabelsAr} />
  )
  expect(ar).toContain("ضريبة القيمة المضافة")
  expect(ar).toContain("الإجمالي")
  const none = renderToString(<VatSummary subtotal={200} vat={{ rate: 0, included: false }} />)
  expect(none).not.toContain("VAT")
})
