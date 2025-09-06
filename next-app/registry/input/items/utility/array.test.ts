import { describe, it, expect } from 'vitest';

import { getLastArrayItem, createArrayWithLength } from './array';

describe('array - getLastArrayItem', () => {

  it('do it', () => {
    expect(getLastArrayItem([])).toBeUndefined();
    expect(getLastArrayItem([1, 2, 3])).toBe(3);
  });

});

describe('array - createArrayWithLength', () => {

  it('do it', () => {
    expect(createArrayWithLength(3).length).toBe(3);
    expect(createArrayWithLength(2).map((_, i) => i)).toEqual([0, 1]);
  });

});