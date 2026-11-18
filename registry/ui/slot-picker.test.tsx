import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/slot-picker"
import { renderExamples } from "@/scripts/render-examples"
import { SlotPicker, slotPickerLabelsAr } from "./slot-picker"

const slots = {
  "2026-03-04": [{ time: "09:30" }, { time: "13:00", disabled: true }, { time: "19:00" }],
  "2026-03-06": [{ time: "10:00" }],
}
const base = { startDate: "2026-03-04", days: 4, slots }
const count = (html: string, needle: string) => html.split(needle).length - 1

describe("SlotPicker", () => {
  test("uses radiogroup semantics and disables days without slots", () => {
    const html = renderToString(<SlotPicker {...base} />)
    expect(count(html, 'role="radiogroup"')).toBe(1)
    expect(count(html, 'role="radio"')).toBe(4)
    expect(count(html, 'data-disabled=""')).toBeGreaterThanOrEqual(2)
  })

  test("marks Friday and Saturday as the weekend", () => {
    expect(count(renderToString(<SlotPicker {...base} />), 'data-weekend="true"')).toBe(2)
    expect(count(renderToString(<SlotPicker {...base} weekend="none" />), 'data-weekend="true"')).toBe(0)
  })

  test("groups times and uses Arabic AM and PM", () => {
    const value = { date: "2026-03-04", time: "" }
    const en = renderToString(<SlotPicker {...base} defaultValue={value} />)
    expect(en).toContain("Morning")
    expect(en).toContain("Evening")
    expect(en).toContain("Afternoon")
    expect(en).toMatch(/9:30\s?AM/)
    const ar = renderToString(<SlotPicker {...base} lang="ar" labels={slotPickerLabelsAr} defaultValue={value} />)
    expect(ar).toContain("9:30 ص")
    expect(ar).toContain("7:00 م")
  })

  test("shows the hint until a day is picked", () => {
    expect(renderToString(<SlotPicker {...base} />)).toContain("Pick a day")
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
