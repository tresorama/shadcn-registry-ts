type ResultError = {
  status: 'error';
  error: unknown;
};
type ResultSuccess<TData> = {
  status: 'success';
  data: TData;
};

type Result<TSuccessData> = ResultError | ResultSuccess<TSuccessData>;

/**
 * Function that run an asyn cfunction inside a try catch block.
 */
export const tryCatchAsync = async <TReturn>(fn: () => Promise<TReturn>): Promise<Result<TReturn>> => {
  try {
    const data = await fn();
    return { status: 'success', data } as const;
  } catch (error) {
    return { status: 'error', error } as const;
  }
};

