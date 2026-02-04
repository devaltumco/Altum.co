// src/lib/data/industrias.ts
export interface Industry {
  id: number;
  slug: {
    en: string;
    es: string;
  };
  name: {
    en: string;
    es: string;
  };
}

export const industries: Industry[] = [
  { 
    id: 1, 
    slug: { en: "fintech-banking", es: "finanzas-y-banca" }, 
    name: { en: "Fintech & Banking", es: "Finanzas y Banca" } 
  },
  { 
    id: 2, 
    slug: { en: "healthcare-ai", es: "ia-en-salud" }, 
    name: { en: "Healthcare AI", es: "IA en Salud" } 
  }
];