import { describe, it, expect } from 'vitest';
import {
  clamp,
  lerp,
  lerpInverse,
  sum,
  mean,
  wrap,
  numIsBetween,
  calculateFrequenciesStats,
} from './math';

describe('math - clamp', () => {

  it('do it', () => {

    // with value inside range
    expect(clamp({ min: 0, max: 100, value: 50 })).toBe(50);
    expect(clamp({ min: 0, max: 100, value: 25 })).toBe(25);
    expect(clamp({ min: 0, max: 100, value: 75 })).toBe(75);

    // with value outside range
    expect(clamp({ min: 0, max: 100, value: -50 })).toBe(0);
    expect(clamp({ min: 0, max: 100, value: 150 })).toBe(100);
  });

});

describe('math - lerp', () => {

  it('do it', () => {

    // with t inside 0-1 range
    expect(lerp({ min: 0, max: 100, t: 0.5 })).toBe(50);
    expect(lerp({ min: 0, max: 100, t: 0.25 })).toBe(25);
    expect(lerp({ min: 0, max: 100, t: 0.75 })).toBe(75);

    // with t outise 0-1 range
    expect(lerp({ min: 0, max: 100, t: -0.5 })).toBe(0);
    expect(lerp({ min: 0, max: 100, t: 1.5 })).toBe(100);
  });

});

describe('math - lerpInverse', () => {

  it('do it', () => {

    // with value inside range
    expect(lerpInverse({ min: 0, max: 100, value: 50 })).toBe(0.5);
    expect(lerpInverse({ min: 0, max: 100, value: 25 })).toBe(0.25);
    expect(lerpInverse({ min: 0, max: 100, value: 75 })).toBe(0.75);

    // with value outside range
    expect(lerpInverse({ min: 0, max: 100, value: -50 })).toBe(0);
    expect(lerpInverse({ min: 0, max: 100, value: 150 })).toBe(1);
  });

});


describe('math - sum', () => {

  it('do it', () => {
    expect(sum([])).toBe(0);
    expect(sum([1, 2, 3])).toBe(6);
  });

});

describe('math - mean', () => {

  it('do it', () => {
    expect(mean([])).toBe(0);
    expect(mean([1, 2, 3])).toBe(2);
    expect(mean([1, 2, 3, 4])).toBe(2.5);
    expect(mean([0, 0, 10])).toBe(3.3333333333333335);
  });

});

describe('math - wrap', () => {

  it('do it', () => {
    // with value inside range
    expect(wrap({ min: 0, max: 100, value: 34 })).toBe(34);

    // with value outside range
    expect(wrap({ min: 0, max: 100, value: -10 })).toBe(100);
    expect(wrap({ min: 0, max: 100, value: 200 })).toBe(0);
  });

});

describe('math - numIsBetween', () => {

  it('do it', () => {
    // with value inside range
    expect(numIsBetween({ min: 0, max: 100, num: 0 })).toBe(true);
    expect(numIsBetween({ min: 0, max: 100, num: 50 })).toBe(true);
    expect(numIsBetween({ min: 0, max: 100, num: 100 })).toBe(true);
    expect(numIsBetween({ min: 0, max: 100, num: 0, isInclusive: true })).toBe(true);
    expect(numIsBetween({ min: 0, max: 100, num: 50, isInclusive: true })).toBe(true);
    expect(numIsBetween({ min: 0, max: 100, num: 100, isInclusive: true })).toBe(true);
    expect(numIsBetween({ min: 0, max: 100, num: 0, isInclusive: false })).toBe(false);
    expect(numIsBetween({ min: 0, max: 100, num: 50, isInclusive: false })).toBe(true);
    expect(numIsBetween({ min: 0, max: 100, num: 100, isInclusive: false })).toBe(false);

    // with value outside range
    expect(numIsBetween({ min: 0, max: 100, num: -1 })).toBe(false);
    expect(numIsBetween({ min: 0, max: 100, num: 101 })).toBe(false);
  });

});

describe('math - calculateFrequenciesStats', () => {

  it('do it', () => {
    expect(calculateFrequenciesStats({ A: 4, B: 6 })).toMatchObject({
      total: 10,
      groups: {
        A: { count: 4, percentageOnTotal: 0.4 },
        B: { count: 6, percentageOnTotal: 0.6 },
      }
    });
    expect(calculateFrequenciesStats({ A: 1, B: 2 })).toMatchObject({
      total: 3,
      groups: {
        A: { count: 1, percentageOnTotal: 0.3333333333333333 },
        B: { count: 2, percentageOnTotal: 0.6666666666666666 },
      }
    });
  });

});
