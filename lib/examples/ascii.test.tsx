import { describe, expect, test } from "bun:test"
import type { ComponentType } from "react"
import { renderToString } from "react-dom/server"

import type { ExampleDoc, ExampleProps } from "@/registry/examples/types"
import * as asciiBox from "@/registry/examples/ascii-box"
import * as asciiChart from "@/registry/examples/ascii-chart"
import * as asciiProgress from "@/registry/examples/ascii-progress"
import * as asciiSpinner from "@/registry/examples/ascii-spinner"
import * as asciiText from "@/registry/examples/ascii-text"
import * as terminal from "@/registry/examples/terminal"

const modules = { asciiBox, asciiChart, asciiProgress, asciiSpinner, asciiText, terminal }

describe.each(Object.entries(modules))("%s example", (_, mod) => {
  const { doc } = mod as { doc: ExampleDoc }
  const components = mod as unknown as Record<string, ComponentType<ExampleProps>>

  test("has bilingual docs and 2 to 4 examples", () => {
    const names = Object.keys(doc.examples)
    expect(names.length).toBeGreaterThanOrEqual(2)
    expect(names.length).toBeLessThanOrEqual(4)
    for (const text of [doc.description, ...doc.accessibility, ...Object.values(doc.examples)]) {
      expect(text.en).toBeTruthy()
      expect(text.ar).toMatch(/[؀-ۿ]/)
    }
  })

  test("renders every example in en and ar", () => {
    for (const name of Object.keys(doc.examples)) {
      for (const lang of ["en", "ar"] as const) {
        const Example = components[name]
        expect(renderToString(<Example lang={lang} />)).toBeTruthy()
      }
    }
  })
})
