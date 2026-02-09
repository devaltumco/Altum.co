"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { teamMembers } from "@/lib/data/teamMembers";

export default function About() {
  const t = useTranslations("About");

  return (
    <section className="py-24 bg-[#111111] text-white font-sans">
      <div className="container mx-auto px-6">
        {/* Encabezado Principal */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8 tracking-tight w-3/4 mx-auto"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 text-lg text-muted-foreground"
          >
            {t('description')}
          </motion.p>
        </div>
        
        {/* Grid de Miembros del Equipo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-xl p-8 flex flex-col items-center text-center border border-white/5 hover:border-[#3AF2CE]/20 transition-all duration-300"
            >
              {/* Contenedor de Imagen con el Borde Aqua Ovalado exacto */}
              <div className="relative w-32 h-44 mb-6">
                {/* Borde Aqua Ovalado */}
                <div className="absolute inset-0 border-2 border-altum-aqua rounded-full" />
                
                {/* Imagen con recorte ovalado */}
                <div className="absolute inset-1 overflow-hidden rounded-full bg-neutral-800">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    priority={index < 4}
                  />
                </div>
              </div>

              {/* Información del Miembro */}
              <h4 className="text-lg font-semibold text-white mb-1">
                {member.name}
              </h4>
              <p className="text-altum-aqua text-xs font-medium tracking-wide">
                {t(member.roleKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}