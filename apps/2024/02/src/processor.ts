import { all } from './evaluators';
import { Evaluator } from './evaluators/types';
export type Result = {
  line: string;
  isSafeV1: boolean;
  isSafeV2: boolean;
};

export function processLine(line: string): Result {
  if (line.match(/^(\d+\s+)*\d+$/)) {
    const numbers = line.split(/\s+/).map(Number);
    const isSafeV1 = processNumbers(numbers);
    const isSafeV2 =
      isSafeV1 ||
      numbers.some((number, i, arr) => {
        const dampened = arr.slice();
        dampened.splice(i, 1);
        return processNumbers(dampened);
      });

    return { line, isSafeV1, isSafeV2 };
  } else {
    throw new Error(`Invalid line: '${line}'`);
  }
}

function processNumbers(numbers: number[]): boolean {
  let evaluator: Evaluator;

  if (numbers.length < 2) {
    return true;
  }

  for (let i = 0; i < numbers.length - 1; i++) {
    const current = numbers[i];
    const next = numbers[i + 1];

    if (!evaluator) {
      const validEvaluator = all().find((e) => e(current, next));
      if (!validEvaluator) {
        return false;
      }
      evaluator = validEvaluator;
    }

    if (!evaluator(current, next)) {
      return false;
    }
  }

  return true;
}
