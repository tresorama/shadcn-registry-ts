**fakePromiseThatCanRandomlyThrow**

```ts
import { fakePromiseThatCanRandomlyThrow } from './promise';

// NOTE:
// This utility is meant to be used for testing code that must handle promise success/failure reliably.
// After testing remove the call and replace it with the code of your app.


// with then/catch

fakePromiseThatCanRandomlyThrow()
  .then(() => console.log('1 seconds passed and success'))
  .catch(() => console.log('1 seconds passed and failure'));


// with async/await

try {
  await fakePromiseThatCanRandomlyThrow();
  console.log('1 seconds passed and success');
} catch (error) {
  console.log('1 seconds passed and failure');
}
```