/**
 * Simple Logger.  
 * TODO: migrate to a better version of it
 */
export const createLogger = (key: string) => {
  return {
    key,
    debug(...args: any[]) {
      console.log(key, ...args);
    }
  };
};