type BenchmarkRunner = {
  name: string;
  fn: (...args: any[]) => any | Promise<any>;
};

type BenchmarkResult = {
  name: string;
  times: number[];
  stats: ReturnType<typeof calculateStats>,
};

/** Execute a benchamark that compare the time execution of various implementation of the same operation */
export async function runBenchmarks({
  groupKey,
  runners,
  iterations = 50,
  args = [],
  warmupCycles = 5,
  delayBetween = 10, // ms tra run per evitare interferenze
}: {
  /** Group name, used in the output of `print` */
  groupKey: string;
  /** Array of Functions to benchmark */
  runners: BenchmarkRunner[];
  /** Arguments to pass to each function, as an array that will be spread @default [] */
  args?: any[];
  /** How many times to run each function? @default 50 */
  iterations?: number;
  /** How many times to run fn in the warmup phase? @default 5 */
  warmupCycles?: number;
  /** How many ms to wait between each run? @default 10 */
  delayBetween?: number;
}) {

  // init the output
  const results: BenchmarkResult[] = [];

  // for each fn...
  for (const { name, fn } of runners) {

    // init bag
    const iterationsTimeTaken: number[] = [];

    // do warmup
    // allow the JIT to warm up the functions
    for (let i = 0; i < warmupCycles; i++) {
      await runAndMeasure(fn, args);
    }

    // do real measures
    for (let i = 0; i < iterations; i++) {

      // run the fn
      const timeTaken = await runAndMeasure(fn, args);

      // add to the bag
      iterationsTimeTaken.push(timeTaken);

      // sleep
      if (delayBetween) {
        await sleep(delayBetween);
      }
    }

    // calculate stats for the entire function
    results.push({
      name,
      times: iterationsTimeTaken,
      stats: calculateStats(iterationsTimeTaken),
    });
  }

  // sort by fastesrt first
  const resultsSorted = [...results].sort((a, b) => a.stats.mean - b.stats.mean);
  const bestResult = resultsSorted[0];
  const bestResultMean = bestResult.stats.mean;
  const isBestResult = (r: BenchmarkResult) => r.name === bestResult.name;

  // create a fn that prints the results to console
  const print = () => {
    console.log(`[${groupKey}] - Iterations: ${iterations} - Warmup: ${warmupCycles}`);
    console.table(
      results.map(r => ({
        Function: isBestResult(r) ? `${r.name} (⭐️ Best)` : r.name,
        "x slower vs best": (r.stats.mean / bestResultMean).toFixed(2) + "×",
        "Median (ms)": (r.stats.median.toFixed(3)),
        "Min (ms)": (r.stats.min.toFixed(2)),
        "Max (ms)": (r.stats.max.toFixed(2)),
        "p10 (ms)": (r.stats.p10.toFixed(2)),
        "p50 (ms)": (r.stats.p50.toFixed(2)),
        "p90 (ms)": (r.stats.p90.toFixed(2)),
        "p99 (ms)": (r.stats.p99.toFixed(2)),
        "Mean (ms)": (r.stats.mean.toFixed(2)),
        "Stddev (ms)": (r.stats.stddev.toFixed(2)),
        "total time (ms)": (r.stats.totalTime.toFixed(2)),
      }))
    );
  };

  return {
    results,
    print,
  };
}

/** Run a function and measure the time taken to execute (supports async/sync) */
async function runAndMeasure(fn: BenchmarkRunner["fn"], args: any[]) {
  const start = process.hrtime.bigint();
  await fn(...args);
  const end = process.hrtime.bigint();
  const delta = Number(end - start);
  return delta / 1e6; // millisecondi
}

function calculateStats(values: number[]) {
  const count = values.length;
  const firstIndex = 0;
  const lastIndex = count - 1;
  const sorted = [...values].sort((a, b) => a - b);

  const mean = math.mean(values);
  const stddev = math.stddev(values, mean);

  const min = sorted[firstIndex];
  const max = sorted[lastIndex];
  const median = math.median(values, true);
  const p99 = sorted[Math.floor(count * 0.99)];
  const p90 = sorted[Math.floor(count * 0.95)];
  const p50 = sorted[Math.floor(count * 0.5)];
  const p10 = sorted[Math.floor(count * 0.1)];

  const totalTime = math.sum(values);

  return { mean, stddev, min, max, median, p10, p50, p90, p99, totalTime };
}



// utils

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const math = {
  sum(nums: number[]): number {
    return nums.reduce((acc, num) => acc + num, 0);
  },

  mean(nums: number[]): number {
    return math.sum(nums) / nums.length;
  },

  median(nums: number[], isSorted = false): number {
    const sorted = isSorted ? nums : [...nums].sort((a, b) => a - b); // odd: 0,1,2,3,4 even: 0, 1, 2, 3
    const count = nums.length; // odd: 5, even: 4
    const isOdd = count % 2 === 1; // odd: true, even: false
    if (isOdd) {
      const middleItemIndex = Math.floor(count / 2); // 5/2 = 2.5 -> 2 
      return sorted[middleItemIndex];
    }
    const middleLeftItemIndex = Math.floor(count / 2) - 1; // 4/2 = 2 -> 1
    const middleRightItemIndex = Math.floor(count / 2); // 4/2 = 2 -> 2
    const mean = math.mean([sorted[middleLeftItemIndex], sorted[middleRightItemIndex]]);
    return mean;
  },

  stddev(nums: number[], mean?: number): number {
    const _mean = mean || math.mean(nums);
    const variance = nums.reduce((a, b) => a + (b - _mean) ** 2, 0) / nums.length;
    return Math.sqrt(variance);
  }
};
