import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { Rating, ratingLabelsAr } from "@/registry/ui/rating"

test("renders the label in en and ar", () => {
  const en = renderToString(<Rating value={4.8} count={120} showValue />)
  expect(en).toContain("4.8 out of 5, 120 reviews")
  const ar = renderToString(<Rating value={4.8} count={120} lang="ar" labels={ratingLabelsAr} />)
  expect(ar).toContain("4.8 من 5")
  expect(ar).toContain("120 تقييم")
})

test("fills each star by its share of the value", () => {
  const html = renderToString(<Rating value={3.5} />)
  expect(html).toContain("width:100%")
  expect(html).toContain("width:50%")
  expect(html).toContain("width:0%")
})

test("uses Arabic plural forms", () => {
  expect(ratingLabelsAr.count(1)).toBe("تقييم واحد")
  expect(ratingLabelsAr.count(2)).toBe("تقييمان")
  expect(ratingLabelsAr.count(5)).toBe("5 تقييمات")
  expect(ratingLabelsAr.count(11)).toBe("11 تقييمًا")
})
