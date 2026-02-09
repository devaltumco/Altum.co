export interface Translation {
  en: string;
  es: string;
}

export interface IndustryFeature {
  title: Translation;
  description: Translation;
}

export interface Industry {
  id: number;
  key: string;
  slug: Translation;
  name: Translation;
  heroTitle: Translation;
  description: Translation;
  seoTitle: Translation;
  seoDescription: Translation;
  features: IndustryFeature[];
  faq: { question: Translation; answer: Translation }[];
  testimonial: { quote: Translation; author: string; role: Translation };
}

export const industries: Industry[] = [
  { 
    id: 1, 
    key: "finance",
    slug: { en: "fintech-banking", es: "finanzas-y-banca" }, 
    name: { en: "Fintech & Banking", es: "Finanzas y Banca" },
    heroTitle: {
      es: "Inteligencia Financiera para la Era Digital",
      en: "Financial Intelligence for the Digital Age"
    },
    seoTitle: {
      es: "IA para Finanzas y Banca | Implementación Estratégica | Altumia",
      en: "AI for Fintech & Banking | Strategic Implementation | Altumia"
    },
    seoDescription: {
      es: "Optimizamos operaciones bancarias mediante modelos predictivos de riesgo y detección de fraude con IA avanzada.",
      en: "We optimize banking operations through predictive risk models and fraud detection with advanced AI."
    },
    description: {
      es: "Impulsamos el sector financiero mediante modelos de Machine Learning que optimizan la toma de decisiones y la seguridad transaccional.",
      en: "We drive the financial sector through Machine Learning models that optimize decision-making and transactional security."
    },
    features: [
      {
        title: { es: "Detección de Fraude", en: "Fraud Detection" },
        description: { es: "Algoritmos que identifican anomalías en milisegundos.", en: "Algorithms identifying anomalies in milliseconds." }
      },
      {
        title: { es: "Análisis de Riesgo", en: "Risk Analytics" },
        description: { es: "Modelos predictivos para scoring crediticio avanzado.", en: "Predictive models for advanced credit scoring." },
      },
      {
        title: { es: "Automatización de Cumplimiento", en: "Compliance Automation" },
        description: { es: "IA para monitoreo regulatorio y reportes automáticos.", en: "AI for regulatory monitoring and automated reporting." },
      }
    ],
    faq: [
      {
        question: { es: "¿Cómo garantizan la seguridad de los datos?", en: "How do you guarantee data security?" },
        answer: { es: "Implementamos cifrado de grado militar y cumplimos con estándares PCI-DSS.", en: "We implement military-grade encryption and comply with PCI-DSS standards." }
      }
    ],
    testimonial: {
      quote: { 
        es: "Altumia transformó nuestra gestión de activos con una precisión asombrosa.", 
        en: "Altumia transformed our asset management with astonishing precision." 
      },
      author: "David Chen",
      role: { es: "Director de Innovación", en: "Head of Innovation" }
    }
  },
  { 
    id: 2, 
    key: "healthcare",
    slug: { en: "healthcare-medical", es: "salud-y-medicina" }, 
    name: { en: "Healthcare & Medical", es: "Salud y Medicina" },
    heroTitle: {
      es: "Inteligencia Artificial para una Salud más Precisa y Personalizada",
      en: "Artificial Intelligence for More Precise and Personalized Healthcare"
    },
    seoTitle: {
      es: "IA para el Sector Salud | Diagnóstico Asistido | Altumia",
      en: "AI for Healthcare Sector | Assisted Diagnosis | Altumia"
    },
    seoDescription: {
      es: "Implementamos soluciones de IA para diagnóstico médico asistido, investigación clínica y gestión hospitalaria optimizada.",
      en: "We implement AI solutions for assisted medical diagnosis, clinical research, and optimized hospital management."
    },
    description: {
      es: "Revolucionamos el sector salud con algoritmos de visión computacional para diagnóstico temprano y sistemas predictivos de gestión hospitalaria.",
      en: "We revolutionize the healthcare sector with computer vision algorithms for early diagnosis and predictive hospital management systems."
    },
    features: [
      {
        title: { es: "Diagnóstico por Imágenes", en: "Medical Imaging Diagnosis" },
        description: { es: "IA que detecta anomalías en radiografías, TACs y resonancias magnéticas.", en: "AI that detects anomalies in X-rays, CT scans, and MRIs." }
      },
      {
        title: { es: "Investigación Clínica", en: "Clinical Research" },
        description: { es: "Análisis de datos masivos para acelerar el descubrimiento de fármacos.", en: "Big data analysis to accelerate drug discovery." },
      },
      {
        title: { es: "Gestión Hospitalaria Inteligente", en: "Smart Hospital Management" },
        description: { es: "Optimización de recursos y predicción de demanda de pacientes.", en: "Resource optimization and patient demand prediction." },
      }
    ],
    faq: [
      {
        question: { es: "¿Cómo se aseguran de que los diagnósticos sean precisos?", en: "How do you ensure the diagnoses are accurate?" },
        answer: { es: "Nuestros modelos son validados con conjuntos de datos certificados y supervisados por médicos especialistas.", en: "Our models are validated with certified datasets and supervised by medical specialists." }
      }
    ],
    testimonial: {
      quote: { 
        es: "Su sistema de diagnóstico asistido redujo los falsos negativos en un 40% en nuestra clínica.", 
        en: "Their assisted diagnosis system reduced false negatives by 40% in our clinic." 
      },
      author: "Dra. María González",
      role: { es: "Jefa de Radiología", en: "Head of Radiology" }
    }
  },
  { 
    id: 3, 
    key: "retail",
    slug: { en: "retail-ecommerce", es: "retail-y-ecommerce" }, 
    name: { en: "Retail & E-commerce", es: "Retail y E-commerce" },
    heroTitle: {
      es: "Transformando la Experiencia del Consumidor con IA Predictiva",
      en: "Transforming Consumer Experience with Predictive AI"
    },
    seoTitle: {
      es: "IA para Retail y E-commerce | Personalización y Optimización | Altumia",
      en: "AI for Retail & E-commerce | Personalization and Optimization | Altumia"
    },
    seoDescription: {
      es: "Potenciamos ventas mediante recomendaciones hiper-personalizadas, gestión inteligente de inventario y análisis de comportamiento del cliente.",
      en: "We boost sales through hyper-personalized recommendations, smart inventory management, and customer behavior analysis."
    },
    description: {
      es: "Reinventamos el comercio minorista con sistemas de recomendación avanzados y modelos predictivos de demanda que maximizan la conversión.",
      en: "We reinvent retail with advanced recommendation systems and demand prediction models that maximize conversion."
    },
    features: [
      {
        title: { es: "Recomendaciones Personalizadas", en: "Personalized Recommendations" },
        description: { es: "Algoritmos que aumentan el ticket promedio en un 35%.", en: "Algorithms that increase average ticket by 35%." }
      },
      {
        title: { es: "Gestión Predictiva de Inventario", en: "Predictive Inventory Management" },
        description: { es: "Anticipa la demanda y reduce el stock muerto hasta en un 60%.", en: "Anticipates demand and reduces dead stock by up to 60%." },
      },
      {
        title: { es: "Análisis de Sentimiento", en: "Sentiment Analysis" },
        description: { es: "Procesamiento de reseñas y comentarios para mejorar productos.", en: "Processing of reviews and comments to improve products." },
      }
    ],
    faq: [
      {
        question: { es: "¿Funciona en tiendas físicas y online?", en: "Does it work for both physical and online stores?" },
        answer: { es: "Sí, nuestros sistemas integran datos omnicanal para una visión unificada del cliente.", en: "Yes, our systems integrate omnichannel data for a unified customer view." }
      }
    ],
    testimonial: {
      quote: { 
        es: "La IA de Altumia incrementó nuestras ventas cruzadas en un 28% el primer trimestre.", 
        en: "Altumia's AI increased our cross-selling by 28% in the first quarter." 
      },
      author: "Roberto Fernández",
      role: { es: "Director de E-commerce", en: "E-commerce Director" }
    }
  },
  { 
    id: 4, 
    key: "manufacturing",
    slug: { en: "manufacturing-industry", es: "manufactura-industrial" }, 
    name: { en: "Manufacturing & Industry", es: "Manufactura Industrial" },
    heroTitle: {
      es: "Producción Inteligente para la Industria 4.0",
      en: "Smart Production for Industry 4.0"
    },
    seoTitle: {
      es: "IA para Manufactura Industrial | Mantenimiento Predictivo | Altumia",
      en: "AI for Industrial Manufacturing | Predictive Maintenance | Altumia"
    },
    seoDescription: {
      es: "Implementamos mantenimiento predictivo, control de calidad automatizado y optimización de cadenas de suministro con IA.",
      en: "We implement predictive maintenance, automated quality control, and supply chain optimization with AI."
    },
    description: {
      es: "Automatizamos y optimizamos procesos industriales mediante visión artificial, IoT y modelos predictivos que reducen el tiempo de inactividad.",
      en: "We automate and optimize industrial processes through computer vision, IoT, and predictive models that reduce downtime."
    },
    features: [
      {
        title: { es: "Mantenimiento Predictivo", en: "Predictive Maintenance" },
        description: { es: "Anticipa fallos en maquinaria reduciendo paradas no planificadas.", en: "Anticipates machinery failures reducing unplanned stops." }
      },
      {
        title: { es: "Control de Calidad con Visión Artificial", en: "Quality Control with Computer Vision" },
        description: { es: "Detección de defectos en tiempo real con precisión del 99.7%.", en: "Real-time defect detection with 99.7% accuracy." },
      },
      {
        title: { es: "Optimización de Supply Chain", en: "Supply Chain Optimization" },
        description: { es: "Algoritmos que minimizan costos logísticos y tiempos de entrega.", en: "Algorithms that minimize logistic costs and delivery times." },
      }
    ],
    faq: [
      {
        question: { es: "¿Requiere cambiar toda nuestra infraestructura actual?", en: "Does it require changing all our current infrastructure?" },
        answer: { es: "No, nos integramos con sistemas existentes mediante APIs y adaptadores personalizados.", en: "No, we integrate with existing systems through APIs and custom adapters." }
      }
    ],
    testimonial: {
      quote: { 
        es: "Redujimos el tiempo de inactividad de nuestra planta en un 45% gracias a su mantenimiento predictivo.", 
        en: "We reduced our plant downtime by 45% thanks to their predictive maintenance." 
      },
      author: "Ing. Klaus Weber",
      role: { es: "Director de Operaciones", en: "Operations Director" }
    }
  },
  { 
    id: 5, 
    key: "logistics",
    slug: { en: "logistics-transportation", es: "logistica-transporte" }, 
    name: { en: "Logistics & Transportation", es: "Logística y Transporte" },
    heroTitle: {
      es: "Optimización Inteligente de la Cadena de Suministro",
      en: "Smart Supply Chain Optimization"
    },
    seoTitle: {
      es: "IA para Logística y Transporte | Ruteo Inteligente | Altumia",
      en: "AI for Logistics & Transportation | Smart Routing | Altumia"
    },
    seoDescription: {
      es: "Optimizamos rutas de entrega, gestión de flotas y predicción de demanda logística con algoritmos de IA avanzada.",
      en: "We optimize delivery routes, fleet management, and logistics demand prediction with advanced AI algorithms."
    },
    description: {
      es: "Revolucionamos la logística con algoritmos de ruteo dinámico, gestión predictiva de flotas y automatización de almacenes.",
      en: "We revolutionize logistics with dynamic routing algorithms, predictive fleet management, and warehouse automation."
    },
    features: [
      {
        title: { es: "Ruteo Inteligente", en: "Smart Routing" },
        description: { es: "Algoritmos que consideran tráfico, clima y restricciones en tiempo real.", en: "Algorithms that consider traffic, weather, and restrictions in real-time." }
      },
      {
        title: { es: "Gestión Predictiva de Flotas", en: "Predictive Fleet Management" },
        description: { es: "Optimiza el uso de vehículos y predice necesidades de mantenimiento.", en: "Optimizes vehicle usage and predicts maintenance needs." },
      },
      {
        title: { es: "Automatización de Almacenes", en: "Warehouse Automation" },
        description: { es: "Robots autónomos y sistemas de picking optimizados con IA.", en: "Autonomous robots and picking systems optimized with AI." },
      }
    ],
    faq: [
      {
        question: { es: "¿Cómo manejan los imprevistos en las rutas?", en: "How do you handle unforeseen events in routes?" },
        answer: { es: "Nuestros sistemas se reajustan automáticamente ante accidentes, clima o cambios de última hora.", en: "Our systems automatically readjust to accidents, weather, or last-minute changes." }
      }
    ],
    testimonial: {
      quote: { 
        es: "Redujimos nuestros costos de combustible en un 22% y mejoramos la puntualidad de entregas.", 
        en: "We reduced our fuel costs by 22% and improved delivery punctuality." 
      },
      author: "Carlos Mendoza",
      role: { es: "Director Logístico", en: "Logistics Director" }
    }
  },
  { 
    id: 6, 
    key: "energy",
    slug: { en: "energy-utilities", es: "energia-y-utilidades" }, 
    name: { en: "Energy & Utilities", es: "Energía y Utilidades" },
    heroTitle: {
      es: "Gestión Inteligente de Recursos Energéticos",
      en: "Smart Energy Resource Management"
    },
    seoTitle: {
      es: "IA para el Sector Energético | Redes Inteligentes | Altumia",
      en: "AI for Energy Sector | Smart Grids | Altumia"
    },
    seoDescription: {
      es: "Implementamos soluciones de IA para optimización de redes eléctricas, predicción de consumo y mantenimiento de infraestructura crítica.",
      en: "We implement AI solutions for electrical grid optimization, consumption prediction, and critical infrastructure maintenance."
    },
    description: {
      es: "Optimizamos la generación, distribución y consumo de energía mediante redes neuronales y sistemas predictivos para una gestión sostenible.",
      en: "We optimize energy generation, distribution, and consumption through neural networks and predictive systems for sustainable management."
    },
    features: [
      {
        title: { es: "Gestión de Redes Inteligentes", en: "Smart Grid Management" },
        description: { es: "Balancea oferta y demanda en tiempo real para estabilidad de la red.", en: "Balances supply and demand in real-time for grid stability." }
      },
      {
        title: { es: "Predicción de Consumo", en: "Consumption Forecasting" },
        description: { es: "Modelos que anticipan picos de demanda con días de antelación.", en: "Models that anticipate demand peaks days in advance." },
      },
      {
        title: { es: "Mantenimiento de Infraestructura", en: "Infrastructure Maintenance" },
        description: { es: "Drones con IA que inspeccionan líneas de transmisión y subestaciones.", en: "AI-powered drones that inspect transmission lines and substations." },
      }
    ],
    faq: [
      {
        question: { es: "¿Son compatibles con energías renovables?", en: "Are they compatible with renewable energies?" },
        answer: { es: "Sí, optimizamos la integración de fuentes solar, eólica y otras renovables en la red.", en: "Yes, we optimize the integration of solar, wind, and other renewable sources into the grid." }
      }
    ],
    testimonial: {
      quote: { 
        es: "La solución de Altumia mejoró la eficiencia de nuestra red en un 18% y redujo pérdidas técnicas.", 
        en: "Altumia's solution improved our grid efficiency by 18% and reduced technical losses." 
      },
      author: "Sara Johnson",
      role: { es: "Directora de Operaciones", en: "Operations Director" }
    }
  },
  { 
    id: 7, 
    key: "insurance",
    slug: { en: "insurance", es: "seguros" }, 
    name: { en: "Insurance", es: "Seguros" },
    heroTitle: {
      es: "Seguros Personalizados y Procesos Automatizados con IA",
      en: "Personalized Insurance and Automated Processes with AI"
    },
    seoTitle: {
      es: "IA para la Industria de Seguros | Underwriting Automatizado | Altumia",
      en: "AI for Insurance Industry | Automated Underwriting | Altumia"
    },
    seoDescription: {
      es: "Automatizamos procesos de underwriting, detección de fraude en reclamaciones y personalización de pólizas mediante inteligencia artificial.",
      en: "We automate underwriting processes, fraud detection in claims, and policy personalization through artificial intelligence."
    },
    description: {
      es: "Transformamos la industria aseguradora con modelos de riesgo avanzados, automatización de reclamaciones y productos personalizados basados en data.",
      en: "We transform the insurance industry with advanced risk models, claims automation, and data-driven personalized products."
    },
    features: [
      {
        title: { es: "Underwriting Automatizado", en: "Automated Underwriting" },
        description: { es: "Evalúa riesgos en segundos con precisión superior al humano.", en: "Assesses risks in seconds with accuracy superior to humans." }
      },
      {
        title: { es: "Detección de Fraude en Reclamaciones", en: "Claims Fraud Detection" },
        description: { es: "Identifica patrones sospechosos en reclamaciones de seguros.", en: "Identifies suspicious patterns in insurance claims." },
      },
      {
        title: { es: "Seguros Personalizados", en: "Personalized Insurance" },
        description: { es: "Pólizas adaptadas al comportamiento y perfil de riesgo individual.", en: "Policies tailored to individual behavior and risk profile." },
      }
    ],
    faq: [
      {
        question: { es: "¿Cómo afecta esto a las primas de los clientes?", en: "How does this affect customer premiums?" },
        answer: { es: "Permite primas más justas y competitivas basadas en riesgo real, no en promedios.", en: "It allows fairer and more competitive premiums based on real risk, not averages." }
      }
    ],
    testimonial: {
      quote: { 
        es: "Redujimos el tiempo de procesamiento de pólizas de 5 días a 2 horas con su IA.", 
        en: "We reduced policy processing time from 5 days to 2 hours with their AI." 
      },
      author: "James Wilson",
      role: { es: "CEO de Seguros", en: "Insurance CEO" }
    }
  }
];