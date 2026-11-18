import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { SwatchSelect, swatchSelectLabelsAr, type SwatchOption } from "@/registry/ui/swatch-select"

const colors: SwatchOption[] = [
  { value: "red", label: "Red", color: "#b91c1c" },
  { value: "blue", label: "Blue", color: "#1d4ed8", outOfStock: true },
]

test("renders color swatches in en with the selected name and out-of-stock text", () => {
  const html = renderToString(<SwatchSelect label="Color" options={colors} defaultValue="red" />)
  expect(html).toContain("Red")
  expect(html).toContain("Blue, Out of stock")
  expect(html).toContain("Crossed-out options are out of stock")
  expect(html).toContain('role="radiogroup"')
})

test("renders size and image swatches in ar", () => {
  const sizes: SwatchOption[] = [
    { value: "s", label: "S" },
    { value: "m", label: "M", outOfStock: true },
    { value: "p", label: "نقشة", image: "/p.png" },
  ]
  const html = renderToString(
    <SwatchSelect label="المقاس" options={sizes} defaultValue="s" labels={swatchSelectLabelsAr} />
  )
  expect(html).toContain("M, غير متوفر")
  expect(html).toContain("line-through")
  expect(html).toContain("/p.png")
})

test("the selected mark never replaces the focus ring", () => {
  const html = renderToString(<SwatchSelect label="Size" options={[{ value: "s", label: "S" }, ...colors]} defaultValue="s" />)
  expect(html).not.toMatch(/data-checked:ring-/)
  expect(html).toContain("data-checked:outline-solid")
})

test("the group is named by the label only, not the selected value", () => {
  const html = renderToString(<SwatchSelect label="Color" options={colors} defaultValue="red" />)
  const id = html.match(/aria-labelledby="([^"]+)"/)?.[1]
  expect(html).toContain(`<span id="${id}" class="font-medium">Color</span>`)
})
