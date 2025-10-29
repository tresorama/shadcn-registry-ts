```ts
import { retry } from './retry';

// NOTE: this function must be async, and never throw
async function myOperation(a:number, b:number) {
  const data = (a+b) * Math.random();
  const isSuccess = data > 0.5;
  if (!isSuccess) return { ok: false }
  return { ok: true }
} 

// Usage 1: run inline
// NOTE: don't forget the extra `()` at the end
const result = await retry({
  fn: myOperation,
  times: 10,
  delayBetweenAttempts: 100,
  getStatus: (result) => {
    if (result.ok) return 'success';
    return 'error';
  }
})(10,50);


// Usage 2: create then run
const myOperationWithRetry = retry({
  fn: myOperation,
  times: 10,
  delayBetweenAttempts: 100,
  getStatus: (result) => {
    if (result.ok) return 'success';
    return 'error';
  }
});
await myOperationWithRetry(10,50);

```