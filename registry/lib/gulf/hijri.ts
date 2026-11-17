// Intl uses the Umm al-Qura tables and can differ by a day from the officially announced calendar on edge dates.

export type HijriOptions = Intl.DateTimeFormatOptions & {
  lang?: "ar" | "en"
  digits?: "latn" | "arab"
}

export function formatHijri(
  date: Date,
  { lang = "ar", digits = "latn", timeZone = "Asia/Riyadh", ...options }: HijriOptions = {},
) {
  return new Intl.DateTimeFormat(`${lang}-u-ca-islamic-umalqura-nu-${digits}`, {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
    timeZone,
  }).format(date)
}

export function hijriParts(date: Date, timeZone = "Asia/Riyadh") {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone,
  }).formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  return { year: get("year"), month: get("month"), day: get("day") }
}
