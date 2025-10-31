import z from "zod";


type Base = {
  SuccessDataSchema: z.ZodSchema;
  ErrorCodes: readonly [string, ...string[]],
};

/** 
 * Create a Result Zod Schema `success` branch.  
 * See {@link schemaResult}
 * */
export const schemaResultSuccess = <TSuccessDataSchema extends Base['SuccessDataSchema']>(
  /** zod schema of `data` prop @example z.object({ name: z.string() }) */
  dataSchema: TSuccessDataSchema
) => z.object({
  status: z.literal('success'),
  data: dataSchema,
});

/** 
 * Create a Result Zod Schema `error` branch.  
 * See {@link schemaResult}
 * */
export const schemaResultError = <TErrorCode extends Base['ErrorCodes']>(
  /** list of error codes @example ['FETCH_FAILED', 'OTHER_ERROR'] as const */
  errorCodes: TErrorCode
) => z.object({
  status: z.literal('error'),
  code: z.enum(errorCodes),
  message: z.string(),
});

/** Create a Result Zod Schema, containing both `success` and `error` branches.
 * @example
 * const result = schemaResult(
 *   schemaResultSuccess(z.object({ name: z.string() })),
 *   schemaResultError(['FETCH_FAILED'] as const)
 * );
 * 
 * type Result = InferResult<typeof result>;
 * // ⏬
 * type Result = { 
 *   status: 'success'; 
 *   data: { 
 *     name: string 
 *   } 
 * } | { 
 *   status: 'error'; 
 *   code: 'FETCH_FAILED'; 
 *   message: string 
 * }
 * 
 * const fn = async (): Promise<Result> => {
 *   // ...
 * }
 * */
export const schemaResult = <
  TSuccessDataSchema extends Base['SuccessDataSchema'],
  TErrorCode extends Base['ErrorCodes'],
>(
  /** zod schema of `success` branch. created by {@link schemaResultSuccess} */
  schemaSuccess: ReturnType<typeof schemaResultSuccess<TSuccessDataSchema>>,
  /** zod schema of `error` branch. created by {@link schemaResultError} */
  schemaError: ReturnType<typeof schemaResultError<TErrorCode>>,
) => z.discriminatedUnion('status', [
  schemaSuccess,
  schemaError,
]);

/** 
 * Infer Types of a Result Zod Schema.  
 * The input is a Result Zod Schema created by {@link schemaResult}.
 * Returned type contains both `success` and `error` branches.
 * @example
 * const result = schemaResult(
 *   schemaResultSuccess(z.object({ name: z.string() })),
 *   schemaResultError(['FETCH_FAILED'] as const)
 * );
 * 
 * type Result = InferResult<typeof result>;
 * // ⏬
 * { 
 *   status: 'success'; 
 *   data: { 
 *     name: string 
 *   } 
 * } | { 
 *   status: 'error'; 
 *   code: 'FETCH_FAILED'; 
 *   message: string 
 * }
 * */
export type InferResult<TResult extends ReturnType<typeof schemaResult>> = z.infer<TResult>;

/** 
 * Infer Types of a Result Zod Schema `success` branch.  
 * The input is a Result Zod Schema created by {@link schemaResult}.
 * @example
 * const result = schemaResult(
 *   schemaResultSuccess(z.object({ name: z.string() })),
 *   schemaResultError(['FETCH_FAILED'] as const)
 * );
 * 
 * type ResultSuccess = InferResultSuccess<typeof result>;
 * // ⏬
 * { 
 *   status: 'success'; 
 *   data: { 
 *     name: string 
 *   } 
 * }
 * */
export type InferResultSuccess<TResult extends ReturnType<typeof schemaResult>> = Extract<InferResult<TResult>, { status: 'success'; }>;

/** 
 * Infer Types of a Result Zod Schema `error` branch.  
 * The input is a Result Zod Schema created by {@link schemaResult}.
 * @example
 * const result = schemaResult(
 *   schemaResultSuccess(z.object({ name: z.string() })),
 *   schemaResultError(['FETCH_FAILED'] as const)
 * );
 * 
 * type ResultError = InferResultError<typeof result>;
 * // ⏬
 * { 
 *   status: 'error'; 
 *   code: 'FETCH_FAILED'; 
 *   message: string 
 * }
 * */
export type InferResultError<TResult extends ReturnType<typeof schemaResult>> = Extract<InferResult<TResult>, { status: 'error'; }>;


const getResultSuccessSchema = <
  TSuccessDataSchema extends Base['SuccessDataSchema'],
  TErrorCode extends Base['ErrorCodes'],
>(
  result: ReturnType<typeof schemaResult<TSuccessDataSchema, TErrorCode>>
) => result.options[0];

const getResultErrorSchema = <
  TSuccessDataSchema extends Base['SuccessDataSchema'],
  TErrorCode extends Base['ErrorCodes'],
>(
  result: ReturnType<typeof schemaResult<TSuccessDataSchema, TErrorCode>>
) => result.options[1];


/**
 * Extract Data from a Result Zod Schema.  
 * The input is a Result Zod Schema created by {@link schemaResult}.
 * @example
 * const result = schemaResult(
 *   schemaResultSuccess(z.object({ name: z.string() })),
 *   schemaResultError(['FETCH_FAILED'] as const)
 * );
 * 
 * const resultData = getResultData(result);
 * // ⏬
 * {
 *   success: schemaResultSuccess(z.object({ name: z.string() })),
 *   successData: z.object({ name: z.string() }),
 *   error: schemaResultError(['FETCH_FAILED'] as const),
 *   errorCodes: ['FETCH_FAILED'] as const,
 * }
 * 
 * const wrappedResult = schemaResult(
 *   schemaResultSuccess(
 *     z.object({ 
 *       extraData: z.string(),
 *       otherResultData: getResultData(result).successData,
 *     })
 *   ),
 *   schemaResultError([
 *     'NEW_ERROR_CODE',
 *      ...getResultData(result).errorCodes
 *   ] as const)
 * );
 * 
 */
export const getResultData = <
  TSuccessDataSchema extends Base['SuccessDataSchema'],
  TErrorCode extends Base['ErrorCodes'],
>(
  /** Result Zod Schema created by {@link schemaResult} */
  result: ReturnType<typeof schemaResult<TSuccessDataSchema, TErrorCode>>
) => {
  return {
    /** full `success` zod schema */
    success: getResultSuccessSchema(result),
    /** `data` schema of `success` zod schema */
    successData: getResultSuccessSchema(result).shape.data,
    /** full `error` zod schema */
    error: getResultErrorSchema(result),
    /** `code` schema of `error` zod schema */
    errorCodes: getResultErrorSchema(result).shape.code.options,
  };
};
