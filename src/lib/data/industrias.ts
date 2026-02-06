// src/lib/data/industrias.ts
export interface Industry {
  id: number;
  key: string; // Añadimos key para facilitar el cruce de datos
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
    key: "finance",
    slug: { en: "fintech-banking", es: "finanzas-y-banca" }, 
    name: { en: "Fintech & Banking", es: "Finanzas y Banca" } 
  },
  { 
    id: 2, 
    key: "healthcare",
    slug: { en: "healthcare-ai", es: "ia-en-salud" }, 
    name: { en: "Healthcare AI", es: "IA en Salud" } 
  },
  { 
    id: 3, 
    key: "retail",
    slug: { en: "smart-retail-ecommerce", es: "retail-inteligente-ecommerce" }, 
    name: { en: "Smart Retail", es: "Retail e-Commerce" } 
  },
  { 
    id: 4, 
    key: "manufacturing",
    slug: { en: "industrial-ai-manufacturing", es: "ia-industrial-manufactura" }, 
    name: { en: "Industrial AI", es: "IA Industrial" } 
  },
  { 
    id: 5, 
    key: "energy",
    slug: { en: "energy-smart-grids", es: "energia-redes-inteligentes" }, 
    name: { en: "Energy AI", es: "IA en Energía" } 
  },
  { 
    id: 6, 
    key: "agribusiness",
    slug: { en: "smart-agribusiness", es: "agronegocios-inteligentes" }, 
    name: { en: "Smart Agribusiness", es: "Agroindustria Inteligente" } 
  }
];