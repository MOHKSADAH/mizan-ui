import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/saudi-address-form"
import { renderExamples } from "@/scripts/render-examples"
import { SaudiAddressForm, saudiAddressFormLabels, saudiAddressFormLabelsAr } from "./saudi-address-form"

describe("SaudiAddressForm", () => {
  test("renders every label in en and ar", () => {
    const en = renderToString(<SaudiAddressForm />)
    const ar = renderToString(<SaudiAddressForm lang="ar" labels={saudiAddressFormLabelsAr} />)
    for (const key of ["district", "street", "buildingNumber", "postalCode", "additionalNumber", "shortAddress"] as const) {
      expect(en).toContain(saudiAddressFormLabels[key])
      expect(ar).toContain(saudiAddressFormLabelsAr[key])
    }
  })

  test("shows the format-only note for the short address", () => {
    expect(renderToString(<SaudiAddressForm />)).toContain("Format check only")
  })

  test("renders a default value", () => {
    expect(renderToString(<SaudiAddressForm defaultValue={{ postalCode: "12611", shortAddress: "RRRD2929" }} />)).toContain(
      'value="RRRD2929"',
    )
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
