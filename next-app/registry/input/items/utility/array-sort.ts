/** Array.sort() function - used to sort array by date */
export const sortArrayByDate = (a: Date, b: Date, direction: 'asc' | 'desc') => {
  // util
  const normalizeDate = (d: Date) => new Date(new Date(d).setHours(0, 0, 0, 0)).valueOf();
  // logic
  if (direction === 'asc') {
    return normalizeDate(a) - normalizeDate(b);
  }
  return normalizeDate(b) - normalizeDate(a);
};

/** Array.sort() function - used to sort array by number */
export const sortArrayByNumber = (a: number, b: number, direction: 'asc' | 'desc') => {
  if (direction === 'asc') {
    return a - b;
  }
  return b - a;
};

/** Array.sort() function - used to sort array by string */
export const sortArrayByString = (a: string, b: string, direction: 'asc' | 'desc') => {
  if (direction === 'asc') {
    return a.localeCompare(b);
  }
  return b.localeCompare(a);
};