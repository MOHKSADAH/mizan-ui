'use client';

import { useDirection } from '@/registry/ui/direction';

export function DirectionValue() {
  return <code dir="ltr">{useDirection()}</code>;
}
