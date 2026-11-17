import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { CompareTray, compareTrayLabelsAr } from "@/registry/ui/compare-tray"

const noop = () => {}
const items = [
  { id: "a", name: "Phone A", image: "/a.jpg" },
  { id: "b", name: "Phone B" },
]

test("renders items, count and an enabled compare button in en", () => {
  const html = renderToString(<CompareTray items={items} onRemove={noop} onClear={noop} onCompare={noop} />)
  expect(html).toContain("2 of 4 products")
  expect(html).toContain("Remove Phone A from the comparison")
  expect(html).toContain("Clear all")
  expect(html).not.toContain("Add at least")
  expect(html).not.toMatch(/ disabled[ =>]/)
})

test("disables compare below the minimum and says why", () => {
  const html = renderToString(<CompareTray items={items.slice(0, 1)} onRemove={noop} onClear={noop} onCompare={noop} />)
  expect(html).toContain("Add at least 2 products to compare")
  expect(html).toMatch(/ disabled[ =>]/)
})

test("renders in ar and an empty tray has no clear button", () => {
  const html = renderToString(
    <CompareTray items={[]} onRemove={noop} onClear={noop} onCompare={noop} lang="ar" labels={compareTrayLabelsAr} />
  )
  expect(html).toContain("0 من 4 منتجات")
  expect(html).toContain("قارن")
  expect(html).not.toContain("مسح الكل")
})
