import Link from 'next/link';
import { source } from '@/lib/source';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Mizan UI</h1>
      <p>
        Arabic and English components for shadcn.{' '}
        <Link href={source.getPage([], lang)?.url ?? '/docs'} className="font-medium underline">
          Read the docs
        </Link>
      </p>
    </div>
  );
}
