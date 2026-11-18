import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { CouponInput, couponInputLabelsAr } from "@/registry/ui/coupon-input"

const noop = () => {}

test("idle renders the input, apply button and an empty live region", () => {
  const html = renderToString(<CouponInput onApply={noop} onRemove={noop} />)
  expect(html).toContain("Coupon code")
  expect(html).toContain("Apply")
  expect(html).toContain('aria-live="polite"')
})

test("pending disables apply and announces it", () => {
  const html = renderToString(<CouponInput status="pending" onApply={noop} onRemove={noop} />)
  expect(html).toContain("Checking the code")
  expect(html).toContain('aria-busy="true"')
})

test("error marks the input invalid and shows the text", () => {
  const html = renderToString(<CouponInput status="error" message="Code expired" onApply={noop} onRemove={noop} />)
  expect(html).toContain('aria-invalid="true"')
  expect(html).toContain("Code expired")
})

test("success shows the applied code as a chip with remove, in ar", () => {
  const html = renderToString(
    <CouponInput status="success" appliedCode="RAMADAN20" onApply={noop} onRemove={noop} labels={couponInputLabelsAr} />
  )
  expect(html).toContain("RAMADAN20")
  expect(html).toContain("إزالة القسيمة RAMADAN20")
  expect(html).toContain("تم تطبيق القسيمة")
  expect(html).not.toContain("<input")
})
