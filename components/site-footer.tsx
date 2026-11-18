import { CH, T, type Lang } from '@/lib/strings';
import { gitConfig } from '@/lib/shared';
import { Signature } from '@/components/signature';

export function SiteFooter({ lang }: { lang: Lang }) {
  const f = T[lang].footer;
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">{f.crafted}</p>
          <Signature label={CH[lang].sigLabel} className="w-40 text-foreground" />
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          {f.rights}{' '}
          <a
            className="underline underline-offset-4 hover:text-foreground"
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
