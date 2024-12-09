import { calculateSimilarity } from './similarity';
describe('Calculate Similarity', () => {
  it('should match the example given', () => {
    const origin = [3, 4, 2, 1, 3, 3];
    const destination = [4, 3, 5, 3, 9, 3];
    expect(calculateSimilarity(origin, destination)).resolves.toBe(31);
  });
});
