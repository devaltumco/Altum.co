// app/[locale]/page.tsx

import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import HomeIndex from '@/components/pages/HomeIndex';
export const runtime = 'edge';


export default async function HomePage() {
  const locale = await getLocale();
  
const homeMessages = (await import(`../../../messages/${locale}/home.json`)).default;  

  const pagsMessages = {
    ...homeMessages,
    
  };

  return (
    <NextIntlClientProvider locale={locale} messages={pagsMessages}>
        <HomeIndex />
    </NextIntlClientProvider>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  let t;
  try {
    t = await getTranslations({ locale, namespace: 'Metadata' });
  } catch (error) {
    console.error('Error loading SEO translations:', error);
    return {
      title: 'Páginas web - tiendas en linea',
      description: 'Creamos sitios web, tiendas en línea, aplicaciones de realidad aumentada y sistemas personalizados, codigos QR, paginas web, landingpage. Especialistas en desarrollo web con más de 5 años de experiencia.',
    };
  }

  const title = t('title') || 'Zipaquira Digital';
  const description = t('description');
  const keywords = t('keywords')?.split(",") || [];

  const metadataBase = new URL('https://zipaquiradigital.com');

  // Canonical normalizado para evitar doble barra
  const canonicalUrl = locale === 'es'
    ? metadataBase.toString()
    : new URL(`/${locale}`, metadataBase).toString();

  return {
    title,
    description,
    keywords,
    metadataBase,
    openGraph: {
      title,
      description,
      url: canonicalUrl, 
      siteName: 'Zipaquira Digital',
      images: [
        {
          url: `${metadataBase}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'OG Image',
        },
      ],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${metadataBase}/images/og-image.jpg`],
    },
    alternates: {
      canonical: canonicalUrl, // Canonical correctamente normalizado
      languages: {
        en: new URL("/en", metadataBase).toString(),
        es: metadataBase.toString()
      }
    }
  };
}
