import type { NextConfig } from "next";

import "./src/constants/build";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  /* config options here */
};

export default nextConfig;
