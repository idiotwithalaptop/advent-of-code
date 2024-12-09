export function evaluate(previous: number, current: number): boolean {
  const difference = Math.abs(previous - current);
  return previous < current && difference >= 1 && difference <= 3;
}
