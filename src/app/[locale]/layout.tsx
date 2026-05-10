/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
// @ts-expect-error - TS se confunde con side-effects de CSS en modo bundler, Next.js lo maneja bien.

import '../globals.css';

import Script from 'next/script';
import ClientWrapper from '@/components/ClientWrapper';
import GTMTracker from '@/components/tracking/GTMTracker';

import { Audiowide, Pacifico } from 'next/font/google';

// Edge runtime
export const runtime = 'edge';

const audiowide = Audiowide({
  subsets: ['latin'],
  variable: '--font-audiowide',
  weight: '400',
  display: 'swap',
  adjustFontFallback: true,
});

const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  weight: '400',
  display: 'swap',
  adjustFontFallback: true,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  if (!['es', 'en'].includes(locale)) notFound();

  const currentLang = locale === 'es' ? 'es-CO' : 'en-US';
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  // =========================
  // 1. ORGANIZATION SCHEMA
  // =========================
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://altumia.co/#organization",
    "name": "Altumia",
    "url": "https://altumia.co",
    "logo": "https://altumia.co/logo.png",
    "image": "https://altumia.co/og-image.jpg",
    "description": "Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá - El Salvador.",
    "inLanguage": currentLang,
    "telephone": "+57 320-740-8391",
    "priceRange": "$$",
    "founder": {
      "@type": "Person",
      "name": "Equipo Altumia",
      "jobTitle": "Desarrollo de Software e IA",
      "sameAs": [
        "https://altumia.co",
        "https://altumia.co/nosotros"
      ]
    },
    "knowsAbout": [
      "Desarrollo de software a medida para empresas",
      "Implementación de Inteligencia Artificial bajo normativa legal",
      "Operaciones tecnológicas en Colombia, México, Canadá y El Salvador",
      "E-commerce y plataformas escalables",
      "Aplicaciones web progresivas (PWA)",
      "Arquitecturas web de alto rendimiento"
    ],
    "areaServed": [
      { "@type": "Country", "name": "Colombia" },
      { "@type": "Country", "name": "México" },
      { "@type": "Country", "name": "Canadá" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "calle 98a -61-47",
      "addressLocality": "Bogotá",
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
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "06:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/altumia.co",
      "https://www.instagram.com/altumia.co?igsh=MTl6ZTFtdmd5Mzh2eg==",
      "https://altumia.co",
      "https://altumia.co/servicios",
      "https://altumia.co/contacto"
    ]
  };

  // =========================
  // 2. WEBSITE SCHEMA
  // =========================
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://altumia.co/#website",
    "url": "https://altumia.co",
    "name": "Altumia",
    "inLanguage": currentLang,
    "publisher": {
      "@id": "https://altumia.co/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://altumia.co/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // =========================
  // 3. WEBPAGE SCHEMA
  // =========================
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://altumia.co/#webpage",
    "url": "https://altumia.co",
    "name": "Altumia | Desarrollo de Software e IA",
    "description": "Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá - El Salvador.",
    "inLanguage": currentLang,
    "isPartOf": { "@id": "https://altumia.co/#website" },
    "about": { "@id": "https://altumia.co/#organization" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://altumia.co/#webpage"
    },
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Servicios",
        "url": "https://altumia.co/servicios"
      },
      {
        "@type": "WebPage",
        "name": "Contacto",
        "url": "https://altumia.co/contacto"
      }
    ]
  };

  // =========================
  // 4. BREADCRUMB
  // =========================
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'es' ? "Inicio" : "Home",
        "item": "https://altumia.co"
      }
    ]
  };

  return (
<html lang={locale} dir="ltr" suppressHydrationWarning>   
     <head>
       

        {/* Facebook Pixel Base */}
     {pixelId && (
  <Script
    id="fb-pixel"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.ne/en_US/fbevents.js');
        
        // 🔥 Generamos el ID para el PageView inicial
        const pageViewId = crypto.randomUUID();
        fbq('init', '${pixelId}');
        fbq('track', 'PageView', {}, { eventID: pageViewId });
      `,
    }}
  />
)}

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </head>

     <body className={`${audiowide.variable} ${pacifico.variable} antialiased min-h-screen flex flex-col font-sans`}>
        
        {/* GTM Correcto con Inicialización de DataLayer */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WVT2NBB8');
          `}
        </Script>

        <noscript>
         <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVT2NBB8"
                 height="0" width="0" 
                 style={{ display: 'none', visibility: 'hidden' }}/>
        </noscript>

        {/* Facebook Pixel NoScript */}
        {pixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.co/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        <ClientWrapper locale={locale} messages={messages}>
          <GTMTracker />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}

// =========================
// VIEWPORT
// =========================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

// =========================
// METADATA
// =========================
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const base = 'https://altumia.co';

  return {
    metadataBase: new URL(base),
    title: {
      default: locale === 'es'
        ? 'Altumia | Desarrollo de Software e IA'
        : 'Altumia | Software Development & AI',
      template: '%s | Altumia',
    },
    description: locale === 'es'
      ? 'Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá - El Salvador.'
      : 'Software development and AI implementation company under legal regulations with operations in Colombia - Mexico - Canada - El Salvador.',
    alternates: {
      canonical: base,
      languages: {
        en: `${base}/en`,
        es: base,
        'x-default': base,
      },
    },
    openGraph: {
      title: 'Altumia',
      description: 'Empresa de Desarrollo de software e implementación de IA bajo normativa legal con operaciones en Colombia - México - Canadá - El Salvador.',
      url: base,
      siteName: 'Altumia',
      images: [
        {
          url: `${base}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Altumia',
      images: [`${base}/og-image.jpg`],
    },
  };
}