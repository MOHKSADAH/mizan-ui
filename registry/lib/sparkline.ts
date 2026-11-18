// Points of a polyline scaled into width x height. A flat series draws a centered line.
export function sparklinePoints(values: number[], width: number, height: number, pad = 2): string {
  if (values.length < 2 || width <= 0) return '';
  const min = Math.min(...values);
  const span = Math.max(...values) - min;
  const step = (width - pad * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const y = span === 0 ? height / 2 : height - pad - ((v - min) / span) * (height - pad * 2);
      return `${(pad + i * step).toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}
