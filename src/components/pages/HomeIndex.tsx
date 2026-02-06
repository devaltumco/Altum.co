"use client";

import dynamic from "next/dynamic";
// Eliminamos la carga pesada de estados globales si no es necesaria
const HeroSection = dynamic(() => import("@/components/Home/HeroSection"), { 
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-[#0a0a0a]" /> // Placeholder inmediato
});

import Solutions from "@/components/Home/Solutions";
import Industries from "@/components/Home/Industries";
import CaseStudies from "@/components/Home/CaseStudies";
import Partners from "@/components/Home/partners";
import ResponsibleAI from "@/components/Home/ResponsibleAI";
import Blog from "@/components/Home/Blog";
import { Careers } from "../Home/Careers";
import { Contact } from "../Home/Contact";

export default function HomeIndex() {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-16 lg:mt-20">
      <HeroSection />
      {/* Renderizado directo para que la carga sea instantánea al cambiar de idioma */}
      <Solutions />
      <Industries />
      <CaseStudies />
      <Partners />
      <ResponsibleAI />
      <Blog />
      <Careers />
      <Contact />
    </div>
  );
}