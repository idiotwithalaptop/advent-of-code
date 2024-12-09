import { mergeSort } from '../sort/merge';

export async function findAll<T>(target: T, array: T[]): Promise<number[]> {
  const result = [];
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      result.push(mid);
      let i = mid - 1;
      while (i >= 0 && array[i] === target) {
        result.push(i);
        i--;
      }
      i = mid + 1;
      while (i < array.length && array[i] === target) {
        result.push(i);
        i++;
      }
      return await mergeSort(result);
    }
    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return await mergeSort(result);
}
