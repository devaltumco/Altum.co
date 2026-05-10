'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// 🔥 Esta es la solución: Declaramos dataLayer en el objeto Window global para TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

function GTMTrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: 'page_view', // Usaremos este nombre estándar
        page_location: window.location.href,
        page_path: pathname, // Limpio, sin parámetros para no ensuciar GA4
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GTMTracker() {
  return (
    <Suspense fallback={null}>
      <GTMTrackerContent />
    </Suspense>
  );
}