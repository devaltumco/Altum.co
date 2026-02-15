"use client"; //

import { industries } from "@/lib/data/industrias";
import { notFound } from "next/navigation";
import { motion } from "framer-motion"; //
import { CheckCircle2, MessageSquare, HelpCircle, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

// ✅ Definimos la interfaz de params correctamente
interface PageProps {
  params: Promise<{ 
    slug: string; 
    locale: string; 
  }>;
}

export default function IndustryPage({ params }: PageProps) {
  const [data, setData] = useState<{ slug: string; locale: string } | null>(null);

  // Desenvolvemos los params
  useEffect(() => {
    params.then(setData);
  }, [params]);

  if (!data) return null;

  const { slug, locale } = data;
  const lang = locale as 'en' | 'es';
  const isEs = locale === 'es';

  // Buscamos la industria en la data centralizada
  const industry = industries.find(i => i.slug.en === slug || i.slug.es === slug);

  if (!industry) notFound();

  // Función para manejar el contacto por WhatsApp
  const handleWhatsApp = () => {
    const phoneNumber = "573207408391";
    const message = isEs 
      ? `Hola AltumIA, me gustaría agendar una consultoría sobre IA para el sector de ${industry.name.es}.` 
      : `Hello AltumIA, I would like to schedule a consultancy about AI for the ${industry.name.en} sector.`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* 1. HERO SECTION DINÁMICO */}
      <section className="relative pt-40 pb-24 px-6 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3AF2CE15,transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center gap-2 text-[#3AF2CE] text-xs font-bold tracking-[0.3em] uppercase mb-6">
              <Sparkles size={14} />
              {isEs ? 'Solución Especializada' : 'Specialized Solution'}
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              {industry.heroTitle[lang]}
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl max-w-3xl leading-relaxed">
              {industry.description[lang]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CAPACIDADES ESPECÍFICAS (FEATURES) */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 tracking-tight font-sans">
            {isEs ? 'Capacidades de Implementación' : 'Implementation Capabilities'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {industry.features.map((feature, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#5D3FD3]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <CheckCircle2 className="text-[#3AF2CE] mb-6" size={32} />
                  <h3 className="text-2xl font-bold mb-4">{feature.title[lang]}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                    {feature.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIAL SECTORIAL */}
      <section className="py-32 px-6 bg-[#0d0d0d] border-y border-white/5 font-sans">
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="w-16 h-16 text-[#3AF2CE]/10 mx-auto mb-10" />
          <blockquote className="text-3xl md:text-5xl font-medium tracking-tight text-gray-200 mb-12 italic">
            "{industry.testimonial.quote[lang]}"
          </blockquote>
          <div className="inline-flex items-center gap-5 p-2 pr-6 rounded-full border border-white/10 bg-white/5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5D3FD3] to-[#3AF2CE]" />
            <div className="text-left">
              <p className="font-bold text-lg">{industry.testimonial.author}</p>
              <p className="text-xs text-[#3AF2CE] font-bold uppercase tracking-widest">
                {industry.testimonial.role[lang]} — {industry.name[lang]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ DINÁMICA */}
      <section className="py-32 px-6 font-sans">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4 tracking-tighter">
            <HelpCircle className="text-[#3AF2CE]" size={32} /> FAQ {industry.key.toUpperCase()}
          </h2>
          <div className="space-y-12">
            {industry.faq.map((item, idx) => (
              <div key={idx} className="group">
                <h4 className="text-xl font-bold mb-4 group-hover:text-[#3AF2CE] transition-colors">
                  {item.question[lang]}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {item.answer[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA GLOBAL */}
   <section className="py-40 px-6 font-sans relative">
        <div className="max-w-6xl mx-auto group relative">
          {/* Borde brillante sutil (Glow effect) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#5D3FD3] to-[#3AF2CE] rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-black rounded-[3rem] p-12 md:p-24 text-center overflow-hidden border border-white/10 shadow-2xl">
            
            {/* Degradado de fondo interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5D3FD3]/20 via-black to-black z-0" />
            
            {/* Patrón de Grid y formas geométricas */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay z-0" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#3AF2CE]/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#5D3FD3]/20 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <span className="text-[#3AF2CE] font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                {isEs ? 'Transformación Real' : 'Real Transformation'}
              </span>
              
              <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                {isEs ? 'Lidera tu sector con IA' : 'Lead your industry with AI'}
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button 
                  onClick={handleWhatsApp}
                  className="bg-[#3AF2CE] text-black px-12 py-3 rounded-xl font-bold text-lg flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_30px_rgba(58,242,206,0.3)] transition-all duration-300 group/btn"
                >
                  <MessageCircle size={20} className="fill-current" />
                  {isEs ? 'Contactar un experto' : 'Contact an expert'}
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <p className="mt-8 text-white/40 text-sm font-light italic">
                {isEs 
                  ? 'Respuesta inmediata por nuestro equipo de ingeniería.' 
                  : 'Immediate response by our engineering team.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}