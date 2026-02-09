"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eye, Target } from "lucide-react";

export default function MissionVision() {
  const t = useTranslations("About.mission_vision");

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-6">
        {/* Título de la Sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          
          {/* Tarjeta de Visión */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-white/5 rounded-2xl p-10 flex flex-col gap-6 hover:border-[#5D3FD3]/30 transition-colors group"
          >
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#5D3FD3] text-white shadow-[0_0_20px_rgba(93,63,211,0.3)]">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{t('vision.title')}</h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              {t('vision.text')}
            </p>
          </motion.div>

          {/* Tarjeta de Misión */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#141414] border border-white/5 rounded-2xl p-10 flex flex-col gap-6 hover:border-[#3AF2CE]/30 transition-colors group"
          >
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#3AF2CE] text-black shadow-[0_0_20px_rgba(58,242,206,0.3)]">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{t('mission.title')}</h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              {t('mission.text')}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}