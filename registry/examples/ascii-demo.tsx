import { AsciiBox, AsciiDivider } from "@/registry/ui/ascii/ascii-box"
import { AsciiBarChart, AsciiSparkline } from "@/registry/ui/ascii/ascii-chart"
import { AsciiProgress } from "@/registry/ui/ascii/ascii-progress"
import { AsciiSpinner } from "@/registry/ui/ascii/ascii-spinner"
import { AsciiText } from "@/registry/ui/ascii/ascii-text"
import { Terminal } from "@/registry/ui/ascii/terminal"

export function AsciiTextDemo() {
  return (
    <div className="flex flex-col gap-6 overflow-x-auto">
      <AsciiText text="Mizan" />
      <AsciiText text="Mizan" font="Small" />
      <AsciiText text="Mizan" font="ANSI Shadow" as="h2" />
      <AsciiText text="Mizan" font="Big" className="text-muted-foreground" />
    </div>
  )
}

export function AsciiSpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
      {(["dots", "line", "braille", "arc", "bounce"] as const).map((variant) => (
        <span key={variant} className="inline-flex items-center gap-2">
          <AsciiSpinner variant={variant} label={`Loading (${variant})`} />
          <span className="font-mono text-sm">{variant}</span>
        </span>
      ))}
    </div>
  )
}

export function AsciiProgressDemo() {
  return (
    <div className="flex flex-col gap-3 text-muted-foreground">
      <AsciiProgress value={57} width={14} />
      <AsciiProgress value={3} max={8} fill="=" empty="." width={24} />
      <AsciiProgress value={100} showPercent={false} />
    </div>
  )
}

export function AsciiBoxDemo() {
  return (
    <div className="flex flex-col gap-6">
      {(["single", "double", "rounded", "heavy", "ascii"] as const).map((variant) => (
        <AsciiBox key={variant} variant={variant} title={variant}>
          <p>Content stays real DOM.</p>
        </AsciiBox>
      ))}
      <AsciiDivider />
      <AsciiDivider variant="double" label="or" />
      <AsciiDivider variant="ascii" label="end" />
    </div>
  )
}

const visits = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 86 },
  { label: "Wed", value: 142 },
  { label: "Thu", value: 31 },
  { label: "Fri", value: 97 },
]

export function AsciiChartDemo() {
  return (
    <div className="flex flex-col gap-6">
      <AsciiBarChart data={visits} width={24} caption="Visits per day" />
      <AsciiSparkline data={visits} format={(n) => `${n} visits`} caption="Visits per day" />
    </div>
  )
}

const install = [
  { type: "comment", text: "add the component" },
  { type: "command", text: "npx shadcn@latest add @mizan/terminal" },
  { type: "output", text: "Done." },
  { type: "command", text: "bun dev" },
] as const

export function TerminalDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Terminal title="bash" lines={[...install]} copyLabel="Copy commands" copiedLabel="Copied" />
      <Terminal title="bash" lines={[...install]} typing copyLabel="Copy commands" copiedLabel="Copied" />
    </div>
  )
}
