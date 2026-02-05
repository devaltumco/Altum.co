import createMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // ✅ Matcher súper estricto: 
  // Ignora CUALQUIER archivo con punto (imágenes, svg, ico, etc.)
  matcher: [
    '/', 
    '/(es|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};