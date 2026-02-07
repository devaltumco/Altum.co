/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { industries } from "@/lib/data/industrias";

const LanguageSwitcher = () => {
  const locale = useLocale() as "en" | "es";
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const changeLanguage = (newLocale: "en" | "es") => {
    if (newLocale === locale) return;

    const currentParams = params ? { ...params } : {};
    const currentSlug = typeof currentParams.slug === 'string' ? currentParams.slug : null;

    if (currentSlug) {
      const currentIndustry = industries.find(
        (i) => i.slug.en === currentSlug || i.slug.es === currentSlug
      );

      if (currentIndustry) {
        // ✅ Traducimos solo el valor del SLUG, la base /industries/ se mantiene igual
        currentParams.slug = currentIndustry.slug[newLocale];
      }
    }

    // Eliminamos parámetros basura que Wrangler/Cloudflare a veces inyectan
    // @ts-ignore
    delete currentParams['__next_pages_route_params__'];

    router.replace(
      // @ts-ignore
      { pathname, params: currentParams },
      { locale: newLocale }
    );
  };

  return (
    <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em]">
      <button
        onClick={() => changeLanguage("es")}
        className={`px-1 py-1 transition-colors duration-200 uppercase ${
          locale === "es" ? "text-altum-aqua border-b-[1.5px] border-altum-aqua" : "text-gray-500 hover:text-white"
        }`}
      >
        ES
      </button>
      <span className="text-gray-700 font-light">/</span>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-1 py-1 transition-colors duration-200 uppercase ${
          locale === "en" ? "text-altum-aqua border-b-[1.5px] border-altum-aqua" : "text-gray-500 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;