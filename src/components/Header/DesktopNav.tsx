'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function DesktopNav({ sticky }: { sticky: boolean }) {
  const t = useTranslations("Index");
  

  // Clase de estilo reutilizable para mantener el diseño slate-200 y hover esmeralda
  const linkStyle = "transition duration-300 text-slate-400 hover:text-emerald-400  text-sm font-medium  tracking-wider";

  return (
    <div className="hidden lg:flex items-center ">
      <motion.nav
        className="flex items-center"
        animate={{ gap: sticky ? "1.0rem" : "1.5rem" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Link 
          href="/" 
          className={linkStyle}
        >
          {t("aboutas")}
        </Link>
        
        <Link 
          href="/" 
          className={linkStyle}
        >
          {t("solutions")}
        </Link>
        
        <Link 
          href="/" 
          className={linkStyle}
        >
          {t("industries")}
        </Link>
        <Link 
          href="/" 
          className={linkStyle}
          >{t("succes")}
        </Link>
         <Link 
          href="/" 
          className={linkStyle}
          >{t("blog")}
        </Link>
         <Link 
          href="/" 
          className={linkStyle}
          >{t("careers")}
        </Link>
        
        
        
      </motion.nav>
      
    </div>
  );
}