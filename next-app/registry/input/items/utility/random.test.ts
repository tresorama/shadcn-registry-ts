import { describe, it, expect } from 'vitest';
import { repeatSyncFn } from '../utility-framework/vitest.utils';

import {
  getRandomString,
  getRandomString2,
  getRandomInteger,
  getRandomArrayItem,
  getRandomColor,
  getRandomImage,
  getRandomDateInRange,
} from './random';

describe('random - getRandomString', () => {

  it('do it', async () => {
    repeatSyncFn(10_000, () => {
      const value = getRandomString();
      expect(value).toBeTypeOf('string');
      expect(value.length).toBe(19);
    });
  });
});

describe('random - getRandomString2', () => {

  it('do it', async () => {
    repeatSyncFn(10_000, () => {
      const value = getRandomString2();
      expect(value).toBeTypeOf('string');
      expect(value.length).toBe(5);
    });
  });
});

describe('random - getRandomInteger', () => {

  it('do it', async () => {
    repeatSyncFn(10_000, () => {
      const value = getRandomInteger(0, 100);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

});


describe('random - getRandomArrayItem', () => {

  it('do it', async () => {
    repeatSyncFn(10_000, () => {
      const value = getRandomArrayItem([1, 2, 3]);
      expect(value).oneOf([1, 2, 3]);
    });
  });

});


describe('random - getRandomColor', () => {

  it('do it', async () => {
    // total random
    repeatSyncFn(1_000, () => {
      const value = getRandomColor();
      expect(value.h).toBeGreaterThanOrEqual(0);
      expect(value.h).toBeLessThanOrEqual(360);
      expect(value.s).toBeGreaterThanOrEqual(0);
      expect(value.s).toBeLessThanOrEqual(100);
      expect(value.l).toBeGreaterThanOrEqual(0);
      expect(value.l).toBeLessThanOrEqual(100);
    });

    // fixed h
    repeatSyncFn(1_000, () => {
      const value = getRandomColor({ h: 100 });
      expect(value.h).toBe(100);
      expect(value.s).toBeGreaterThanOrEqual(0);
      expect(value.s).toBeLessThanOrEqual(100);
      expect(value.l).toBeGreaterThanOrEqual(0);
      expect(value.l).toBeLessThanOrEqual(100);
    });

    // fixed s
    repeatSyncFn(1_000, () => {
      const value = getRandomColor({ s: 100 });
      expect(value.h).toBeGreaterThanOrEqual(0);
      expect(value.h).toBeLessThanOrEqual(360);
      expect(value.s).toBe(100);
      expect(value.l).toBeGreaterThanOrEqual(0);
      expect(value.l).toBeLessThanOrEqual(100);
    });

    // fixed l
    repeatSyncFn(1_000, () => {
      const value = getRandomColor({ l: 100 });
      expect(value.h).toBeGreaterThanOrEqual(0);
      expect(value.h).toBeLessThanOrEqual(360);
      expect(value.s).toBeGreaterThanOrEqual(0);
      expect(value.s).toBeLessThanOrEqual(100);
      expect(value.l).toBe(100);
    });

    // fixed h, s
    repeatSyncFn(1_000, () => {
      const value = getRandomColor({ h: 100, s: 100 });
      expect(value.h).toBe(100);
      expect(value.s).toBe(100);
      expect(value.l).toBeGreaterThanOrEqual(0);
      expect(value.l).toBeLessThanOrEqual(100);
    });

    // fixed h, l
    repeatSyncFn(1_000, () => {
      const value = getRandomColor({ h: 100, l: 100 });
      expect(value.h).toBe(100);
      expect(value.s).toBeGreaterThanOrEqual(0);
      expect(value.s).toBeLessThanOrEqual(100);
      expect(value.l).toBe(100);
    });

    // fixed s, l
    repeatSyncFn(1_000, () => {
      const value = getRandomColor({ s: 100, l: 100 });
      expect(value.h).toBeGreaterThanOrEqual(0);
      expect(value.h).toBeLessThanOrEqual(360);
      expect(value.s).toBe(100);
      expect(value.l).toBe(100);
    });
  });

});


describe('random - getRandomImage', () => {

  it('do it', async () => {
    repeatSyncFn(10_000, () => {
      const value = getRandomImage();
      expect(value).toBeTypeOf('string');
      expect(value.startsWith('https://picsum.photos/')).toBe(true);
    });
  });

});

describe('random - getRandomDateInRange', () => {

  it('do it', async () => {
    repeatSyncFn(10_000, () => {
      const start = new Date('2022-01-01');
      const end = new Date('2022-12-31');
      const value = getRandomDateInRange(start, end);
      expect(value).toBeInstanceOf(Date);
      expect(value.getTime()).toBeGreaterThanOrEqual(start.getTime());
      expect(value.getTime()).toBeLessThanOrEqual(end.getTime());
    });
  });

});
