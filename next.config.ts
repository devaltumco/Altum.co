/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
import type { Configuration, WebpackPluginInstance } from "webpack";
import createNextIntlPlugin from "next-intl/plugin";



const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://cdn.jsdelivr.net
        https://va.vercel-scripts.com
        https://c.bing.com
        https://core.sanity-cdn.com
        https://cdn.sanity.io;
      
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      
      font-src 'self' https://fonts.gstatic.com data:;
      
      img-src * blob: data: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.facebook.com https://*.supabase.co; 
      
      frame-src 'self' 
        https://www.google.com 
        https://www.google.es 
        https://www.googletagmanager.com 
        https://www.facebook.com 
        https://www.youtube.com 
        https://youtube.com
        https://archive.org;
      
      media-src 'self' 
        https://cdn.sanity.io 
        https://*.sanity.io 
        https://archive.org
        https://*.archive.org
        blob:;

      connect-src 'self'
        https://stats.g.doubleclick.net
   
        https://c.bing.com
        https://*.sanity.io
        https://*.sanity-cdn.com
    `.trim().replace(/\s+/g, " "),
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: true,
  },

  experimental: {
    optimizePackageImports: ["react-icons", "lodash", "date-fns"],
    esmExternals: "loose",
    scrollRestoration: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
     
    ],
    minimumCacheTTL: 31536000,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },

  webpack(
    config: Configuration,
    { isServer, dev }: { isServer: boolean; dev: boolean }
  ): Configuration {
    const webpack = require("webpack") as typeof import("webpack");

    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }) as unknown as WebpackPluginInstance
    );

    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }

    if (!dev) {
      config.devtool = false;
    }

    return config;
  },
};

export default (withNextIntl(nextConfig));