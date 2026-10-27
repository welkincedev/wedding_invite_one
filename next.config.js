const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  // In development, default to root ("") so http://localhost:3000/ works directly.
  // In production builds, default to GitHub Pages repository subpath "/wedding_invite_one".
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : (isDev ? "" : "/wedding_invite_one");

  const config = {
    reactStrictMode: true,
    output: "export",
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath
    },
    images: {
      unoptimized: true
    }
  };

  if (basePath) {
    config.basePath = basePath;
    config.assetPrefix = basePath;
  }

  return config;
};
