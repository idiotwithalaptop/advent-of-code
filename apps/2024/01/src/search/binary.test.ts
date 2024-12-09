import { findAll } from './binary';
describe('binary search', () => {
  it('should find all occurrences of a number in an array', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9];
    expect(findAll(9, array)).resolves.toStrictEqual([8, 9, 10, 11, 12]);
  });

  it('should find all occurrences of a string in an array', () => {
    const array = [
      'apple',
      'banana',
      'kiwi',
      'orange',
      'pineapple',
      'pineapple',
    ];
    expect(findAll('pineapple', array)).resolves.toStrictEqual([4, 5]);
  });

  it('should return an empty array if the target is not found', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(findAll(10, array)).resolves.toStrictEqual([]);
  });
});
