export const SPINNER_FRAMES = {
  dots: [".  ", ".. ", "...", "   "],
  line: ["|", "/", "-", "\\"],
  braille: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  arc: ["◜", "◠", "◝", "◞", "◡", "◟"],
  bounce: ["⠁", "⠂", "⠄", "⠂"],
} as const

export type SpinnerVariant = keyof typeof SPINNER_FRAMES
