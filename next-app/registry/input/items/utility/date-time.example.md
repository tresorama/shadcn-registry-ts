```ts
import { 
  formatMillisecondsToHumanReadable,
  createTimeRanges,
} from './date-time';

// formatMillisecondsToHumanReadable
formatMillisecondsToHumanReadable(2000);
// ⏬
 '2s'


// createTimeRanges
const data = [
  {
    price: 90,
    date: new Date(2022, 2, 10), // 10 march
  },
  {
    price: 100,
    date: new Date(2022, 3, 20), // 20 april
  }
];

const ranges = createTimeRanges({
  firstDay: new Date(2022, 0, 1),
  rangeSizeInMonths: 1,
  formatName: ({ from, format }) => format(from, "MMM"),
});

const groupedByMonths = ranges.map(range => {
  const itemsOfThisRange = data.filter(item => range.matchRange(item.date));
  return {
    rangeName: range.name,
    items: itemsOfThisRange,
  };
});
// ⏬
[
  { rangeName: 'Jan', items: [] },
  { rangeName: 'Feb', items: [] },
  { rangeName: 'Mar', items: [{ price: 90, date: new Date(2022, 2, 10) }] },
  { rangeName: 'Apr', items: [{ price: 100, date: new Date(2022, 3, 20) }] },
  // ...
  { rangeName: 'Dec', items: [] },
]

```