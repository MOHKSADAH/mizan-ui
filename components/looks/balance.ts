// Min-max balance: assigns each card (in source order) to one of n columns so the tallest column is as short as
// possible. Ties prefer evenly filled columns, then the row-by-row reading order. Exhaustive: fine for a dozen cards.
export function balance(heights: number[], n: number): number[] {
  const sums = Array<number>(n).fill(0);
  const current: number[] = [];
  let best: number[] = [];
  let score: [number, number, number] = [Infinity, Infinity, Infinity];

  const better = (a: number[], b: number[]) => {
    const i = a.findIndex((x, k) => x !== b[k]);
    return i >= 0 && a[i] < b[i];
  };

  const go = (i: number, used: number) => {
    if (i === heights.length) {
      const next: [number, number, number] = [
        Math.max(...sums),
        sums.reduce((s, x) => s + x * x, 0),
        current.reduce((s, c, k) => s + Math.abs(c - (k % n)), 0),
      ];
      if (better(next, score)) {
        score = next;
        best = [...current];
      }
      return;
    }
    for (let c = 0; c < Math.min(used + 1, n); c++) {
      sums[c] += heights[i];
      if (sums[c] <= score[0]) {
        current[i] = c;
        go(i + 1, Math.max(used, c + 1));
      }
      sums[c] -= heights[i];
    }
  };
  go(0, 0);
  return best;
}
