import { multiply } from './multiplier';
describe('multiplier', () => {
  it('multiplies two numbers', () => {
    expect(multiply('1', '2')).toBe(2);
  });

  it('multiplies two negative numbers', () => {
    expect(multiply('-1', '-2')).toBe(2);
  });

  it('multiplies a negative and a positive number', () => {
    expect(multiply('-1', '2')).toBe(-2);
  });

  it('does not multiply three numbers', () => {
    expect(() => multiply('1', '2', '3')).toThrow();
  });

  it('does not multiply a non-number', () => {
    expect(() => multiply('1', 'wacca')).toThrow();
  });
});
