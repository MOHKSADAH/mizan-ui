import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"

const statuses: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled", "refunded"]

test("renders every status with an icon and its text in en", () => {
  for (const status of statuses) {
    const html = renderToString(<StatusBadge status={status} />)
    expect(html).toContain("<svg")
    expect(html).toContain(`data-status="${status}"`)
  }
  expect(renderToString(<StatusBadge status="shipped" />)).toContain("Shipped")
})

test("renders Arabic labels", () => {
  for (const status of statuses) {
    expect(renderToString(<StatusBadge status={status} labels={statusBadgeLabelsAr} />)).toContain(
      statusBadgeLabelsAr[status]
    )
  }
})
