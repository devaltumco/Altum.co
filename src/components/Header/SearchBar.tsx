'use client';

import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { industries, Industry } from "@/lib/data/industrias";

export default function SearchBar() {
  const t = useTranslations("Index");
  const locale = useLocale() as "en" | "es";
  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // --- BLOQUEO DE SCROLL RESPONSIVE (PC & MÓVIL) ---
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isModalOpen) {
      // Bloqueo para PC (evita saltos de layout)
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      
      // Bloqueo para Móvil (fuerza la posición fija)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restaurar para PC
      const scrollY = document.body.style.top;
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      
      // Restaurar para Móvil
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Devolver el scroll a su posición original
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isModalOpen]);

  // Filtrado dinámico basado en el idioma activo de Altum IA Design
  const filteredIndustries = industries.filter((industry) => {
    const nameInLocale = industry.name[locale] || industry.name['en'];
    return nameInLocale.toLowerCase().includes(query.toLowerCase());
  });

  // Manejo de selección con redirección bilingüe corregida
  const handleSelect = (industry: Industry) => {
    setIsModalOpen(false);
    setQuery("");
    
    // Redirección usando el slug específico del idioma actual para URLs amigables
    router.push({
      pathname: '/industries/[slug]',
      params: { slug: industry.slug[locale] }
    });
  };

  // Foco automático al abrir el modal
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Gatillo de búsqueda en el Header (Estilo minimalista) */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="relative w-full max-w-[280px] cursor-pointer group"
      >
        <div className="w-full bg-white/5 border border-gray-700/50 rounded-lg py-1.5 pl-9 pr-4 text-[13px] text-gray-500 group-hover:border-emerald-500/30 transition-colors">
          {t("searchPlaceholder") || (locale === 'es' ? "Buscar industrias..." : "Search industries...")}
        </div>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-hover:text-emerald-500/50 transition-colors" />
      </div>

      {/* MODAL DE BÚSQUEDA CENTRADO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
            {/* Fondo con desenfoque (Backdrop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Contenedor del Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Encabezado del Modal con Input */}
              <div className="flex items-center p-4 border-b border-white/10">
                <Search className="w-5 h-5 text-emerald-500 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={locale === 'es' ? "Escribe para buscar..." : "Type to search..."}
                  className="flex-1 bg-transparent border-none text-lg text-white focus:ring-0 outline-none placeholder:text-gray-600"
                />
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cuerpo del Modal: Resultados */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                <div className="px-3 py-2">
                  <span className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase">
                    {locale === 'es' ? 'Sugerencias de Industrias' : 'Industry Suggestions'}
                  </span>
                </div>

                <div className="space-y-1">
                  {filteredIndustries.length > 0 ? (
                    filteredIndustries.map((industry) => (
                      <button
                        key={industry.id}
                        onClick={() => handleSelect(industry)}
                        className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 group transition-all border border-transparent hover:border-white/5"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                            {industry.name[locale]}
                          </span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                            {industry.slug[locale]}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
                      </button>
                    ))
                  ) : (
                    <div className="p-12 text-center text-gray-600">
                      {locale === 'es' ? 'No se encontraron industrias.' : 'No industries found.'}
                    </div>
                  )}
                </div>
              </div>

              {/* Pie del Modal con Atajos */}
              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-[0.15em]">
                <p>Altum IA Design System</p>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-gray-400">ESC</kbd> 
                    {locale === 'es' ? 'Cerrar' : 'Close'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}