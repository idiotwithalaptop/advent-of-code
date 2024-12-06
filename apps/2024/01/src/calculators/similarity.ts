import { findAll } from '../search/binary';
import { mergeSort } from '../sort/merge';

export async function calculateSimilarity(
  origin: number[],
  destination: number[]
): Promise<number> {
  if (origin.length !== destination.length) {
    throw new Error(
      'Origin and destination must have the same number of location ids'
    );
  }
  const sortedOrigin = await mergeSort(origin);
  const sortedDestination = await mergeSort(destination);
  let sum = 0;
  for (const value of sortedOrigin) {
    const occurrences = await findAll(value, sortedDestination);
    sum += value * occurrences.length;
  }
  return sum;
}
