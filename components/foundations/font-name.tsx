'use client';

import { useSettings } from '@/components/settings';
import { themeFonts } from '@/lib/settings';

const NAMES: Record<string, { heading: string; body: string }> = {
  geist: { heading: 'Geist / IBM Plex Sans Arabic', body: 'Geist / IBM Plex Sans Arabic' },
  plex: { heading: 'IBM Plex Sans / IBM Plex Sans Arabic', body: 'IBM Plex Sans / IBM Plex Sans Arabic' },
  markazi: { heading: 'Markazi Text', body: 'Markazi Text' },
  kufi: { heading: 'Noto Kufi Arabic / Vazirmatn', body: 'Vazirmatn' },
  readex: { heading: 'Readex Pro', body: 'Readex Pro' },
  tajawal: { heading: 'Tajawal', body: 'Tajawal' },
};

// Meta uses the body family, so it shows the body name.
export function FontName({ role }: { role: 'heading' | 'body' }) {
  const { font, theme } = useSettings();
  const preset = font === 'auto' ? themeFonts[theme] : font;
  const names = NAMES[preset] ?? NAMES.geist;
  return (
    <p className="text-xs text-muted-foreground">
      <bdi dir="ltr">{names[role]}</bdi>
    </p>
  );
}
