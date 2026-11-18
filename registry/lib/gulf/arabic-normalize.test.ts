import { describe, expect, test } from "bun:test"
import { arabicIncludes, normalizeArabic } from "./arabic-normalize"

describe("normalizeArabic", () => {
  test("strips tashkeel", () => {
    expect(normalizeArabic("مُحَمَّد")).toBe("محمد")
    expect(normalizeArabic("اللَّه")).toBe("الله")
    expect(normalizeArabic("خَنجَرٌ")).toBe("خنجر")
  })

  test("strips dagger alef and tatweel", () => {
    expect(normalizeArabic("هٰذا")).toBe("هذا")
    expect(normalizeArabic("مــحــمــد")).toBe("محمد")
  })

  test("unifies alef forms", () => {
    expect(normalizeArabic("إسلام")).toBe("اسلام")
    expect(normalizeArabic("أحمد")).toBe("احمد")
    expect(normalizeArabic("آمنة")).toBe("امنة")
    expect(normalizeArabic("ٱلرحمن")).toBe("الرحمن")
  })

  test("maps alef maqsura to ya", () => {
    expect(normalizeArabic("مصطفى")).toBe("مصطفي")
  })

  test("leaves ta marbuta and hamza carriers alone by default", () => {
    expect(normalizeArabic("مدرسة")).toBe("مدرسة")
    expect(normalizeArabic("مؤمن")).toBe("مؤمن")
    expect(normalizeArabic("شئون")).toBe("شئون")
  })

  test("maps ta marbuta, waw hamza and ya hamza when asked", () => {
    expect(normalizeArabic("مدرسة", { taMarbuta: true })).toBe("مدرسه")
    expect(normalizeArabic("مؤمن", { hamzaOnWaw: true })).toBe("مومن")
    expect(normalizeArabic("شئون", { hamzaOnYa: true })).toBe("شيون")
    expect(normalizeArabic("مدرسة مؤمن شئون", { taMarbuta: true, hamzaOnWaw: true, hamzaOnYa: true })).toBe(
      "مدرسه مومن شيون",
    )
  })

  test("converts Arabic-Indic and Eastern digits to Latin", () => {
    expect(normalizeArabic("٠١٢٣٤٥٦٧٨٩")).toBe("0123456789")
    expect(normalizeArabic("۰۱۲۳۴۵۶۷۸۹")).toBe("0123456789")
    expect(normalizeArabic("رقم ١٢٣")).toBe("رقم 123")
  })

  test("collapses whitespace and lowercases Latin", () => {
    expect(normalizeArabic("  Muhammad \n\t  ALI  ")).toBe("muhammad ali")
    expect(normalizeArabic("محمد   علي")).toBe("محمد علي")
  })

  test("handles empty input", () => {
    expect(normalizeArabic("")).toBe("")
  })
})

describe("arabicIncludes", () => {
  test("matches across diacritics and alef forms", () => {
    expect(arabicIncludes("مُحَمَّد", "محمد")).toBe(true)
    expect(arabicIncludes("محمد", "مُحَمَّد")).toBe(true)
    expect(arabicIncludes("إسلام", "اسلام")).toBe(true)
    expect(arabicIncludes("الحمد لله رب العالمين", "ربّ")).toBe(true)
  })

  test("matches digits and Latin case", () => {
    expect(arabicIncludes("شقة رقم ١٢", "12")).toBe(true)
    expect(arabicIncludes("Riyadh الرياض", "RIYADH")).toBe(true)
  })

  test("respects options", () => {
    expect(arabicIncludes("مدرسة", "مدرسه")).toBe(false)
    expect(arabicIncludes("مدرسة", "مدرسه", { taMarbuta: true })).toBe(true)
  })

  test("returns false when absent", () => {
    expect(arabicIncludes("محمد", "احمد")).toBe(false)
    expect(arabicIncludes("محمد", "علي")).toBe(false)
  })
})
