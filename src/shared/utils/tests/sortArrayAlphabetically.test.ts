import { sortArrayAlphabetically } from '../sortArrayAlphabetically';

describe('sortArrayAlphabetically', () => {
  test('default case', () => {
    expect(sortArrayAlphabetically('Senya', 'Alex')).toBe(1);
    expect(sortArrayAlphabetically('Alex', 'Senya')).toBe(-1);
    expect(sortArrayAlphabetically('Senya', 'Senya')).toBe(0);
  });
  test('Text case', () => {
    expect(sortArrayAlphabetically('SENYA', 'alex')).toBe(1);
    expect(sortArrayAlphabetically('aLEX', 'Senya')).toBe(-1);
    expect(sortArrayAlphabetically('Senya', 'senya')).toBe(0);
  });
});
