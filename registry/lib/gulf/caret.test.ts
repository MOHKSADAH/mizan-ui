import { expect, test } from "bun:test"
import { AsYouType } from "libphonenumber-js"
import { caretAfter } from "./caret"

const digits = (s: string) => s.replace(/\D/g, "")
const alnum = (s: string) => s.replace(/[^A-Za-z0-9]/g, "")
const group4 = (s: string) => s.replace(/(.{4})(?=.)/g, "$1 ")

test("keeps the caret after the digit typed mid-string", () => {
  // "050 123 4567" with 9 typed after "050 1": the raw text is "050 19234567", caret after the 9.
  const raw = "050 19234567"
  expect(caretAfter(digits, raw, 6, "050 192 34567")).toBe(6)
})

test("moves past a separator that formatting inserts", () => {
  const formatted = group4("SA038")
  expect(formatted).toBe("SA03 8")
  expect(caretAfter(alnum, "SA038", 5, formatted)).toBe(6)
})

test("stays put when a character is deleted mid-string", () => {
  // "SA03 8000 0000" with the 8 deleted: raw "SA03 000 0000", caret after "SA03 ".
  expect(caretAfter(alnum, "SA03 000 0000", 5, group4("SA0300000000"))).toBe(4)
})

test("works with as-you-type phone formatting", () => {
  const formatted = new AsYouType("SA").input("0501")
  expect(caretAfter(digits, "0501", 4, formatted)).toBe(formatted.length)
  expect(caretAfter(digits, "0501", 0, formatted)).toBe(0)
})

test("clamps to the end of a shorter result", () => {
  expect(caretAfter(digits, "1234567", 7, "123")).toBe(3)
})
