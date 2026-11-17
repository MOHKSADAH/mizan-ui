import themeIndex from './themes/index.json';

export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
export type Tune = Partial<Record<'radius' | 'spacing' | 'shadowOpacity' | 'shadowBlur' | 'shadowY' | 'tracking', number>>;

export type Settings = {
  theme: string;
  font: 'auto' | string;
  weight: 'auto' | IconWeight;
  currency: string;
  digits: 'latn' | 'arab';
  tune: Tune;
};

export type ThemeMeta = (typeof themeIndex)[number];
export const themes = themeIndex as ThemeMeta[];
export const themeById = Object.fromEntries(themes.map((t) => [t.id, t]));

export const STORAGE_KEY = 'mizan-settings';

export const defaultSettings: Settings = {
  theme: 'mizan-base',
  font: 'auto',
  weight: 'auto',
  currency: 'SAR',
  digits: 'latn',
  tune: {},
};

export const TUNE_VARS: Record<keyof Tune, [string, string]> = {
  radius: ['--radius', 'rem'],
  spacing: ['--spacing', 'rem'],
  shadowOpacity: ['--shadow-opacity', ''],
  shadowBlur: ['--shadow-blur', 'px'],
  shadowY: ['--shadow-y', 'px'],
  tracking: ['--tracking-normal', 'em'],
};

// Self-contained: it also runs as the inline pre-paint script, so it may only use its arguments.
export function applySettings(
  s: Pick<Settings, 'theme' | 'font' | 'tune'> | null,
  themeFonts: Record<string, string>,
  tuneVars: Record<string, [string, string]>,
) {
  try {
    const stored = s ?? JSON.parse(localStorage.getItem('mizan-settings') || '{}');
    const theme = stored.theme && themeFonts[stored.theme] ? stored.theme : 'mizan-base';
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.font = !stored.font || stored.font === 'auto' ? themeFonts[theme] : stored.font;
    for (const key in tuneVars) {
      const [name, unit] = tuneVars[key];
      const v = stored.tune && stored.tune[key];
      if (typeof v === 'number') root.style.setProperty(name, v + unit);
      else root.style.removeProperty(name);
    }
  } catch {}
}

export const themeFonts = Object.fromEntries(themes.map((t) => [t.id, t.font]));

export const prePaintScript = `(${applySettings.toString()})(null, ${JSON.stringify(themeFonts)}, ${JSON.stringify(TUNE_VARS)})`;
