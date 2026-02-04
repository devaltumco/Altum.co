import { 
  Building2, 
  ShoppingCart, 
  Factory, 
  HeartPulse, 
  GraduationCap, 
  Plane, 
  Gavel, 
  Banknote,
  Zap,
  Leaf
} from "lucide-react";

export const industriesList = [
  { id: 'finance', nameKey: 'finance', icon: Banknote },
  { id: 'retail', nameKey: 'retail', icon: ShoppingCart },
  { id: 'manufacturing', nameKey: 'manufacturing', icon: Factory },
  { id: 'healthcare', nameKey: 'healthcare', icon: HeartPulse },
  { id: 'education', nameKey: 'education', icon: GraduationCap },
  { id: 'logistics', nameKey: 'logistics', icon: Plane },
  { id: 'legal', nameKey: 'legal', icon: Gavel },
  { id: 'real_estate', nameKey: 'real_estate', icon: Building2 },
  { id: 'energy', nameKey: 'energy', icon: Zap },
  { id: 'agribusiness', nameKey: 'agribusiness', icon: Leaf },
];

export const countriesList = [
  { value: 'canada', labelKey: 'canada' },
  { value: 'mexico', labelKey: 'mexico' },
  { value: 'colombia', labelKey: 'colombia' },
  { value: 'central_america', labelKey: 'central_america' },
  { value: 'latam', labelKey: 'latam' },
];