/**
 * Source: http://localhost:3000
 */


type ResultSuccess<T> = {
  status: 'success';
  data: T;
};
type ResultError = {
  status: 'error';
  message: string;
};
/** The generic you pass will be the data prop of success */
export type Result<T> = ResultSuccess<T> | ResultError;

/** The generic you pass will be the data prop of success. There is no error allowed output. Always success. */
export type ResultAlwaysSuccess<T> = ResultSuccess<T>;