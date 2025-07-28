import { describe, it, expect } from 'vitest';
import { repeatAsyncFnInParallel } from '../utility-framework/vitest.utils';
import { sleep } from './sleep';

import { createExecutionTimeMeter } from './execution-timer';

describe('execution-timer', { timeout: 60_000 }, () => {

  it('do it', async () => {

    await repeatAsyncFnInParallel(1_000, async () => {
      const timer = createExecutionTimeMeter();
      await sleep(2000);
      const result = timer.getResult();

      expect(result).toBeTypeOf('object');
      expect(result.inMs).toBeTypeOf('number');
      expect(result.humanReadable).toBeTypeOf('string');
      expect(result.humanReadable).oneOf(['2s', "2.1s"]);
    });

  });

});