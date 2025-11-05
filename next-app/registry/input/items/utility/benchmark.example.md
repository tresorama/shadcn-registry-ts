### runBenchmarks

Compare time execution of various implementation of the same operation.  

```ts
import { runBenchmarks } from "./benchmarks"

const results = await runBenchmarks({
  groupKey: "string concat",
  runners: [
    { name: "concat", fn: (a: string, b: string) => a + b },
    { name: "concat with join", fn: (a: string, b: string) => [...a, ...b].join("") },
    { name: "concat with reduce", fn: (a: string, b: string) => [...a, ...b].reduce((a, b) => a + b, "") },
  ],
  args: [
    'hello',
    'nerds'
  ],
  iterations: 500,
  warmupCycles: 5, // ms
  delayBetween: 10, // ms
});

results.print();

```

```markdown
┌─────────┬──────────────────────┬──────────────────┬─────────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬───────────┬─────────────┬─────────────────┐
│ (index) │ Function             │ x slower vs best │ Median (ms) │ Min (ms) │ Max (ms) │ p10 (ms) │ p50 (ms) │ p90 (ms) │ p99 (ms) │ Mean (ms) │ Stddev (ms) │ total time (ms) │
├─────────┼──────────────────────┼──────────────────┼─────────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼───────────┼─────────────┼─────────────────┤
│ 0       │ 'concat (⭐️ Best)'   │ '1.00×'          │ '0.000'     │ '0.00'   │ '0.02'   │ '0.00'   │ '0.00'   │ '0.00'   │ '0.00'   │ '0.00'    │ '0.00'      │ '0.21'          │
│ 1       │ 'concat with join'   │ '6.86×'          │ '0.001'     │ '0.00'   │ '0.66'   │ '0.00'   │ '0.00'   │ '0.00'   │ '0.02'   │ '0.00'    │ '0.03'      │ '1.46'          │
│ 2       │ 'concat with reduce' │ '5.31×'          │ '0.001'     │ '0.00'   │ '0.33'   │ '0.00'   │ '0.00'   │ '0.00'   │ '0.01'   │ '0.00'    │ '0.02'      │ '1.13'          │
└─────────┴──────────────────────┴──────────────────┴─────────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴───────────┴─────────────┴─────────────────┘
```


Inputs:
- `groupKey`: Required.  
   Used in the output of `print`.
- `runners`: Required.  
   Array of functions. Each array item is an object with:
   - `name`: string, used in the output of `print`.
   - `fn`: `(...args: any[]) => any | Promise<any> }`. Can be sync or async.
- `args`: Optional. Default is `[]`.  
   Array of arguments to pass to each runner, as an array that will be spread.
- `iterations`: Optional. Default is `50`.  
   How many times to run each function? 
- `warmupCycles`: Optional. Default is `5`.  
   How many times to run fn in the warmup phase?  
   This phase runs before the real benchmark in order to allows the JIT to mark the functions as hot and optimize. Use this to avoid a "cold start" effect.
- `delayBetween`: Optional. Default is `10`.  
   How many ms to wait between each run of each function?

Returns:
- `print`: function that prints the results to console, using `console.table`.
- `results`: Array of objects, one for each runner, with the following structure:
  - `name`: string, used in the output of `print`.
  - `stats`: object with the following properties:
    - `mean`: number, average time in ms.
    - `stddev`: number, standard deviation against the mean in ms.
    - `min`: number, minimum time in ms.
    - `max`: number, maximum time in ms.
    - `median`: number, median time in ms. 
    - `p10`: number, 10th percentile in ms.
    - `p50`: number, 50th percentile in ms.
    - `p90`: number, 90th percentile in ms.
    - `p99`: number, 99th percentile in ms.
