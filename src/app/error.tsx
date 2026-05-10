'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error para debug
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        ¡Ups! Algo salió mal
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Hubo un error al cargar esta sección. Por favor, intenta de nuevo.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all"
      >
        Reintentar
      </button>
    </div>
  );
}