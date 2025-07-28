import { describe, it, expect } from 'vitest';
import { repeatAsyncFnInParallel } from '../utility-framework/vitest.utils';
// import { calculateFrequenciesStats } from './math';

import { fakePromiseThatCanRandomlyThrow } from './promise';

describe('promise - fakePromiseThatCanRandomlyThrow', () => {

  it('do it', async () => {

    const FREQUENCIES = {
      success: 0,
      error: 0
    };

    await repeatAsyncFnInParallel(1_000, async () => {
      try {
        const result = await fakePromiseThatCanRandomlyThrow();
        expect(result).toBe(true);
        FREQUENCIES.success++;
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        FREQUENCIES.error++;
      }
    });

    // check frequencies
    // console.log(calculateFrequenciesStats(FREQUENCIES));
    expect(FREQUENCIES.success).toBeGreaterThan(0);
    expect(FREQUENCIES.error).toBeGreaterThan(0);

  });

});
