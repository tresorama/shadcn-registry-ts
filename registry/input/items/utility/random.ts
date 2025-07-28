/**
 * Source: http://localhost:3000
 */

import { lerp, clamp } from './math';

/** Get a random string in format `1642345678-12345`. Always 19 characters. */
export const getRandomString = () => `${new Date().valueOf()}-${Math.random().toString(36).substring(3, 8)}`;

/** Get a random string in format `12345`. Always 5 characters. */
export const getRandomString2 = () => Math.random().toString(36).substring(3, 8);


/**
 * Get a random integer between min and max. Min andmax are included.  
 * Result is also clamped.
 */
export const getRandomInteger = (
  /** Minumum value passibile. */
  min: number,
  /** Maximum value possible. */
  max: number
) => {
  const value = lerp({ min, max, t: Math.random() });
  return clamp({ min, max, value: Math.round(value) });
};

/**
 * Get a random item from an array
 */
export const getRandomArrayItem = <T>(
  /** Array from which you want to get a random item. */
  array: T[]
): T => {
  const index = getRandomInteger(0, array.length - 1);
  return array[index];
};

/**
 * Get a random color in HSL format.  
 * If you provide:
 * - nothing, it will generate a random color.
 * - `{ h: 20 }`, it will generate a random color with always 20 as hue.
 * - `{ s: 60 }`, it will generate a random color with always 60 as saturation.
 * - `{ l: 80 }`, it will generate a random color with always 80 as lightness.
 * - `{ h: 10, s: 20 }` or `{ h: 10, l: 20 }` or `{ s: 10, l: 20 }`, it will generate a random color with the fixed part you provided. What you don't provide will be random.
 */
export const getRandomColor = ({
  h,
  s,
  l,
}: {
  /** Hue. 0-360*/
  h?: number,
  /** Saturation. 0-100. */
  s?: number,
  /** Lightness. 0-100. */
  l?: number,
} = {}) => {
  const _h = h ?? getRandomInteger(0, 360);
  const _s = s ?? getRandomInteger(0, 100);
  const _l = l ?? getRandomInteger(0, 100);
  return {
    h: _h,
    s: _s,
    l: _l,
    hsl: `hsl(${_h} ${_s}% ${_l}%)`,
  };
};

/**
 * Get a random image (for placeholder).
 * Internally it builds an URL for Picsum.  
 * i.e. `https://picsum.photos/200/300?random=234`
 */
export const getRandomImage = ({
  w = 900,
  h = 700,
}: {
  /** Width. Default to 900. */
  w?: number,
  /** Height. Default to 700. */
  h?: number,
} = {}) => {

  // https://picsum.photos/200/300?random=234
  const url = new URL(`https://picsum.photos/${w}/${h}`);
  url.searchParams.append('random', getRandomInteger(0, 1000).toString());

  return url.toString();
};

/**
 * Get a random `Date` between start and end `Date`.  
 * Start and end could be included.
 */
export const getRandomDateInRange = (start: Date, end: Date) => {
  const DAY_IN_MS = 1000 * 60 * 60 * 24;
  const differenceBetweenStartAndEnd_inMs = end.getTime() - start.getTime();
  const differenceBetweenStartAndEnd_inDays = differenceBetweenStartAndEnd_inMs / DAY_IN_MS;
  const randomNumberOfDays = getRandomInteger(0, differenceBetweenStartAndEnd_inDays);
  const randomNumberOfDays_inMs = randomNumberOfDays * DAY_IN_MS;
  const randomDate = new Date(start.getTime() + randomNumberOfDays_inMs);
  return randomDate;
};
