import * as React from "react"

import { cn } from "@/registry/lib/utils"

const SIZES = {
  prose: "max-w-3xl",
  narrow: "max-w-5xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
}

type ContainerProps = React.ComponentProps<"div"> & {
  size?: keyof typeof SIZES
}

function Container({ size = "default", className, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", SIZES[size], className)}
      {...props}
    />
  )
}

export { Container }
