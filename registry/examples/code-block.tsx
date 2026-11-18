import { FileTsIcon, TerminalWindowIcon } from '@phosphor-icons/react/ssr';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from '@/registry/ui/code-block';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A scrollable code panel with a header, a copy button and optional line numbers and line highlights. Code always reads left to right.',
    ar: 'لوحة شيفرة قابلة للتمرير مع رأس وزر نسخ وأرقام أسطر وتمييز اختياري. تُقرأ الشيفرة دائمًا من اليسار إلى اليمين.',
  },
  usage: `import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
} from "@/components/ui/code-block"

<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>button.tsx</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton value={code} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent>{code}</CodeBlockContent>
</CodeBlock>`,
  examples: {
    Default: { en: 'TSX with header', ar: 'TSX مع رأس' },
    Bash: { en: 'Shell command, small size', ar: 'أمر طرفية بالمقاس الصغير' },
    Lines: { en: 'Line numbers and diff lines', ar: 'أرقام الأسطر وأسطر الفروقات' },
  },
  accessibility: [
    { en: 'The code area is focusable, so keyboard users can scroll long lines.', ar: 'منطقة الشيفرة قابلة للتركيز، فيستطيع مستخدمو لوحة المفاتيح تمرير الأسطر الطويلة.' },
    { en: 'The copy button has an aria-label and announces "Copied" politely. Pass Arabic labels with the labels prop.', ar: 'لزر النسخ aria-label ويعلن "تم النسخ" بهدوء. مرّر التسميات العربية عبر الخاصية labels.' },
    { en: 'Added and removed lines show a + or − sign, not only a background color.', ar: 'الأسطر المضافة والمحذوفة تعرض علامة + أو −، وليس لون الخلفية فقط.' },
  ],
};

const labelsAr = { copy: 'نسخ', copied: 'تم النسخ' };

const TSX = `import { Button } from "@/components/ui/button"

export function Cta() {
  return <Button variant="outline">Continue</Button>
}`;

export function Default({ lang }: ExampleProps) {
  return (
    <CodeBlock className="max-w-xl [contain:inline-size]">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileTsIcon weight="regular" aria-hidden />
          <bdi lang="en">cta.tsx</bdi>
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={TSX} labels={lang === 'ar' ? labelsAr : undefined} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{TSX}</CodeBlockContent>
    </CodeBlock>
  );
}

const BASH = `bunx --bun shadcn@latest add @mizan/button
bunx --bun shadcn@latest add @mizan/card`;

export function Bash({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <CodeBlock size="sm" className="max-w-xl [contain:inline-size]">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <TerminalWindowIcon weight="regular" aria-hidden />
          {ar ? 'الطرفية' : 'Terminal'}
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={BASH} labels={ar ? labelsAr : undefined} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{BASH}</CodeBlockContent>
    </CodeBlock>
  );
}

export function Lines({ lang }: ExampleProps) {
  return (
    <CodeBlock className="max-w-xl [contain:inline-size]">
      <CodeBlockContent lineNumbers aria-label={lang === 'ar' ? 'شيفرة بأرقام الأسطر' : 'Code with line numbers'}>
        <CodeBlockLine>{'export function Total({ items }) {'}</CodeBlockLine>
        <CodeBlockLine variant="removed">{'  return items.length'}</CodeBlockLine>
        <CodeBlockLine variant="added">{'  return items.reduce((sum, i) => sum + i.price, 0)'}</CodeBlockLine>
        <CodeBlockLine variant="highlighted">{'}'}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  );
}
