"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Map } from "@/components/ui/map";

export default function HeroSection() {
  const t = useTranslations("Herot");

  return (
    <div 
      className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 md:mb-32"
      >
      <div className="grid lg:grid-cols-2 gap-5 md:gap-16 items-center">
        
        {/* LADO IZQUIERDO: Contenido */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }} // Usamos whileInView para mejor control
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }} // Animación más rápida y fluida
          className="flex flex-col items-start"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-altum-violeta/30 bg-altum-violeta/5 mb-4 mt-10">
            <span className="w-2 h-2 rounded-full bg-altum-aqua animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-altum-gris uppercase">
              Altum IA Design System 2026
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-white">
            {t('hero.title.line1')}
            <span className="block text-altum-violeta mt-2">{t('hero.title.line2')}</span>
          </h1>

          <p className="mt-8 max-w-lg text-lg text-altum-gris leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            {/* Botón Principal */}
         <Link 
    href="/" 
    className="group relative w-full sm:w-auto px-6 py-3 bg-[#5D3FD3] text-white text-sm font-medium rounded-lg transition-all hover:scale-105 active:scale-100 shadow-lg shadow-[#5D3FD3]/20 flex items-center justify-center gap-2"
  >
    {t('hero.cta')}
    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#3AF2CE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </Link>

  {/* Botón Secundario: Explore Solutions */}
  <Link 
    href="/solutions" 
    className="w-full sm:w-auto px-10 py-3 border border-white/10 text-gray-300 text-sm font-medium rounded-lg hover:bg-white/5 transition-all hover:border-white/20 text-center flex items-center justify-center"
  >
    {t('hero.secondary_cta')}
  </Link>
          </div>
        </motion.div>

        {/* LADO DERECHO: Mapa / Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} // Escala más sutil para evitar layout shift
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative  lg:block" // Oculto en móvil para mejorar LCP
        >
          <div className="relative w-full aspect-square flex items-center justify-center">
             <Map />
          </div>
        </motion.div>

      </div>
    </div>
  );
}