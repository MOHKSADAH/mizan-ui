import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/region-city-select"
import { renderExamples } from "@/scripts/render-examples"
import { RegionCitySelect, regionCitySelectLabelsAr } from "./region-city-select"

describe("RegionCitySelect", () => {
  test("shows names in the chosen language", () => {
    const en = renderToString(<RegionCitySelect defaultValue={{ region: "SA-04", city: "Dammam" }} />)
    expect(en).toContain('value="Eastern Province"')
    expect(en).toContain('value="Dammam"')
    const ar = renderToString(
      <RegionCitySelect lang="ar" labels={regionCitySelectLabelsAr} defaultValue={{ region: "SA-04", city: "Dammam" }} />,
    )
    expect(ar).toContain('value="المنطقة الشرقية"')
    expect(ar).toContain('value="الدمام"')
  })

  test("disables the city until a region is chosen", () => {
    expect(renderToString(<RegionCitySelect />)).toContain("disabled")
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
