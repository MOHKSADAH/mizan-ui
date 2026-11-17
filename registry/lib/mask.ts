// Pattern slots: 9 digit, A ASCII letter (upper-cased), a any letter, X ASCII letter or digit (upper-cased), * any letter or digit.
// Every other pattern character is a literal. One pattern position produces one output character.
const SLOTS: Record<string, RegExp> = {
  '9': /^[0-9]$/,
  A: /^[A-Za-z]$/,
  a: /^\p{L}$/u,
  X: /^[A-Za-z0-9]$/,
  '*': /^[\p{L}\p{N}]$/u,
};
const UPPER = new Set(['A', 'X']);

export const MASK_PRESETS = {
  phone: '999 999 9999',
  card: '9999 9999 9999 9999',
  date: '99/99/9999',
  iban: `AA99 ${'XXXX '.repeat(7)}XX`,
} as const;

export type MaskPreset = keyof typeof MASK_PRESETS;

const isSlot = (p: string) => p in SLOTS;

// Arabic-Indic (U+0660..0669) and Persian (U+06F0..06F9) digits become ASCII.
export const toAsciiDigits = (s: string) =>
  s.replace(/[٠-٩۰-۹]/g, (d) => String(d.charCodeAt(0) & 15));

export function applyMask(input: string, pattern: string) {
  const chars = [...toAsciiDigits(input)];
  let i = 0;
  let formatted = '';
  let raw = '';
  for (const p of pattern) {
    if (isSlot(p)) {
      while (i < chars.length && !SLOTS[p].test(chars[i])) i++;
      if (i >= chars.length) break;
      const c = UPPER.has(p) ? chars[i].toUpperCase() : chars[i];
      formatted += c;
      raw += c;
      i++;
    } else {
      if (i >= chars.length) break;
      formatted += p;
      if (chars[i] === p) i++;
    }
  }
  return { formatted, raw };
}

// Index in `formatted` just after its nth slot character, so the caret stays on the same digit after reformatting.
export function caretAfter(pattern: string, formatted: string, slotCount: number) {
  if (slotCount <= 0) return 0;
  let seen = 0;
  for (let k = 0; k < formatted.length; k++) if (isSlot(pattern[k]) && ++seen === slotCount) return k + 1;
  return formatted.length;
}

export const slotsBefore = (input: string, caret: number, pattern: string) =>
  applyMask(input.slice(0, caret), pattern).raw.length;

// Backspace over a literal changes nothing after reformatting, so it removes the slot character before it instead.
export function backspaceOverLiteral(input: string, caret: number, pattern: string, previous: string) {
  const before = slotsBefore(input, caret, pattern);
  const next = applyMask(input, pattern);
  if (next.formatted !== previous || before === 0) return null;
  const raw = next.raw.slice(0, before - 1) + next.raw.slice(before);
  const result = applyMask(raw, pattern);
  return { ...result, caret: caretAfter(pattern, result.formatted, before - 1) };
}
