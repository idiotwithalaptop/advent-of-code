import { all } from './evaluators';
import { Evaluator } from './evaluators/types';
export type Result = {
  line: string;
  isSafeV1: boolean;
  isSafeV2: boolean;
};

export function processLine(line: string): Result {
  if (line.match(/^(\d+\s+)*\d+$/)) {
    let evaluator: Evaluator;
    const numbers = line.split(/\s+/).map(Number);

    if (numbers.length < 2) {
      return { line, isSafeV1: true, isSafeV2: true };
    }

    for (let i = 0; i < numbers.length - 1; i++) {
      const current = numbers[i];
      const next = numbers[i + 1];

      if (!evaluator) {
        const validEvaluator = all().find((e) => e(current, next));
        if (!validEvaluator) {
          return { line, isSafeV1: false, isSafeV2: true };
        }
        evaluator = validEvaluator;
      }

      if (!evaluator(current, next)) {
        return { line, isSafeV1: false, isSafeV2: true };
      }
    }

    return { line, isSafeV1: true, isSafeV2: true };
  } else {
    throw new Error(`Invalid line: '${line}'`);
  }
}
