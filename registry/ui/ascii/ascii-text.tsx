import figlet from "figlet"
import ansiShadow from "figlet/fonts/ANSI Shadow"
import big from "figlet/fonts/Big"
import small from "figlet/fonts/Small"
import standard from "figlet/fonts/Standard"

const FONTS = { Standard: standard, Small: small, "ANSI Shadow": ansiShadow, Big: big }

for (const [name, data] of Object.entries(FONTS)) figlet.parseFont(name, data)

type AsciiTextProps = {
  text: string
  font?: keyof typeof FONTS
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
}

export function AsciiText({ text, font = "Standard", as: Tag = "div", className }: AsciiTextProps) {
  return (
    <Tag dir="ltr" className={className}>
      <pre aria-hidden="true" className="font-mono leading-none">
        {figlet.textSync(text, { font })}
      </pre>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
