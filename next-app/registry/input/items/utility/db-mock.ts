// export const repeat = (times: number) => new Array(times).fill('');

type BaseDbRecord = {
  id: number;
};

export type DbRecord<Extended extends { [key: string]: unknown; }> = BaseDbRecord & Extended;

/**
 * DB Table creator, for a in memory DB.
 * NOTE: USE THIS ONLY FOR PLAYGROUND DB, NOT IN REAL APP
 */
export const createDbTable = <
  SelectItem extends BaseDbRecord,
  InsertItem = Omit<SelectItem, 'id'>,
  UpdateItem = Partial<Omit<SelectItem, 'id'>>
>(initialRecords: SelectItem[]) => {

  let items: SelectItem[] = [...initialRecords];

  const generateId = () => items.length + 1;

  return {
    getAll: () => items,
    getById: (id: number) => items.find(item => item.id === id) ?? null,
    create: (item: InsertItem) => {
      const id = generateId();
      // @ts-expect-error ts don't allow unknown properties
      const newItem: SelectItem = {
        id,
        ...item
      };

      const newItems = [...items, newItem];
      items = newItems;

      return newItem;
    },
    update: (id: number, item: UpdateItem) => {
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
