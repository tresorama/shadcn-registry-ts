```ts
import { sleep } from './sleep';

// NOTE:
// This utility is meant to be used for simulate async code resolution time, or to delay code execution.
// This never throws an error.

await sleep(1000); // wait 1 second
```