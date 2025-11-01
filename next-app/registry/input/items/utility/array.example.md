### getLastArrayItem

```ts
import { getLastArrayItem } from "./array"

getLastArrayItem([0, 100, 50]);
// ⏬
50
```

### createArrayWithLength

```tsx
import { createArrayWithLength } from "./array"

createArrayWithLength(2);
// ⏬
['_', '_']

createArrayWithLength(3).map((_, i) => (
  <div key={i}>{i}</div>
));

```

