import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { AsciiText } from "@/registry/ui/ascii/ascii-text"

describe("AsciiText", () => {
  test("renders aria-hidden pre, sr-only text and forces ltr", () => {
    const html = renderToString(<AsciiText text="Hi" as="h1" />)
    expect(html).toContain('<h1 dir="ltr">')
    expect(html).toContain('<pre aria-hidden="true" class="font-mono leading-none">')
    expect(html).toContain('<span class="sr-only">Hi</span>')
    expect(html).toContain("_   _")
  })

  test("renders every bundled font", () => {
    for (const font of ["Standard", "Small", "ANSI Shadow", "Big"] as const) {
      expect(renderToString(<AsciiText text="Ab" font={font} />)).toContain("<pre")
    }
  })
})
