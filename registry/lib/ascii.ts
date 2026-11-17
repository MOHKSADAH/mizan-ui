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

const SPARK_LEVELS = "▁▂▃▄▅▆▇█"
const EIGHTHS = "▏▎▍▌▋▊▉"

export function blockBar(value: number, max: number, width: number) {
  const eighths = Math.round(ratio(value, max) * Math.max(0, Math.floor(width)) * 8)
  return "█".repeat(Math.floor(eighths / 8)) + (EIGHTHS[(eighths % 8) - 1] ?? "")
}

export function sparkline(values: number[]) {
  const max = Math.max(0, ...values)
  return values.map((v) => SPARK_LEVELS[Math.round(ratio(v, max) * (SPARK_LEVELS.length - 1))]).join("")
}
