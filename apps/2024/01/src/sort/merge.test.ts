import { mergeSort } from './merge';
describe('merge sort', () => {
  it('should sort an array of numbers', () => {
    const array = [5, 3, 8, 4, 2, 1, 9, 7, 6];
    expect(mergeSort(array)).resolves.toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  it('should sort an array of strings', () => {
    const array = ['banana', 'apple', 'orange', 'pineapple', 'kiwi'];
    expect(mergeSort(array)).resolves.toStrictEqual([
      'apple',
      'banana',
      'kiwi',
      'orange',
      'pineapple',
    ]);
  });
});
