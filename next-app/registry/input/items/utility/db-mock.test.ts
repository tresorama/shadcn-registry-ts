import { describe, it, expect } from 'vitest';

import { createDbTable } from './db-mock';

describe('db-mock', () => {

  it('do it', () => {

    const NON_EXISTING_ID = 999_999;

    const initialRecords = [
      { id: 1, name: 'Luke' },
      { id: 2, name: 'Leia' }
    ];

    const table = createDbTable(initialRecords);

    // getAll
    expect(table.getAll()).toMatchObject(initialRecords);

    // getById
    expect(table.getById(1)).toMatchObject(initialRecords[0]);
    expect(table.getById(NON_EXISTING_ID)).toBeNull();

    // create
    expect(table.create({ name: 'Yoda' })).toMatchObject({ id: 3, name: 'Yoda' });

    // update
    expect(table.update(1, { name: 'Obi-Wan' })).toMatchObject({ id: 1, name: 'Obi-Wan' });
    expect(table.update(NON_EXISTING_ID, { name: 'Obi-Wan' })).toBeNull();

    // delete
    expect(table.delete(2)).toMatchObject({ id: 2, name: 'Leia' });
    expect(table.delete(NON_EXISTING_ID)).toBeNull();

    // getAll
    expect(table.getAll()).toMatchObject([
      { id: 1, name: 'Obi-Wan' },
      { id: 3, name: 'Yoda' }
    ]);

  });


});