/* eslint-disable @typescript-eslint/no-explicit-any */
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const handleI18n = createMiddleware({
  ...routing,
  defaultLocale: 'es',
});

export default function middleware(request: any) {
  const { pathname } = request.nextUrl;

  // 1. FORZAR IGNORAR STUDIO: Si la ruta empieza con /studio, no hagas nada.
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  // 2. Si no es studio, aplica la internacionalización normal
  return handleI18n(request);
}

export const config = {
  // Mantenemos el matcher por seguridad, pero el "if" de arriba es el que manda
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|admin|.*\\..*).*)'
  ],
};