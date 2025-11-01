### sleep

This utility is meant to be used for simulate async code resolution time, or to delay code execution.
This never throws an error, and internally uses `setTimeout`.

```ts
import { sleep } from './sleep';

await sleep(1000); // wait 1 second
```