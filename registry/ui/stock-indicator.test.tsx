import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { StockIndicator, stockIndicatorLabelsAr } from "@/registry/ui/stock-indicator"

test("renders each status with an icon and text in en", () => {
  expect(renderToString(<StockIndicator status="in" />)).toContain("In stock")
  expect(renderToString(<StockIndicator status="low" />)).toContain("Low stock")
  expect(renderToString(<StockIndicator status="low" count={3} />)).toContain("Only 3 left")
  const out = renderToString(<StockIndicator status="out" />)
  expect(out).toContain("Out of stock")
  expect(out).toContain("<svg")
})

test("renders Arabic plural forms of the low count", () => {
  const ar = (n: number) =>
    renderToString(<StockIndicator status="low" count={n} lang="ar" labels={stockIndicatorLabelsAr} />)
  expect(ar(1)).toContain("بقيت قطعة واحدة فقط")
  expect(ar(2)).toContain("بقيت قطعتان فقط")
  expect(ar(3)).toContain("بقيت 3 قطع فقط")
  expect(ar(12)).toContain("بقيت 12 قطعة فقط")
  expect(renderToString(<StockIndicator status="out" lang="ar" labels={stockIndicatorLabelsAr} />)).toContain("غير متوفر")
})
