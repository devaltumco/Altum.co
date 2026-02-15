"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function History() {
  // Al usar "About.history", t ya apunta a las llaves internas de history
  const t = useTranslations("About.history");

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Columna de Texto */}
          <motion.div 
            className="flex-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight text-white">
              {/* CORRECCIÓN: Eliminamos el prefijo 'history.' */}
              {t('title')}
            </h2>
            
            <div className="space-y-8">
              <p className="text-gray-400 text-base leading-relaxed font-light">
                {t('paragraph1')}
              </p>
              <p className="text-gray-400 text-base leading-relaxed font-light">
                {t('paragraph2')}
              </p>
              <p className="text-gray-400 text-base leading-relaxed font-light">
                {t('paragraph3')}
              </p>
            </div>
          </motion.div>

          {/* Columna de Imagen */}
          <motion.div 
            className="flex-1 order-1 lg:order-2 w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black">
              <Image
                src="/images/nuestrahistoria-altumia.jpg" 
                alt="Altumia History - Earth from Space"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}