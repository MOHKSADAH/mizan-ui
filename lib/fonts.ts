import {
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  Markazi_Text,
  Noto_Kufi_Arabic,
  Readex_Pro,
  Tajawal,
  Vazirmatn,
} from 'next/font/google';

// The default pair is preloaded. Preset fonts load when a preset selects them.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
});
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', preload: false });
const plex = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-plex', preload: false });
const markazi = Markazi_Text({ subsets: ['arabic', 'latin'], variable: '--font-markazi', preload: false });
const kufi = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-kufi', preload: false });
const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-vazirmatn', preload: false });
const readex = Readex_Pro({ subsets: ['arabic', 'latin'], variable: '--font-readex', preload: false });
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  preload: false,
});

export const fontVariables = [geist, plexArabic, geistMono, plexMono, plex, markazi, kufi, vazirmatn, readex, tajawal]
  .map((f) => f.variable)
  .join(' ');

export const fontPresets = ['geist', 'plex', 'markazi', 'kufi', 'readex', 'tajawal'] as const;
export type FontPreset = (typeof fontPresets)[number];
