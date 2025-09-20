import fs from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  webpack(config, options) {
    // Debug: print first 10 lines of globals.css
    const cssPath = path.resolve(process.cwd(), "src/app/globals.css");
    if (fs.existsSync(cssPath)) {
      const lines = fs.readFileSync(cssPath, "utf8").split("\n").slice(0, 10);
      console.log("\n--- DEBUG: globals.css (first 10 lines) ---");
      console.log(lines.join("\n"));
      console.log("--- END DEBUG ---\n");
    }

    // If an existing webpack function was present, call it (preserve behavior)
    if (typeof global.__NEXT_EXISTING_WEBPACK === "function") {
      return global.__NEXT_EXISTING_WEBPACK(config, options);
    }

    return config;
  },
};

export default nextConfig;
