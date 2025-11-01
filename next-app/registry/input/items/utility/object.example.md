### omit

Omit properties from an object, with intellisence support for property names.  
Returns a new object, without the omitted properties.

:::tip
The returned object is a new object refernce, but sub-object properties are **not** recreated.  
They still point to the original references.
:::

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

### pick

Pick properties from an object, with intellisence support for property names.  
Returns a new object, with only the picked properties.

:::tip
The returned object is a new object refernce, but sub-object properties are **not** recreated.  
They still point to the original references.
:::

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

### groupBy

Group items of an array by a single key.  
The **key** is dynamically extracted by you with the **getGroupKey** function.

:::tip
The returned object contains an array fro each group key, but items of this array still point to the original references.
:::

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