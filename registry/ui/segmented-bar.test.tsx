import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { SegmentedBar } from "@/registry/ui/segmented-bar"

const segments = [
  { id: "a", value: 5, label: "Invoices", valueLabel: "$5" },
  { id: "b", value: 15, label: "Support", valueLabel: "$15" },
]

test("sizes each part against the total and leaves the rest empty", () => {
  const html = renderToString(<SegmentedBar segments={segments} total={40} legend />)
  expect(html).toContain("width:12.5%")
  expect(html).toContain("width:37.5%")
})

test("raises a total below the sum to the sum", () => {
  const html = renderToString(<SegmentedBar segments={segments} total={10} />)
  expect(html).toContain("width:25%")
  expect(html).toContain("width:75%")
})

test("the legend is the text alternative; without one the bar is an image", () => {
  const withLegend = renderToString(<SegmentedBar segments={segments} legend />)
  expect(withLegend).toContain("Invoices")
  expect(withLegend).toContain("$15")
  expect(withLegend).not.toContain('role="img"')
  const bare = renderToString(<SegmentedBar segments={segments} aria-label="Budget" />)
  expect(bare).toContain('role="img"')
  expect(bare).toContain('aria-label="Budget"')
})

test("skips empty parts and cycles the series tones", () => {
  const html = renderToString(<SegmentedBar segments={[{ id: "z", value: 0 }, ...segments]} />)
  expect(html.match(/data-slot="segmented-bar-segment"/g)).toHaveLength(2)
  expect(html).toContain("bg-series-2")
})
