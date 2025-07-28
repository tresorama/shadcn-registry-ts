import z from "zod";

const envSchema = z.object({
  APP_BASE_URL: z.string(),
});

export const {
  APP_BASE_URL,
} = envSchema.parse(process.env);


// console.log({
//   APP_BASE_URL,
// });