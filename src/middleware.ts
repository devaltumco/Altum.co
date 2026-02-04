import createMiddleware from 'next-intl/middleware';
import { routing } from '@/app/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher que incluye todas las rutas excepto archivos estáticos, API y Vercel
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*|robots.txt|sitemap.xml).*)"
  ]
};