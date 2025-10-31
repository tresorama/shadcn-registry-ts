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
  TObj extends Record<string, any>,
  TKeysToOmit extends Array<keyof TObj>,
  TOutput extends Omit<TObj, TKeysToOmit[number]>
>(
  obj: TObj,
  keysToOmit: TKeysToOmit,
) => {
  const output = { ...obj };
  keysToOmit.forEach(key => {
    delete output[key];
  });
  return output as unknown as TOutput;
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
  TObj extends Record<string, any>,
  TKeysToPick extends Array<keyof TObj>,
  TOutput extends Pick<TObj, TKeysToPick[number]>
>(
  obj: TObj,
  keysToPick: TKeysToPick,
) => {
  const output = {};
  keysToPick.forEach(key => {
    // @ts-expect-error key is not in obj
    output[key] = obj[key];
  });
  return output as TOutput;
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
export const groupBy = <TItem>(
  array: TItem[],
  getGroupKey: (item: TItem) => string
): { [key: string]: TItem[]; } => {
  return array.reduce((acc, item) => {
    const key = getGroupKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as { [key: string]: TItem[]; });
};