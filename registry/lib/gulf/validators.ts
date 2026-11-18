// Format checks only: a passing value is well-formed, it does not prove the ID, account or number exists.

const toLatinDigits = (s: string) =>
  s
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))

const clean = (s: string) => toLatinDigits(s).replace(/\s+/g, "")

function luhn(digits: string) {
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i])
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

export function isSaudiIdFormat(s: string) {
  const v = clean(s)
  return /^[12]\d{9}$/.test(v) && luhn(v)
}

export function isSaudiVatFormat(s: string) {
  return /^3\d{13}3$/.test(clean(s))
}

export function isSaudiIbanFormat(s: string) {
  const v = clean(s).toUpperCase()
  if (!/^SA\d{22}$/.test(v)) return false
  const rearranged = v.slice(4) + v.slice(0, 4)
  const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55))
  return BigInt(numeric) % 97n === 1n
}

export function normalizeSaudiMobile(s: string) {
  const v = clean(s)
  const m = /^(?:\+966|00966|0)?(5\d{8})$/.exec(v)
  return m ? `+966${m[1]}` : null
}

export function isSaudiMobileFormat(s: string) {
  return normalizeSaudiMobile(s) !== null
}

// The exact commercial registration number rule is unverified; this only checks for 10 digits.
export function isCrNumberFormat(s: string) {
  return /^\d{10}$/.test(clean(s))
}
