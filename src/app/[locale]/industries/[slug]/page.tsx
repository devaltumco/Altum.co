import { industries } from "@/lib/data/industrias";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { CheckCircle2, MessageSquare, HelpCircle, ArrowRight } from "lucide-react";

export default async function IndustryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "es";
  
  // Busca la industria por slug en cualquiera de los dos idiomas
  const industry = industries.find(
    (i) => i.slug.en === slug || i.slug.es === slug
  );

  if (!industry) notFound();

  const isEs = locale === 'es';

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <span className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            {isEs ? 'Soluciones por Industria' : 'Industry Solutions'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            {industry.name[locale]}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {isEs 
              ? `Impulsamos el futuro de ${industry.name.es} mediante implementaciones estratégicas de IA y automatización avanzada.`
              : `Driving the future of ${industry.name.en} through strategic AI implementations and advanced automation.`}
          </p>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">{isEs ? 'Capacidades Clave' : 'Key Capabilities'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-colors group">
                <CheckCircle2 className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Feature {i}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {isEs ? 'Optimización de procesos mediante modelos predictivos personalizados.' : 'Process optimization through custom predictive models.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="w-12 h-12 text-emerald-500/20 mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl font-medium italic text-gray-300 mb-8">
            {isEs 
              ? `"La implementación de Altum IA Design cambió por completo nuestra eficiencia operativa en este sector."`
              : `"Altum IA Design's implementation completely changed our operational efficiency in this sector."`}
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20" />
            <div className="text-left">
              <p className="font-bold">CTO, Leading Corp</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{industry.name[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <HelpCircle className="text-emerald-500" /> FAQ
          </h2>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="pb-6 border-b border-white/10">
                <h4 className="text-lg font-medium mb-2">
                  {isEs ? '¿Cómo se integra esta solución?' : 'How is this solution integrated?'}
                </h4>
                <p className="text-gray-500 text-sm">
                  {isEs 
                    ? 'Nuestra metodología permite una integración fluida con sus sistemas legacy actuales.' 
                    : 'Our methodology allows a seamless integration with your current legacy systems.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              {isEs ? '¿Listo para innovar?' : 'Ready to innovate?'}
            </h2>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-gray-100 transition-all group-hover:scale-105">
              {isEs ? 'Contactar un experto' : 'Contact an expert'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}