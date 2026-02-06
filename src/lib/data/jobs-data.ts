import { 
  Users, 
  Zap, 
  GraduationCap, 
  Search, 
  Code, 
  Database 
} from "lucide-react";

// --- Beneficios (Cultura) ---
export const benefits = [
  {
    titleKey: "benefits.remote.title",
    descriptionKey: "benefits.remote.description",
    icon: Users, // Icono para Remote Culture
  },
  {
    titleKey: "benefits.impact.title",
    descriptionKey: "benefits.impact.description",
    icon: Zap, // Icono para Positive Impact
  },
  {
    titleKey: "benefits.growth.title",
    descriptionKey: "benefits.growth.description",
    icon: GraduationCap, // Icono para Continuous Growth
  }
];

// --- Vacantes Disponibles ---
export const jobOpenings = [
  {
    titleKey: "jobs.seniorAi.title",
    descriptionKey: "jobs.seniorAi.description",
    location: "Remote (LATAM)",
    type: "Full-time",
  },
  {
    titleKey: "jobs.solutionsArchitect.title",
    descriptionKey: "jobs.solutionsArchitect.description",
    location: "Mexico City",
    type: "Full-time",
  }
];