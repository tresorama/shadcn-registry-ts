```ts
import {
  sortArrayByDate,
  sortArrayByNumber,
  sortArrayByString,
} from './array-sort';

// sortArrayByDate - asc
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

// sortArrayByDate - desc
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

// sortArrayByNumber - asc
const input = [3, 1, 2];
const sortedAsc = input.toSorted((a, b) => sortArrayByNumber(a, b, 'asc'));
// ⏬
[1, 2, 3]

// sortArrayByNumber - desc
const input = [3, 1, 2];
const sortedDesc = input.toSorted((a, b) => sortArrayByNumber(a, b, 'desc'));
// ⏬
[3, 2, 1]

// sortArrayByString - asc
const input = ['B', 'A', 'C'];
const sortedAsc = input.toSorted((a, b) => sortArrayByString(a, b, 'asc'));
// ⏬
['A', 'B', 'C']

// sortArrayByString - desc
const input = ['B', 'A', 'C'];
const sortedDesc = input.toSorted((a, b) => sortArrayByString(a, b, 'desc'));
// ⏬
['C', 'B', 'A']

```