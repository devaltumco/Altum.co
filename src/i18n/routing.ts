import { defineRouting } from "next-intl/routing";

// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/industries/[slug]': {
      en: '/industries/[slug]',
      es: '/industries/[slug]'
    }
  }
});