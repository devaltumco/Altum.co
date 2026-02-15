import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://altumia.co";
  const locales = ["en", "es"] as const;

  // Rutas 
  const routes = [
    { en: "/", es: "/" },
    { en: "/about-us", es: "/quienes-somos" },
    { en: "/solutions", es: "/soluciones" },
    { en: "/industries-altumia", es: "/industrias-altumia" },
    { en: "/success-stories", es: "/casos-de-exito" },
    { en: "/blog", es: "/blog" },
    { en: "/careers", es: "/vacantes" },
    { en: "/privacy-policy", es: "/politica-de-privacidad" },
    { en: "/terms-and-conditions", es: "/terminos-y-condiciones" },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. URL raíz principal (redirige al defaultLocale habitualmente)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  });

  // 2. Generación de URLs localizadas
  for (const route of routes) {
    for (const locale of locales) {
      // @ts-ignore - Acceso dinámico por idioma
      const path = route[locale];
      
      // Construcción de la URL: Evita doble slash en la home
      const url = `${baseUrl}/${locale}${path === "/" ? "" : path}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        // Prioridad máxima a la home de cada idioma
        changeFrequency: path === "/" ? "monthly" : "weekly",
        priority: path === "/" ? 1.0 : 0.8,
      });
    }
  }

  return sitemapEntries;
}