export const getLastArrayItem = <TItem>(array: TItem[]) => array[array.length - 1];


/** Create an array with length, that you can `.map` on */
export const createArrayWithLength = (length: number) => Array(length).fill('_');
