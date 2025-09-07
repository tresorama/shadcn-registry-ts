import z from "zod";

import { getVercelUrl } from "./utils/get-vercel-url";

const envVars = z.object({
  APP_DATA_MODE: z.enum(['static', 'compute']),
}).parse(process.env);

export const {
  APP_BASE_URL,
  APP_DATA_MODE
} = {
  APP_DATA_MODE: envVars.APP_DATA_MODE,
  APP_BASE_URL: getVercelUrl() || "http://localhost:3000",
};

// console.log({
//   APP_BASE_URL,
//   APP_DATA_MODE
// });