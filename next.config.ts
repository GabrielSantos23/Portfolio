import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Spotify's setup flow runs on 127.0.0.1 (it rejects "localhost"), so let that host reach the dev server too.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
