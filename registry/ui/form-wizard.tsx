"use client"

import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/registry/ui/card"
import { OrderStepper, orderStepperLabelsAr } from "@/registry/ui/order-stepper"

type FormWizardStep = {
  id: string
  label: string
  description?: string
  content: React.ReactNode
  // Runs before the wizard leaves this step. Return false to stay and show the invalid message.
  validate?: () => boolean | Promise<boolean>
}

type FormWizardLabels = {
  back: string
  next: string
  finish: string
  // Spoken position, with {n} and {total}.
  position: string
  invalid: string
  completeTitle: string
  completeDescription: string
}

const defaultLabels: FormWizardLabels = {
  back: "Back",
  next: "Next",
  finish: "Finish",
  position: "Step {n} of {total}",
  invalid: "Check the fields in this step before you continue.",
  completeTitle: "All done",
  completeDescription: "Your answers were saved.",
}

const formWizardLabelsAr: FormWizardLabels = {
  back: "السابق",
  next: "التالي",
  finish: "إنهاء",
  position: "الخطوة {n} من {total}",
  invalid: "راجع حقول هذه الخطوة قبل المتابعة.",
  completeTitle: "تم الإكمال",
  completeDescription: "تم حفظ إجاباتك.",
}

type FormWizardProps = Omit<React.ComponentProps<typeof Card>, "children"> & {
  steps: FormWizardStep[]
  // Numbers use OrderStepper. Dots show a row of dots with the step position beside them.
  indicator?: "numbers" | "dots"
  defaultStep?: number
  onStepChange?: (index: number) => void
  // Runs on the last step after its validation. The completion state shows when it resolves.
  onComplete?: () => void | Promise<void>
  // Replaces the default completion message.
  complete?: React.ReactNode
  headingLevel?: 2 | 3 | 4
  lang?: Lang
  digits?: Digits
  labels?: Partial<FormWizardLabels>
}

function FormWizard({
  steps,
  indicator = "numbers",
  defaultStep = 0,
  onStepChange,
  onComplete,
  complete,
  headingLevel = 3,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: FormWizardProps) {
  const t = { ...defaultLabels, ...labels }
  const uid = React.useId()
  const [index, setIndex] = React.useState(defaultStep)
  const [direction, setDirection] = React.useState<"forward" | "back">("forward")
  const [finished, setFinished] = React.useState(false)
  const [invalid, setInvalid] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [height, setHeight] = React.useState<number>()
  const panel = React.useRef<HTMLDivElement>(null)
  const heading = React.useRef<HTMLHeadingElement>(null)
  const moved = React.useRef(false)
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4"

  const step = steps[index]
  const last = index === steps.length - 1
  const locale = { lang, digits }

  // The body takes the height of the step it shows, so the card grows and shrinks with the fields.
  React.useEffect(() => {
    const el = panel.current
    if (!el) return
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [index, finished])

  // After a step change keyboard and screen reader users land on the new step title.
  React.useEffect(() => {
    if (moved.current) heading.current?.focus()
  }, [index, finished])

  function go(to: number) {
    moved.current = true
    setDirection(to > index ? "forward" : "back")
    setInvalid(false)
    setIndex(to)
    onStepChange?.(to)
  }

  async function next() {
    if (busy) return
    setBusy(true)
    try {
      if (step.validate && !(await step.validate())) return setInvalid(true)
      if (!last) return go(index + 1)
      await onComplete?.()
      moved.current = true
      setFinished(true)
    } finally {
      setBusy(false)
    }
  }

  const slide = direction === "forward" ? "slide-in-from-end-4" : "slide-in-from-start-4"
  const enter = cn("animate-in fade-in-0 duration-200 motion-reduce:animate-none", slide)

  return (
    <Card data-slot="form-wizard" className={cn("w-full", className)} {...props}>
      {finished ? null : (
        <CardHeader>
          {indicator === "numbers" ? (
            <OrderStepper
              steps={steps}
              current={step.id}
              lang={lang}
              digits={digits}
              labels={lang === "ar" ? orderStepperLabelsAr : undefined}
            />
          ) : (
            <div className="flex items-center gap-3">
              <ol className="flex items-center gap-1.5" aria-hidden="true">
                {steps.map((s, i) => (
                  <li key={s.id} className={cn("size-2 rounded-full bg-border", i <= index && "bg-primary", i === index && "ring-2 ring-primary/30")} />
                ))}
              </ol>
              <p className="text-sm text-muted-foreground">
                {t.position.replace("{n}", formatNumber(index + 1, locale)).replace("{total}", formatNumber(steps.length, locale))}
              </p>
            </div>
          )}
        </CardHeader>
      )}
      <CardContent>
        <div className="-m-1 overflow-hidden transition-[height] duration-200 motion-reduce:transition-none" style={{ height }}>
          {finished ? (
            <div key="complete" ref={panel} className={cn("p-1", enter)}>
              {complete ?? (
                <div className="flex flex-col items-start gap-2">
                  <CheckCircleIcon aria-hidden="true" weight="fill" className="size-8 text-primary" />
                  <Heading ref={heading} tabIndex={-1} className="text-lg font-semibold outline-none md:text-xl">
                    {t.completeTitle}
                  </Heading>
                  <p className="text-sm text-muted-foreground">{t.completeDescription}</p>
                </div>
              )}
            </div>
          ) : (
            <div key={step.id} ref={panel} role="group" aria-labelledby={`${uid}-title`} className={cn("p-1", enter)}>
              <div className="mb-4 flex flex-col gap-1">
                <Heading ref={heading} id={`${uid}-title`} tabIndex={-1} className="text-lg font-semibold outline-none md:text-xl">
                  {step.label}
                </Heading>
                {step.description ? <p className="text-sm text-muted-foreground">{step.description}</p> : null}
              </div>
              {step.content}
              {invalid ? (
                <p role="alert" className="mt-3 text-sm text-destructive">
                  {t.invalid}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </CardContent>
      {finished ? null : (
        <CardFooter className="justify-between gap-2">
          <Button type="button" variant="outline" disabled={index === 0} onClick={() => go(index - 1)}>
            <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" className="rtl:rotate-180" />
            {t.back}
          </Button>
          <Button type="button" aria-disabled={busy || undefined} onClick={next}>
            {last ? t.finish : t.next}
            {last ? null : <ArrowRightIcon aria-hidden="true" data-icon="inline-end" className="rtl:rotate-180" />}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export { FormWizard, formWizardLabelsAr }
export type { FormWizardLabels, FormWizardStep }
