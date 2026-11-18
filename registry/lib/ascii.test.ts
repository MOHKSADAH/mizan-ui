import { describe, expect, test } from "bun:test"

import {
  blockBar,
  commandText,
  percentOf,
  renderBar,
  sparkline,
  SPINNER_FRAMES,
  type TerminalLine,
  typedText,
  typingCost,
} from "./ascii"

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

describe("blockBar", () => {
  test("never exceeds width, 0 is empty, 100% is full", () => {
    for (const v of [-5, 0, 1, 33, 57, 99, 100, 250]) {
      expect(blockBar(v, 100, 10).length).toBeLessThanOrEqual(10)
    }
    expect(blockBar(0, 100, 10)).toBe("")
    expect(blockBar(100, 100, 4)).toBe("████")
  })

  test("uses partial blocks for the remainder", () => {
    expect(blockBar(1, 8, 1)).toBe("▏")
    expect(blockBar(4, 8, 1)).toBe("▌")
    expect(blockBar(7, 8, 1)).toBe("▉")
    expect(blockBar(50, 100, 5)).toBe("██▌")
  })

  test("negative values clamp to empty, max 0 does not throw", () => {
    expect(blockBar(-3, 10, 5)).toBe("")
    expect(blockBar(3, 0, 5)).toBe("")
  })
})

describe("sparkline", () => {
  test("maps the max to the tallest block and 0 to the lowest", () => {
    expect(sparkline([0, 7])).toBe("▁█")
    expect(sparkline([0, 1, 2, 3, 4, 5, 6, 7])).toBe("▁▂▃▄▅▆▇█")
  })

  test("returns one character per value, clamps negatives", () => {
    expect(sparkline([5, -9, 5])).toHaveLength(3)
    expect(sparkline([5, -9, 5])).toBe("█▁█")
  })

  test("empty array and all zeros", () => {
    expect(sparkline([])).toBe("")
    expect(sparkline([0, 0])).toBe("▁▁")
  })
})

describe("terminal helpers", () => {
  const lines: TerminalLine[] = [
    { type: "comment", text: "install" },
    { type: "command", text: "bun add x" },
    { type: "output", text: "done" },
    { type: "command", text: "bun dev" },
  ]

  test("commandText keeps commands only", () => {
    expect(commandText(lines)).toBe("bun add x\nbun dev")
    expect(commandText([])).toBe("")
  })

  test("typingCost is the length for commands and 1 otherwise", () => {
    expect(lines.map(typingCost)).toEqual([1, 9, 1, 7])
  })

  test("typedText types commands per character and reveals other lines at once", () => {
    expect(typedText(lines[1], -1)).toBe("")
    expect(typedText(lines[1], 3)).toBe("bun")
    expect(typedText(lines[1], 99)).toBe("bun add x")
    expect(typedText(lines[2], 0)).toBe("")
    expect(typedText(lines[2], 1)).toBe("done")
  })
})
