import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { OrderStepper, orderStepperLabelsAr } from "@/registry/ui/order-stepper"

const steps = [
  { id: "cart", label: "Cart" },
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
]

test("renders an ordered list with aria-current on the current step and a check on completed ones", () => {
  const html = renderToString(<OrderStepper steps={steps} current="payment" />)
  expect(html).toContain("<ol")
  expect(html.match(/aria-current="step"/g)).toHaveLength(1)
  expect(html).toContain(">Payment<")
  expect(html.match(/<svg/g)).toHaveLength(2)
  expect(html).toContain("Completed")
})

test("compact mode hides every label but the current one at all widths", () => {
  const html = renderToString(<OrderStepper steps={steps} current="address" compact />)
  expect(html).not.toContain("sm:not-sr-only")
  const wide = renderToString(<OrderStepper steps={steps} current="address" />)
  expect(wide).toContain("sm:not-sr-only")
})

test("renders in ar with Arabic-Indic digits when asked", () => {
  const html = renderToString(
    <OrderStepper
      steps={[
        { id: "a", label: "السلة" },
        { id: "b", label: "العنوان" },
        { id: "c", label: "الدفع" },
      ]}
      current="a"
      lang="ar"
      digits="arab"
      labels={orderStepperLabelsAr}
    />
  )
  expect(html).toContain("٢")
  expect(html).toContain("العنوان")
})
