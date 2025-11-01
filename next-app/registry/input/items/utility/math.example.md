**clamp**

:::tip
**clamp** and **wrap** can be confused, but **clamp** return the surpassed edge, while **wrap** return the opposite edge.
```ts
clamp({ min: 0, max: 100, value: 200 }); // 100
wrap({  min: 0, max: 100, value: 200 }); // 0
```
:::

Keep a number within a minimum and maximum range — if it’s too low or too high, it’s pushed back inside the limits.


The mental model is: 
- if the value is lower than min, min is returned
- if the value is greater than max, max is returned


```ts
import { clamp } from "./math"

// inside range
clamp({ min: 0, max: 100, value: 25 })  // 25
clamp({ min: 0, max: 100, value: 50 })  // 50
clamp({ min: 0, max: 100, value: 75 })  // 75

// outside range
clamp({ min: 0, max: 100, value: -50 }) // 0
clamp({ min: 0, max: 100, value: 150 }) // 100
```

**wrap**

:::tip
**clamp** and **wrap** can be confused, but **clamp** return the surpassed edge, while **wrap** return the opposite edge.
```ts
clamp({ min: 0, max: 100, value: 200 }); // 100
wrap({  min: 0, max: 100, value: 200 }); // 0
```
:::

Keep a number inside a range by looping it around — if it goes past the max, it starts again from the min.  

The mental model is: 
- if the value is lower than min, max is returned
- if the value is greater than max, min is returned

```ts
import { wrap } from "./math"

// inside min-max range
wrap({ min: 0, max: 100, value: 25 })  // 25
wrap({ min: 0, max: 100, value: 50 })  // 50
wrap({ min: 0, max: 100, value: 75 })  // 75

// outside min-max range 
wrap({ min: 0, max: 100, value: 200 }); // 0
wrap({ min: 0, max: 100, value: -10 }); // 100
```

**lerp**

Find a value between two numbers based on a progress value from 0 to 1 — for example, halfway (0.5) gives the middle point.

:::tip
This is the inverse of **lerpInverse**.
:::

```ts
import { lerp } from "./math"

// NOTE: it automatically clamp value

// inside range (t is between 0 and 1)
lerp({ min: 0, max: 100, t: 0.25 }) // 25
lerp({ min: 0, max: 100, t: 0.5 })  // 50
lerp({ min: 0, max: 100, t: 0.75 }) // 75

// outside range (t is lesser than 0 or greater than 1)
lerp({ min: 0, max: 100, t: -0.5 }) // 0
lerp({ min: 0, max: 100, t: 1.5 })  // 100
```

**lerpInverse**

Find how far a number is between two limits — returns a value between 0 and 1 representing its position within the range.  

:::tip
This is the inverse of **lerp**.
:::

```ts
import { lerpInverse } from "./math"

// NOTE: it automatically clamp value

// inside min-max range
lerpInverse({ min: 0, max: 100, value: 25 })  // 0.25
lerpInverse({ min: 0, max: 100, value: 50 })  // 0.5
lerpInverse({ min: 0, max: 100, value: 75 })  // 0.75

// outside min-max range
lerpInverse({ min: 0, max: 100, value: -50 }) // 0
lerpInverse({ min: 0, max: 100, value: 150 }) // 1
```

**sum**

Add together all the numbers in an array — returns 0 if the list is empty.

```ts
import { sum } from "./math"

sum([]); // 0
sum([1, 2, 3]); // 6
```

**mean**

Calculate the average of a list of numbers — the result is the total divided by how many numbers there are.

```ts
import { mean } from "./math" 

// no items
mean([]); // 0

// with items
mean([1, 2, 3]); // 6 / 3 = 2
mean([1, 2, 3, 4]); // 10 / 4 = 2.5

// what does 0 do?
mean([0, 0, 10]); // 3.3333333333333335
```

**numIsBetween**

Check whether a number falls inside a given range, with the option to include or exclude the boundaries.

```ts
import { numIsBetween } from "./math"

// isInclusive=true
numIsBetween({ min: 1, max: 10, num: 1, isInclusive: true }); // true
numIsBetween({ min: 1, max: 10, num: 1, }); // true (isInclusive defaults to true)
numIsBetween({ min: 1, max: 10, num: 5, }); // true
numIsBetween({ min: 1, max: 10, num: 10, }); // true

// isInclusive=false
numIsBetween({ min: 1, max: 10, num: 1, isInclusive: false }); // false
numIsBetween({ min: 1, max: 10, num: 5, isInclusive: false }); // false
numIsBetween({ min: 1, max: 10, num: 10, isInclusive: false }); // false
```

**calculateFrequenciesStats**

Convert a set of counts into total and percentage values for each group, making it easy to compare proportions.

```ts
import { calculateFrequenciesStats } from "./math"

calculateFrequenciesStats({ A: 4, B: 6 }));
// ⏬
{
  total: 10,
  groups: {
    A: { count: 4, percentageOnTotal: 0.4 },
    B: { count: 6, percentageOnTotal: 0.6 },
  }
}

calculateFrequenciesStats({ A: 1, B: 2 }));
// ⏬
{
  total: 3,
  groups: {
    A: { count: 1, percentageOnTotal: 0.3333333333333333 },
    B: { count: 2, percentageOnTotal: 0.6666666666666666 },
  }
};

```
