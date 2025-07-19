import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./src/registry/**/*"],
  },
  /* config options here */
};

export default nextConfig;
