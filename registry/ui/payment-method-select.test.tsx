import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import {
  PaymentMethodSelect,
  paymentMethodSelectLabelsAr,
  type PaymentMethod,
} from "@/registry/ui/payment-method-select"

const methods: PaymentMethod[] = [
  { id: "card", label: "Card", icon: <span>CARD-ICON</span>, details: <p>Card form here</p> },
  { id: "mada", label: "mada", description: "Saudi debit cards" },
  { id: "tabby", label: "Tabby", disabledReason: "Orders from SAR 100", icon: <span>TABBY-ICON</span> },
  { id: "cod", label: "Cash on delivery", fee: 10 },
  { id: "apple-pay", label: "Apple Pay", available: false },
]

test("renders methods, icon slots, fee, reason and the selected panel in en", () => {
  const html = renderToString(<PaymentMethodSelect label="Payment method" methods={methods} defaultValue="card" />)
  expect(html).toContain('role="radiogroup"')
  expect(html).toContain("CARD-ICON")
  expect(html).toContain("Card form here")
  expect(html).toContain("Orders from SAR 100")
  expect(html).toContain("Saudi debit cards")
  expect(html).toContain("Fee")
  expect(html).not.toContain("Apple Pay")
})

test("only the selected method shows details, and renders in ar", () => {
  const html = renderToString(
    <PaymentMethodSelect
      label="طريقة الدفع"
      methods={methods}
      defaultValue="mada"
      lang="ar"
      labels={paymentMethodSelectLabelsAr}
    />
  )
  expect(html).not.toContain("Card form here")
  expect(html).toContain("رسوم")
})
