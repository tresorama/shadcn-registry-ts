```ts
import { tryCatchAsync } from './try-catch-async';

// NOTE: 
// - "tryCatchAsync" requires an async function to be passed as argument "cb"
// - "tryCatchAsync" never throws
// - in case "cb" throws, "tryCatchAsync" returns a discriminated union with "status === 'error'" and "error"
// - in case "cb" doesn't throw, "tryCatchAsync" returns a discriminated union with "status === 'success'" and "data" 

const result = await tryCatchAsync(async () => {
  return {
    message: 'hello',
  };
})

// you must check the discriminated union on "status"
if (result.status === 'error') {
  console.log(result.error);
  return;
}

// so here we know that "status" === 'success' and "data" is defined
const data = result.data;
// data
{
  message: string
}

```