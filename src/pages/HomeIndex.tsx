"use client";

import dynamic from "next/dist/shared/lib/dynamic";
import { useEffect } from "react";

// Carga dinámica del Hero para mejorar el LCP (Largest Contentful Paint)
const HeroSection = dynamic(() => import("@/components/Home/HeroSection"));

import Solutions from "@/components/Home/Solutions";
import Industries from "@/components/Home/Industries";
import CaseStudies from "@/components/Home/CaseStudies";
import Partners from "@/components/Home/partners";
import ResponsibleAI from "@/components/Home/ResponsibleAI";
import Blog from "@/components/Home/Blog";

export default function HomeIndex() {
  useEffect(() => {
    // Asegura que el usuario inicie en la parte superior
    // Usamos 'instant' para evitar saltos visuales raros durante la hidratación
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    // CAMBIO CLAVE: Usamos 'div' o 'main' en lugar de 'section' para evitar
    // anidamiento excesivo de etiquetas semánticas (section > section)
    <div className="w-full max-w-[1400px] mx-auto mt-16 lg:mt-20">
      <HeroSection />
      <Solutions />
      <Industries />
      <CaseStudies />
      <Partners />
      <ResponsibleAI />
      <Blog />
    </div>
  );
}