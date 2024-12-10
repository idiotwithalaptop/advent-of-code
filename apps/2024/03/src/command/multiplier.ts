const MAX_SUPPORTED_ARGS = 2;
export function multiply(...args: string[]): number {
  if (
    args.length > 1 &&
    args.length <= MAX_SUPPORTED_ARGS &&
    args.every((arg) => !isNaN(Number(arg)))
  ) {
    return args.reduce((acc, cur) => acc * Number(cur), 1);
  } else {
    throw new Error(`Invalid arguments: ${args.join(', ')}`);
  }
}
