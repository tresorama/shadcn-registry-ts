/**
 * Repaet a function a number of times. Sync version, that accept only a sync function.
 */
export function repeatSyncFn(
  /** how many times to repeat */
  times: number,
  /** what function to repeat */
  fn: () => void,
) {
  for (let i = 0; i < times; i++) {
    fn();
  }
};

/**
 * Repeat a function a number of times. Async version, that accept only a async function.
 */
export async function repeatAsyncFnInParallel<TReturn>(
  /** how many times to repeat */
  times: number,
  /** what function to repeat. */
  fn: () => Promise<TReturn>
) {
  return Promise.all(
    Array.from({ length: times }, fn)
  );
}