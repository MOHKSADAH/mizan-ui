import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { Installments, installmentsLabelsAr, splitInstallments } from "@/registry/ui/installments"

test("splits a total so the parts add up, remainder on the first", () => {
  const parts = splitInstallments(100, 3, "SAR")
  expect(parts).toEqual([33.34, 33.33, 33.33])
  expect(parts.reduce((a, b) => a + b, 0)).toBeCloseTo(100, 5)
  expect(splitInstallments(500, 4, "SAR")).toEqual([125, 125, 125, 125])
})

const start = new Date("2026-11-22T00:00:00Z")

test("renders the summary and a dated schedule in en", () => {
  const html = renderToString(<Installments total={500} startDate={start} provider={<i>LOGO</i>} />)
  expect(html).toContain("4 payments of")
  expect(html).toContain("LOGO")
  expect(html).toContain("Nov 22")
  expect(html).toContain("Dec 22")
  expect(html).toContain("<ol")
})

test("renders in ar and shows Today for the first payment", () => {
  const html = renderToString(<Installments total={500} lang="ar" labels={installmentsLabelsAr} />)
  expect(html).toContain("4 دفعات بقيمة")
  expect(html).toContain("اليوم")
})

test("renders nothing outside the min and max range", () => {
  expect(renderToString(<Installments total={50} min={100} />)).toBe("")
  expect(renderToString(<Installments total={9000} max={5000} />)).toBe("")
  expect(renderToString(<Installments total={500} min={100} max={5000} />)).not.toBe("")
})
