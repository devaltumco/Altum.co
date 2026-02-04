"use client";

import { useTranslations } from "next-intl";
import { solutionsList } from "@/lib/data/solutions-data";

export default function Solutions() {
  const t = useTranslations("Herot.solutions");

  return (
    <section 
      className="py-24 bg-altum-bgsegundary relative overflow-hidden"
      suppressHydrationWarning={true}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Cabecera Centrada - Sin animaciones */}
        <div className="max-w-3xl mb-12 md:mb-20 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white px-4">
            {t('title')}
          </h2>
          <p className="mt-6 text-base md:text-lg text-altum-gris leading-relaxed px-4">
            {t('description')}
          </p>
        </div>

        {/* Grid de Soluciones - Sin animaciones de entrada */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
          {solutionsList.map((item) => (
            <div
              key={item.id}
              className="group relative p-4 md:p-8 rounded-2xl bg-black/10 border border-white/10 transition-all duration-500 hover:bg-altum-violeta hover:border-altum-violeta flex flex-col items-start"
            >
              {/* Icono dinámico */}
              <div className="mb-4 md:mb-6 inline-flex p-2 md:p-3 rounded-lg bg-altum-violeta/10 text-altum-aqua transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white">
                <item.icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>

              {/* Textos */}
              <h3 className="text-sm md:text-xl font-bold text-white transition-colors duration-500 group-hover:text-white line-clamp-2 md:line-clamp-none">
                {t(`${item.id}.title`)}
              </h3>
              <p className="mt-2 md:mt-3 text-[11px] md:text-sm text-altum-gris leading-snug md:leading-relaxed transition-colors duration-500 group-hover:text-white/80 line-clamp-3 md:line-clamp-none">
                {t(`${item.id}.description`)}
              </p>

              {/* Efecto de brillo sutil en hover (CSS puro) */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-altum-aqua/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Decoración de fondo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-altum-violeta/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}