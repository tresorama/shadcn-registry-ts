**omit**

```ts
import { omit } from './object';

const item = {
  id: 56,
  name: 'Luke',
}
omit(item, ['id'])
// ⏬
{ 
  name: 'Luke' 
}
```

**pick**

```ts
import { pick } from './object';

const item = {
  id: 56,
  name: 'Luke',
}
pick(item, ['id'])
{ 
  id: 56 
}
```

**groupBy**

```ts
import { groupBy } from './object';

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