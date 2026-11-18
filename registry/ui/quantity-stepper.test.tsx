import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { QuantityStepper, quantityStepperLabelsAr } from "@/registry/ui/quantity-stepper"

test("renders in en and ar", () => {
  const en = renderToString(<QuantityStepper defaultValue={2} max={5} />)
  expect(en).toContain("Increase quantity")
  const ar = renderToString(<QuantityStepper defaultValue={2} lang="ar" labels={quantityStepperLabelsAr} />)
  expect(ar).toContain("زيادة الكمية")
  expect(ar).toContain("إنقاص الكمية")
})

test("decrease becomes remove at the minimum when onRemove is set", () => {
  const atMin = renderToString(<QuantityStepper defaultValue={1} onRemove={() => {}} />)
  expect(atMin).toContain("Remove item")
  expect(atMin).not.toContain("Decrease quantity")
  const above = renderToString(<QuantityStepper defaultValue={2} onRemove={() => {}} />)
  expect(above).toContain("Decrease quantity")
})
