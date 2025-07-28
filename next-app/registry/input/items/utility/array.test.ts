import { describe, it, expect } from 'vitest';

import { getLastArrayItem } from './array';

describe('array - getLastArrayItem', () => {

  it('do it', () => {
    expect(getLastArrayItem([])).toBeUndefined();
    expect(getLastArrayItem([1, 2, 3])).toBe(3);
  });

});