"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Scale, Eye, ShieldCheck } from "lucide-react";

// Datos de los principios (Replica exacta de la imagen)
const principlesList = [
  {
    icon: Scale, // Balanza para Justicia
    titleKey: "principle1.title", // "Justicia y Equidad"
    descKey: "principle1.description" // "Mitigamos activamente los sesgos..."
  },
  {
    icon: Eye, // Ojo para Transparencia
    titleKey: "principle2.title", // "Transparencia y Explicabilidad"
    descKey: "principle2.description" // "Creamos modelos cuyas decisiones..."
  },
  {
    icon: ShieldCheck, // Escudo para Seguridad
    titleKey: "principle3.title", // "Seguridad y Responsabilidad"
    descKey: "principle3.description" // "Diseñamos sistemas robustos..."
  }
];

export default function ResponsibleAI() {
  const t = useTranslations("Herot.responsible_ai");

  return (
    <section 
      className="py-24 bg-[#18181b] relative overflow-hidden" // Fondo oscuro (Zinc-900)
      suppressHydrationWarning={true}
    >
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Cabecera Centrada */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            {t('title')} {/* IA Responsable y Gobernanza */}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            {t('description')} {/* Nuestro compromiso es desarrollar IA ética... */}
          </p>
        </div>

        {/* Contenido: Imagen Izquierda + Lista Derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Columna Izquierda: Imagen */}
          <div className="relative group">
            {/* Efecto Glow detrás de la imagen */}
            <div className="absolute -inset-1 bg-gradient-to-r from-altum-violeta/20 to-altum-aqua/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/images/aialtum.jpg" // ⚠️ Asegúrate de tener esta imagen o cambiar la ruta
                alt={t('title')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay sutil para integrar mejor la imagen */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>

          {/* Columna Derecha: Lista de Principios */}
          <div className="space-y-8">
            {principlesList.map((principle, index) => (
              <div key={index} className="flex items-start gap-5 group/item">
                
                {/* Icono Circular */}
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 text-altum-aqua border border-emerald-500/20 transition-all duration-300 group-hover/item:bg-altum-aqua group-hover/item:text-black group-hover/item:scale-110 group-hover/item:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <principle.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Texto */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover/item:text-altum-aqua transition-colors">
                    {t(principle.titleKey)}
                  </h4>
                  <p className="text-gray-400 leading-relaxed font-light text-base">
                    {t(principle.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}