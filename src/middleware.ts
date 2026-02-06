import createMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n/routing';
export default createMiddleware(routing);

export const config = {
  matcher: [
    // 1. Permitir la raíz
    '/', 
    
    // 2. Permitir rutas con prefijo de idioma
    '/(es|en)/:path*',

    // 3. EXCLUSIÓN DE RECURSOS ESTÁTICOS MEJORADA:
    // Esta regla ignora explícitamente archivos de sistema y 
    // cualquier recurso con extensiones (ico, svg, jpg, png, webp, etc.)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};