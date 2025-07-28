import { describe, it, expect } from 'vitest';
import { repeatAsyncFnInParallel } from '../utility-framework/vitest.utils';

import { sleep } from './sleep';

describe('sleep', () => {

  it('do it', async () => {

    const ITERATIONS = 10_000;
    const FREQUENCIES = {
      success: 0,
      error: 0,
    };

    await repeatAsyncFnInParallel(ITERATIONS, async () => {
      try {
        await sleep(100);
        FREQUENCIES.success++;
      } catch (error) {
        FREQUENCIES.error++;
      }
    });

    expect(FREQUENCIES.success).toBe(ITERATIONS);
    expect(FREQUENCIES.error).toBe(0);
  });
});
