export const SPINNER_FRAMES = {
  dots: [".  ", ".. ", "...", "   "],
  line: ["|", "/", "-", "\\"],
  braille: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  arc: ["◜", "◠", "◝", "◞", "◡", "◟"],
  bounce: ["⠁", "⠂", "⠄", "⠂"],
} as const

export type SpinnerVariant = keyof typeof SPINNER_FRAMES

export function ratio(value: number, max: number) {
  return max > 0 && Number.isFinite(value) ? Math.min(Math.max(value / max, 0), 1) : 0
}

export function percentOf(value: number, max: number) {
  return Math.round(ratio(value, max) * 100)
}

export function renderBar(value: number, max: number, width: number, fill = "#", empty = "-") {
  const cells = Math.max(0, Math.floor(width))
  const filled = Math.round(ratio(value, max) * cells)
  return fill.repeat(filled) + empty.repeat(cells - filled)
}
