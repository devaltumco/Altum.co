"use client";

import HeroSection from "@/components/Home/HeroSection";
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
      <Solutions />

      {/* Solo visible en pantallas grandes (Desktop) */}
      <div className="hidden lg:block">
        <Industries />
      </div>

      {/* Solo visible en pantallas grandes (Desktop) */}
      <div className="hidden lg:block">
        <CaseStudies />
      </div>
      <Partners />
      <ResponsibleAI />
      <Blog />
      <Careers />
      <Contact />
    </div>
  );
}