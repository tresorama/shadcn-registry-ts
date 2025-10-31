/** Create a Result Success type */
type ResultSuccess<S> = {
  status: 'success';
  data: S;
};
/** Create a Result Error type */
type ResultError<Code extends string> = {
  status: 'error';
  code: Code | 'UNKNOWN_ERROR',
  message: string;
};

/** 
 * Create a Result type.  
 * You must pass two generics:
 * - the first will be the `data` prop of `success` path.
 * - the second will be the `code` prop of `error` path.
 * */
export type Result<S, E extends string> = ResultSuccess<S> | ResultError<E>;

/** 
 * Create a Result type that cannot have `error` path.
 * You must pass one generic:
 * - will be the `data` prop of `success` path.
 * */
export type ResultAlwaysSuccess<S> = ResultSuccess<S>;


/** Utility used to infer the `success` discriminated union of a Result type */
export type InferResultSuccess<R> = Extract<R, { status: 'success'; }>;

/** Utility used to infer the `error` discriminated union of a Result type */
export type InferResultError<R> = Extract<R, { status: 'error'; }>;
