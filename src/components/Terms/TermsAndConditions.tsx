"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TermsAndConditions() {
  const t = useTranslations("TermsOfService");
  const [activeSection, setActiveSection] = useState("1");

  const sectionsKeys = Array.from({ length: 18 }, (_, i) => (i + 1).toString());

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#0a0a0a] min-h-screen pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
            {/* Evitamos error si el título no existe */}
            {t.has("sections.1.title") ? t("sections.1.title") : "Política de Privacidad"}
          </h1>
          <p className="text-altum-aqua font-medium tracking-widest uppercase text-sm">
            {t.has("lastUpdate") ? t("lastUpdate") : ""}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          <aside className="lg:w-1/4 hidden lg:block">
            <nav className="sticky top-32 space-y-2 border-l border-white/10 ml-2">
              {sectionsKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`block w-full text-left pl-6 py-2 text-sm transition-all duration-300 border-l-2 -ml-[2px] ${
                    activeSection === key
                      ? "border-altum-violeta text-white font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-300 hover:border-white/20"
                  }`}
                >
                  {t.has(`sections.${key}.title`) ? t(`sections.${key}.title`) : key}
                </button>
              ))}
            </nav>
          </aside>

          <div className="lg:w-3/4 max-w-3xl">
            {sectionsKeys.map((key) => (
              <motion.div
                key={key}
                id={`section-${key}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                onViewportEnter={() => setActiveSection(key)}
                className="mb-16 scroll-mt-32"
              >
                {t.has(`sections.${key}.title`) && (
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="h-px w-8 bg-altum-violeta/50"></span>
                    {t(`sections.${key}.title`)}
                  </h2>
                )}

                <div className="space-y-4 text-gray-400 leading-relaxed font-light">
                  
                  {/* CONTENIDO PRINCIPAL */}
                  {t.has(`sections.${key}.content`) && (
                    t(`sections.${key}.content`).split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))
                  )}

                  {/* LISTAS (ITEMS) - Solo si t.has es true */}
                  {t.has(`sections.${key}.items`) && (
                    <ul className="grid gap-4 mt-6">
                      {t.raw(`sections.${key}.items`).map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-altum-aqua shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* SUBSECCIONES - Solo si t.has es true */}
                  {t.has(`sections.${key}.subsections`) && (
                    <div className="grid gap-8 mt-8">
                      {Object.keys(t.raw(`sections.${key}.subsections`)).map((subKey) => (
                        <div key={subKey} className="border-l border-altum-violeta/30 pl-6">
                          {t.has(`sections.${key}.subsections.${subKey}.title`) && (
                            <h3 className="text-lg font-semibold text-white mb-3">
                              {t(`sections.${key}.subsections.${subKey}.title`)}
                            </h3>
                          )}
                          
                          {t.has(`sections.${key}.subsections.${subKey}.content`) && (
                            <p className="text-sm mb-4 text-gray-400">
                              {t(`sections.${key}.subsections.${subKey}.content`)}
                            </p>
                          )}

                          {t.has(`sections.${key}.subsections.${subKey}.items`) && (
                            <ul className="flex flex-wrap gap-2">
                              {t.raw(`sections.${key}.subsections.${subKey}.items`).map((item: string, i: number) => (
                                <li key={i} className="text-xs bg-white/5 px-3 py-1.5 rounded-md border border-white/10 text-gray-300">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-altum-violeta/10 to-transparent border border-altum-violeta/20 italic text-gray-300 text-center">
              <p>{t.has("acceptance") ? t("acceptance") : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}