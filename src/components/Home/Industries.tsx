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
          <p className="mt-6 text-lg text-altum-gris leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Grid de industrias sin animaciones */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {industriesList.map((industry) => (
            <div
              key={industry.id}
              className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:bg-altum-violeta/20 hover:border-altum-violeta hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(93,63,211,0.2)]"
            >
              {/* Contenedor del Icono */}
              <div className="p-4 bg-altum-violeta/10 rounded-full mb-6 transition-colors duration-300 group-hover:bg-altum-aqua/20">
                <industry.icon className="h-8 w-8 text-altum-aqua transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Título de la Industria */}
              <h3 className="text-md md:text-lg font-semibold text-white tracking-tight leading-tight">
                {t(industry.id)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}