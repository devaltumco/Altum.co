/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';

import ClientWrapper from '@/components/ClientWrapper';

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
    "@id": "https://altumia.co//#organization",
    "name": "Altumia",
    "url": "https://altumia.co/",
    "logo": "https://altumia.co/logo.png",
    "image": "https://altumia.co/og-image.jpg",
    "description": "Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá - El Salvador .",
    "telephone": "+57 320-740-8391", 
    "priceRange": "$$", 
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "calle 98a -61-47, Bogota", 
      "addressLocality": "Bogota",
      "addressRegion": "Cundinamarca",
      "postalCode": "250252",
      "addressCountry": "CO"
    },
    "geo": { 
      "@type": "GeoCoordinates",
      "latitude": 4.68757447913936, 
      "longitude": -74.06740254175845
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
      "opens": "06:00",
      "closes": "18:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-320-740-8391",
      "contactType": "customer service",
      "areaServed": "CO",
      "availableLanguage": ["es", "en"]
    },
    "sameAs": [
      "https://www.facebook.com/altumia.co",
      "https://www.instagram.com/altumia.co",
      "https://www.linkedin.com/company/altumia-col"
    ]
  };

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <head>
      </head>

      {/* Se añadió suppressHydrationWarning al body para evitar errores por inyección de scripts/atributos del navegador en móvil */}
      <body 
        suppressHydrationWarning 
        className={`${spaceGrotesk.variable} ${pacifico.variable} font-sans antialiased min-h-screen flex flex-col overflow-x-hidden relative`}
      >

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
  const metadataBase = new URL('https://altumia.co');

  return {
    metadataBase,
    title: {
      default: locale === 'es' ? 'Altumia | Desarrollo de Software e IA' : 'Altumia | Software Development & AI',
      template: '%s | Altumia',
    },
    description:
      locale === 'es'
        ? 'Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia, México, Canadá y El Salvador.'
        : 'Software development and AI implementation company under legal regulations with operations in Colombia, Mexico, Canada and El Salvador.',
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