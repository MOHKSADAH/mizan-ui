import { describe, expect, test } from "bun:test"

import { SPINNER_FRAMES } from "./ascii"

describe("SPINNER_FRAMES", () => {
  test("every variant has frames of equal width", () => {
    for (const frames of Object.values(SPINNER_FRAMES)) {
      expect(frames.length).toBeGreaterThan(1)
      expect(new Set(frames.map((f) => f.length)).size).toBe(1)
    }
  })
})
