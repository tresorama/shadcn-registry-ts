### repeatSyncFn

Use this function to repeat a **sync** function a certain number of times.

```ts
import { it, expect } from 'vitest';
import { repeatSyncFn } from './vitest.utils';

// repeatSyncFn
it('use repeatSyncFn', () => {
  repeatSyncFn(10_000, () => {
    expect(true).toBe(true);
  });
}))
```

### repeatAsyncFn

Use this function to repeat an **async** function a certain number of times.  

Internally this uses **Promise.all**.

```ts
import { it, expect } from 'vitest';
import { repeatAsyncFn } from './vitest.utils';

// when you don't care about the return value
it('use repeatAsyncFn', async () => {
  await repeatAsyncFn(10_000, async () => {
    expect(true).toBe(true);
  })
});

// when you care about the return value
it('use repeatAsyncFn', async () => {
  const result = await repeatAsyncFn(10_000, async () => {
    if (Math.random() > 0.5) return true;
    return false;
  });
  expect(Array.isArray(result)).toBe(true);
  result.forEach((item) => expect(item).oneOf([true, false]))
})

```