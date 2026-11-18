import { describe, expect, test } from "bun:test"
import {
  isCrNumberFormat,
  isSaudiIbanFormat,
  isSaudiIdFormat,
  isSaudiMobileFormat,
  isSaudiVatFormat,
  normalizeSaudiMobile,
} from "./validators"

const toArabicIndic = (s: string) => s.replace(/\d/g, (d) => String.fromCharCode(0x0660 + Number(d)))

function withLuhnDigit(base9: string) {
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let d = Number(base9[8 - i])
    if (i % 2 === 0) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return base9 + ((10 - (sum % 10)) % 10)
}

function ibanWithCheck(bban: string) {
  const n = BigInt(`${bban}281000`)
  return `SA${String(98n - (n % 97n)).padStart(2, "0")}${bban}`
}

describe("isSaudiIdFormat", () => {
  const citizen = withLuhnDigit("108765432")
  const resident = withLuhnDigit("234567890")

  test("accepts generated citizen and resident IDs", () => {
    expect(citizen).toMatch(/^1\d{9}$/)
    expect(isSaudiIdFormat(citizen)).toBe(true)
    expect(isSaudiIdFormat(resident)).toBe(true)
  })

  test("rejects a wrong check digit", () => {
    const last = Number(citizen.at(-1))
    expect(isSaudiIdFormat(citizen.slice(0, 9) + ((last + 1) % 10))).toBe(false)
  })

  test("rejects wrong prefixes", () => {
    expect(isSaudiIdFormat(withLuhnDigit("308765432"))).toBe(false)
    expect(isSaudiIdFormat(withLuhnDigit("008765432"))).toBe(false)
  })

  test("rejects wrong length and non-digits", () => {
    expect(isSaudiIdFormat(citizen.slice(1))).toBe(false)
    expect(isSaudiIdFormat(`${citizen}0`)).toBe(false)
    expect(isSaudiIdFormat("")).toBe(false)
    expect(isSaudiIdFormat(`${citizen.slice(0, 9)}x`)).toBe(false)
  })

  test("accepts Arabic-Indic and Eastern digits, and whitespace", () => {
    expect(isSaudiIdFormat(toArabicIndic(citizen))).toBe(true)
    const eastern = citizen.replace(/\d/g, (d) => String.fromCharCode(0x06f0 + Number(d)))
    expect(isSaudiIdFormat(eastern)).toBe(true)
    expect(isSaudiIdFormat(` ${citizen.slice(0, 5)} ${citizen.slice(5)} `)).toBe(true)
  })
})

describe("isSaudiVatFormat", () => {
  test("accepts 15 digits starting and ending with 3", () => {
    expect(isSaudiVatFormat("300000000000003")).toBe(true)
    expect(isSaudiVatFormat("310122393500003")).toBe(true)
    expect(isSaudiVatFormat(toArabicIndic("310122393500003"))).toBe(true)
    expect(isSaudiVatFormat(" 310122393500003 ")).toBe(true)
  })

  test("rejects wrong prefix, suffix and length", () => {
    expect(isSaudiVatFormat("210122393500003")).toBe(false)
    expect(isSaudiVatFormat("310122393500002")).toBe(false)
    expect(isSaudiVatFormat("31012239350003")).toBe(false)
    expect(isSaudiVatFormat("3101223935000033")).toBe(false)
  })
})

describe("isSaudiIbanFormat", () => {
  test("accepts a well-known valid IBAN, with spaces and lowercase", () => {
    expect(isSaudiIbanFormat("SA0380000000608010167519")).toBe(true)
    expect(isSaudiIbanFormat("SA03 8000 0000 6080 1016 7519")).toBe(true)
    expect(isSaudiIbanFormat("sa0380000000608010167519")).toBe(true)
  })

  test("accepts generated IBANs", () => {
    for (const bban of ["10000000000000000001", "05000123456789012345", "80123456789000000000"]) {
      expect(isSaudiIbanFormat(ibanWithCheck(bban))).toBe(true)
    }
  })

  test("rejects a wrong check", () => {
    expect(isSaudiIbanFormat("SA0480000000608010167519")).toBe(false)
    expect(isSaudiIbanFormat("SA0380000000608010167518")).toBe(false)
  })

  test("rejects wrong country, length and characters", () => {
    expect(isSaudiIbanFormat("AE0380000000608010167519")).toBe(false)
    expect(isSaudiIbanFormat("SA038000000060801016751")).toBe(false)
    expect(isSaudiIbanFormat("SA03800000006080101675190")).toBe(false)
    expect(isSaudiIbanFormat("SA03800000006080101675AB")).toBe(false)
    expect(isSaudiIbanFormat("")).toBe(false)
  })
})

describe("saudi mobile", () => {
  const forms = ["0512345678", "512345678", "+966512345678", "00966512345678"]

  test("normalizes every accepted form to E.164", () => {
    for (const f of forms) expect(normalizeSaudiMobile(f)).toBe("+966512345678")
  })

  test("handles whitespace and Arabic-Indic digits", () => {
    expect(normalizeSaudiMobile(" 05 1234 5678 ")).toBe("+966512345678")
    expect(normalizeSaudiMobile("+966 51 234 5678")).toBe("+966512345678")
    expect(normalizeSaudiMobile(toArabicIndic("0512345678"))).toBe("+966512345678")
    expect(isSaudiMobileFormat(toArabicIndic("0512345678"))).toBe(true)
  })

  test("returns null for invalid input", () => {
    for (const bad of ["", "0412345678", "412345678", "051234567", "05123456789", "+96651234567", "966512345678", "+971512345678", "abc"]) {
      expect(normalizeSaudiMobile(bad)).toBeNull()
      expect(isSaudiMobileFormat(bad)).toBe(false)
    }
  })
})

describe("isCrNumberFormat", () => {
  test("accepts 10 digits", () => {
    expect(isCrNumberFormat("1010123456")).toBe(true)
    expect(isCrNumberFormat(toArabicIndic("1010123456"))).toBe(true)
    expect(isCrNumberFormat(" 1010 123456 ")).toBe(true)
  })

  test("rejects other lengths and non-digits", () => {
    expect(isCrNumberFormat("101012345")).toBe(false)
    expect(isCrNumberFormat("10101234567")).toBe(false)
    expect(isCrNumberFormat("10101234ab")).toBe(false)
  })
})
