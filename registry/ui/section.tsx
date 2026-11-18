import * as React from "react"

import { cn } from "@/registry/lib/utils"

const SPACING = {
  marketing: "py-12 md:py-16 lg:py-24",
  hero: "py-16 md:py-24 lg:py-32",
  compact: "py-6 md:py-8 lg:py-10",
}

const headingId = (id?: string) => (id ? `${id}-heading` : undefined)

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div"
  spacing?: keyof typeof SPACING
}

// Pass the same `id` to Section and SectionHeader: the section is then named by its heading.
function Section({ as = "section", spacing = "marketing", id, className, ...props }: SectionProps) {
  const Tag: React.ElementType<React.HTMLAttributes<HTMLElement>> = as
  return (
    <Tag
      data-slot="section"
      id={id}
      aria-labelledby={as === "section" ? headingId(id) : undefined}
      className={cn(SPACING[spacing], className)}
      {...props}
    />
  )
}

type SectionHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  headingLevel?: 2 | 3
  align?: "start" | "center"
}

function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  headingLevel = 2,
  align = "start",
  id,
  className,
  ...props
}: SectionHeaderProps) {
  const Heading = `h${headingLevel}` as const
  const centered = align === "center"
  return (
    <div
      data-slot="section-header"
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-12",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className={cn("flex flex-col gap-3", centered && "items-center")}>
        {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
        <Heading
          id={headingId(id)}
          className={cn(
            "font-semibold text-balance",
            headingLevel === 2 ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg md:text-xl"
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p className={cn("max-w-2xl text-lg text-muted-foreground md:text-xl", centered && "mx-auto")}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  )
}

export { Section, SectionHeader }
