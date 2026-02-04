import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"], 
  defaultLocale: "en", 
  localeDetection: false,
  localePrefix: "always", 

  pathnames: {
    "/": "/",
    // Este mapeo permite que la carpeta física 'industries' 
    // responda a '/industrias' en el navegador cuando el locale es 'es'
    "/industries/[slug]": {
      en: "/industries/[slug]",
      es: "/industrias/[slug]"
    }
  },
});

export type Locale = (typeof routing.locales)[number];