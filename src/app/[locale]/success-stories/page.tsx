import { getTranslations, getLocale } from "next-intl/server";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import SuccessStoriesIndex from "@/components/pages/SuccessStoriesIndex";

// ✅ Cloudflare Edge Runtime
export const runtime = "edge";

// ---------------------------------------------------------
// 1. METADATA – SUCCESS STORIES | ALTUMIA
// ---------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  let t;
  try {
    t = await getTranslations({
      locale,
      namespace: "MetadataSuccessStories",
    });
  } catch (error) {
    console.error("Error loading SEO translations:", error);
  }

  const title =
    t?.("title") ||
    "Success Stories | Altumia — Resultados Reales con Tecnología e IA";

  const description =
    t?.("description") ||
    "Casos de éxito de Altumia en desarrollo de software e inteligencia artificial, generando impacto real en empresas de Colombia, México, Canadá y El Salvador.";

  const base = "https://altumia.co";

  return {
    title,
    description,
    metadataBase: new URL(base),
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/success-stories`,
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
      canonical: `${base}/${locale}/success-stories`,
      languages: {
        es: `${base}/es/casos-de-exito`,
        en: `${base}/en/success-stories`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ---------------------------------------------------------
// 2. PAGE – SUCCESS STORIES | ALTUMIA + SCHEMA
// ---------------------------------------------------------
export default async function Page() {
  const locale = await getLocale();

  const successstoriesMessages = (
    await import(`../../../../messages/${locale}/successstories.json`)
  ).default;

  const base = "https://altumia.co";

  const title = "Success Stories | Altumia";
  const description =
    "Historias reales de empresas que escalaron sus operaciones con soluciones de software e inteligencia artificial desarrolladas por Altumia.";

  // ---------------------------------------------------------
  // JSON-LD – SUCCESS STORIES
// ---------------------------------------------------------
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/${locale}/success-stories`,
        url: `${base}/${locale}/success-stories`,
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
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calle 98A #61-47",
          addressLocality: "Bogotá",
          addressRegion: "Cundinamarca",
          postalCode: "250252",
          addressCountry: "CO",
        },
        sameAs: [
          "https://www.facebook.com/altumia.co",
          "https://www.instagram.com/altumia.co",
          "https://www.linkedin.com/company/altumia-col",
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${base}#success-stories-altumia`,
        name: "Success Stories | Altumia",
        description:
          "Casos de éxito de Altumia en desarrollo de software e inteligencia artificial",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Automatización con IA en Fintech",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Escalabilidad en E-commerce",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Optimización operativa con IA",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Plataformas educativas inteligentes",
          },
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
            name: "Success Stories | Altumia",
            item: `${base}/${locale}/success-stories`,
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

      <NextIntlClientProvider
        locale={locale}
        messages={successstoriesMessages}
      >
        <SuccessStoriesIndex />
      </NextIntlClientProvider>
    </>
  );
}
