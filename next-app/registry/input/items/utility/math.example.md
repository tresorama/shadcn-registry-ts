```ts
import { 
  clamp, 
  lerp, 
  lerpInverse, 
  sum, 
  mean, 
  wrap,
  numIsBetween,
  calculateFrequenciesStats,
} from "./math"

// clamp
clamp({ min: 0, max: 100, value: 50 })  // 50
clamp({ min: 0, max: 100, value: 25 })  // 25
clamp({ min: 0, max: 100, value: 75 })  // 75
clamp({ min: 0, max: 100, value: 150 }) // 100
clamp({ min: 0, max: 100, value: -50 }) // 0

// lerp
// it automatically clamp value
lerp({ min: 0, max: 100, t: 0.5 })  // 50
lerp({ min: 0, max: 100, t: 0.25 }) // 25
lerp({ min: 0, max: 100, t: 0.75 }) // 75
lerp({ min: 0, max: 100, t: 1.5 })  // 100
lerp({ min: 0, max: 100, t: -0.5 }) // 0

// lerpInverse
// it automatically clamp value
lerpInverse({ min: 0, max: 100, value: 50 })  // 0.5
lerpInverse({ min: 0, max: 100, value: 25 })  // 0.25
lerpInverse({ min: 0, max: 100, value: 75 })  // 0.75
lerpInverse({ min: 0, max: 100, value: 150 }) // 1
lerpInverse({ min: 0, max: 100, value: -50 }) // 0

// sum
sum([]); // 0
sum([1, 2, 3]); // 6

// mean
mean([]); // 0
mean([1, 2, 3]); // 6 / 3 = 2
mean([1, 2, 3, 4]); // 10 / 4 = 2.5
mean([0, 0, 10]); // 3.3333333333333335

// wrap
wrap({ min: 0, max: 100, value: 200 }); // 0
wrap({ min: 0, max: 100, value: -10 }); // 100
wrap({ min: 0, max: 100, value: 34 }); // 34

// numIsBetween
numIsBetween({ min: 1, max: 10, num: 8, }); // true
numIsBetween({ min: 1, max: 10, num: 1, isInclusive: true }); // true
numIsBetween({ min: 1, max: 10, num: 1, }); // true (isInclusive defaults to true)
numIsBetween({ min: 1, max: 10, num: 1, isInclusive: false }); // false

// calculateFrequenciesStats
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

