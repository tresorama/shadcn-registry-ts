/**
 * Source: http://localhost:3000
 */

type ResultError = {
  status: 'error';
  error: unknown;
};
type ResultSuccess<T> = {
  status: 'success';
  data: T;
};

type Result<T> = ResultError | ResultSuccess<T>;

export const tryCatchAsync = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    const data = await fn();
    return { status: 'success', data } as const;
  } catch (error) {
    return { status: 'error', error } as const;
  }
};

