import { getTranslations, getLocale } from "next-intl/server";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import IndustriesIndex from "@/components/pages/IndustriesAltumiaIndex";

// ✅ Cloudflare Edge
export const runtime = "edge";

// ---------------------------------------------------------
// 1. METADATA – INDUSTRIES | ALTUMIA
// ---------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  let t;
  try {
    t = await getTranslations({
      locale,
      namespace: "MetadataIndustriesAltumia",
    });
  } catch (error) {
    console.error("Error loading SEO translations:", error);
  }

  const title =
    t?.("title") ||
    "Industries | Altumia — Tecnología e IA por Sector";

  const description =
    t?.("description") ||
    "Soluciones de desarrollo de software e inteligencia artificial adaptadas por industria. Altumia opera en Colombia, México, Canadá y El Salvador.";

  const base = "https://altumia.co";

  return {
    title,
    description,
    metadataBase: new URL(base),
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/industries-altumia`,
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
      canonical: `${base}/${locale}/industries-altumia`,
      languages: {
        es: `${base}/es/industrias-altumia`,
        en: `${base}/en/industries-altumia`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ---------------------------------------------------------
// 2. PAGE – INDUSTRIES | ALTUMIA + SCHEMA
// ---------------------------------------------------------
export default async function Page() {
  const locale = await getLocale();

  const industriesaltumiaMessages = (
    await import(`../../../../messages/${locale}/industriesaltumia.json`)
  ).default;

  const base = "https://altumia.co";

  const title = "Industries Altumia | Altumia";
  const description =
    "Altumia es una empresa de desarrollo de software e implementación de IA bajo normativa legal, con operaciones en Colombia, México, Canadá y El Salvador.";

  // ---------------------------------------------------------
  // JSON-LD – INDUSTRIES ALTUMIA
  // ---------------------------------------------------------
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/${locale}/industries-altumia`,
        url: `${base}/${locale}/industries-altumia`,
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
        "@id": `${base}#industries-altumia`,
        name: "Industries | Altumia",
        description: "Industrias en las que Altumia implementa tecnología e IA",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Fintech" },
          { "@type": "ListItem", position: 2, name: "HealthTech" },
          { "@type": "ListItem", position: 3, name: "Retail & E-commerce" },
          { "@type": "ListItem", position: 4, name: "Education / EdTech" },
          { "@type": "ListItem", position: 5, name: "Logistics & Supply Chain" },
          { "@type": "ListItem", position: 6, name: "LegalTech & GovTech" },
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
            name: "Industries | Altumia",
            item: `${base}/${locale}/industries-altumia`,
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

      <NextIntlClientProvider locale={locale} messages={industriesaltumiaMessages}>
        <IndustriesIndex />
      </NextIntlClientProvider>
    </>
  );
}
