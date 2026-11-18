import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/phone-input"
import { renderExamples } from "@/scripts/render-examples"
import { PhoneInput, phoneInputLabelsAr } from "./phone-input"

describe("PhoneInput", () => {
  test("defaults to Saudi Arabia with the prefix visible and in the label", () => {
    const html = renderToString(<PhoneInput label="Mobile" />)
    expect(html).toContain("+966")
    expect(html).toContain("sr-only")
  })

  test("formats a default E.164 value as a national number in its own country", () => {
    expect(renderToString(<PhoneInput defaultValue="+966512345678" />)).toContain('value="051 234 5678"')
    expect(renderToString(<PhoneInput defaultValue="+971501234567" />)).toContain("+971")
  })

  test("shows a controlled E.164 value over defaultValue", () => {
    const html = renderToString(<PhoneInput value="+971501234567" defaultValue="+966512345678" />)
    expect(html).toContain("+971")
    expect(html).toContain('value="050 123 4567"')
  })

  test("renders in ar", () => {
    expect(renderToString(<PhoneInput lang="ar" labels={phoneInputLabelsAr} label="الجوال" />)).toContain("+966")
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
