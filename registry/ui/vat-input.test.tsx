import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/vat-input"
import { renderExamples } from "@/scripts/render-examples"
import { VatInput, vatInputLabelsAr } from "./vat-input"

describe("VatInput", () => {
  test("shows the 15 digits in groups of 4, LTR", () => {
    const html = renderToString(<VatInput defaultValue="300000000000003" />)
    expect(html).toContain('value="3000 0000 0000 003"')
    expect(html).toContain('dir="ltr"')
  })

  test("renders in ar with a copy button", () => {
    expect(renderToString(<VatInput labels={vatInputLabelsAr} />)).toContain(`aria-label="${vatInputLabelsAr.copy}"`)
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
