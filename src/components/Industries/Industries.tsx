"use client";

import { useTranslations } from "next-intl";
import { industriesList } from "@/lib/data/industries-data";

export default function Industries() {
  const t = useTranslations("Herot.industries");

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Cabecera de Sección Centrada */}
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Grid de 2 columnas para dar espacio a los textos largos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {industriesList.map((industry) => (
            <div
              key={industry.id}
              className="flex flex-col p-8 md:p-10 rounded-3xl bg-[#0A0A0A] border border-white/5 transition-all duration-300 hover:border-altum-violeta/30 hover:bg-white/[0.02]"
            >
              {/* Encabezado: Icono + Título */}
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-white/5 rounded-full">
                  <industry.icon className="h-6 w-6 text-altum-aqua" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                  {t(industry.id)}
                </h3>
              </div>

              {/* Descripción Visible Siempre */}
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {t(`descriptions.${industry.id}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}