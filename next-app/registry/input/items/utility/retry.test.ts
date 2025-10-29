import { describe, it, expect } from 'vitest';
import { repeatAsyncFnInParallel } from '../utility-framework/vitest.utils';

import { retry } from './retry';

// utils

const fnThatAlwaysFails = async () => ({ ok: false } as const);
const fnThatAlwaysSucceeds = async () => ({ ok: true } as const);
const fnThatRandomlyFails = async () => Math.random() > 0.5 ? fnThatAlwaysSucceeds() : fnThatAlwaysFails();
const fnThatRandomlyFailsWithArguments = async (a: number, b: number) => Math.random() > 0.5 ? ({ ok: true, data: a + b } as const) : fnThatAlwaysFails();
// tests

describe('retry', () => {

  it('do it - always success', async () => {

    const ITERATIONS = 10_000;
    const FREQUENCIES = {
      success: 0,
      error: 0,
    };

    await repeatAsyncFnInParallel(ITERATIONS, async () => {
      const result = await retry({
        fn: fnThatAlwaysSucceeds,
        times: 10,
        delayBetweenAttempts: 100,
        getStatus: (result) => result.ok ? 'success' : 'error'
      })();

      expect(result).toMatchObject({ ok: true });

      if (result.ok) FREQUENCIES.success++;
      else FREQUENCIES.error++;
    });

    expect(FREQUENCIES.success).toBe(ITERATIONS);
    expect(FREQUENCIES.error).toBe(0);
  });

  it('do it - always fails', async () => {

    const ITERATIONS = 10_000;
    const FREQUENCIES = {
      success: 0,
      error: 0,
    };

    await repeatAsyncFnInParallel(ITERATIONS, async () => {
      const result = await retry({
        fn: fnThatAlwaysFails,
        times: 10,
        delayBetweenAttempts: 100,
        getStatus: (result) => result.ok ? 'success' : 'error'
      })();

      expect(result).toMatchObject({ ok: false });

      if (result.ok) FREQUENCIES.success++;
      else FREQUENCIES.error++;
    });

    expect(FREQUENCIES.success).toBe(0);
    expect(FREQUENCIES.error).toBe(ITERATIONS);
  });

  it('do it - randomly fails', async () => {

    const ITERATIONS = 10_000;
    const FREQUENCIES = {
      success: 0,
      error: 0,
    };

    await repeatAsyncFnInParallel(ITERATIONS, async () => {
      const result = await retry({
        fn: fnThatRandomlyFails,
        times: 10,
        delayBetweenAttempts: 100,
        getStatus: (result) => result.ok ? 'success' : 'error'
      })();

      expect(result).toHaveProperty('ok');
      expect(result.ok).toBeOneOf([true, false]);

      if (result.ok) FREQUENCIES.success++;
      else FREQUENCIES.error++;
    });

    expect(FREQUENCIES.success).toBeGreaterThan(0);
    expect(FREQUENCIES.error).toBeGreaterThan(0);
  });

  it('do it - with arguments', async () => {

    const ITERATIONS = 10_000;
    const FREQUENCIES = {
      success: 0,
      error: 0,
    };

    await repeatAsyncFnInParallel(ITERATIONS, async () => {
      const result = await retry({
        fn: fnThatRandomlyFailsWithArguments,
        times: 10,
        delayBetweenAttempts: 100,
        getStatus: (result) => result.ok ? 'success' : 'error'
      })(3, 4);

      if (result.ok === false) {
        expect(result).toMatchObject({ ok: false });
        FREQUENCIES.error++;
        return;
      }
      else {
        expect(result).toMatchObject({ ok: true, data: 7 });
        FREQUENCIES.success++;
      }
    });

    expect(FREQUENCIES.success).toBeGreaterThan(0);
    expect(FREQUENCIES.error).toBeGreaterThan(0);

  });

});
