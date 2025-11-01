### getLastArrayItem

Return the last item from an array.

```ts
import { getLastArrayItem } from "./array"

getLastArrayItem([0, 100, 50]);
// ⏬
50
```

### createArrayWithLength

Create an array with an arbitrary length, that you can `.map` on.  
Useful for skeleton of list items, or for creating fixed-length array (even if the array is still mutable).

```tsx
import { createArrayWithLength } from "./array"

createArrayWithLength(2);
// ⏬
['_', '_']

createArrayWithLength(3).map((_, i) => (
  <div key={i}>{i}</div>
));

```

