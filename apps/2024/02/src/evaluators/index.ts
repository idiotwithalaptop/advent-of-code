import { evaluate as descreasing } from './decreasing';
import { evaluate as increasing } from './increasing';
export function all() {
  return [increasing, descreasing];
}
