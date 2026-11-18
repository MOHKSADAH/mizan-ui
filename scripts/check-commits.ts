// Usage: BASE_REF=main PR_TITLE="..." bun scripts/check-commits.ts
// Checks the subject of every commit in origin/$BASE_REF..HEAD, rejects Co-Authored-By trailers, and checks the PR title.
const SUBJECT = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9][a-z0-9/_.-]*\))?!?: [^\sA-Z].*$/;
const TRAILER = /^co-authored-by:/im;

export function subjectProblem(subject: string): string | null {
  if (subject.length >= 100) return `subject is ${subject.length} characters, limit is 99`;
  if (!SUBJECT.test(subject)) return 'subject must be "type(scope)?: lowercase subject"';
  return null;
}

export function logProblems(log: string): string[] {
  return log
    .split('\x1e')
    .map((record) => record.replace(/^\n/, ''))
    .filter(Boolean)
    .flatMap((record) => {
      const [sha, subject, body = ''] = record.split('\0');
      const problems = [subjectProblem(subject)];
      if (TRAILER.test(body)) problems.push('body has a Co-Authored-By trailer');
      return problems.flatMap((p) => (p ? [`${sha.slice(0, 7)} ${subject}: ${p}`] : []));
    });
}

if (import.meta.main) {
  const base = process.env.BASE_REF ?? 'main';
  const git = Bun.spawnSync(['git', 'log', '--no-merges', '--format=%H%x00%s%x00%b%x1e', `origin/${base}..HEAD`]);
  if (!git.success) {
    console.error(git.stderr.toString());
    process.exit(1);
  }
  const problems = logProblems(git.stdout.toString());
  const title = process.env.PR_TITLE;
  const titleProblem = title === undefined ? null : subjectProblem(title);
  if (titleProblem) problems.push(`PR title "${title}": ${titleProblem}`);
  if (problems.length) {
    console.error(`Commit and title rules failed:\n${problems.join('\n')}`);
    process.exit(1);
  }
  console.log('Commit subjects, trailers and PR title are valid.');
}
