### createExecutionTimeMeter

Returns an object with a function to get the elapsed time.  
The start time is set when the function is called.

```ts
import { createExecutionTimeMeter } from "./execution-timer";

// 1. init the timer
const executionTimer = createExecutionTimeMeter();

// 2. run your code ...

// 3. get elapsed time
const elapsedTime = executionTimer.getResult();
// ⏬
{
  inMs: 2000,
  humanReadable: '2s,
}
```