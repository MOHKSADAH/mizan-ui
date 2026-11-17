import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { SPINNER_FRAMES, type SpinnerVariant } from "@/registry/lib/ascii"
import { AsciiBox, AsciiDivider } from "@/registry/ui/ascii/ascii-box"
import { AsciiBarChart, AsciiSparkline } from "@/registry/ui/ascii/ascii-chart"
import { AsciiProgress } from "@/registry/ui/ascii/ascii-progress"
import { AsciiSpinner } from "@/registry/ui/ascii/ascii-spinner"
import { AsciiText } from "@/registry/ui/ascii/ascii-text"
import { Terminal } from "@/registry/ui/ascii/terminal"

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
    const html = renderToString(<AsciiProgress value={57} width={14} label="Upload" />)
    expect(html).toContain('role="progressbar"')
    expect(html).toContain('aria-label="Upload"')
    expect(html).toContain('aria-valuemin="0"')
    expect(html).toContain('aria-valuemax="100"')
    expect(html).toContain('aria-valuenow="57"')
    expect(html).toContain("[########------]")
    expect(html).toContain('<bdi dir="ltr">57%</bdi>')
  })

  test("clamps aria-valuenow and can hide the percent", () => {
    const html = renderToString(<AsciiProgress value={-3} max={10} showPercent={false} fill="=" empty="." width={4} label="Upload" />)
    expect(html).toContain('aria-valuenow="0"')
    expect(html).toContain("[....]")
    expect(html).not.toContain("%</bdi>")
  })
})

describe("AsciiBox", () => {
  test("renders a titled fieldset with real DOM children", () => {
    const html = renderToString(
      <AsciiBox variant="double" title="Status">
        <p>All good</p>
      </AsciiBox>,
    )
    expect(html).toContain("<fieldset")
    expect(html).toContain('<legend class="px-[1ch]">Status</legend>')
    expect(html).toContain("border-double")
    expect(html).toContain("<p>All good</p>")
  })

  test("renders every style, and a plain div without a title", () => {
    for (const variant of ["single", "double", "rounded", "heavy", "ascii"] as const) {
      const html = renderToString(<AsciiBox variant={variant}>x</AsciiBox>)
      expect(html).toStartWith("<div")
      expect(html).not.toContain("legend")
    }
  })
})

describe("AsciiDivider", () => {
  test("renders a separator with a centered label between two lines", () => {
    const html = renderToString(<AsciiDivider variant="double" label="Or" />)
    expect(html).toContain('role="separator"')
    expect(html).toContain('aria-label="Or"')
    expect(html.match(/═/g)?.length).toBe(600)
    expect(html).toContain("<span>Or</span>")
  })

  test("renders one line without a label", () => {
    const html = renderToString(<AsciiDivider variant="ascii" />)
    expect(html).not.toContain("aria-label")
    expect(html.match(/-{300}/g)).toHaveLength(1)
  })
})

describe("AsciiBarChart", () => {
  const data = [
    { label: "Mon", value: 8 },
    { label: "Tue", value: 4 },
  ]

  test("hides the visible text and exposes an sr-only table", () => {
    const html = renderToString(<AsciiBarChart data={data} width={4} format={(n) => `${n}k`} caption="Visits" />)
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain("████")
    expect(html).toContain("██<")
    expect(html).toContain('<table class="sr-only"><caption>Visits</caption>')
    expect(html).toContain('<th scope="row">Mon</th><td>8k</td>')
  })

  test("renders an empty array", () => {
    expect(renderToString(<AsciiBarChart data={[]} />)).toContain('<table class="sr-only">')
  })
})

describe("AsciiSparkline", () => {
  test("renders the sparkline and the table", () => {
    const html = renderToString(<AsciiSparkline data={[{ label: "a", value: 0 }, { label: "b", value: 7 }]} />)
    expect(html).toContain(">▁█<")
    expect(html).toContain('<th scope="row">b</th><td>7</td>')
  })
})

describe("Terminal", () => {
  const lines = [
    { type: "comment", text: "install" },
    { type: "command", text: "bun add x" },
    { type: "output", text: "done" },
  ] as const

  test("renders ltr window, neutral dots, title, prompt and a labelled copy button", () => {
    const html = renderToString(<Terminal title="zsh" lines={[...lines]} copyLabel="Copy" copiedLabel="Copied" copyFailedLabel="Copy failed" />)
    expect(html).toContain('dir="ltr"')
    expect(html.match(/bg-muted-foreground\/40/g)).toHaveLength(3)
    expect(html).toContain(">zsh<")
    expect(html).toContain("$ ")
    expect(html).toContain("# ")
    expect(html).toContain('aria-label="Copy"')
    expect(html).toContain(">bun add x<")
    expect(html).toContain(">done<")
  })
  test("renders an empty polite live region and no clipboard fallback until a copy fails", () => {
    const html = renderToString(<Terminal lines={[...lines]} copyLabel="Copy" copiedLabel="Copied" copyFailedLabel="Copy failed" />)
    expect(html).toContain('<span aria-live="polite" class="sr-only"></span>')
    expect(html).not.toContain("<textarea")
  })

  test("typing mode hides the text until it plays", () => {
    const html = renderToString(<Terminal lines={[...lines]} typing copyLabel="Copy" copiedLabel="Copied" copyFailedLabel="Copy failed" />)
    expect(html).not.toContain("<span>bun add x</span>")
    expect(html).toContain('<span class="invisible">bun add x</span>')
  })
})
