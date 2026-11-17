const ARABIC_MARKS = /[ً-ٰٟـ]/g;
const COMBINING = /[̀-ͯ]/g;

// Case, diacritics and Arabic spelling variants (hamza forms, ya/alef maqsura, ta marbuta, digits) compare equal.
export function normalizeText(s: string) {
  return s
    .normalize('NFKD')
    .replace(ARABIC_MARKS, '')
    .replace(COMBINING, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0))
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export const includesText = (haystack: string, needle: string) => normalizeText(haystack).includes(normalizeText(needle));
