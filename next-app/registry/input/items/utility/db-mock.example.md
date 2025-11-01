### createDbTable - inferred automatically from usage

```ts
import { createDbTable } from './db.mock.utils';

// inferred

const table = createDbTable([
  {
    id: 1,
    name: 'Luke'
  },
  {
    id: 2,
    name: 'Leia'
  }
]);

const items = table.getAll();
const item = table.getById(1);
const createdItem = table.create({name: 'Yoda'});
const updatedItem = table.update(1, {name: 'Obi-Wan'});
const deletedItem = table.delete(2);

```
### createDbTable - explicit type

```ts
import { createDbTable } from './db.mock.utils';

// explicit type

type Item = {
  id: number,
  name: string
}

const table = createDbTable<Item>([
  {
    id: 1,
    name: 'Luke'
  }
])

const items = table.getAll();
const item = table.getById(1);
const createdItem = table.create({name: 'Yoda'});
const updatedItem = table.update(1, {name: 'Obi-Wan'});
const deletedItem = table.delete(2);

```