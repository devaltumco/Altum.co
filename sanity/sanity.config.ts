import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { table } from '@sanity/table'; // 👈 1. Importamos el plugin de tablas
import { schemaTypes } from "./schemas";

// 👇 2. SEGURIDAD: Leemos SOLO de las variables de entorno.
// El signo "!" al final le dice a TypeScript: "Confía en mí, esto existe en el .env".
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Verificación de seguridad: Si no lee el .env, avisa en la consola en lugar de usar datos falsos.
if (!projectId || !dataset) {
  throw new Error(
    "❌ Error Crítico: No se encontraron las variables de entorno de Sanity. Revisa tu archivo .env.local"
  );
}

export default defineConfig({
  basePath: "/admin",
  name: "Altumai",
  
  title: "Altumia CMS",
  projectId,
  dataset,
  apiVersion, 
  plugins: [
    deskTool(),
    table(), // 👈 3. Activamos las tablas aquí
  ],
  schema: {
    types: schemaTypes,
  },
});