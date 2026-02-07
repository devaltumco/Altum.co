'use client';

import dynamic from 'next/dynamic';

// 1. Forzamos Edge Runtime (opcional, pero ayuda en Cloudflare)
export const runtime = 'edge';

// 2. Importación Dinámica con SSR FALSE
// Esto evita que el código pesado de Sanity entre en el bundle del servidor (_worker.js)
const SanityStudio = dynamic(() => import('@/components/SanityStudio'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#10b981' }}>
      <div>Cargando Panel de Administración Altumia...</div>
    </div>
  ),
});

export default function AdminPage() {
  return <SanityStudio />;
}