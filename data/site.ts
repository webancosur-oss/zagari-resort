export const siteConfig = {
  name: "Zagari Resort Club",

  shortName: "Zagari",

  legalName: "MORO CAPITAL S.A.C.",

  description:
    "Zagari Resort Club es un proyecto de lotes en preventa en San Ramón, Selva Central, que integra naturaleza, descanso, inversión y más de 20 amenidades.",

  shortDescription:
    "Lotes en preventa, naturaleza, cabañas y experiencias en San Ramón.",

  slogan:
    "Uniendo vivienda y naturaleza para un mundo mejor",

  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(
      /\/+$/,
      "",
    ) || "https://www.zagariresort.com",

  locale: "es_PE",

  language: "es-PE",

  region: "PE-JUN",

  city: "San Ramón",

  country: "Perú",

  phone: "+51 971 069 763",

  phoneDisplay: "971 069 763",

  whatsapp: "51971069763",

  email: "jefe.experiencia.cliente@ancosur.com",

  address: {
    salesOffice:
      "Av. San Carlos 1481. San Antonio – Huancayo",

    project:
      "San Ramón, Chanchamayo, Junín, Perú",
  },

  social: {
    facebook: "https://www.facebook.com/zagariresortclub",
    instagram: "https://www.instagram.com/zagariresortclub",
    tiktok: "",
    youtube: "",
    twitter: "",
  },

  keywords: [
    "Zagari Resort Club",
    "Zagari San Ramón",
    "Zagari Resort",
    "lotes en San Ramón",
    "lotes en Chanchamayo",
    "lotes en la Selva Central",
    "lotes en preventa San Ramón",
    "terrenos en San Ramón",
    "terrenos en Chanchamayo",
    "resort en San Ramón",
    "resort en la Selva Central",
    "inversión inmobiliaria San Ramón",
    "cabañas en San Ramón",
    "lotes para cabañas",
    "lotes vacacionales",
    "proyecto inmobiliario San Ramón",
    "ANCOSUR",
    "Moro Capital",
  ],
} as const;