import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { DayPicker, dayPickerLabelsAr, defaultWeekStart, summarize, weekdayName, weekdayOrder } from "@/registry/ui/day-picker"

test("the week starts on Saturday for ar and Sunday for en", () => {
  expect(defaultWeekStart("ar")).toBe(6)
  expect(defaultWeekStart("en")).toBe(0)
  expect(weekdayOrder(6)).toEqual([6, 0, 1, 2, 3, 4, 5])
  expect(weekdayOrder(0)).toEqual([0, 1, 2, 3, 4, 5, 6])
  expect(weekdayOrder(1)).toEqual([1, 2, 3, 4, 5, 6, 0])
})

test("weekday names follow the locale", () => {
  expect(weekdayName(6, { lang: "en" }, "long")).toBe("Saturday")
  expect(weekdayName(6, { lang: "ar" }, "long")).toBe("السبت")
})

test("renders the chips in week order with the full day as the name", () => {
  const html = renderToString(<DayPicker lang="ar" labels={dayPickerLabelsAr} defaultValue={{ frequency: "weekly", days: [6] }} />)
  const names = [...html.matchAll(/aria-label="([^"]+)"/g)].map((m) => m[1]).filter((n) => n !== dayPickerLabelsAr.days)
  expect(names.slice(0, 3)).toEqual(["السبت", "الأحد", "الاثنين"])
  expect(html).toContain("<fieldset")
  expect(html).toContain('aria-pressed="true"')
})

test("the weekday row is inert unless the frequency is weekly", () => {
  const daily = renderToString(<DayPicker defaultValue={{ frequency: "daily", days: [] }} />)
  const weekly = renderToString(<DayPicker defaultValue={{ frequency: "weekly", days: [1] }} />)
  expect(daily).toContain("inert")
  expect(weekly).not.toContain("inert")
})

test("the summary reads the choice back in both languages", () => {
  const en = { lang: "en" as const }
  expect(summarize({ frequency: "daily", days: [] }, { ...dayPickerLabelsAr }, { lang: "ar" }, 6)).toBe("كل يوم")
  expect(summarize({ frequency: "weekly", days: [] }, { ...dayPickerLabelsAr }, { lang: "ar" }, 6)).toContain("يومًا واحدًا")
  const labels = { ...dayPickerLabelsAr }
  expect(summarize({ frequency: "weekly", days: [1, 6] }, labels, { lang: "ar" }, 6)).toBe("أسبوعيًا يومي السبت والاثنين")
  const html = renderToString(<DayPicker lang={en.lang} defaultValue={{ frequency: "weekly", days: [0, 6] }} />)
  expect(html).toContain("Weekly on Sunday and Saturday")
})
