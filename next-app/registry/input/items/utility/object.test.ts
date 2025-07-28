import { describe, it, expect } from 'vitest';

import { pick, omit } from './object';

describe('object - pick', () => {

  it('do it', () => {
    expect(pick({ id: 56, name: 'Luke' }, ['id'])).toMatchObject({ id: 56 });
    // @ts-expect-error NON_EXISTING is not in obj
    expect(pick({ id: 56, name: 'Luke' }, ['NON_EXISTING'])).toMatchObject({ NON_EXISTING: undefined });
  });

});

describe('object - omit', () => {

  it('do it', () => {
    expect(omit({ id: 56, name: 'Luke' }, ['id'])).toMatchObject({ name: 'Luke' });
    // @ts-expect-error NON_EXISTING is not in obj
    expect(omit({ id: 56, name: 'Luke' }, ['NON_EXISTING'])).toMatchObject({ id: 56, name: 'Luke' });
  });

});
