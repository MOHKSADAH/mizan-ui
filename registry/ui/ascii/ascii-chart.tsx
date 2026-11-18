import { blockBar, sparkline } from "@/registry/lib/ascii"
import { cn } from "@/registry/lib/utils"

type Datum = { label: string; value: number }

type ChartProps = {
  data: Datum[]
  format?: (value: number) => string
  caption?: string
  className?: string
}

function DataTable({ data, format = String, caption }: Omit<ChartProps, "className">) {
  return (
    <table className="sr-only">
      {caption && <caption>{caption}</caption>}
      <tbody>
        {data.map(({ label, value }, i) => (
          <tr key={i}>
            <th scope="row">{label}</th>
            <td>{format(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function AsciiBarChart({
  width = 20,
  className,
  ...props
}: ChartProps & { width?: number }) {
  const { data, format = String } = props
  const max = Math.max(0, ...data.map((d) => d.value))

  return (
    <div className={className}>
      <div aria-hidden="true" className="grid grid-cols-[auto_auto_auto] gap-x-[1ch] font-mono">
        {data.map(({ label, value }, i) => (
          <div key={i} className="contents">
            <span className="text-muted-foreground">{label}</span>
            <span dir="ltr" className="whitespace-pre text-primary">
              {blockBar(value, max, width)}
            </span>
            <span dir="ltr" className="justify-self-end tabular-nums">
              {format(value)}
            </span>
          </div>
        ))}
      </div>
      <DataTable {...props} />
    </div>
  )
}

export function AsciiSparkline({ className, ...props }: ChartProps) {
  return (
    <div className={cn("inline-block", className)}>
      <span aria-hidden="true" dir="ltr" className="font-mono">
        {sparkline(props.data.map((d) => d.value))}
      </span>
      <DataTable {...props} />
    </div>
  )
}
