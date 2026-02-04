/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data/case-studies";
import { industriesList, countriesList } from "@/lib/data/industries-data-case";
import { Check, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function CaseStudies() {
  const t = useTranslations("Herot.caseStudies");
  const tRoot = useTranslations("Herot");

  // --- Estados ---
  const [industryFilter, setIndustryFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [mounted, setMounted] = useState(false);

  // --- Manejo de Responsividad ---
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCards(1); 
      } else if (width < 1024) {
        setVisibleCards(2); 
      } else {
        setVisibleCards(3); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Filtrado ---
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter(study => {
      const industryMatch = industryFilter === 'all' || study.industryKey === `industries.${industryFilter}`;
      const countryMatch = countryFilter === 'all' || study.countryKey === `countries.${countryFilter}`;
      return industryMatch && countryMatch;
    });
  }, [industryFilter, countryFilter]);

  // Reiniciar índice al filtrar
  useEffect(() => {
    setCurrentIndex(0);
  }, [industryFilter, countryFilter]);

  // --- Lógica de Navegación ---
  const maxIndex = Math.max(0, filteredCaseStudies.length - visibleCards);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= maxIndex;

  const nextSlide = () => {
    if (!isLast) setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (!isFirst) setCurrentIndex(prev => prev - 1);
  };

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
                            ? 'border-altum-aqua shadow-[0_0_10px_rgba(45,212,191,0.2)]' // Estilo si está seleccionado
                            : 'border-white/10 focus:border-altum-aqua' // Estilo por defecto + focus
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
                            ? 'border-altum-aqua shadow-[0_0_10px_rgba(45,212,191,0.2)]' // Estilo si está seleccionado
                            : 'border-white/10 focus:border-altum-aqua' // Estilo por defecto + focus
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

        {/* --- Carousel Area --- */}
        <div className="relative w-full max-w-[1400px] mx-auto group/carousel">
            
            {/* Contenedor relativo para posicionar flechas */}
            <div className="relative flex items-center">
                
                {/* --- Flecha Izquierda --- */}
                <button 
                    onClick={prevSlide}
                    disabled={isFirst}
                    className={`
                        absolute z-30 flex items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all duration-300
                        /* MÓVIL */
                        left-2 w-10 h-10 bg-black/60 text-white
                        /* DESKTOP */
                        md:-left-12 md:w-12 md:h-12 md:bg-altum-violeta/10 md:hover:bg-altum-violeta
                        
                        /* VISIBILIDAD */
                        ${isFirst 
                            ? 'opacity-50 cursor-not-allowed bg-black/40 text-gray-400' 
                            : 'opacity-100 cursor-pointer shadow-lg hover:scale-110'}
                    `}
                    aria-label="Anterior"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* --- Track del Slider --- */}
                <div className="overflow-hidden w-full px-0 md:px-0"> 
                    <motion.div 
                        className="flex"
                        // Solo animamos la posición X del contenedor. Las tarjetas dentro son estáticas.
                        animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
                        transition={{ type: "spring", stiffness: 250, damping: 30 }}
                    >
                        {filteredCaseStudies.length > 0 ? (
                            filteredCaseStudies.map((study, index) => (
                                <div // CAMBIO: Usamos div normal en lugar de motion.div para las tarjetas individuales
                                    key={study.titleKey}
                                    className="flex-shrink-0 px-3 md:px-4"
                                    style={{ width: `${100 / visibleCards}%` }}
                                >
                                    <Link href={`/proyectos/${study.slug}`} className="block h-full group select-none">
                                        <div className="h-full bg-black/30 border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                                            
                                            {/* --- IMAGEN LIMPIA --- */}
                                            <div className="aspect-video relative w-full bg-white/5 overflow-hidden">
                                                {study.image && (
                                                    <Image 
                                                        src={study.image}
                                                        alt={t(study.titleKey)}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        priority={index < 3}
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-30" />
                                            </div>

                                            {/* --- Contenido --- */}
                                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                                
                                                {/* Badges */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-altum-violeta/10 text-altum-aqua rounded border border-altum-aqua/20">
                                                        {tRoot(study.industryKey)}
                                                    </span>
                                                    <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-white/5 text-altum-gris rounded border border-white/10">
                                                        {tRoot(study.countryKey)}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-altum-aqua transition-colors">
                                                    {t(study.titleKey)}
                                                </h3>
                                                <p className="text-sm md:text-base text-altum-gris mb-6 line-clamp-3 font-light leading-relaxed">
                                                    {t(study.summaryKey)}
                                                </p>

                                                {/* Resultados */}
                                                <div className="mt-auto pt-5 border-t border-white/5">
                                                    <ul className="space-y-2">
                                                        {study.results.map((result, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-altum-gris">
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
                                </div>
                            ))
                        ) : (
                            <div className="w-full py-20 text-center text-altum-gris col-span-full italic">
                                {t('noResults')}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* --- Flecha Derecha --- */}
                <button 
                    onClick={nextSlide}
                    disabled={isLast}
                    className={`
                        absolute z-30 flex items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all duration-300
                        /* MÓVIL */
                        right-2 w-10 h-10 bg-black/60 text-white
                        /* DESKTOP */
                        md:-right-12 md:w-12 md:h-12 md:bg-altum-violeta/10 md:hover:bg-altum-violeta
                        
                        /* VISIBILIDAD */
                        ${isLast 
                            ? 'opacity-50 cursor-not-allowed bg-black/40 text-gray-400' 
                            : 'opacity-100 cursor-pointer shadow-lg hover:scale-110'}
                    `}
                    aria-label="Siguiente"
                >
                    <ChevronRight size={24} />
                </button>

            </div>
        </div>
      </div>
      
      {/* Fondo Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-altum-violeta/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}