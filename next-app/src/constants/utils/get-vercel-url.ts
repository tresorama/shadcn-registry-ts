
/** Get deploy vercel url if this app is built on vercel, or null otherwise */
export const getVercelUrl = () => {

  if (process.env.VERCEL === '1' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return null;

};