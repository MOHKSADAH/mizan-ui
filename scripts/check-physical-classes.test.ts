import { expect, test } from 'bun:test';
import { findPhysicalLines } from './check-physical-classes';

test.each([
  'className="ml-2"',
  'cn("flex md:mr-4")',
  "'-ml-2 gap-2'",
  '`pl-3 pr-3`',
  '"absolute left-0 top-0"',
  '"-right-1/2"',
  '"text-left"',
  '"rounded-l-md"',
  '"rounded-tr-lg"',
  '"border-l-2"',
  '"border-r"',
  '"scroll-ml-4"',
  '@apply pr-2;',
  '"hover:!pl-1"',
])('flags %s', (line) => {
  expect(findPhysicalLines(line)).toEqual([1]);
});

test.each([
  'className="ms-2 me-4 ps-3 pe-3"',
  '"start-0 end-0 text-start text-end"',
  '"rounded-lg rounded-s-md rounded-ee-sm"',
  '"border-s border-e-2 border-ring border-lime-500 border-red-500"',
  '"scroll-ms-4 inset-x-0"',
  'margin-left: 0;',
  '"ml-2" // mizan-allow-physical',
  'const copyright-holder = 1',
])('allows %s', (line) => {
  expect(findPhysicalLines(line)).toEqual([]);
});

test('reports line numbers', () => {
  expect(findPhysicalLines('"ms-2"\n"ml-2"\n"me-2"\n"right-0"')).toEqual([2, 4]);
});
