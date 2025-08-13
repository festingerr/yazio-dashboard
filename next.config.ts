import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;