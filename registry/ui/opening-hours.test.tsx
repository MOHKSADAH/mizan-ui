import { describe, expect, test } from "bun:test"
import { renderToString } from "react-dom/server"
import * as example from "@/registry/examples/opening-hours"
import { renderExamples } from "@/scripts/render-examples"
import {
  OpeningHours,
  OpeningHoursEditor,
  openStatus,
  openingHoursLabelsAr,
  type OpeningHoursValue,
  type Week,
} from "./opening-hours"

const d = (...i: [string, string][]) => i.map(([open, close]) => ({ open, close }))
const week: Week = [
  d(["09:00", "22:00"]),
  d(["09:00", "22:00"]),
  d(["09:00", "22:00"]),
  d(["09:00", "22:00"]),
  d(["09:00", "22:00"]),
  d(["09:00", "11:30"], ["13:30", "22:00"]),
  [],
]
const evening: Week = Array.from({ length: 7 }, () => d(["20:00", "24:00"]))
const plain: OpeningHoursValue = { week }
const withRamadan: OpeningHoursValue = { week, ramadan: { from: "2026-02-18", to: "2026-03-19", week: evening } }

describe("openStatus", () => {
  test("is open inside a shift and reports the closing time", () => {
    // Wed 2026-03-04 13:00 in Riyadh (UTC+3)
    expect(openStatus(plain, new Date("2026-03-04T10:00:00Z"))).toEqual({ open: true, closesAt: "22:00" })
  })

  test("is closed in the Friday gap and opens again the same day", () => {
    expect(openStatus(plain, new Date("2026-03-06T09:00:00Z"))).toEqual({
      open: false,
      next: { daysAhead: 0, day: 5, time: "13:30" },
    })
  })

  test("is closed on Saturday and opens on Sunday", () => {
    expect(openStatus(plain, new Date("2026-03-07T09:00:00Z"))).toEqual({
      open: false,
      next: { daysAhead: 1, day: 0, time: "09:00" },
    })
  })

  test("uses the time zone, not the runtime zone", () => {
    // 21:30 UTC on Wed is 00:30 on Thursday in Riyadh, after closing
    expect(openStatus(plain, new Date("2026-03-04T21:30:00Z"), "Asia/Riyadh")).toMatchObject({ open: false })
    expect(openStatus(plain, new Date("2026-03-04T21:30:00Z"), "UTC")).toEqual({ open: true, closesAt: "22:00" })
  })

  test("a Ramadan range replaces the regular hours", () => {
    expect(openStatus(withRamadan, new Date("2026-03-04T10:00:00Z"))).toEqual({
      open: false,
      next: { daysAhead: 0, day: 3, time: "20:00" },
    })
    expect(openStatus(withRamadan, new Date("2026-03-22T10:00:00Z")).open).toBe(true)
  })
})

describe("OpeningHours", () => {
  const now = new Date("2026-03-04T10:00:00Z")

  test("renders the status, the split shift and the Ramadan section", () => {
    const html = renderToString(<OpeningHours value={withRamadan} now={now} />)
    expect(html).toContain("Closed")
    expect(html).toContain("Opens at 8:00 PM")
    expect(html).toContain("1:30 PM")
    expect(html).toContain("Ramadan hours")
    expect(html).toContain('aria-current="date"')
  })

  test("renders in ar with Arabic times", () => {
    const html = renderToString(<OpeningHours lang="ar" value={plain} now={now} labels={openingHoursLabelsAr} />)
    expect(html).toContain("مفتوح الآن")
    expect(html).toContain("9:00 ص")
  })

  test("lists the two Friday ranges in time order, each time isolated, so rtl lays the first range at the start", () => {
    const html = renderToString(<OpeningHours lang="ar" value={plain} now={now} labels={openingHoursLabelsAr} />)
    const friday = html.split("<tr").find((row) => row.includes("الجمعة"))!
    const times = [...friday.matchAll(/<bdi>([^<]+)<\/bdi>/g)].map((m) => m[1])
    expect(times).toEqual(["9:00 ص", "11:30 ص", "1:30 م", "10:00 م"])
  })

  test("renders the editor in en and ar", () => {
    expect(renderToString(<OpeningHoursEditor defaultValue={withRamadan} />)).toContain("Add split shift")
    expect(renderToString(<OpeningHoursEditor lang="ar" labels={openingHoursLabelsAr} defaultValue={withRamadan} />)).toContain(
      openingHoursLabelsAr.ramadanOverride,
    )
  })

  test("renders every docs example in en and ar", () => {
    expect(renderExamples(example).every(Boolean)).toBe(true)
  })
})
