### tryCatchAsync

:::tip
For a more robust pattern, check [Ts Result](/item/util-ts-result) and [Ts Result Zod](/item/util-ts-result-zod)
:::

Wrap an async function to make it not-throwable, by wrapping it in a try-catch block.  

The resulting function:
- never throws
- returns a discriminated union on **status** that can be `success | error`
- if the original function throws, returns `{ status: 'error', error: unknown }`
- if the original function doesn't throw, returns `{ status: 'success', data: <return type of original fn> }`


```ts
import { tryCatchAsync } from './try-catch-async';

const result = await tryCatchAsync(
  async () => {
    const isSuccess = Math.random() > 0.5;
    if (!isSuccess) throw new Error('Fake error');
    return {
      message: 'hello',
    };
  }
);

// you must check the discriminated union on "status"
if (result.status === 'error') {
  console.log(result.error);
  return;
}

// so here we know that "status" === 'success' and "data" is defined
const data = result.data;
{
  message: string
}

```