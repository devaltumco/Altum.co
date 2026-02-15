import { getTranslations, getLocale } from "next-intl/server";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import PolicityIndex from "@/components/pages/PolicityIndex";

// ✅ Cloudflare Edge Runtime
export const runtime = "edge";

// ---------------------------------------------------------
// 1. METADATA SEO – SOLUTIONS (ALTUMIA)
// ---------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  let t;
  try {
    t = await getTranslations({ locale, namespace: "MetadataSolutions" });
  } catch (error) {
    console.error("Error loading SEO translations:", error);
  }

  const title =
    t?.("title") ||
    "Soluciones Tecnológicas | Desarrollo de Software e IA | Altumia";

  const description =
    t?.("description") ||
    "Soluciones de desarrollo de software, inteligencia artificial y automatización empresarial bajo normativa legal en Colombia, México, Canadá y El Salvador.";

  const base = "https://altumia.co";

  return {
    title,
    description,
    metadataBase: new URL(base),
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/solutions`,
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
      canonical: `${base}/${locale}/solutions`,
      languages: {
        es: `${base}/es/soluciones`,
        en: `${base}/en/solutions`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ---------------------------------------------------------
// 2. PÁGINA SOLUTIONS + JSON-LD (SERVICE)
// ---------------------------------------------------------
export default async function Page() {
  const locale = await getLocale();

  const t = await getTranslations({
    locale,
    namespace: "MetadataSolutions",
  });

  const policityMessages = (
    await import(`../../../../messages/${locale}/policity.json`)
  ).default;

  const base = "https://altumia.co";

  const title =
    t("title") ||
    "Soluciones Tecnológicas | Desarrollo de Software e IA | Altumia";

  const description =
    "Soluciones de desarrollo de software, inteligencia artificial y automatización empresarial bajo normativa legal con operaciones en Colombia, México, Canadá y El Salvador.";

  // ---------------------------------------------------------
  // ✅ SCHEMA ORG – SERVICES + LOCAL BUSINESS
  // ---------------------------------------------------------
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/${locale}/solutions`,
        url: `${base}/${locale}/solutions`,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: {
          "@id": `${base}#website`,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${base}/#organization`,
        name: "Altumia",
        url: base,
        logo: `${base}/logo.png`,
        image: `${base}/og-image.jpg`,
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
        "@type": "Service",
        "@id": `${base}/#software-solutions`,
        name: "Soluciones Tecnológicas Empresariales",
        description,
        provider: {
          "@id": `${base}/#organization`,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Colombia",
          },
          {
            "@type": "Country",
            name: "México",
          },
          {
            "@type": "Country",
            name: "Canadá",
          },
          {
            "@type": "Country",
            name: "El Salvador",
          },
        ],
        serviceType: [
          "Desarrollo de Software",
          "Inteligencia Artificial",
          "Automatización Empresarial",
          "Integraciones Tecnológicas",
          "Soluciones Cloud",
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
            name:
              locale === "es"
                ? "Soluciones"
                : "Solutions",
            item: `${base}/${locale}/solutions`,
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

      <NextIntlClientProvider locale={locale} messages={policityMessages}>
        < PolicityIndex/>
      </NextIntlClientProvider>
    </>
  );
}
