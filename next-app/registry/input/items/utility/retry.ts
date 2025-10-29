import { sleep } from "./sleep";


/**
 * Wrap an async function and add retry feature.  
 * IMPORTANT: `fn`  must return a Promise, and must never throw.
 */
export const retry = <
  TFn extends ((...args: any[]) => Promise<any>),
  TFnResult = Awaited<ReturnType<TFn>>
>(options: {
  /** 
   * The main function, that will retried.  
   * **IMPORTANT** Must be an async fn, and must never throw. 
   * */
  fn: TFn,
  /** How many times to retry while the `getStatus` returns 'error'. */
  times: number,
  /** How long to sleep between attempts. In ms. */
  delayBetweenAttempts: number,
  /** This function is called after each attempt to know if the attempt was successful or not.  
   * This fn must return `success` or `error`.  
   * If `success` is returned, the loop will exit.  
   * If `error` is returned, the loop will continue if `times` is not reached. 
   * */
  getStatus: (result: TFnResult) => 'success' | 'error';
}) => {

  return async (...args: Parameters<TFn>): Promise<TFnResult> => {
    let attemptsDone = 0;

    while (attemptsDone < options.times) {

      // increment
      attemptsDone += 1;

      // run fn
      const result = (await options.fn(...args)) as TFnResult;
      const status = options.getStatus(result);

      // if success -> return
      if (status === 'success') {
        return result;
      }

      // if error and last attempt -> exit with error
      if (status === 'error' && (attemptsDone >= options.times)) {
        return result;
      }

      // if error and not last attempt -> sleep then try again
      await sleep(options.delayBetweenAttempts);
    }

    throw new Error('Should be unreachable');

  };

};

