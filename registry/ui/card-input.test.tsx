import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import * as example from "@/registry/examples/card-input"
import { renderExamples } from "@/scripts/render-examples"
import {
  CardInput,
  cardCvcLength,
  cardExpiryStatus,
  cardInputLabelsAr,
  detectCardBrand,
  isValidCardNumber,
} from "@/registry/ui/card-input"

test("detects Visa, Mastercard and Amex from the first digits", () => {
  expect(detectCardBrand("4111 1111")).toBe("visa")
  expect(detectCardBrand("5555")).toBe("mastercard")
  expect(detectCardBrand("2221")).toBe("mastercard")
  expect(detectCardBrand("2720")).toBe("mastercard")
  expect(detectCardBrand("2721")).toBeUndefined()
  expect(detectCardBrand("3782")).toBe("amex")
  expect(detectCardBrand("6011")).toBeUndefined()
  expect(detectCardBrand("")).toBeUndefined()
})

test("a mada BIN wins over the Visa and Mastercard ranges, and only when passed in", () => {
  expect(detectCardBrand("4464041234567894")).toBe("visa")
  expect(detectCardBrand("4464041234567894", ["446404"])).toBe("mada")
  expect(detectCardBrand("5297410000000000", ["529741"])).toBe("mada")
  expect(detectCardBrand("4111111111111111", [""])).toBe("visa")
})

test("reads Arabic-Indic digits", () => {
  expect(detectCardBrand("٤١١١")).toBe("visa")
  expect(isValidCardNumber("٤١١١١١١١١١١١١١١١")).toBe(true)
})

test("checks the Luhn digit and the length of the brand", () => {
  expect(isValidCardNumber("4111111111111111")).toBe(true)
  expect(isValidCardNumber("4111111111111112")).toBe(false)
  expect(isValidCardNumber("5555555555554444")).toBe(true)
  expect(isValidCardNumber("2221000000000009")).toBe(true)
  expect(isValidCardNumber("378282246310005")).toBe(true)
  expect(isValidCardNumber("37828224631000")).toBe(false)
  expect(isValidCardNumber("4464041234567894", detectCardBrand("4464041234567894", ["446404"]))).toBe(true)
  expect(isValidCardNumber("")).toBe(false)
})

test("CVC is 4 digits for Amex and 3 for the rest", () => {
  expect(cardCvcLength("amex")).toBe(4)
  expect(cardCvcLength("visa")).toBe(3)
  expect(cardCvcLength()).toBe(3)
})

const now = new Date(2026, 10, 19)

test("expiry: valid through the end of its month, past dates expired", () => {
  expect(cardExpiryStatus("1126", now)).toBe("ok")
  expect(cardExpiryStatus("1226", now)).toBe("ok")
  expect(cardExpiryStatus("1025", now)).toBe("expired")
  expect(cardExpiryStatus("1026", now)).toBe("expired")
  expect(cardExpiryStatus("0130", now)).toBe("ok")
  expect(cardExpiryStatus("1326", now)).toBe("invalid")
  expect(cardExpiryStatus("0026", now)).toBe("invalid")
  expect(cardExpiryStatus("12", now)).toBe("incomplete")
})

test("renders three LTR fields with autocomplete, numeric input mode and labels", () => {
  const html = renderToString(<CardInput />)
  expect(html).toContain('autoComplete="cc-number"')
  expect(html).toContain('autoComplete="cc-exp"')
  expect(html).toContain('autoComplete="cc-csc"')
  expect(html).toContain('inputMode="numeric"')
  expect(html.match(/dir="ltr"/g)?.length).toBe(3)
  expect(html).toContain("Card number")
  expect(html).toContain("Expiry date")
  expect(html).toContain("Security code")
  expect(html).not.toContain(`aria-invalid="`)
})

test("shows the brand name as text and the passed icon", () => {
  const html = renderToString(<CardInput defaultValue={{ number: "4111111111111111" }} brandIcons={{ visa: <i>ICON</i> }} />)
  expect(html).toContain("Visa")
  expect(html).toContain("ICON")
  expect(html).toContain('value="4111 1111 1111 1111"')
})

test("groups Amex as 4-6-5 and allows a 4 digit CVC", () => {
  const html = renderToString(<CardInput defaultValue={{ number: "378282246310005", cvc: "1234" }} />)
  expect(html).toContain('value="3782 822463 10005"')
  expect(html).toContain('value="1234"')
  expect(html).toContain("American Express")
})

test("shows mada only with the BIN list", () => {
  const value = { number: "4464041234567894" }
  expect(renderToString(<CardInput defaultValue={value} />)).toContain("Visa")
  expect(renderToString(<CardInput defaultValue={value} madaBins={["446404"]} />)).toContain("mada")
})

test("renders in ar with Arabic labels", () => {
  const html = renderToString(<CardInput labels={cardInputLabelsAr} defaultValue={{ number: "4111111111111111" }} />)
  expect(html).toContain("رقم البطاقة")
  expect(html).toContain("فيزا")
})

test("renders every docs example in en and ar", () => {
  expect(renderExamples(example).every(Boolean)).toBe(true)
})
