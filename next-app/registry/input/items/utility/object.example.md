```ts
import { omit, pick, groupBy } from './object';

// omit
const item = {
  id: 56,
  name: 'Luke',
}
const output = omit(item, ['id'])
{ 
  name: 'Luke' 
}

// pick
const item = {
  id: 56,
  name: 'Luke',
}
const output = pick(item, ['id'])
{ 
  id: 56 
}

// groupBy
const items = [
  { group: 'one', name: 'Luke' },
  { group: 'one', name: 'Leia' },
  { group: 'two', name: 'Han' },
];
const grouped = groupBy(items, (item) => item.group);
// ⏬
{
  one: [
    { group: 'one', name: 'Luke' },
    { group: 'one', name: 'Leia' },
  ],
  two: [
    { group: 'two', name: 'Han' },
  ],
}
```