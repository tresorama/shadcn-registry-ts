import z from "zod";

import { getVercelUrl } from "./utils/get-vercel-url";

const envVars = z.object({
  DEBUG_CONSTANTS: z.enum(['true', 'false']).optional().default('false'),
  APP_DATA_MODE: z.enum(['static', 'compute']),
}).parse(process.env);

export const {
  DEBUG_CONSTANTS,
  APP_BASE_URL,
  APP_DATA_MODE
} = {
  DEBUG_CONSTANTS: envVars.DEBUG_CONSTANTS === 'true',
  APP_DATA_MODE: envVars.APP_DATA_MODE,
  APP_BASE_URL: getVercelUrl() || "http://localhost:3000",
};
