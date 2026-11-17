import { describe, expect, test } from "bun:test"
import { formatHijri, hijriParts } from "./hijri"

const lastOfShaban = new Date("2026-02-17T12:00:00Z")
const firstOfRamadan = new Date("2026-02-18T12:00:00Z")

describe("hijriParts", () => {
  test("returns numbers around 1 Ramadan 1447", () => {
    expect(hijriParts(lastOfShaban)).toEqual({ year: 1447, month: 8, day: 29 })
    expect(hijriParts(firstOfRamadan)).toEqual({ year: 1447, month: 9, day: 1 })
    expect(hijriParts(new Date("2026-02-19T12:00:00Z"))).toEqual({ year: 1447, month: 9, day: 2 })
  })

  test("defaults to the Asia/Riyadh day, not UTC", () => {
    const lateUtc = new Date("2026-02-17T21:30:00Z")
    expect(hijriParts(lateUtc)).toEqual({ year: 1447, month: 9, day: 1 })
    expect(hijriParts(lateUtc, "UTC")).toEqual({ year: 1447, month: 8, day: 29 })
  })
})

describe("formatHijri", () => {
  test("formats Arabic with Latin digits by default", () => {
    expect(formatHijri(firstOfRamadan)).toBe("1 رمضان 1447 هـ")
  })

  test("formats Arabic with Arabic-Indic digits", () => {
    expect(formatHijri(firstOfRamadan, { lang: "ar", digits: "arab" })).toBe("١ رمضان ١٤٤٧ هـ")
  })

  test("formats English", () => {
    expect(formatHijri(firstOfRamadan, { lang: "en" })).toBe("Ramadan 1, 1447 AH")
  })

  test("applies the Riyadh time zone by default and honors an override", () => {
    const lateUtc = new Date("2026-02-17T21:30:00Z")
    expect(formatHijri(lateUtc, { lang: "en" })).toBe("Ramadan 1, 1447 AH")
    expect(formatHijri(lateUtc, { lang: "en", timeZone: "UTC" })).toBe("Shaʻban 29, 1447 AH")
  })

  test("passes Intl options through", () => {
    expect(formatHijri(firstOfRamadan, { lang: "en", month: "numeric", day: "2-digit" })).toBe("9/01/1447 AH")
    expect(formatHijri(firstOfRamadan, { lang: "en", weekday: "long" })).toContain("Wednesday")
  })
})
