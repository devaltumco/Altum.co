"use client";

import { useTranslations } from "next-intl";
import { 
  Boxes, 
  Cpu, 
  Layers, 
  Command, 
  Globe, 
  Server, 
  Zap, 
  Database 
} from "lucide-react";

// Puedes mover esto a tu archivo @/lib/data si prefieres.
const partnersList = [
  { name: "Vercel", icon: Zap },     // Similar al rayo/triángulo
  { name: "Next.js", icon: Command }, // Similar a la N o comando
  { name: "React", icon: Boxes },    // Similar a los cubos/átomos
  { name: "AWS", icon: Server },     // Servidores
  { name: "Cloudflare", icon: Globe }, // Nube/Globo
  { name: "Tailwind", icon: Layers }, // Capas
  { name: "Prisma", icon: Database }, // Base de datos
  { name: "Framer", icon: Cpu },      // Chip/Procesador
];

export default function Partners() {
  const t = useTranslations("Herot.partners"); // Asegúrate de tener estas keys en tu JSON

  return (
    <section 
        className="py-24 bg-[#18181b] relative overflow-hidden" 
        suppressHydrationWarning={true}
    >
        {/* Fondo sutil (opcional, para dar profundidad como en tu diseño general) */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            
            {/* Cabecera Centrada (Imitando la imagen) */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                    {/* Texto hardcodeado por si no tienes las traducciones aún, 
                        cámbialo por {t('title')} cuando quieras */}
                    {t('title')}
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                     {t('description')}
                </p>
            </div>

            {/* Grid de Logos */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20">
                {partnersList.map((partner) => (
                    <div 
                        key={partner.name} 
                        className="group flex flex-col items-center justify-center transition-all duration-300"
                    >
                        {/* Icono / Logo */}
                        <partner.icon 
                            strokeWidth={1.5}
                            className="h-10 w-10 md:h-12 md:w-12 text-gray-500 transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                        />
                        {/* Nombre (Solo para accesibilidad/SEO, visualmente oculto o sutil) */}
                        <span className="sr-only">{partner.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}