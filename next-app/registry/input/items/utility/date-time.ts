/**
 * Source: http://localhost:3000
 */

import prettyMs from 'pretty-ms';

/**
 * Convert milliseconds to human readable format (string)
 */
export const formatMillisecondsToHumanReadable = (milliseconds: number) => {
  return prettyMs(milliseconds, { compact: false });
};