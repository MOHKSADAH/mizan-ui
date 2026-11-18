import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/saudi-id-input"
import { renderExamples } from "@/scripts/render-examples"
import { SaudiIdInput, saudiIdInputLabelsAr } from "./saudi-id-input"

describe("SaudiIdInput", () => {
  test("renders in en and ar", () => {
    expect(renderToString(<SaudiIdInput />)).toContain('dir="ltr"')
    expect(renderToString(<SaudiIdInput labels={saudiIdInputLabelsAr} showHint defaultValue="1" />)).toContain(
      saudiIdInputLabelsAr.citizen,
    )
  })

  test("shows the resident hint from the first digit", () => {
    expect(renderToString(<SaudiIdInput showHint defaultValue="2" />)).toContain("resident Iqama")
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
