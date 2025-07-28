/**
 * Source: http://localhost:3000
 */

import { formatMillisecondsToHumanReadable } from "./date-time";

/**
 * Simple time execution tracker for meaasuring the time taken to execute a function.
 * 
 * @example
 * const executionTimer = createExecutionTimeMeter();
 * // ... run your code
 * const elapsedTimeInMs = executionTimer.getResult(); 
 * // output 
 * {
 *   inMs: 2000,
 *   humanReadable: TODO
 * }
 */
export const createExecutionTimeMeter = () => {
  const start = performance.now();

  const getResult = () => {
    const end = performance.now();
    const elapsedTimeInMs = end - start;
    const elapsedTimeHumanReadable = formatMillisecondsToHumanReadable(elapsedTimeInMs);
    return {
      inMs: elapsedTimeInMs,
      humanReadable: elapsedTimeHumanReadable,
    };
  };

  return {
    getResult
  };
};

export type ExecutionTimeMeter = ReturnType<typeof createExecutionTimeMeter>;
