import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { DeliveryEstimate, deliveryEstimateLabelsAr } from "@/registry/ui/delivery-estimate"

const date = new Date("2026-11-22T09:00:00Z")

test("renders the arrival date in en, in the given time zone", () => {
  const html = renderToString(<DeliveryEstimate date={date} />)
  expect(html).toContain("Arrives Sun, Nov 22")
})

test("the day follows the time zone", () => {
  const late = new Date("2026-11-22T22:30:00Z")
  expect(renderToString(<DeliveryEstimate date={late} timeZone="Asia/Riyadh" />)).toContain("Nov 23")
  expect(renderToString(<DeliveryEstimate date={late} timeZone="UTC" />)).toContain("Nov 22")
})

test("renders the city slot and free shipping progress", () => {
  const html = renderToString(
    <DeliveryEstimate date={date} city={<b>Riyadh</b>} freeShipping={{ threshold: 200, subtotal: 151 }} />
  )
  expect(html).toContain("Deliver to")
  expect(html).toContain("Riyadh")
  expect(html).toContain("away from free shipping")
  expect(html).toContain("49.00 Saudi riyals")
  expect(html).toContain('role="progressbar"')
})

test("shows a reached message instead of progress", () => {
  const html = renderToString(<DeliveryEstimate date={date} freeShipping={{ threshold: 200, subtotal: 260 }} />)
  expect(html).toContain("You get free shipping")
  expect(html).not.toContain("progressbar")
})

test("renders in ar", () => {
  const html = renderToString(
    <DeliveryEstimate
      date={date}
      lang="ar"
      labels={deliveryEstimateLabelsAr}
      freeShipping={{ threshold: 200, subtotal: 151 }}
    />
  )
  expect(html).toContain("يصل")
  expect(html).toContain("للحصول على شحن مجاني")
})
