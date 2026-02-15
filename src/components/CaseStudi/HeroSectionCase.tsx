/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
// ✅ Link configurado para manejar idiomas automáticamente
import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/lib/data/case-studies";
import { industriesList, countriesList } from "@/lib/data/industries-data-case";
// ✅ Importamos la data de industrias para cruzar los slugs
import { industries } from "@/lib/data/industrias";
import { Check, ChevronDown } from "lucide-react";

export default function CaseStudies() {
  const t = useTranslations("Herot.caseStudies");
  const tRoot = useTranslations("Herot");
  const locale = useLocale() as "en" | "es";

  // --- Estados ---
  const [industryFilter, setIndustryFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  // --- Manejo de Montaje ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Filtrado ---
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter(study => {
      // Ajustamos la comparación para que coincida con las claves industries.xxx
      const industryMatch = industryFilter === 'all' || study.industryKey === `industries.${industryFilter}`;
      const countryMatch = countryFilter === 'all' || study.countryKey === `countries.${countryFilter}`;
      return industryMatch && countryMatch;
    });
  }, [industryFilter, countryFilter]);

  if (!mounted) return <section className="py-24 bg-altum-bgsegundary min-h-[600px]" />;

  return (
    <section 
        className="py-24 bg-altum-bgsegundary relative overflow-hidden" 
        suppressHydrationWarning={true}
    >
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        
        {/* --- Encabezado --- */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-altum-gris font-light max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* --- Filtros --- */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-16">
            
            {/* SELECT DE INDUSTRIA */}
            <div className="relative w-full md:w-64 group">
                <select 
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className={`w-full appearance-none bg-[#0a0a0a]/80 border text-white rounded-xl px-5 py-3 pr-10 outline-none transition-all cursor-pointer 
                        ${industryFilter !== 'all' 
                            ? 'border-altum-aqua shadow-[0_0_10px_rgba(45,212,191,0.2)]' 
                            : 'border-white/10 focus:border-altum-aqua' 
                        }
                    `}
                >
                    <option value="all" className="bg-[#0a0a0a] text-white">{t('allIndustries')}</option>
                    {industriesList.map(ind => (
                        <option 
                            key={ind.id} 
                            value={ind.id}
                            className="bg-[#0a0a0a] text-white"
                        >
                            {tRoot(`industries.${ind.id}`)}
                        </option>
                    ))}
                </select>
                <ChevronDown 
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${industryFilter !== 'all' ? 'text-altum-aqua' : 'text-altum-gris'}`} 
                    size={16} 
                />
            </div>

            {/* SELECT DE PAÍS */}
            <div className="relative w-full md:w-64 group">
                <select 
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className={`w-full appearance-none bg-[#0a0a0a]/80 border text-white rounded-xl px-5 py-3 pr-10 outline-none transition-all cursor-pointer 
                        ${countryFilter !== 'all' 
                            ? 'border-altum-aqua shadow-[0_0_10px_rgba(45,212,191,0.2)]' 
                            : 'border-white/10 focus:border-altum-aqua' 
                        }
                    `}
                >
                    <option value="all" className="bg-[#0a0a0a] text-white">{t('allCountries')}</option>
                    {countriesList.map(country => (
                        <option 
                            key={country.value} 
                            value={country.value}
                            className="bg-[#0a0a0a] text-white"
                        >
                            {tRoot(`countries.${country.value}`)}
                        </option>
                    ))}
                </select>
                <ChevronDown 
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${countryFilter !== 'all' ? 'text-altum-aqua' : 'text-altum-gris'}`} 
                    size={16} 
                />
            </div>
        </div>

        {/* --- Grid de Cards (2 en móvil, 3 en desktop) --- */}
        <div className="relative w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredCaseStudies.length > 0 ? (
                    filteredCaseStudies.map((study, index) => {
                        // ✅ LÓGICA DE RUTAS: Buscamos el slug traducido en el industries.ts original
                        const caseKey = study.industryKey.split('.')[1];
                        const industryData = industries.find(ind => ind.key === caseKey);
                        const targetSlug = industryData?.slug[locale] || study.slug;

                        return (
                        <motion.div 
                            key={study.titleKey}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full"
                        >
                            <Link 
                                href={{
                                  pathname: '/industries/[slug]',
                                  params: { slug: targetSlug }
                                }}
                                className="block h-full group select-none"
                            >
                                <div className="h-full bg-black/30 border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                                    
                                    {/* --- Imagen --- */}
                                    <div className="aspect-video relative w-full bg-white/5 overflow-hidden">
                                        {study.image && (
                                            <Image 
                                                src={study.image}
                                                alt={t(study.titleKey)}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                priority={index < 3}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-30" />
                                    </div>

                                    {/* --- Contenido --- */}
                                    <div className="p-4 md:p-8 flex flex-col flex-grow">
                                        
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2 py-1 text-[8px] md:text-[10px] uppercase font-bold tracking-wider bg-altum-violeta/10 text-altum-aqua rounded border border-altum-aqua/20">
                                                {tRoot(study.industryKey)}
                                            </span>
                                            <span className="px-2 py-1 text-[8px] md:text-[10px] uppercase font-bold tracking-wider bg-white/5 text-altum-gris rounded border border-white/10">
                                                {tRoot(study.countryKey)}
                                            </span>
                                        </div>

                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-3 group-hover:text-altum-aqua transition-colors line-clamp-2">
                                            {t(study.titleKey)}
                                        </h3>
                                        <p className="text-xs md:text-base text-altum-gris mb-6 line-clamp-3 font-light leading-relaxed">
                                            {t(study.summaryKey)}
                                        </p>

                                        {/* Resultados */}
                                        <div className="mt-auto pt-5 border-t border-white/5">
                                            <ul className="space-y-2">
                                                {study.results.map((result, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-[10px] md:text-sm text-altum-gris">
                                                        <div className="mt-0.5 text-altum-aqua shrink-0">
                                                            <Check size={14} strokeWidth={3} />
                                                        </div>
                                                        <span>
                                                            <strong className="text-white font-medium">{t(result.valueKey)}</strong> {t(result.labelKey)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                        );
                    })
                ) : (
                    <div className="w-full py-20 text-center text-altum-gris col-span-full italic">
                        {t('noResults')}
                    </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Fondo Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-altum-violeta/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}