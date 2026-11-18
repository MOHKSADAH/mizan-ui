import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/hijri-calendar"
import { renderExamples } from "@/scripts/render-examples"
import { HijriCalendar, hijriCalendarLabelsAr } from "./hijri-calendar"

const count = (html: string, needle: string) => html.split(needle).length - 1

describe("HijriCalendar", () => {
  test("lays out a Hijri month with Fri and Sat marked as weekend", () => {
    const html = renderToString(<HijriCalendar defaultValue="2026-03-04" />)
    expect(html).toContain("Ramadan 1447")
    expect(count(html, "data-iso=")).toBe(30)
    expect(count(html, 'data-weekend="true"')).toBe(8)
    expect(html).toContain('aria-selected="true"')
  })

  test("lays out a Gregorian month", () => {
    const html = renderToString(<HijriCalendar defaultValue="2026-03-04" defaultCalendar="gregory" />)
    expect(html).toContain("March 2026")
    expect(count(html, "data-iso=")).toBe(31)
  })

  test("weekend none removes the marks", () => {
    expect(renderToString(<HijriCalendar defaultValue="2026-03-04" weekend="none" />)).not.toContain('data-weekend="true"')
  })

  test("renders in ar", () => {
    const html = renderToString(<HijriCalendar lang="ar" defaultValue="2026-03-04" labels={hijriCalendarLabelsAr} />)
    expect(html).toContain("رمضان 1447")
    expect(html).toContain(hijriCalendarLabelsAr.hijri)
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
