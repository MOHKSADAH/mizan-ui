import { describe, expect, test } from "bun:test"
import { saudiRegions } from "./saudi-regions"

describe("saudiRegions", () => {
  test("has the 13 administrative regions", () => {
    expect(saudiRegions).toHaveLength(13)
  })

  test("has unique codes in ISO 3166-2:SA form", () => {
    const codes = saudiRegions.map((r) => r.code)
    expect(new Set(codes).size).toBe(13)
    for (const code of codes) expect(code).toMatch(/^SA-\d{2}$/)
  })

  test("has non-empty names and 3 to 6 cities per region", () => {
    for (const r of saudiRegions) {
      expect(r.nameEn.trim()).not.toBe("")
      expect(r.nameAr.trim()).not.toBe("")
      expect(r.cities.length).toBeGreaterThanOrEqual(3)
      expect(r.cities.length).toBeLessThanOrEqual(6)
      for (const city of r.cities) {
        expect(city.nameEn.trim()).not.toBe("")
        expect(city.nameAr.trim()).not.toBe("")
      }
    }
  })

  test("has Arabic names in Arabic script and English names in Latin script", () => {
    for (const r of saudiRegions) {
      expect(r.nameAr).toMatch(/^[؀-ۿ\s]+$/)
      expect(r.nameEn).toMatch(/^[A-Za-z\s-]+$/)
      for (const city of r.cities) {
        expect(city.nameAr).toMatch(/^[؀-ۿ\s]+$/)
        expect(city.nameEn).toMatch(/^[A-Za-z\s-]+$/)
      }
    }
  })

  test("has no duplicate city within a region", () => {
    for (const r of saudiRegions) {
      expect(new Set(r.cities.map((x) => x.nameEn)).size).toBe(r.cities.length)
    }
  })
})
