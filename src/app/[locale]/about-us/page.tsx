import { getTranslations, getLocale } from "next-intl/server";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import AboutUsIndex from "@/components/pages/AboutUsIndex";

// ✅ Cloudflare Edge Runtime
export const runtime = "edge";

// ---------------------------------------------------------
// 1. METADATA SEO – ABOUT US (ALTUMIA)
// ---------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  let t;
  try {
    t = await getTranslations({ locale, namespace: "MetadataAboutUs" });
  } catch (error) {
    console.error("Error loading SEO translations:", error);
  }

  const title =
    t?.("title") || "Sobre Altumia | Desarrollo de Software e IA";
  const description =
    t?.("description") ||
    "Empresa de desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia, México, Canadá y El Salvador.";

  const base = "https://altumia.co";

  return {
    title,
    description,
    metadataBase: new URL(base),
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/about-us`,
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
      canonical: `${base}/${locale}/about-us`,
      languages: {
        es: `${base}/es/sobre-nosotros`,
        en: `${base}/en/about-us`,
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
// 2. PÁGINA ABOUT US + JSON-LD (LOCALBUSINESS)
// ---------------------------------------------------------
export default async function Page() {
  const locale = await getLocale();

  const t = await getTranslations({
    locale,
    namespace: "MetadataAboutUs",
  });

  const aboutUsMessages = (
    await import(`../../../../messages/${locale}/about-us.json`)
  ).default;

  const base = "https://altumia.co";

  const title =
    t("title") || "Sobre Altumia | Desarrollo de Software e IA";
  const description =
    "Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia, México, Canadá y El Salvador.";

  // ---------------------------------------------------------
  // ✅ SCHEMA ORG – LOCAL BUSINESS (ALTUMIA)
  // ---------------------------------------------------------
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${base}/${locale}/about-us`,
        url: `${base}/${locale}/about-us`,
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
        description,
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
        geo: {
          "@type": "GeoCoordinates",
          latitude: 4.68757447913936,
          longitude: -74.06740254175845,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "06:00",
          closes: "18:00",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+57-320-740-8391",
          contactType: "customer service",
          areaServed: ["CO", "MX", "CA", "SV"],
          availableLanguage: ["es", "en"],
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
            name: title,
            item: `${base}/${locale}/about-us`,
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

      <NextIntlClientProvider locale={locale} messages={aboutUsMessages}>
        <AboutUsIndex />
      </NextIntlClientProvider>
    </>
  );
}
