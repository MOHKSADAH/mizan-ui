import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/date-range-picker"
import { renderExamples } from "@/scripts/render-examples"
import {
  DateRangePicker,
  dateRangePickerLabels,
  dateRangePickerLabelsAr,
  nightsBetween,
  rangePreset,
} from "./date-range-picker"

const iso = (d?: Date) => (d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` : "")
const now = new Date(2026, 2, 15, 13, 30)

describe("date range presets", () => {
  test("computes each preset from the given day", () => {
    expect(rangePreset("today", now)).toEqual({ from: new Date(2026, 2, 15), to: new Date(2026, 2, 15) })
    expect(iso(rangePreset("last7Days", now).from)).toBe("2026-03-09")
    expect(iso(rangePreset("last30Days", now).from)).toBe("2026-02-14")
    const month = rangePreset("thisMonth", now)
    expect([iso(month.from), iso(month.to)]).toEqual(["2026-03-01", "2026-03-31"])
  })

  test("counts nights as calendar days", () => {
    expect(nightsBetween({ from: new Date(2026, 2, 1), to: new Date(2026, 2, 4) })).toBe(3)
    expect(nightsBetween({ from: new Date(2026, 2, 28), to: new Date(2026, 3, 1) })).toBe(4)
    expect(nightsBetween({ from: new Date(2026, 2, 1) })).toBeUndefined()
  })
})

describe("DateRangePicker", () => {
  const value = { from: new Date(2026, 2, 1), to: new Date(2026, 2, 4) }

  test("shows the range and the nights count", () => {
    const html = renderToString(<DateRangePicker defaultValue={value} nights />)
    expect(html).toContain("Mar 1, 2026")
    expect(html).toContain("Mar 4, 2026")
    expect(html).toContain("3 nights")
  })

  test("shows the Hijri dates when asked", () => {
    expect(renderToString(<DateRangePicker defaultValue={value} hijri />)).toContain("Ram. 12, 1447 AH")
  })

  test("uses Arabic plural forms for nights", () => {
    expect(dateRangePickerLabels.nights(1)).toBe("1 night")
    expect(dateRangePickerLabelsAr.nights(1)).toBe("ليلة")
    expect(dateRangePickerLabelsAr.nights(2)).toBe("ليلتان")
    expect(dateRangePickerLabelsAr.nights(3)).toBe("3 ليالٍ")
    expect(dateRangePickerLabelsAr.nights(11)).toBe("11 ليلة")
  })

  test("renders the placeholder in ar", () => {
    expect(renderToString(<DateRangePicker lang="ar" labels={dateRangePickerLabelsAr} />)).toContain(
      dateRangePickerLabelsAr.placeholder,
    )
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
