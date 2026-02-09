// src/components/pages/AboutUsIndex.tsx
"use client";

import Herosection from "@/components/AboutUs/Herosection"; // Importación por defecto
import History from "../AboutUs/History";
import MissionVision from "../AboutUs/MissionVision";

export default function PrivacyIndex() {
  return (
      <section className="w-full h-full pt-5">
        <Herosection />
        <History />
        <MissionVision />
      </section>
  );
}