export const getLastArrayItem = <T>(array: T[]) => array[array.length - 1];


/** Create an array with length, that you can `.map` on */
export const createArrayWithLength = (length: number) => Array(length).fill('_');
