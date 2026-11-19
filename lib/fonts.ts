import {
  Alexandria,
  Almarai,
  Amiri,
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  Inter,
  Instrument_Serif,
  Markazi_Text,
  Noto_Kufi_Arabic,
  Plus_Jakarta_Sans,
  Readex_Pro,
  Reem_Kufi,
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

// Direction fonts. Each variable matches a font in scripts/data/directions.json.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', preload: false });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', preload: false });
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-instrument-serif', preload: false });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', preload: false });
const amiri = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-amiri', preload: false });
const alexandria = Alexandria({ subsets: ['arabic'], variable: '--font-alexandria', preload: false });
const reemKufi = Reem_Kufi({ subsets: ['arabic'], variable: '--font-reem-kufi', preload: false });
const almarai = Almarai({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-almarai', preload: false });

export const fontVariables = [
  geist, plexArabic, geistMono, plexMono, plex, markazi, kufi, vazirmatn, readex, tajawal,
  inter, plusJakarta, instrumentSerif, cormorant, amiri, alexandria, reemKufi, almarai,
]
  .map((f) => f.variable)
  .join(' ');

export const fontPresets = ['geist', 'plex', 'markazi', 'kufi', 'readex', 'tajawal'] as const;
export type FontPreset = (typeof fontPresets)[number];
