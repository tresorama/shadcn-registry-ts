import { sleep } from "./sleep";

/**
 * A promise that can randomly:
 * - return `true` (simulate success)
 * - throw an error (simulate failure)
 * Use this to test code that must handle promise success/failure reliably.
 */
export const fakePromiseThatCanRandomlyThrow = () => {
  return new Promise<true>(async (resolve, reject) => {
    await sleep(1000);
    const mustThrow = Math.random() > 0.5;
    if (!mustThrow) return resolve(true);
    reject(new Error('Fake error'));
  });
};
