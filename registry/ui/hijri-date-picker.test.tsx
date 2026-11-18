import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/hijri-date-picker"
import { renderExamples } from "@/scripts/render-examples"
import { HijriDatePicker, hijriDatePickerLabelsAr } from "./hijri-date-picker"

describe("HijriDatePicker", () => {
  test("shows both dates in the trigger, the Hijri one first", () => {
    const html = renderToString(<HijriDatePicker defaultValue="2026-03-04" />)
    expect(html).toContain("Ramadan 15, 1447 AH")
    expect(html).toContain("Mar 4, 2026")
    expect(html.indexOf("Ramadan")).toBeLessThan(html.indexOf("Mar 4"))
  })

  test("puts the Gregorian date first when that calendar is selected", () => {
    const html = renderToString(<HijriDatePicker defaultValue="2026-03-04" defaultCalendar="gregory" />)
    expect(html.indexOf("Mar 4")).toBeLessThan(html.indexOf("Ramadan"))
  })

  test("renders the placeholder in ar", () => {
    expect(renderToString(<HijriDatePicker lang="ar" labels={hijriDatePickerLabelsAr} />)).toContain(
      hijriDatePickerLabelsAr.placeholder,
    )
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
