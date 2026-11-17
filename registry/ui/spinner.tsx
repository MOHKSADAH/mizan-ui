import { cn } from "@/registry/lib/utils"
import { SpinnerIcon } from "@phosphor-icons/react"

type SpinnerLabels = { loading: string }

const defaultLabels: SpinnerLabels = { loading: "Loading" }
const spinnerLabelsAr: SpinnerLabels = { loading: "جارٍ التحميل" }

function Spinner({
  className,
  labels,
  ...props
}: React.ComponentProps<"svg"> & { labels?: Partial<SpinnerLabels> }) {
  return (
    <SpinnerIcon data-slot="spinner" role="status" aria-label={labels?.loading ?? defaultLabels.loading} className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner, type SpinnerLabels, spinnerLabelsAr }
