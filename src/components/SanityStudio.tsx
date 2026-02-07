'use client';

import { NextStudio } from 'next-sanity/studio';
// Importamos la configuración subiendo dos niveles (../../) para salir de src y entrar a sanity
import config from '../../sanity/sanity.config'; 

export default function SanityStudio() {
  return <NextStudio config={config} />;
}