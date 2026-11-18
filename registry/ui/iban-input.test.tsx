import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/iban-input"
import { renderExamples } from "@/scripts/render-examples"
import { IbanInput, ibanInputLabelsAr } from "./iban-input"

describe("IbanInput", () => {
  test("shows the value in groups of 4, LTR", () => {
    const html = renderToString(<IbanInput defaultValue="SA0380000000608010167519" />)
    expect(html).toContain('value="SA03 8000 0000 6080 1016 7519"')
    expect(html).toContain('dir="ltr"')
  })

  test("renders in ar with a copy button", () => {
    const html = renderToString(<IbanInput labels={ibanInputLabelsAr} />)
    expect(html).toContain(`aria-label="${ibanInputLabelsAr.copy}"`)
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
