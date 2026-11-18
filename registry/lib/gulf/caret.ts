// Where the caret goes after reformatting: after as many kept characters as sat before it in the raw text.
export function caretAfter(clean: (text: string) => string, raw: string, caret: number, formatted: string) {
  let kept = clean(raw.slice(0, caret)).length
  let i = 0
  while (kept > 0 && i < formatted.length) {
    if (clean(formatted[i])) kept--
    i++
  }
  return i
}
