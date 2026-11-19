'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/ui/select';
import { DENSITY, directionById, directions } from '@/lib/directions';
import { CH, type Lang } from '@/lib/strings';
import { useSettings } from '@/components/settings';
import { bidi } from '@/components/looks/text';

// A direction is a theme, a font pair, a radius and a density applied together through the settings.
export function DirectionSelect({ lang, className }: { lang: Lang; className?: string }) {
  const c = CH[lang];
  const { font, update } = useSettings();
  const names = Object.fromEntries(directions.map((d) => [d.id, bidi(d.name[lang], lang)]));
  return (
    <Select
      items={names}
      value={directionById[font] ? font : null}
      onValueChange={(id) => {
        const d = id && directionById[id];
        if (d) update({ theme: d.theme, font: d.id, tune: { radius: parseFloat(d.radius), spacing: DENSITY[d.density] } });
      }}
    >
      <SelectTrigger aria-label={c.direction} className={className}>
        <SelectValue placeholder={c.direction} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {directions.map((d) => (
          <SelectItem key={d.id} value={d.id}>
            {names[d.id]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
