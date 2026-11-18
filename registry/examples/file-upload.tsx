import { FileUploadDemo } from '@/registry/examples/file-upload.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A dropzone and file list. It checks file type, size and count, shows upload progress, and lets people remove files.',
    ar: 'منطقة إفلات مع قائمة ملفات. تتحقق من نوع الملف وحجمه وعدده، وتعرض تقدّم الرفع، وتتيح إزالة الملفات.',
  },
  usage: `import { FileUpload } from "@/components/ui/file-upload"\n\n<FileUpload accept="image/*,.pdf" maxSize={5 * 1024 * 1024} maxFiles={3} onValueChange={setFiles} />`,
  examples: {
    Default: { en: 'Images and PDF, 5 MB each, 3 files at most', ar: 'صور وPDF، حتى 5 ميغابايت للملف، وثلاثة ملفات كحد أقصى' },
    Single: { en: 'One file only', ar: 'ملف واحد فقط' },
  },
  accessibility: [
    {
      en: 'The dropzone is a button: Enter or Space opens the file picker. Each file has a remove button with its name.',
      ar: 'منطقة الإفلات زر: يفتح Enter أو Space نافذة اختيار الملفات. لكل ملف زر إزالة يحمل اسمه.',
    },
    {
      en: 'Limits are linked with aria-describedby. Added and removed files are announced in a polite live region. Errors show an icon and text, not only color.',
      ar: 'الحدود مرتبطة عبر aria-describedby. تُعلَن الإضافة والإزالة في منطقة حية مهذبة. تعرض الأخطاء أيقونة ونصًا وليس اللون وحده.',
    },
    {
      en: 'File names are isolated with bdi so mixed Arabic and Latin names keep their order.',
      ar: 'أسماء الملفات معزولة بـ bdi حتى يبقى ترتيب الأسماء المختلطة بين العربية واللاتينية سليمًا.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <FileUploadDemo lang={lang} accept="image/*,.pdf" maxSize={5 * 1024 * 1024} maxFiles={3} />;
}

export function Single({ lang }: ExampleProps) {
  return <FileUploadDemo lang={lang} multiple={false} />;
}
