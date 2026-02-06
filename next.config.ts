/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/app/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    // Usamos 'as any' para que TypeScript no bloquee el build por esta propiedad experimental
    allowedDevOrigins: ['192.168.1.4', 'localhost:3002']
  } as any
};

export default withNextIntl(nextConfig);