import z from "zod";

import { getVercelUrl } from "./utils/get-vercel-url";

const envSchema = z.object({
  APP_BASE_URL: z.string(),
  APP_DATA_MODE: z.enum(['static', 'compute']),
});

export const {
  APP_BASE_URL,
  APP_DATA_MODE
} = envSchema.parse({
  ...process.env,
  APP_BASE_URL: getVercelUrl() || "http://localhost:3000",
});

// console.log({
//   APP_BASE_URL,
//   APP_DATA_MODE
// });