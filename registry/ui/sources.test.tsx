import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { SourceCitation, Sources, sourcesLabelsAr } from './sources';

const sources = [
  { title: 'تقرير المبيعات', url: 'https://www.mystore.example/reports/sales' },
  { title: 'Orders by city', url: 'https://mystore.example/reports/cities', site: 'Mystore' },
];

test('sources show a count and numbered cards with the host of each url', () => {
  const html = renderToString(<Sources sources={sources} defaultOpen />);
  expect(html).toContain('Used 2 sources');
  expect(html).toContain('mystore.example');
  expect(html).not.toContain('www.mystore.example</bdi>');
  expect(html).toContain('Mystore');
  expect(html).toContain('rel="noreferrer"');
});

test('Arabic count uses the Arabic plural forms', () => {
  expect(sourcesLabelsAr.used(1)).toBe('استند إلى مصدر واحد');
  expect(sourcesLabelsAr.used(2)).toBe('استند إلى مصدرين');
  expect(sourcesLabelsAr.used(3)).toBe('استند إلى 3 مصادر');
  expect(sourcesLabelsAr.used(11)).toBe('استند إلى 11 مصدرًا');
});

test('a citation is a labelled link with the number', () => {
  const html = renderToString(<SourceCitation index={1} source={sources[0]} labels={sourcesLabelsAr} />);
  expect(html).toContain('aria-label="المصدر 1: تقرير المبيعات"');
  expect(html).toContain('href="https://www.mystore.example/reports/sales"');
  expect(html).toContain('<bdi>1</bdi>');
});
