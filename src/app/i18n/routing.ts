import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"], 
  defaultLocale: "en", // Prioridad Inglés para Altum IA Design
  localeDetection: false,
  localePrefix: "always", // Recomendado 'always' para evitar conflictos en rutas dinámicas

  pathnames: {
    "/": "/",
    // Definimos la ruta para que el router reconozca industrias/[slug]
    "/industries/[slug]": {
      en: "/industries/[slug]",
      es: "/industrias/[slug]"
    }
  },
});