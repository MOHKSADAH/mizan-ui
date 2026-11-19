"use client"

import * as React from "react"
import { CaretUpDownIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import {
  formatCompact,
  formatMoneySymbol,
  type Lang,
} from "@/registry/lib/format"

import { Button } from "@/registry/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type Model = {
  id: string
  name: string
  provider: string
  // The context window, in tokens.
  context: number
  // Price per one million tokens.
  price?: { input: number; output: number }
}

type ModelPickerLabels = {
  model: string
  search: string
  empty: string
  context: (size: string) => string
  perMillion: string
}

const defaultLabels: ModelPickerLabels = {
  model: "Model",
  search: "Search models",
  empty: "No models found.",
  context: (size) => `${size} context`,
  perMillion: "in / out per 1M tokens",
}

const modelPickerLabelsAr: ModelPickerLabels = {
  model: "النموذج",
  search: "ابحث عن نموذج",
  empty: "لا توجد نماذج مطابقة.",
  context: (size) => `سياق ${size}`,
  perMillion: "دخل / خرج لكل مليون رمز",
}

type ModelPickerProps = {
  models: Model[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  lang?: Lang
  // ISO 4217 code of the prices.
  currency?: string
  labels?: Partial<ModelPickerLabels>
  className?: string
}

// A popover with a searchable list. The trigger shows the chosen model, so it fits in the prompt input toolbar.
function ModelPicker({
  models,
  value,
  defaultValue,
  onValueChange,
  lang = "en",
  currency = "USD",
  labels,
  className,
}: ModelPickerProps) {
  const t = { ...defaultLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue ?? models[0]?.id)
  const [open, setOpen] = React.useState(false)
  const selectedId = value ?? inner
  const selected = models.find((model) => model.id === selectedId)
  // Prices are Latin text in both languages: $3 reads the same in an Arabic page.
  const money = (amount: number) =>
    formatMoneySymbol(amount, { lang: "en" }, { currency })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            data-slot="model-picker"
            aria-label={`${t.model}: ${selected?.name ?? ""}`}
            className={cn("text-muted-foreground", className)}
          />
        }
      >
        <bdi>{selected?.name ?? t.model}</bdi>
        <CaretUpDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-80 gap-0 p-0">
        <Command>
          <CommandInput placeholder={t.search} />
          <CommandList>
            <CommandEmpty>{t.empty}</CommandEmpty>
            {models.map((model) => (
              <CommandItem
                key={model.id}
                value={`${model.name} ${model.provider}`}
                data-checked={model.id === selectedId}
                className="items-start py-2"
                onSelect={() => {
                  setInner(model.id)
                  onValueChange?.(model.id)
                  setOpen(false)
                }}
              >
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <bdi className="truncate font-medium">{model.name}</bdi>
                  <span className="truncate text-xs text-muted-foreground">
                    {model.provider} ·{" "}
                    {t.context(formatCompact(model.context, { lang }))}
                  </span>
                </span>
                {model.price && (
                  <span
                    title={t.perMillion}
                    className="flex shrink-0 flex-col items-end text-xs tabular-nums"
                  >
                    <bdi dir="ltr">
                      {money(model.price.input)} / {money(model.price.output)}
                    </bdi>
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export {
  ModelPicker,
  modelPickerLabelsAr,
  type Model,
  type ModelPickerLabels,
  type ModelPickerProps,
}
