import { describe, expect, test } from "bun:test"
import { decodeZatcaTlv, encodeZatcaTlv } from "./zatca-qr"

const sample = {
  sellerName: "Firoz Khan",
  vatNumber: "310122393500003",
  timestamp: "2022-04-25T15:30:00Z",
  total: "1000.00",
  vatTotal: "150.00",
}

describe("zatca tlv", () => {
  test("matches the known ZATCA sample", () => {
    expect(encodeZatcaTlv(sample)).toBe(
      "AQpGaXJveiBLaGFuAg8zMTAxMjIzOTM1MDAwMDMDFDIwMjItMDQtMjVUMTU6MzA6MDBaBAcxMDAwLjAwBQYxNTAuMDA=",
    )
  })

  test("round-trips an Arabic seller name", () => {
    const fields = { ...sample, sellerName: "شركة الميزان للتقنية" }
    const b64 = encodeZatcaTlv(fields)
    expect(decodeZatcaTlv(b64)).toEqual(fields)
  })

  test("uses UTF-8 byte lengths, not character counts", () => {
    const name = "مؤسسة"
    const bytes = Uint8Array.from(atob(encodeZatcaTlv({ ...sample, sellerName: name })), (c) => c.charCodeAt(0))
    expect(bytes[0]).toBe(1)
    expect(bytes[1]).toBe(new TextEncoder().encode(name).length)
    expect(bytes[1]).toBeGreaterThan(name.length)
  })

  test("stringifies numeric amounts", () => {
    const decoded = decodeZatcaTlv(encodeZatcaTlv({ ...sample, total: 115, vatTotal: 15 }))
    expect(decoded.total).toBe("115")
    expect(decoded.vatTotal).toBe("15")
  })

  test("rejects a value over 255 bytes", () => {
    expect(() => encodeZatcaTlv({ ...sample, sellerName: "ش".repeat(128) })).toThrow(RangeError)
  })

  test("rejects truncated input", () => {
    const b64 = encodeZatcaTlv(sample)
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).slice(0, 5)
    expect(() => decodeZatcaTlv(btoa(String.fromCharCode(...bytes)))).toThrow(RangeError)
  })
})
