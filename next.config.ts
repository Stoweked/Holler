// next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ktfbrtlurpvwysgrfshk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/bank_avatars/**",
      },
    ],
  },
};

export default config;
