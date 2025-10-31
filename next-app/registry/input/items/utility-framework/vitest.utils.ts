/**
 * Repeat a `sync` function a number of times.  
 * For async fn use {@link repeatAsyncFnInParallel}
 */
export function repeatSyncFn(
  /** how many times to repeat? */
  times: number,
  /** function to repeat */
  fn: () => void,
) {
  for (let i = 0; i < times; i++) {
    fn();
  }
};

/**
 * Repeat an `async` function a number of times.  
 * For sync fn use {@link repeatSyncFn}
 */
export async function repeatAsyncFnInParallel<TReturn>(
  /** how many times to repeat? */
  times: number,
  /** function to repeat. */
  fn: () => Promise<TReturn>
) {
  return Promise.all(
    Array.from({ length: times }, fn)
  );
}