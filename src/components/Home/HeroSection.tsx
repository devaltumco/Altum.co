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
              className="group relative px-8 py-4 bg-altum-violeta text-white font-medium rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="relative z-10 flex items-center gap-2">
                {t('hero.cta')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-altum-aqua/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Botón Secundario */}
            <Link 
              href="/" 
              className="px-8 py-4 border border-altum-aqua/30 text-slate-400 font-medium rounded-lg hover:bg-altum-aqua/10 transition-all hover:border-altum-aqua"
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