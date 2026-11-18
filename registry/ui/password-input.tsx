"use client"

import * as React from "react"
import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { CheckCircleIcon, CircleIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { plural } from "@/registry/lib/format"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/ui/input-group"

type PasswordRule = { id: string; label: string; test: (value: string) => boolean }

type PasswordInputLabels = {
  toggle: string
  strength: string
  levels: [string, string, string, string, string]
  met: string
  unmet: string
  minLength: (n: number) => string
  lowercase: string
  uppercase: string
  number: string
  symbol: string
}

const passwordInputLabels: PasswordInputLabels = {
  toggle: "Show password",
  strength: "Password strength",
  levels: ["Too short", "Weak", "Fair", "Good", "Strong"],
  met: "met",
  unmet: "not met",
  minLength: (n) => plural(n, { one: "At least {n} character", other: "At least {n} characters" }, { lang: "en" }),
  lowercase: "A lowercase letter",
  uppercase: "An uppercase letter",
  number: "A number",
  symbol: "A symbol",
}

const passwordInputLabelsAr: PasswordInputLabels = {
  toggle: "إظهار كلمة المرور",
  strength: "قوة كلمة المرور",
  levels: ["قصيرة جدًا", "ضعيفة", "متوسطة", "جيدة", "قوية"],
  met: "مستوفى",
  unmet: "غير مستوفى",
  minLength: (n) =>
    plural(
      n,
      {
        one: "حرف واحد على الأقل",
        two: "حرفان على الأقل",
        few: "{n} أحرف على الأقل",
        many: "{n} حرفًا على الأقل",
        other: "{n} حرف على الأقل",
      },
      { lang: "ar" }
    ),
  lowercase: "حرف صغير",
  uppercase: "حرف كبير",
  number: "رقم",
  symbol: "رمز",
}

function defaultRules(l: PasswordInputLabels, minLength: number): PasswordRule[] {
  return [
    { id: "length", label: l.minLength(minLength), test: (v) => v.length >= minLength },
    { id: "lowercase", label: l.lowercase, test: (v) => /\p{Ll}/u.test(v) },
    { id: "uppercase", label: l.uppercase, test: (v) => /\p{Lu}/u.test(v) },
    { id: "number", label: l.number, test: (v) => /\p{N}/u.test(v) },
    { id: "symbol", label: l.symbol, test: (v) => /[^\p{L}\p{N}\s]/u.test(v) },
  ]
}

// 0 when the first rule (length) fails, otherwise 1 to 4 by the share of rules met.
function passwordStrength(value: string, rules: PasswordRule[]): 0 | 1 | 2 | 3 | 4 {
  if (!value || !rules[0].test(value)) return 0
  const met = rules.filter((r) => r.test(value)).length
  return Math.max(1, Math.min(4, Math.round((met / rules.length) * 4))) as 1 | 2 | 3 | 4
}

const LEVEL_COLOR = ["bg-destructive", "bg-destructive", "bg-warning", "bg-info", "bg-success"]

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  showStrength?: boolean
  minLength?: number
  rules?: PasswordRule[]
  labels?: Partial<PasswordInputLabels>
  containerClassName?: string
}

function PasswordInput({
  showStrength,
  minLength = 8,
  rules,
  labels,
  className,
  containerClassName,
  value,
  defaultValue,
  onChange,
  ...props
}: PasswordInputProps) {
  const l = { ...passwordInputLabels, ...labels }
  const id = React.useId()
  const [visible, setVisible] = React.useState(false)
  const [inner, setInner] = React.useState(String(defaultValue ?? ""))
  const current = value === undefined ? inner : String(value)
  const list = rules ?? defaultRules(l, minLength)
  const level = passwordStrength(current, list)

  return (
    <div data-slot="password-input" className={cn("flex w-full flex-col gap-2", containerClassName)}>
      <InputGroup>
        <InputGroupInput
          {...props}
          type={visible ? "text" : "password"}
          dir="ltr"
          value={value}
          defaultValue={defaultValue}
          aria-describedby={[showStrength && `${id}-strength`, props["aria-describedby"]].filter(Boolean).join(" ") || undefined}
          minLength={minLength}
          className={cn("text-start", className)}
          onChange={(e) => {
            setInner(e.target.value)
            onChange?.(e)
          }}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-pressed={visible}
            aria-label={l.toggle}
            disabled={props.disabled}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeSlashIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {showStrength && (
        <div id={`${id}-strength`} className="flex flex-col gap-2">
          <MeterPrimitive.Root
            value={level}
            min={0}
            max={4}
            aria-label={l.strength}
            getAriaValueText={() => l.levels[level]}
          >
            <MeterPrimitive.Track className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <MeterPrimitive.Indicator className={cn("h-full", LEVEL_COLOR[level])} />
            </MeterPrimitive.Track>
          </MeterPrimitive.Root>
          <p aria-live="polite" className="text-xs text-muted-foreground">
            {l.strength}: <span className="font-medium text-foreground">{current ? l.levels[level] : ""}</span>
          </p>
          <ul className="flex flex-col gap-1 text-xs">
            {list.map((r) => {
              const ok = r.test(current)
              return (
                <li key={r.id} className={cn("flex items-center gap-1.5", ok ? "text-foreground" : "text-muted-foreground")}>
                  {ok ? (
                    <CheckCircleIcon aria-hidden="true" weight="fill" className="size-4 text-success" />
                  ) : (
                    <CircleIcon aria-hidden="true" className="size-4" />
                  )}
                  {r.label}
                  <span className="sr-only">: {ok ? l.met : l.unmet}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export { PasswordInput, passwordInputLabels, passwordInputLabelsAr, passwordStrength, defaultRules }
export type { PasswordInputLabels, PasswordInputProps, PasswordRule }
