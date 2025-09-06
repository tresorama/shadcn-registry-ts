/**
 * Source: http://localhost:3000
 */

/**
 * Omit keys from an object
 * 
 * @example
 * ```ts
 * const item = {
 *   id: 56,
 *   name: 'Luke',
 * }
 * const output = omit(item, ['id'])
 * // { name: 'Luke' }
 * ```
 */
export const omit = <
  Obj extends Record<string, any>,
  KeysToOmit extends Array<keyof Obj>,
  Output extends Omit<Obj, KeysToOmit[number]>
>(
  obj: Obj,
  keysToOmit: KeysToOmit,
) => {
  const output = { ...obj };
  keysToOmit.forEach(key => {
    delete output[key];
  });
  return output as unknown as Output;
};


/**
 * Pick keys of an object
 * 
 * @example
 * ```ts
 * const item = {
 *   id: 56,
 *   name: 'Luke',
 * }
 * const output = pick(item, ['id'])
 * // { id: 56 }
 * ```
 */
export const pick = <
  Obj extends Record<string, any>,
  KeysToPick extends Array<keyof Obj>,
  Output extends Pick<Obj, KeysToPick[number]>
>(
  obj: Obj,
  keysToPick: KeysToPick,
) => {
  const output = {};
  keysToPick.forEach(key => {
    // @ts-expect-error key is not in obj
    output[key] = obj[key];
  });
  return output as Output;
};


/**
 * Group an array by a key
 * 
 * @example
 * ```ts
 * const items = [
 *   { group: 'one', name: 'Luke' },
 *   { group: 'one', name: 'Leia' },
 *   { group: 'two', name: 'Han' },
 * ]
 * const grouped = groupBy(items, (item) => item.group);
 * // ⏬
 * {
 *   one: [
 *     { group: 'one', name: 'Luke' },
 *     { group: 'one', name: 'Leia' },
 *   ],
 *   two: [
 *     { group: 'two', name: 'Han' },
 *   ],
 * }
 * ```
 */
export const groupBy = <T>(
  array: T[],
  getGroupKey: (item: T) => string
): { [key: string]: T[]; } => {
  return array.reduce((acc, item) => {
    const key = getGroupKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as { [key: string]: T[]; });
};