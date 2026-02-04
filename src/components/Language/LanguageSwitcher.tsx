/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/app/i18n/navigation";
import { useParams } from "next/navigation";
import { industries } from "@/lib/data/industrias";

const LanguageSwitcher = () => {
  const locale = useLocale() as "en" | "es";
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams(); // Captura los parámetros de la URL

  const changeLanguage = (newLocale: "en" | "es") => {
    if (newLocale === locale) return;

    // Clonamos los parámetros actuales de forma segura
    // Usamos un objeto vacío como fallback para evitar el error 'possibly null'
    const currentParams = params || {};
    const newParams = { ...currentParams };

    // Verificamos si existe un slug en la URL actual de forma segura
    const currentSlug = typeof currentParams.slug === 'string' ? currentParams.slug : null;

    if (currentSlug) {
      const currentIndustry = industries.find(
        (i) => i.slug.en === currentSlug || i.slug.es === currentSlug
      );

      if (currentIndustry) {
        // Intercambiamos el slug por su versión traducida
        newParams.slug = currentIndustry.slug[newLocale];
      }
    }

    // router.replace gestiona la traducción de la ruta base (/industrias <-> /industries)
    // y aplicamos los nuevos parámetros traducidos
    router.replace(
      // @ts-ignore - Validado internamente por next-intl para rutas dinámicas
      { pathname, params: newParams },
      { locale: newLocale }
    );
  };

  return (
    <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em]">
      {/* Botón ES */}
      <button
        onClick={() => changeLanguage("es")}
        className={`px-1 py-1 transition-colors duration-200 uppercase ${
          locale === "es" 
            ? "text-emerald-400 border-b-[1.5px] border-emerald-400" 
            : "text-gray-500 hover:text-white"
        }`}
      >
        ES
      </button>

      {/* Separador */}
      <span className="text-gray-700 font-light">/</span>

      {/* Botón EN */}
      <button
        onClick={() => changeLanguage("en")}
        className={`px-1 py-1 transition-colors duration-200 uppercase ${
          locale === "en" 
            ? "text-emerald-400 border-b-[1.5px] border-emerald-400" 
            : "text-gray-500 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;