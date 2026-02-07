import { createClient } from 'next-sanity'

export const client = createClient({
  // Si la variable falla, usa el ID directamente como string
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "eddwc2ov",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: '2024-01-01',
  useCdn: true, 
})