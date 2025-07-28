import { describe, it, expect } from 'vitest';
import { repeatAsyncFnInParallel } from '../utility-framework/vitest.utils';
// import { calculateFrequenciesStats } from './math';

import { tryCatchAsync } from './try-catch-async';


describe('tryCatchAsync', () => {

  it('do it', async () => {

    const FREQUENCIES = {
      success: 0,
      error: 0
    };

    await repeatAsyncFnInParallel(1_000, async () => {

      const result = await tryCatchAsync(async () => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) return { ok: true };
        throw new Error('Fake error');
      });

      expect(result).toBeTypeOf('object');
      expect(result).toHaveProperty('status');
      expect(result.status).oneOf(['success', 'error']);

      if (result.status === 'success') {
        expect(result.data).toBeTypeOf('object');
        expect(result.data).toHaveProperty('ok');
        expect(result.data.ok).toBe(true);

        FREQUENCIES.success++;
      }

      if (result.status === 'error') {
        expect(result.error).toBeInstanceOf(Error);

        FREQUENCIES.error++;
      }
    });

    // check frequencies
    // console.log(calculateFrequenciesStats(FREQUENCIES));
    expect(FREQUENCIES.success).toBeGreaterThan(0);
    expect(FREQUENCIES.error).toBeGreaterThan(0);

  });

});
