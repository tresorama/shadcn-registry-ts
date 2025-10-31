import z from "zod";


type Base = {
  SuccessDataSchema: z.ZodSchema;
  ErrorCodes: readonly [string, ...string[]],
};

/** 
 * Create a Result Success Zod Schema.  
 * See {@link schemaResult}
 * */
export const schemaResultSuccess = <TSuccessDataSchema extends Base['SuccessDataSchema']>(dataSchema: TSuccessDataSchema) => z.object({
  status: z.literal('success'),
  data: dataSchema,
});

/** 
 * Create a Result Error Zod Schema.  
 * See {@link schemaResult}
 * */
export const schemaResultError = <TErrorCode extends Base['ErrorCodes']>(errorCodes: TErrorCode) => z.object({
  status: z.literal('error'),
  code: z.enum(errorCodes),
  message: z.string(),
});

/** Create a Result Zod Schema 
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
  schemaSuccess: ReturnType<typeof schemaResultSuccess<TSuccessDataSchema>>,
  schemaError: ReturnType<typeof schemaResultError<TErrorCode>>,
) => z.discriminatedUnion('status', [
  schemaSuccess,
  schemaError,
]);

/** Infer Types of a Result. Contains both `success` and `error`.
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

/** Infer Types of a Result Success
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

/** Infer Types of a Result Error
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


const getResultSuccess = <
  TSuccessDataSchema extends Base['SuccessDataSchema'],
  TErrorCode extends Base['ErrorCodes'],
>(
  result: ReturnType<typeof schemaResult<TSuccessDataSchema, TErrorCode>>
) => result.options[0];

const getResultError = <
  TSuccessDataSchema extends Base['SuccessDataSchema'],
  TErrorCode extends Base['ErrorCodes'],
>(
  result: ReturnType<typeof schemaResult<TSuccessDataSchema, TErrorCode>>
) => result.options[1];


/**
 * Extract Data from a Result Zod Schema
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
  result: ReturnType<typeof schemaResult<TSuccessDataSchema, TErrorCode>>
) => {
  return {
    success: getResultSuccess(result),
    successData: getResultSuccess(result).shape.data,
    error: getResultError(result),
    errorCodes: getResultError(result).shape.code.options,
  };
};
