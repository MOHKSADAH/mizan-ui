import { ToolCallStates } from '@/registry/examples/tool-call.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A card for one tool call: the tool name, its input and output as code, and a state (input-streaming, running, done or error). It opens to show the details.',
    ar: 'بطاقة لاستدعاء أداة واحد: اسم الأداة ومدخلاتها ومخرجاتها كشيفرة، وحالة (يجهّز المدخلات أو قيد التنفيذ أو اكتمل أو فشل). تُفتح لعرض التفاصيل.',
  },
  usage: `import { ToolCall } from "@/components/ui/tool-call"

<ToolCall name="get_sales_report" state="done" input={input} output={output} />`,
  examples: { Default: { en: 'All four states', ar: 'الحالات الأربع' } },
  accessibility: [
    { en: 'The state is written in a badge as well as shown by the icon, so it never relies on color or motion.', ar: 'تُكتب الحالة في شارة إضافة إلى الأيقونة، فلا تعتمد على اللون أو الحركة.' },
    { en: 'The tool name, the input and the output are always left to right, even in an Arabic page.', ar: 'اسم الأداة والمدخلات والمخرجات من اليسار إلى اليمين دائمًا، حتى في صفحة عربية.' },
    { en: 'The header is a button with aria-expanded. The code blocks are focusable so a keyboard user can scroll them.', ar: 'الرأس زر مع aria-expanded. كتل الشيفرة قابلة للتركيز ليتمكن مستخدم لوحة المفاتيح من تمريرها.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <ToolCallStates lang={lang} />;
}
