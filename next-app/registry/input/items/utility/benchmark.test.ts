import { describe, it, expect } from "vitest";
import { runBenchmarks } from "./benchmark";


describe("runBenchmarks", () => {

  it("check output shape", async () => {

    const ITERATIONS = 10;

    const result = await runBenchmarks({
      groupKey: 'test',
      runners: [
        { name: 'fnA', fn: async (x: number) => { console.log(x); } },
        { name: 'fnB', fn: async (x: number) => { } },
      ],
      iterations: ITERATIONS,
      warmupCycles: 0,
      delayBetween: 0,
    });

    console.log(result);

    expect(result.results.length).toBe(2);


    const expectedResultProp = {
      name: expect.toBeOneOf(['fnA', 'fnB']),
      times: expect.any(Array),
      stats: {
        min: expect.any(Number),
        max: expect.any(Number),
        mean: expect.any(Number),
        median: expect.any(Number),
        stddev: expect.any(Number),
        p10: expect.any(Number),
        p50: expect.any(Number),
        p90: expect.any(Number),
        p99: expect.any(Number),
        totalTime: expect.any(Number),
      },
    };

    expect(result.results).toMatchObject([
      expectedResultProp,
      expectedResultProp,
    ]);


    expect(result.results[0].times.length).toBe(ITERATIONS);
    expect(result.results[1].times.length).toBe(ITERATIONS);

  });

  it('dfg', async () => {

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
      warmupCycles: 0,
      delayBetween: 0, // ms
    });

    results.print();
  });

});