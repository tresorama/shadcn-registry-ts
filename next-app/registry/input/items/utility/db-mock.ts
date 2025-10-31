// export const repeat = (times: number) => new Array(times).fill('');

type BaseDbRecord = {
  id: number;
};

export type DbRecord<TExtended extends { [key: string]: unknown; }> = BaseDbRecord & TExtended;

/**
 * DB Table creator, for a in memory DB.
 * NOTE: USE THIS ONLY FOR PLAYGROUND DB, NOT IN REAL APP
 */
export const createDbTable = <
  TSelectItem extends BaseDbRecord,
  TInsertItem = Omit<TSelectItem, 'id'>,
  TUpdateItem = Partial<Omit<TSelectItem, 'id'>>
>(initialRecords: TSelectItem[]) => {

  let items: TSelectItem[] = [...initialRecords];

  const generateId = () => items.length + 1;

  return {
    getAll: () => items,
    getById: (id: number) => items.find(item => item.id === id) ?? null,
    create: (item: TInsertItem) => {
      const id = generateId();
      // @ts-expect-error ts don't allow unknown properties
      const newItem: TSelectItem = {
        id,
        ...item
      };

      const newItems = [...items, newItem];
      items = newItems;

      return newItem;
    },
    update: (id: number, item: TUpdateItem) => {
      const index = items.findIndex(item => item.id === id);
      if (index === -1) {
        // 'Item not found'
        return null;
      }

      const newItems = [...items];
      newItems[index] = { ...newItems[index], ...item };
      items = newItems;

      return newItems[index];
    },
    delete: (id: number) => {
      const index = items.findIndex(item => item.id === id);
      if (index === -1) {
        // 'Item not found'
        return null;
      }

      const newItems = [...items];
      const deletedItems = newItems.splice(index, 1);
      items = newItems;

      return deletedItems[0];
    }
  };
};
