import { mergeSort } from '../sort/merge';

export async function calculateDistance(
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
  return sortedOrigin.reduce((sum: number, value: number, index: number) => {
    return sum + Math.abs(value - sortedDestination[index]);
  }, 0);
}
