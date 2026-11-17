import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { Geist, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { translations } from '@/lib/layout.shared';
import { i18n } from '@/lib/i18n';
import '../global.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
});

export const generateStaticParams = () => i18n.languages.map((lang) => ({ lang }));
export const dynamicParams = false;

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className={`${geist.variable} ${plexArabic.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider dir={dir} i18n={i18nProvider(translations, lang)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
