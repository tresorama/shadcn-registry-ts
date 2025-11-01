**sortArrayByDate**

```ts
import { sortArrayByDate } from './array-sort';

// asc
const input = [
  { name: 'B', date: new Date('2022-02-01') },
  { name: 'A', date: new Date('2022-01-01') },
  { name: 'C', date: new Date('2022-03-01') },
];
const sortedAsc = input
  .toSorted((a, b) => sortArrayByDate(a.date, b.date, 'asc'))
  .map(item => item.name);
// ⏬
['A', 'C', 'B']

// desc
const input = [
  { name: 'B', date: new Date('2022-02-01') },
  { name: 'A', date: new Date('2022-01-01') },
  { name: 'C', date: new Date('2022-03-01') },
];
const sortedDesc = input
  .toSorted((a, b) => sortArrayByDate(a.date, b.date, 'desc'))
  .map(item => item.name);
// ⏬
['C', 'B', 'A']
```

**sortArrayByNumber**

```ts
import { sortArrayByNumber } from './array-sort';

// asc
const input = [3, 1, 2];
const sortedAsc = input.toSorted((a, b) => sortArrayByNumber(a, b, 'asc'));
// ⏬
[1, 2, 3]

// desc
const input = [3, 1, 2];
const sortedDesc = input.toSorted((a, b) => sortArrayByNumber(a, b, 'desc'));
// ⏬
[3, 2, 1]
```

**sortArrayByString**

```ts
import { sortArrayByString } from './array-sort';

// asc
const input = ['B', 'A', 'C'];
const sortedAsc = input.toSorted((a, b) => sortArrayByString(a, b, 'asc'));
// ⏬
['A', 'B', 'C']

// desc
const input = ['B', 'A', 'C'];
const sortedDesc = input.toSorted((a, b) => sortArrayByString(a, b, 'desc'));
// ⏬
['C', 'B', 'A']

```