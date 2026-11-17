import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { translations } from '@/lib/layout.shared';
import { i18n } from '@/lib/i18n';
import { fontVariables } from '@/lib/fonts';
import { prePaintScript } from '@/lib/settings';
import { Providers } from '@/components/providers';
import '../global.css';

export const generateStaticParams = () => i18n.languages.map((lang) => ({ lang }));
export const dynamicParams = false;

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} data-theme="mizan-base" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          dir={dir}
          i18n={i18nProvider(translations, lang)}
          theme={{ attribute: 'class', defaultTheme: 'system', enableSystem: true, disableTransitionOnChange: true }}
        >
          <Providers dir={dir}>{children}</Providers>
        </RootProvider>
      </body>
    </html>
  );
}
