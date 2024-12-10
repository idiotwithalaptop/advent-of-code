import { toLinkedLetter } from './domain';
describe('domain', () => {
  it('converts a string to a linkedletter', () => {
    const input = 'XMAS';
    const expected = {
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
    expect(toLinkedLetter(input)).toStrictEqual(expected);
  });
});
