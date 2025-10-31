import prettyMs from 'pretty-ms';
import { addDays, addMonths, formatDate } from "date-fns";

import { createArrayWithLength } from "./array";

/** Convert milliseconds to human readable format (string) */
export const formatMillisecondsToHumanReadable = (milliseconds: number) => {
  return prettyMs(milliseconds, { compact: false });
};


/**
 * Create an array of time ranges of months, given a start date and the range size (in months).  
 * Useful for creating chart data.
 * @example
 * const ranges = createTimeRanges({
 *   firstDay: new Date(2024, 0, 1),
 *   rangeSizeInMonths: 1,
 *   formatName: (options) => {
 *     return `${options.format(options.from, "MMM")} ${options.format(options.to, "MMM")}`
 *   }
 * });
 * // ⏬
 * [
 *   {
 *     name: "Jan",
 *     matchRange: (testDate: Date) => boolean,
 *   },
 *   {
 *     name: "Feb",
 *     matchRange: (testDate: Date) => boolean,
 *   },
 *   // ...
 *   {
 *     name: "Dec",
 *     matchRange: (testDate: Date) => boolean,
 *   },
 * ]
 */
export const createTimeRanges = ({
  firstDay,
  rangeSizeInMonths,
  formatName,
}: {
  /** First day of first range */
  firstDay: Date,
  /** How many month each range span? */
  rangeSizeInMonths: number,
  /** Format name of the range. */
  formatName: (options: {
    from: Date,
    to: Date,
    format: typeof formatDate,
    rangeSizeInMonths: number,
  }) => string;
}) => {

  // utils

  /**
   * Return a new Date object with time part equal to 00:00:00.000 (h:m:s.ms).
   * Used to compare two date only by Day, Month, Year, excluding time from comparision.
   */
  const setTimeToMidnight = (d: Date) => new Date(new Date(d).setHours(0, 0, 0, 0));

  /** Normalize date to a common type , used for comparision purpose */
  const normalizeDate = (date: Date) => setTimeToMidnight(date);

  // logic

  const rangeCount = Math.ceil(12 / rangeSizeInMonths);

  type Range = {
    name: string,
    matchRange: (testDate: Date) => boolean,
  };
  const ranges: Range[] = createArrayWithLength(rangeCount).map((_, i) => {
    const from = addMonths(firstDay, i * rangeSizeInMonths);
    const to = addMonths(addDays(from, -1), rangeSizeInMonths);
    const matchRange = (testDate: Date) => {
      return (
        normalizeDate(testDate).valueOf() >= normalizeDate(from).valueOf()
        &&
        normalizeDate(testDate).valueOf() <= normalizeDate(to).valueOf()
      );
    };
    const name = formatName({
      from,
      to,
      format: formatDate,
      rangeSizeInMonths,
    });

    return {
      name,
      matchRange,
    };
  });

  return ranges;
};
