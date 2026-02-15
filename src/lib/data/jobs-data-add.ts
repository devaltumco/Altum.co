import { 
  Users, 
  Zap, 
  GraduationCap, 
} from "lucide-react";

// --- Beneficios (Cultura) ---
export const benefits = [
  {
    titleKey: "benefits.remote.title",
    descriptionKey: "benefits.remote.description",
    icon: Users,
  },
  {
    titleKey: "benefits.impact.title",
    descriptionKey: "benefits.impact.description",
    icon: Zap,
  },
  {
    titleKey: "benefits.growth.title",
    descriptionKey: "benefits.growth.description",
    icon: GraduationCap,
  }
];

// --- Vacantes Disponibles ---
// ✅ Importante: Cada "id" debe ser diferente para evitar errores en React
export const jobOpenings = [
  {
    id: "job-001", 
    titleKey: "jobs.seniorAi.title",
    descriptionKey: "jobs.seniorAi.description",
    location: "Remote (LATAM)",
    type: "Full-time",
  },
  {
    id: "job-002", 
    titleKey: "jobs.solutionsArchitect.title",
    descriptionKey: "jobs.solutionsArchitect.description",
    location: "Mexico City",
    type: "Full-time",
  }
];