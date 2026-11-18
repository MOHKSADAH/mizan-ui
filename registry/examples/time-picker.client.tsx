"use client"

import { TimePicker, type TimePickerProps } from "@/registry/ui/time-picker"

// isTimeDisabled is a function, which cannot be passed from a Server Component.
export function LunchClosedTimePicker(props: TimePickerProps) {
  return <TimePicker isTimeDisabled={(v) => v.startsWith("13:")} {...props} />
}
