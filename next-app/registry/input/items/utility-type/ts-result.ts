/** Type creator used to create a Result `success` type */
type ResultSuccess<TData> = {
  status: 'success';
  data: TData;
};
/** Type creator used to create a Result `error` type */
type ResultError<TCode extends string> = {
  status: 'error';
  code: TCode | 'UNKNOWN_ERROR',
  message: string;
};

/** 
 * Type creator used to create a Result type.  
 * You must pass two generics:
 * - the first will be the `data` prop of `success` path.
 * - the second will be the `code` prop of `error` path.
 * */
export type Result<TSuccessData, TErrorCode extends string> = ResultSuccess<TSuccessData> | ResultError<TErrorCode>;

/** 
 * Create a Result type that cannot have `error` path.
 * You must pass one generic:
 * - will be the `data` prop of `success` path.
 * */
export type ResultAlwaysSuccess<TSuccessData> = ResultSuccess<TSuccessData>;


/** Infer the `success` branch of a Result type */
export type InferResultSuccess<TResult> = Extract<TResult, { status: 'success'; }>;

/** Infer the `error` branch of a Result type */
export type InferResultError<TResult> = Extract<TResult, { status: 'error'; }>;
