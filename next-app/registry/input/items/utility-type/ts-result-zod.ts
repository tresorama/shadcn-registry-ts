import z from "zod";


type Base = {
  SuccessData: z.ZodSchema;
  ErrorCodes: readonly [string, ...string[]],
};

/** 
 * Create a Result Success Zod Schema.  
 * See {@link schemaResult}
 * */
export const schemaResultSuccess = <DataSchema extends Base['SuccessData']>(dataSchema: DataSchema) => z.object({
  status: z.literal('success'),
  data: dataSchema,
});

/** 
 * Create a Result Error Zod Schema.  
 * See {@link schemaResult}
 * */
export const schemaResultError = <ErrorCodes extends Base['ErrorCodes']>(errorCodes: ErrorCodes) => z.object({
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
  S extends Base['SuccessData'],
  E extends Base['ErrorCodes'],
>(
  schemaSuccess: ReturnType<typeof schemaResultSuccess<S>>,
  schemaError: ReturnType<typeof schemaResultError<E>>,
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
export type InferResult<R extends ReturnType<typeof schemaResult>> = z.infer<R>;

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
export type InferResultSuccess<R extends ReturnType<typeof schemaResult>> = Extract<InferResult<R>, { status: 'success'; }>;

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
export type InferResultError<R extends ReturnType<typeof schemaResult>> = Extract<InferResult<R>, { status: 'error'; }>;


const getResultSuccess = <
  S extends Base['SuccessData'],
  E extends Base['ErrorCodes'],
>(
  result: ReturnType<typeof schemaResult<S, E>>
) => result.options[0];

const getResultError = <
  S extends Base['SuccessData'],
  E extends Base['ErrorCodes'],
>(
  result: ReturnType<typeof schemaResult<S, E>>
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
  S extends Base['SuccessData'],
  E extends Base['ErrorCodes'],
>(
  result: ReturnType<typeof schemaResult<S, E>>
) => {
  return {
    success: getResultSuccess(result),
    successData: getResultSuccess(result).shape.data,
    error: getResultError(result),
    errorCodes: getResultError(result).shape.code.options,
  };
};
