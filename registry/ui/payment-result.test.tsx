import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import * as example from "@/registry/examples/payment-result"
import { renderExamples } from "@/scripts/render-examples"
import { PaymentResult } from "@/registry/ui/payment-result"

test("processing is a busy status region with a spinner and no alert", () => {
  const html = renderToString(<PaymentResult status="processing" title="Confirming your payment" />)
  expect(html).toContain('role="status"')
  expect(html).toContain('aria-busy="true"')
  expect(html).toContain("Confirming your payment")
  expect(html).not.toContain('role="alert"')
})

test("success is a status region with the description and actions", () => {
  const html = renderToString(
    <PaymentResult status="success" title="Payment received" description="Order 10482" actions={<button>View order</button>} />
  )
  expect(html).toContain('role="status"')
  expect(html).not.toContain("aria-busy")
  expect(html).toContain("Order 10482")
  expect(html).toContain("View order")
})

test("failed is an alert with the reason and both actions", () => {
  const html = renderToString(
    <PaymentResult
      status="failed"
      title="Payment failed"
      reason="The bank declined the card"
      actions={
        <>
          <button>Try again</button>
          <button>Choose another method</button>
        </>
      }
    />
  )
  expect(html).toContain('role="alert"')
  expect(html).toContain("The bank declined the card")
  expect(html).toContain("Try again")
  expect(html).toContain("Choose another method")
})

test("the reason shows only for a failed payment", () => {
  expect(renderToString(<PaymentResult status="success" title="Done" reason="hidden reason" />)).not.toContain("hidden reason")
})

test("the title is a heading at the given level and no text is added", () => {
  const html = renderToString(<PaymentResult status="success" title="Done" headingLevel={3} />)
  expect(html).toContain("<h3")
  expect(html.replace(/<[^>]+>/g, "")).toBe("Done")
})

test("renders every docs example in en and ar", () => {
  expect(renderExamples(example).every(Boolean)).toBe(true)
})
