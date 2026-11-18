export type CountdownParts = { days: number; hours: number; minutes: number; seconds: number };

export function countdownParts(secondsLeft: number): CountdownParts {
  const s = Math.max(0, Math.floor(secondsLeft));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}
