### fakePromiseThatCanRandomlyThrow

This utility is meant to be used for testing code that must handle promise resolve and reject.  
It can randomly:
- return `true` (simulate success)
- throw an error (simulate failure)

```ts
import { fakePromiseThatCanRandomlyThrow } from './promise';

// with then/catch

fakePromiseThatCanRandomlyThrow()
  .then(() => console.log('success'))
  .catch(() => console.log('failure'));


// with async/await

try {
  await fakePromiseThatCanRandomlyThrow();
  console.log('success');
} catch (error) {
  console.log('failure');
}
```