/**
 * Source: http://localhost:3000
 */

/**
 * Clamp function, constraints a value to be in a range.
 * Outliers will be clamped to the relevant extreme of the range.
 */
export function clamp({ min, max, value }: {
  /** Minimin possibile value. */
  min: number,
  /** Maximinum possible value. */
  max: number,
  /** Value you want to clamp */
  value: number;
}) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Lerp function, used to get a value in range based on a percentage.
 * Outliers will be clamped.
 */
export function lerp({ min, max, t }: {
  /** Lower part of the a-b range. Minumum value passibile. */
  min: number,
  /** Upper part of the a-b range. Maximum value possible. */
  max: number,
  /** Number, decimal, from 0.0 to 1.0, which rapresent where value lives between a-b range. */
  t: number;
}) {
  const value = (max - min) * t + min;
  return clamp({ min, max, value });
}
/**
 * Lerp Inversed function, used to get the percentage of a value in a range.
 * Outliers will be clamped.
 */
export function lerpInverse({ min, max, value }: {
  /** Lower part of the a-b range. Minumum value passibile. */
  min: number,
  /** Upper part of the a-b range. Maximum value possible. */
  max: number,
  /** Number that must be in range a-b, rapresent the value that you want to know where it sits in a-b range. */
  value: number;
}): number {
  const t = (value - min) / (max - min);
  return clamp({ min: 0, max: 1, value: t });
}


/**
 * Sum function. Accept array of numbers and return the sum.
 */
export const sum = (
  /** Array of numbers */
  nums: number[]
): number => {
  return nums.reduce((acc, num) => acc + num, 0);
};

/**
 * Mean function. Accept array of numbers and return the mean.
 */
export function mean(
  /** Array of numbers */
  nums: number[]
): number {
  if (nums.length === 0) return 0;
  return sum(nums) / nums.length;
}


/**
 * Wrap value in range [min, max].
 * If value is greater than max, min is returned.  
 * If value is lower than min, max is returned.
 * If value is in between min and max, value is returned.
 */
export function wrap({ min, max, value }: {
  /** Lower part of the range. */
  min: number,
  /** Upper part of the range. */
  max: number,
  /** Value to wrap. */
  value: number;
}) {
  if (value < min) return max;
  if (value > max) return min;
  return value;
}


/**
 * Check if a number is between a range.
 */
export const numIsBetween = ({
  min,
  max,
  num,
  isInclusive = true,
}: {
  /** Lower part of the range. */
  min: number,
  /** Upper part of the range. */
  max: number,
  /** Number to check. */
  num: number,
  /** If `true` min and max are allowed values, if `false` min and max are not allowed values. Deafult: `true` */
  isInclusive?: boolean,
}) => {
  if (isInclusive) {
    return num >= min && num <= max;
  }
  return num > min && num < max;
};


/**
 * Calculate percentages of an object that represents frequencies.
 * @example
 * ```ts
 * const frequencies = calculateFrequenciesStats({ A: 4, B: 6 });
 * console.log(frequencies);
 * // output
 * { 
 *   total: 10, 
 *   groups: { 
 *     A: { count: 4, percentageOnTotal: 0.4 }, 
 *     B: { count: 6, percentageOnTotal: 0.6 },
 *   }
 * }
 * ```
 */
export const calculateFrequenciesStats = (calculations: { [k: string]: number; }) => {

  type Data = {
    /** total executions of all groups */
    total: number,
    /** stats for each group */
    groups: Record<string, {
      /** times this group was calculated */
      count: number;
      /** percentage of times this group was calculated against total executions of all groups. 0-1 range. */
      percentageOnTotal: number;
    }>;
  };

  const total = sum(Object.values(calculations));
  const data: Data = {
    total,
    groups: Object.fromEntries(
      Object.entries(calculations).map(([calcKey, calcCount]) => {
        const percentage = (calcCount / total);
        const data = {
          count: calcCount,
          percentageOnTotal: percentage,
        };
        return [calcKey, data];
      }))
  };

  return data;
};