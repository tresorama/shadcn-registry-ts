/**
 * Delays code execution for a given amount of time.. Never throws.
 */
export const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));