import { expect, test } from 'bun:test';
import { logProblems, subjectProblem } from './check-commits';

const record = (subject: string, body = '') => `\n${'a'.repeat(40)}\0${subject}\0${body}\x1e`;

test('accepts Conventional Commit subjects', () => {
  for (const s of ['feat: add price block', 'fix(registry): rtl icon flip', 'ci!: drop node 20', 'test(ci): cover trailers'])
    expect(subjectProblem(s)).toBeNull();
});

test('rejects bad subjects', () => {
  for (const s of ['Add price block', 'feat: Add price', 'feat:no space', 'wip: stuff', 'feat(Scope): x', 'feat: ', `feat: ${'x'.repeat(95)}`])
    expect(subjectProblem(s)).not.toBeNull();
});

test('rejects a Co-Authored-By trailer in any case', () => {
  const problems = logProblems(record('feat: ok', 'why\n\nco-authored-by: Bot <a@b.c>\n'));
  expect(problems).toHaveLength(1);
  expect(problems[0]).toContain('Co-Authored-By');
});

test('reports every bad commit and passes clean logs', () => {
  expect(logProblems(record('feat: a') + record('Fix b') + record('fix: c', 'Co-Authored-By: x'))).toHaveLength(2);
  expect(logProblems(record('feat: a', 'multi\nline body') + record('fix: b'))).toEqual([]);
  expect(logProblems('')).toEqual([]);
});
