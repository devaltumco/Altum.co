// app/[locale]/page.tsx

import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import HomeIndex from '@/components/pages/HomeIndex';
import BlogHomeSection from '@/components/Home/BlogHomeSection';

export const runtime = 'edge';

export default async function HomePage() {
  const locale = await getLocale();
  
const homeMessages = (await import(`../../../messages/${locale}/home.json`)).default;  

  const pagsMessages = {
    ...homeMessages,
    
  };

  // --- SCHEMA ESPECÍFICO DE HOME (AEO & SEO) ---
  const currentLang = locale === 'es' ? 'es-CO' : 'en-US';
  
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://altumia.co/#homepage",
    "url": "https://altumia.co",
    "name": locale === 'es' 
      ? "Altumia | Desarrollo de Software e IA" 
      : "Altumia | Software Development & AI",
    "description": locale === 'es'
      ? "Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá - El Salvador."
      : "Software development and AI implementation company under legal regulations with operations in Colombia - Mexico - Canada - El Salvador.",
    "inLanguage": currentLang,
    "about": {
      "@id": "https://altumia.co/#organization"
    },
    "isPartOf": {
      "@id": "https://altumia.co/#website"
    },
    // Speakable permite que las IAs de voz identifiquen qué partes leer
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2"]
    },
    // Habilita la barra de búsqueda directa en Google (Sitelinks Searchbox)
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://altumia.co/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <NextIntlClientProvider locale={locale} messages={pagsMessages}>
      {/* Inyección del Schema específico de la Home */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <main className="w-full min-w-full max-w-none m-0 p-0">
       <HomeIndex 
        blogSection={<BlogHomeSection locale={locale} />} 
      />
      </main>
    </NextIntlClientProvider>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  let t;
  try {
    t = await getTranslations({ locale, namespace: 'MetadataIndex' });
  } catch (error) {
    console.error('Error loading SEO translations:', error);
    // Fallback optimizado según auditoría para Altumia
    return {
      title: 'Altumia | Desarrollo de Software e IA',
      description: 'Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá.',
    };
  }

  // Título y descripción optimizados (Priorizando lo que t() devuelva, con fallbacks estratégicos)
  const title = t('title') || (locale === 'es' ? 'Altumia | Desarrollo de Software e IA' : 'Altumia | Software Development & AI');
  const description = t('description') || (locale === 'es' ? 'Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá - El Salvador.' : 'Software development and AI implementation company under legal regulations with operations in Colombia - Mexico - Canada - El Salvador.');
  const keywords = t('keywords')?.split(",") || ["desarrollo de software", "implementación de IA", "software Colombia", "IA legal", "desarrollo web"];

  const metadataBase = new URL('https://altumia.co');

  // Canonical normalizado
  const canonicalUrl = locale === 'es'
    ? metadataBase.toString()
    : new URL(`/${locale}`, metadataBase).toString();

  return {
    title,
    description,
    keywords,
    metadataBase,
    category: 'technology', // Boost semántico
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': new URL("/en", metadataBase).toString(),
        'es': metadataBase.toString(),
        'x-default': metadataBase.toString() // x-default para el mercado principal
      }
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl, 
      siteName: 'Altumia',
      images: [
        {
          // Ajustado a /og-image.jpg para mantener consistencia con el layout
          url: `/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Altumia - Desarrollo de Software e IA',
        },
      ],
      // Corregido es_ES a es_CO para posicionamiento geográfico en Colombia
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-image.jpg`], // Consistencia total
    },
  };
}