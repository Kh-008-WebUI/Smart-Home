import { searchItem } from '../utils/utils';

describe (
  `Checks whether the name of the device
  coincides with the string from the search`, () => {
    it (`Comparison of strings of different registers`, () => {
      expect(searchItem('Washer', 'WASHER')).toBe(true);
    });
    it (`Strings that do not match.`, () => {
      expect(searchItem('Washer', 'Fridge')).toBe(false);
    });
    it (`Empty string with string.`, () => {
      expect(searchItem(' ', 'Fridge')).toBe(false);
    });
    it (`Number with string.`, () => {
      expect(searchItem(1200, 'Fridge')).toBe(false);
    });
    it (`NaN with string.`, () => {
      expect(searchItem(NaN, 'Fridge')).toBe(false);
    });
    it (`Undefined with string.`, () => {
      expect(searchItem(undefined, 'Fridge')).toBe(false);
    });
  }
);