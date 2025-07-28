```ts
import { createExecutionTimeMeter } from "./execution-timer";

// 1. init the timer
const executionTimer = createExecutionTimeMeter();

// 2. run your code ...

// 3. get elapsed time
const elapsedTime = executionTimer.getResult();
// output
{
  inMs: 2000,
  humanReadable: '2s,
}
```