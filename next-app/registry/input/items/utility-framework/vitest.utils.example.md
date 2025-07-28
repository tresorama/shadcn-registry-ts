```ts
import { it, expect } from 'vitest';
import { repeatSyncFn, repeatAsyncFn } from './vitest.utils';

// repeatSyncFn
it('use repeatSyncFn', () => {
  repeatSyncFn(10_000, () => {
    expect(true).toBe(true);
  });
}))


// repeatAsyncFn - Internally this uses Promise.all
it('use repeatAsyncFn', async () => {
  // when you don't care about the return value
  await repeatAsyncFn(10_000, async () => {
    expect(true).toBe(true);
  })

  // when you care about the return value
  const result = await repeatAsyncFn(10_000, async () => {
    if (Math.random() > 0.5) return true;
    return false;
  });
  expect(Array.isArray(result)).toBe(true);
  result.forEach((item) => expect(item).oneOf([true, false]))
})

```