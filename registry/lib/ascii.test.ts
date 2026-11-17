import { describe, expect, test } from "bun:test"

import { percentOf, renderBar, SPINNER_FRAMES } from "./ascii"

describe("SPINNER_FRAMES", () => {
  test("every variant has frames of equal width", () => {
    for (const frames of Object.values(SPINNER_FRAMES)) {
      expect(frames.length).toBeGreaterThan(1)
      expect(new Set(frames.map((f) => f.length)).size).toBe(1)
    }
  })
})

describe("renderBar", () => {
  test("always returns exactly width cells", () => {
    for (const v of [-5, 0, 1, 33, 57, 99, 100, 250]) {
      expect(renderBar(v, 100, 14)).toHaveLength(14)
      expect(renderBar(v, 100, 1)).toHaveLength(1)
    }
  })

  test("0 is all empty and 100% is all fill", () => {
    expect(renderBar(0, 100, 10)).toBe("----------")
    expect(renderBar(100, 100, 10)).toBe("##########")
  })

  test("57% of 14 matches the documented output", () => {
    expect(renderBar(57, 100, 14)).toBe("########------")
  })

  test("negative values clamp to empty, overflow clamps to full", () => {
    expect(renderBar(-40, 100, 6)).toBe("------")
    expect(renderBar(400, 100, 6)).toBe("######")
  })

  test("custom glyphs, max 0, NaN and bad widths do not throw", () => {
    expect(renderBar(1, 2, 4, "=", ".")).toBe("==..")
    expect(renderBar(5, 0, 4)).toBe("----")
    expect(renderBar(Number.NaN, 10, 4)).toBe("----")
    expect(renderBar(5, 10, -3)).toBe("")
  })
})

describe("percentOf", () => {
  test("rounds and clamps", () => {
    expect(percentOf(57, 100)).toBe(57)
    expect(percentOf(1, 3)).toBe(33)
    expect(percentOf(-1, 100)).toBe(0)
    expect(percentOf(500, 100)).toBe(100)
    expect(percentOf(1, 0)).toBe(0)
  })
})
