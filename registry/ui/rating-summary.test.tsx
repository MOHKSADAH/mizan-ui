import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { RatingSummary, ratingSummaryLabelsAr } from "@/registry/ui/rating-summary"

const distribution = [150, 60, 20, 10, 10]

test("shows the average, the total and a spoken row per star", () => {
  const html = renderToString(<RatingSummary average={4.4} distribution={distribution} />)
  expect(html).toContain("4.4")
  expect(html).toContain("Based on 250 reviews")
  expect(html).toContain("5 stars: 150 reviews")
  expect(html).toContain("1 star: 10 reviews")
})

test("a bar is as wide as its share of the total", () => {
  const html = renderToString(<RatingSummary average={4.4} distribution={distribution} />)
  expect(html).toContain("width:60%")
  expect(html).toContain("width:4%")
})

test("count overrides the sum and an empty distribution has zero-width bars", () => {
  expect(renderToString(<RatingSummary average={4} distribution={distribution} count={1000} />)).toContain("Based on 1,000 reviews")
  expect(renderToString(<RatingSummary average={0} distribution={[0, 0, 0, 0, 0]} />)).not.toContain("NaN")
})

test("renders Arabic labels and plural forms", () => {
  const html = renderToString(
    <RatingSummary average={4.4} distribution={distribution} lang="ar" labels={ratingSummaryLabelsAr} />
  )
  expect(html).toContain("بناءً على 250 تقييم")
  expect(html).toContain("4.4 من 5")
  expect(ratingSummaryLabelsAr.row(2, 2)).toBe("نجمتان: تقييمان")
  expect(ratingSummaryLabelsAr.total(1)).toBe("بناءً على تقييم واحد")
})
