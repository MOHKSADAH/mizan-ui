import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { SPINNER_FRAMES, type SpinnerVariant } from "@/registry/lib/ascii"
import { AsciiProgress } from "@/registry/ui/ascii/ascii-progress"
import { AsciiSpinner } from "@/registry/ui/ascii/ascii-spinner"
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

describe("AsciiSpinner", () => {
  test("renders a status with a static first frame and sr-only label", () => {
    const html = renderToString(<AsciiSpinner variant="line" label="Saving" />)
    expect(html).toContain('role="status"')
    expect(html).toContain('<span aria-hidden="true" dir="ltr" class="whitespace-pre">|</span>')
    expect(html).toContain('<span class="sr-only">Saving</span>')
  })

  test("renders every variant", () => {
    for (const variant of Object.keys(SPINNER_FRAMES) as SpinnerVariant[]) {
      expect(renderToString(<AsciiSpinner variant={variant} label="x" />)).toContain("whitespace-pre")
    }
  })
})

describe("AsciiProgress", () => {
  test("renders the bar, percent and aria-value attributes", () => {
    const html = renderToString(<AsciiProgress value={57} width={14} />)
    expect(html).toContain('role="progressbar"')
    expect(html).toContain('aria-valuemin="0"')
    expect(html).toContain('aria-valuemax="100"')
    expect(html).toContain('aria-valuenow="57"')
    expect(html).toContain("[########------]")
    expect(html).toContain('<bdi dir="ltr">57%</bdi>')
  })

  test("clamps aria-valuenow and can hide the percent", () => {
    const html = renderToString(<AsciiProgress value={-3} max={10} showPercent={false} fill="=" empty="." width={4} />)
    expect(html).toContain('aria-valuenow="0"')
    expect(html).toContain("[....]")
    expect(html).not.toContain("%</bdi>")
  })
})
