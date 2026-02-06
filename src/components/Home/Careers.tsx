"use client";

import { useTranslations } from "next-intl";
import { jobOpenings, benefits } from "@/lib/data/jobs-data";
import { ArrowRight, MapPin } from "lucide-react";

export function Careers() {
  const t = useTranslations("Herot.Index"); // Ajusta el namespace según tu i18n

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        
        {/* --- Encabezado Principal --- */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            {t('careers.title') || "Join Our Team"}
          </h2>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            {t('careers.description') || "We are looking for passionate and talented individuals to help us build the future of AI in the Americas."}
          </p>
        </div>

        {/* --- Sección de Beneficios (Cultura) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
            {benefits.map((benefit) => (
                <div key={benefit.titleKey} className="flex items-start gap-5 group">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#3b33d1]/20 text-[#6366f1] border border-[#6366f1]/20 transition-transform group-hover:scale-110">
                            {/* Renderizado dinámico del icono de lucide */}
                            <benefit.icon className="h-7 w-7" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-2 text-white">
                            {t(benefit.titleKey)}
                        </h4>
                        <p className="text-gray-400 font-light leading-relaxed">
                            {t(benefit.descriptionKey)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        
        {/* --- Sección de Vacantes --- */}
        <div className="mt-20">
            <h3 className="text-4xl font-bold text-center mb-16 tracking-tight">
                {t('careers.openPositions') || "Open Positions"}
            </h3>
            
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">
                {jobOpenings.map((job) => (
                    <div 
                        key={job.titleKey} 
                        className="bg-[#161616] border border-white/5 rounded-2xl p-8 md:p-10 hover:border-white/10 transition-all group"
                    >
                        <div className="flex flex-col h-full">
                            {/* Cabecera del Job */}
                            <div className="mb-6">
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 ">
                                    {t(job.titleKey)}
                                </h4>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5 font-medium">
                                        <MapPin className="h-4 w-4 text-altum-violeta" /> 
                                        {job.location}
                                    </span>
                                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider text-gray-300">
                                        {job.type}
                                    </span>
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className="mb-10">
                                <p className="text-gray-400 font-light leading-relaxed line-clamp-3">
                                    {t(job.descriptionKey)}
                                </p>
                            </div>

                            {/* Botón Apply */}
                            <div className="mt-auto">
                                <button className="inline-flex items-center justify-center bg-altum-violeta hover:bg-[#5439c1 ] text-white font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95 gap-3 text-sm group/btn">
                                    {t('careers.applyNow') || "Apply Now"} 
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}