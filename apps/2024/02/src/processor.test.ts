import { processLine } from './processor';
describe('processor', () => {
  it('returns safe for single number line', () => {
    expect(processLine('123')).toStrictEqual({ line: '123', isSafe: true });
  });

  it('returns safe for increasing line', () => {
    expect(processLine('1 2 4 7 8 10')).toStrictEqual({ line: '1 2 4 7 8 10', isSafe: true });
  });

  it('returns safe for decreasing line', () => {
    expect(processLine('10 9 7 4 2 0')).toStrictEqual({ line: '10 9 7 4 2 0', isSafe: true });
  });

  it('returns unsafe for increasing line exceeding 3', () => {
    expect(processLine('1 2 4 8 9 11')).toStrictEqual({ line: '1 2 4 8 9 11', isSafe: false });
  });

  it('returns safe for decreasing line exceeding 3', () => {
    expect(processLine('10 6 5 4 2 0')).toStrictEqual({ line: '10 6 5 4 2 0', isSafe: false });
  });

  it('returns unsafe for repeating numbers in line', () => {
    expect(processLine('1 2 3 3 6 7')).toStrictEqual({ line: '1 2 3 3 6 7', isSafe: false });
  });

  it('returns unsafe for repeating numbers in line', () => {
    expect(processLine('86 87 88 91 91')).toStrictEqual({ line: '86 87 88 91 91', isSafe: false });
  });

  describe('provided examples', () => {
    // 7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
    it('returns safe for 7 6 4 2 1', () => {
      expect(processLine('7 6 4 2 1')).toStrictEqual({ line: '7 6 4 2 1', isSafe: true });
    });
    // 1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
    it('returns unsafe for 1 2 7 8 9', () => {
      expect(processLine('1 2 7 8 9')).toStrictEqual({ line: '1 2 7 8 9', isSafe: false });
    });
    // 9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
    it('returns unsafe for 9 7 6 2 1', () => {
      expect(processLine('9 7 6 2 1')).toStrictEqual({ line: '9 7 6 2 1', isSafe: false });
    });
    // 1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
    it('returns unsafe for 1 3 2 4 5', () => {
      expect(processLine('1 3 2 4 5')).toStrictEqual({ line: '1 3 2 4 5', isSafe: false });
    });
    // 8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
    it('returns unsafe for 8 6 4 4 1', () => {
      expect(processLine('8 6 4 4 1')).toStrictEqual({ line: '8 6 4 4 1', isSafe: false });
    });
    // 1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
    it('returns safe for 1 3 6 7 9', () => {
      expect(processLine('1 3 6 7 9')).toStrictEqual({ line: '1 3 6 7 9', isSafe: true });
    });
  });
});
