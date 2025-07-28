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