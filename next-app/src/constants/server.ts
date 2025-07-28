import z from "zod";

const envSchema = z.object({
  APP_BASE_URL: z.string(),
  APP_DATA_MODE: z.enum(['static', 'compute']),
});

export const {
  APP_BASE_URL,
  APP_DATA_MODE
} = envSchema.parse(process.env);

// console.log({
//   APP_BASE_URL,
//   APP_DATA_MODE
// });