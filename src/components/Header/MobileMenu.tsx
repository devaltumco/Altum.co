'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Instagram, Linkedin, Twitter, X } from "lucide-react";
import Link from 'next/link';

interface MobileMenuProps {
  closeMenu: () => void;
}

const menuVariants: Variants = {
  hidden: { x: '-100%' },
  visible: { 
    x: 0, 
    transition: { type: "spring", damping: 25, stiffness: 200 } 
  },
  exit: { 
    x: '-100%', 
    transition: { ease: "easeInOut", duration: 0.3 } 
  }
};
const socialLinks = {
    linkedin: "https://linkedin.com/company/altum-ia",
    twitter: "https://twitter.com/altumia",
    instagram: "https://instagram.com/altumia.design"
  };
export default function MobileMenu({ closeMenu }: MobileMenuProps) {
  // Utilizamos la misma base "Index" que manejas en el escritorio
  const t = useTranslations("Index");
  const router = useRouter();

  const handleNavigation = (path: string) => {
    closeMenu();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-[60] flex lg:hidden">
      {/* Overlay translúcido para cerrar al hacer clic fuera */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeMenu}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Contenido del Menú */}
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-[85%] max-w-sm h-full bg-[#0a0a0a] flex flex-col p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            {/* Contenedor del Logo */}
            <div className="w-[140px] h-[50px] relative">
              {/* CORRECCIÓN: Se agrega "/" al inicio de la ruta del src */}
              <Image 
                src="/logo_altum.svg" 
                alt="Altum IA Design Logo" 
                fill 
                priority
                className="object-contain object-left" 
              />
            </div>
          </div>
          <button onClick={closeMenu} className="text-white/70 hover:text-white">
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {/* Mapeamos las llaves exactas que usas en DesktopNav: home, services, about, contact */}
          {['aboutas', 'solutions', 'industries', 'succes', 'blog','careers'].map((key, index) => (
            <button
              key={`${key}-${index}`}
              onClick={() => handleNavigation(key === 'home' ? '/' : `/${key}`)}
              className="w-full text-left py-4 px-2 text-xl font-medium text-slate-300 hover:text-emerald-400 border-b border-white/5 transition-colors"
            >
              {/* Esta llamada utiliza tus archivos layout.json de messages */}
              {t(key)}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-6">
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

          <p className="text-slate-500 text-sm">© 2026 Altum IA Design</p>
        </div>
      </motion.div>
    </div>
  );
}