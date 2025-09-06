import { describe, it, expect } from 'vitest';

import {
  sortArrayByDate,
  sortArrayByNumber,
  sortArrayByString,
} from './array-sort';

describe('array - sortArrayByDate', () => {

  it('do it - asc', () => {
    const input = [
      { name: 'B', date: new Date('2022-02-01') },
      { name: 'A', date: new Date('2022-01-01') },
      { name: 'C', date: new Date('2022-03-01') },
    ];
    const sortedAsc = input.toSorted((a, b) => sortArrayByDate(a.date, b.date, 'asc'));
    expect(sortedAsc.map(item => item.name)).toEqual(['A', 'B', 'C']);
  });
  it('do it - desc', () => {
    const input = [
      { name: 'B', date: new Date('2022-02-01') },
      { name: 'A', date: new Date('2022-01-01') },
      { name: 'C', date: new Date('2022-03-01') },
    ];
    const sortedAsc = input.toSorted((a, b) => sortArrayByDate(a.date, b.date, 'desc'));
    expect(sortedAsc.map(item => item.name)).toEqual(['C', 'B', 'A']);
  });

});

describe('array - sortArrayByNumber', () => {

  it('do it - asc', () => {
    const input = [3, 1, 2];
    const sortedAsc = input.toSorted((a, b) => sortArrayByNumber(a, b, 'asc'));
    expect(sortedAsc).toEqual([1, 2, 3]);
  });
  it('do it - desc', () => {
    const input = [3, 1, 2];
    const sortedAsc = input.toSorted((a, b) => sortArrayByNumber(a, b, 'desc'));
    expect(sortedAsc).toEqual([3, 2, 1]);
  });

});

describe('array - sortArrayByString', () => {

  it('do it - asc', () => {
    const input = ['B', 'A', 'C'];
    const sortedAsc = input.toSorted((a, b) => sortArrayByString(a, b, 'asc'));
    expect(sortedAsc).toEqual(['A', 'B', 'C']);
  });
  it('do it - desc', () => {
    const input = ['B', 'A', 'C'];
    const sortedAsc = input.toSorted((a, b) => sortArrayByString(a, b, 'desc'));
    expect(sortedAsc).toEqual(['C', 'B', 'A']);
  });

});