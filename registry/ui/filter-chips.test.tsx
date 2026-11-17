import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { FilterChips, filterChipsLabelsAr } from "@/registry/ui/filter-chips"

const filters = [
  { id: "color", label: "Color: Red" },
  { id: "size", label: "Size: M" },
]

test("renders chips, clear all and the result count in en", () => {
  const html = renderToString(<FilterChips filters={filters} onRemove={() => {}} onClearAll={() => {}} resultCount={1} />)
  expect(html).toContain("Remove filter: Color: Red")
  expect(html).toContain("Clear all")
  expect(html).toContain("1 result<")
  expect(html).toContain('aria-live="polite"')
})

test("renders in ar with plural results", () => {
  const html = renderToString(
    <FilterChips
      filters={filters}
      onRemove={() => {}}
      onClearAll={() => {}}
      resultCount={3}
      lang="ar"
      labels={filterChipsLabelsAr}
    />
  )
  expect(html).toContain("مسح الكل")
  expect(html).toContain("3 نتائج")
  expect(filterChipsLabelsAr.results(2)).toBe("نتيجتان")
})

test("keeps the live region when no filters are active", () => {
  const html = renderToString(<FilterChips filters={[]} onRemove={() => {}} onClearAll={() => {}} resultCount={0} />)
  expect(html).not.toContain("Clear all")
  expect(html).toContain("0 results")
})

test("the root can take focus when the last chip or clear all unmounts", () => {
  const html = renderToString(<FilterChips filters={filters} onRemove={() => {}} onClearAll={() => {}} />)
  expect(html).toMatch(/^<div[^>]*data-slot="filter-chips"[^>]*tabindex="-1"/)
})
