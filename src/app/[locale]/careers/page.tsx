import { getTranslations, getLocale } from "next-intl/server";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import CareersIndex from "@/components/pages/CareersIndex";

// ✅ Cloudflare Edge Runtime
export const runtime = "edge";

// ---------------------------------------------------------
// 1. METADATA – CAREERS | ALTUMIA
// ---------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  let t;
  try {
    t = await getTranslations({
      locale,
      namespace: "MetadataCareers",
    });
  } catch (error) {
    console.error("Error loading SEO translations:", error);
  }

  const title =
    t?.("title") ||
    "Careers | Altumia — Únete a Nuestro Equipo de Tecnología e IA";

  const description =
    t?.("description") ||
    "Descubre oportunidades laborales en Altumia. Trabaja en proyectos de desarrollo de software e inteligencia artificial con impacto global.";

  const base = "https://altumia.co";

  return {
    title,
    description,
    metadataBase: new URL(base),
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/careers`,
      siteName: "Altumia",
      images: [
        {
          url: `${base}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${base}/og-image.jpg`],
    },
    alternates: {
      canonical: `${base}/${locale}/careers`,
      languages: {
        es: `${base}/es/carreras`,
        en: `${base}/en/careers`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ---------------------------------------------------------
// 2. PAGE – CAREERS | ALTUMIA + SCHEMA
// ---------------------------------------------------------
export default async function Page() {
  const locale = await getLocale();

  const careersMessages = (
    await import(`../../../../messages/${locale}/careers.json`)
  ).default;

  const base = "https://altumia.co";

  const title = "Careers | Altumia";
  const description =
    "Únete a Altumia y trabaja en proyectos de desarrollo de software e inteligencia artificial con alcance internacional.";

  // ---------------------------------------------------------
  // JSON-LD – CAREERS / JOBS
  // ---------------------------------------------------------
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/${locale}/careers`,
        url: `${base}/${locale}/careers`,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: {
          "@id": `${base}#website`,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${base}#organization`,
        name: "Altumia",
        url: base,
        logo: `${base}/logo.png`,
        image: `${base}/og-image.jpg`,
        description:
          "Empresa de desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia, México, Canadá y El Salvador.",
        telephone: "+57 320-740-8391",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calle 98A #61-47",
          addressLocality: "Bogotá",
          addressRegion: "Cundinamarca",
          addressCountry: "CO",
        },
        sameAs: [
          "https://www.facebook.com/altumia.co",
          "https://www.instagram.com/altumia.co",
          "https://www.linkedin.com/company/altumia-col",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : "Home",
            item: `${base}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Careers | Altumia",
            item: `${base}/${locale}/careers`,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <NextIntlClientProvider locale={locale} messages={careersMessages}>
        <CareersIndex />
      </NextIntlClientProvider>
    </>
  );
}
