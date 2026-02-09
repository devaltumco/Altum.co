import { defineRouting } from "next-intl/routing";

// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'es',
  
  pathnames: {
    // --- Ruta Base ---
    "/": "/",

    // --- Rutas de Marca y Servicios Altumia (Internacionalizadas) ---
    "/about-us": {
      en: "/about-us",
      es: "/quienes-somos",
    },
    "/solutions": {
      en: "/solutions",
      es: "/soluciones",
    },
    "/industries-altumia": {
      en: "/industries-altumia",
      es: "/industrias-altumia",
    },
    "/success-stories": {
      en: "/success-stories",
      es: "/casos-de-exito",
    },
    "/blog": {
      en: "/blog",
      es: "/blog",
    },
    "/careers": {
      en: "/careers",
      es: "/vacantes",
    },

    // --- Ruta Dinámica ---
    '/industries/[slug]': {
      en: '/industries/[slug]',
      es: '/industries/[slug]'
    }
  }
});