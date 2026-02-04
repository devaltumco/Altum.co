/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';

import ClientWrapper from '@/pages/ClientWrapper';

import { Space_Grotesk, Pacifico } from 'next/font/google';
import '../globals.css';

// runtime edge para Cloudflare
export const runtime = 'edge';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  // Especifica todos los pesos que necesitas
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});


const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  weight: '400',
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  if (!['es', 'en'].includes(locale)) notFound();

  
 const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", 
    "@id": "https://zipaquiradigital.com/#organization",
    "name": "Zipaquirá Digital",
    "url": "https://zipaquiradigital.com",
    "logo": "https://zipaquiradigital.com/logo.png",
    "image": "https://zipaquiradigital.com/og-image.jpg",
    "description": "Agencia de desarrollo web y marketing digital en Zipaquirá y Colombia.",
    "telephone": "+573195301551", 
    "priceRange": "$$", 
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Zipaquirá Centro", 
      "addressLocality": "Zipaquirá",
      "addressRegion": "Cundinamarca",
      "postalCode": "250252",
      "addressCountry": "CO"
    },
    "geo": { 
      "@type": "GeoCoordinates",
      "latitude": 5.0226, 
      "longitude": -74.0016
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-319-530-1551",
      "contactType": "customer service",
      "areaServed": "CO",
      "availableLanguage": ["es", "en"]
    },
    "sameAs": [
      "https://www.facebook.com/zipaquiradigital",
      "https://www.instagram.com/zipaquiradigital",
      "https://www.linkedin.com/company/zipaquir%C3%A1-digital"
    ]
  };

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <head>
      </head>

      {/* Se corrigió Space_Grotesk.variable por spaceGrotesk.variable y se añadió la clase de fuente por defecto font-sans o la variable directamente */}
      <body className={`${spaceGrotesk.variable} ${pacifico.variable} font-sans antialiased min-h-screen flex flex-col overflow-x-hidden relative`}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
{/* scritp google tagmanager
    <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLNSZFWN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
*/}
        <ClientWrapper locale={locale} messages={messages}>
          {children}
        </ClientWrapper>

      </body>
    </html>
  );
}

// Viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Metadata
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const metadataBase = new URL('https://zipaquiradigital.com');

  return {
    metadataBase,
    title: {
      default: locale === 'es' ? 'Zipaquirá Digital' : 'Zipaquirá Digital | English',
      template: '%s | Zipaquirá Digital',
    },
    description:
      locale === 'es'
        ? 'Portal informativo y tecnológico de Zipaquirá, Colombia.'
        : 'Digital information and tech portal from Zipaquirá, Colombia.',
    icons: {
      icon: '/favicon.ico',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: new URL('/en', metadataBase).toString(),
        es: metadataBase.toString(),
      },
    },
  };
}