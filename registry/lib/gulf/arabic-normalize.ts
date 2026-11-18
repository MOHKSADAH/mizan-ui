export type NormalizeArabicOptions = {
  taMarbuta?: boolean
  hamzaOnWaw?: boolean
  hamzaOnYa?: boolean
}

export function normalizeArabic(s: string, opts: NormalizeArabicOptions = {}) {
  let out = s
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
  if (opts.taMarbuta) out = out.replace(/ة/g, "ه")
  if (opts.hamzaOnWaw) out = out.replace(/ؤ/g, "و")
  if (opts.hamzaOnYa) out = out.replace(/ئ/g, "ي")
  return out.replace(/\s+/g, " ").trim().toLowerCase()
}

export function arabicIncludes(haystack: string, needle: string, opts?: NormalizeArabicOptions) {
  return normalizeArabic(haystack, opts).includes(normalizeArabic(needle, opts))
}
