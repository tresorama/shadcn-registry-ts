```ts
import { omit, pick, groupBy } from './object';

// omit
const item = {
  id: 56,
  name: 'Luke',
}
omit(item, ['id'])
// ⏬
{ 
  name: 'Luke' 
}

// pick
const item = {
  id: 56,
  name: 'Luke',
}
pick(item, ['id'])
{ 
  id: 56 
}

// groupBy
const items = [
  { group: 'one', name: 'Luke' },
  { group: 'one', name: 'Leia' },
  { group: 'two', name: 'Han' },
];
groupBy(items, (item) => item.group);
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