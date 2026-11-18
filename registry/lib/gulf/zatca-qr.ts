// Phase 1 (generation) QR only. Phase 2 needs a cryptographic stamp and is out of scope.

export type ZatcaQrFields = {
  sellerName: string
  vatNumber: string
  timestamp: string
  total: string | number
  vatTotal: string | number
}

const keys = ["sellerName", "vatNumber", "timestamp", "total", "vatTotal"] as const

const toBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes))
const fromBase64 = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))

export function encodeZatcaTlv(fields: ZatcaQrFields) {
  const encoder = new TextEncoder()
  const chunks = keys.map((key, i) => {
    const value = encoder.encode(String(fields[key]))
    if (value.length > 255) throw new RangeError(`${key} exceeds 255 UTF-8 bytes`)
    return [i + 1, value.length, ...value]
  })
  return toBase64(Uint8Array.from(chunks.flat()))
}

export function decodeZatcaTlv(base64: string) {
  const bytes = fromBase64(base64)
  const decoder = new TextDecoder("utf-8", { fatal: true })
  const out: Record<string, string> = {}
  for (let i = 0; i < bytes.length; ) {
    const tag = bytes[i]
    const end = i + 2 + bytes[i + 1]
    if (i + 1 >= bytes.length || end > bytes.length) throw new RangeError("truncated TLV")
    const key = keys[tag - 1]
    if (key) out[key] = decoder.decode(bytes.subarray(i + 2, end))
    i = end
  }
  return out as Record<(typeof keys)[number], string>
}
