"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  // URLs de las redes sociales de Altum 
  const socialLinks = {
    linkedin: "https://linkedin.com/company/altum-ia",
    twitter: "https://twitter.com/altumia",
    instagram: "https://instagram.com/altumia.design"
  };

  // Mapeo de claves de traducción a rutas reales
  const navLinks = [
    { key: "about", href: "/about-us" },
    { key: "solutions", href: "/solutions" },
    { key: "industries", href: "/industries-altumia" },
    { key: "cases", href: "/success-stories" }, // Ajustado a tu ruta success-stories
    { key: "blog", href: "/blog" },
    { key: "careers", href: "/careers" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-slate-200 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto py-16 px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Columna 1: Logo y Redes Sociales con Colores Corporativos */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-[120px] h-[60px] relative">
                <Image 
                  src="/logo_altum.svg"
                  alt="Altum IA Design Logo" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">
              {t("tagline")}
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-8 w-full">
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 text-slate-400 hover:text-altum-violeta transition-all duration-300 transform hover:scale-110" />
                </Link>
                <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5 text-slate-400 hover:text-altum-aqua transition-all duration-300 transform hover:scale-110" />
                </Link>
                <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 text-slate-400 hover:text-altum-violeta transition-all duration-300 transform hover:scale-110" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Columna 2: Enlaces Rápidos con rutas reales */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-6 border-l-2 border-altum-aqua pl-3">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-altum-aqua transition-colors">
                    {t(`quickLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Oficinas con Acento Violeta */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-6 border-l-2 border-altum-violeta pl-3">
              {t("offices.title")}
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><span className="text-white font-semibold">Toronto:</span> {t("offices.toronto")}</li>
              <li><span className="text-white font-semibold">México:</span> {t("offices.mexico")}</li>
              <li><span className="text-white font-semibold pb-0.5">Bogotá:</span> {t("offices.bogota")}</li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-6 border-l-2 border-altum-gris pl-3">
              {t("contact.title")}
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="mailto:service@altumia.co" className="hover:text-altum-aqua transition-colors">
                   service@altumia.co 
                </a>
              </li>
         
              <li className="hover:text-altum-violeta transition-colors">Bogotá: +57 320 7408391</li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom con detalles sutiles en Gris Corporativo */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center">
          <p className="text-[10px] text-slate-500 tracking-[0.2em] uppercase mb-4">
            AltumIA Design System
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AltumIA Inc. {t("copyright")}
          </p>
          <div className="mt-4 flex gap-6 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-altum-aqua transition-colors">{t("privacy")}</Link>
            <span className="text-white/10">|</span>
            <Link href="/terms-and-conditions" className="hover:text-altum-aqua transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}