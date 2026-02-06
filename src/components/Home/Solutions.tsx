"use client";

import { useTranslations } from "next-intl";
import { solutionsList } from "@/lib/data/solutions-data";

export default function Solutions() {
  const t = useTranslations("Herot.solutions");

  return (
    <div className="py-24 bg-altum-bgsegundary relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="max-w-3xl mb-12 md:mb-20 mx-auto text-center">
          {/* suppressHydrationWarning permite que el servidor y cliente difieran un instante sin lanzar error */}
          <h2 suppressHydrationWarning className="text-3xl md:text-5xl font-bold text-white px-4">
            {t('title')}
          </h2>
          <p suppressHydrationWarning className="mt-6 text-base md:text-lg text-altum-gris leading-relaxed px-4">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
          {solutionsList.map((item) => (
            <div
              key={item.id}
              className="group relative p-4 md:p-8 rounded-2xl bg-black/10 border border-white/10 transition-all duration-500 hover:bg-altum-violeta hover:border-altum-violeta flex flex-col items-start"
            >
              <div className="mb-4 md:mb-6 inline-flex p-2 md:p-3 rounded-lg bg-altum-violeta/10 text-altum-aqua transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white">
                <item.icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>

              <h4 suppressHydrationWarning className="text-sm md:text-xl font-bold text-white transition-colors duration-500 group-hover:text-white">
                {t(`${item.id}.title`)}
              </h4>
              <p suppressHydrationWarning className="mt-2 md:mt-3 text-[11px] md:text-sm text-altum-gris leading-snug group-hover:text-white/80">
                {t(`${item.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}