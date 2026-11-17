import { AsciiText } from "@/registry/ui/ascii/ascii-text"

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
