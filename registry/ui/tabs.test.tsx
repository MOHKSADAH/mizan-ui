import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Tabs, TabsList, TabsTrigger } from './tabs';

test('tabs pass a vertical orientation to the tab list', () => {
  const html = renderToString(
    <Tabs orientation="vertical" defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
    </Tabs>,
  );
  expect(html).toContain('aria-orientation="vertical"');
});
