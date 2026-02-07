"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useHeaderState, useBodyScrollLock } from "./headerHooks"; 
import DesktopNav from "./DesktopNav"; 
import MobileMenu from "./MobileMenu"; 
import SearchBar from "./SearchBar"; 
import LanguageSwitcher from "../Language/LanguageSwitcher";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { sticky } = useHeaderState();
  
  useBodyScrollLock(navbarOpen);

  return (
    <header className="mn-20 fixed top-0 left-0 z-50 w-full h-14 bg-[#0a0a0a] border-b border-white/10 flex justify-center transition-all duration-300">
      <div className="w-full max-w-[1400px] h-full flex items-center justify-between px-3 lg:px-12 gap-2">
        
        {/* 1. LADO IZQUIERDO: Botón Hamburguesa (Móvil) / Logo (Desktop) */}
        <div className="flex items-center">
          {/* Botón Hamburguesa: Ahora a la izquierda en móvil */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="lg:hidden  text-white "
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-white transition-all ${navbarOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`h-0.5 w-full bg-white ${navbarOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-white transition-all ${navbarOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>

          {/* Logo y Texto: OCULTO EN MÓVIL (hidden), solo visible en Desktop (lg:flex) */}
          <Link className="hidden lg:flex items-center gap-2 shrink-0" href="/">
            <div className="w-[120px] h-[60px] relative">
               <Image src="/logo_altum.svg"
                alt="Icon" 
                fill className="object-contain" 
                 priority
 />
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden lg:block ml-10">
            <DesktopNav sticky={sticky} />
          </nav>
        </div>

        {/* 2. CENTRO: Buscador (Ocupa el espacio central en móvil) */}
        <div className="flex-1 flex md:justify-end max-w-[280px] lg:max-w-lg">
          <SearchBar />
        </div>

        {/* 3. LADO DERECHO: Idioma */}
        <div className="flex items-center  lg:max-w-lg">
          <LanguageSwitcher />
        </div>

        {/* Menú Móvil */}
        <AnimatePresence>
          {navbarOpen && (
            <MobileMenu closeMenu={() => setNavbarOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}