import { LinkedLetter, WordSearch } from './domain';
import { find, findX } from './searcher';

describe('searcher', () => {
  it('works based on example given', () => {
    const board: WordSearch = [
      ['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'],
      ['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'],
      ['A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M'],
      ['M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X'],
      ['X', 'M', 'A', 'S', 'A', 'M', 'X', 'A', 'M', 'M'],
      ['X', 'X', 'A', 'M', 'M', 'X', 'X', 'A', 'M', 'A'],
      ['S', 'M', 'S', 'M', 'S', 'A', 'S', 'X', 'S', 'S'],
      ['S', 'A', 'X', 'A', 'M', 'A', 'S', 'A', 'A', 'A'],
      ['M', 'A', 'M', 'M', 'M', 'X', 'M', 'M', 'M', 'M'],
      ['M', 'X', 'M', 'X', 'A', 'X', 'M', 'A', 'S', 'X'],
    ];
    const work: LinkedLetter = {
      letter: 'X',
      next: {
        letter: 'M',
        next: {
          letter: 'A',
          next: {
            letter: 'S',
            next: null,
          },
        },
      },
    };
    expect(find(work, board)).toBe(18);
  });

  it('it performs x search based on example given', () => {
    const board: WordSearch = [
      ['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'],
      ['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'],
      ['A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M'],
      ['M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X'],
      ['X', 'M', 'A', 'S', 'A', 'M', 'X', 'A', 'M', 'M'],
      ['X', 'X', 'A', 'M', 'M', 'X', 'X', 'A', 'M', 'A'],
      ['S', 'M', 'S', 'M', 'S', 'A', 'S', 'X', 'S', 'S'],
      ['S', 'A', 'X', 'A', 'M', 'A', 'S', 'A', 'A', 'A'],
      ['M', 'A', 'M', 'M', 'M', 'X', 'M', 'M', 'M', 'M'],
      ['M', 'X', 'M', 'X', 'A', 'X', 'M', 'A', 'S', 'X'],
    ];
    const work: LinkedLetter = {
      letter: 'M',
      next: {
        letter: 'A',
        next: {
          letter: 'S',
          next: null,
        },
      },
    };
    expect(findX(work, board)).toBe(9);
  });
});
