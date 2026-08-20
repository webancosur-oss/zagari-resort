/*==================================================
  TIPOS
==================================================*/

export type ElementSlug =
  | "aire"
  | "fuego"
  | "tierra"
  | "agua";

export type ElementTheme =
  | "air"
  | "fire"
  | "earth"
  | "water";

export type Amenity = {
  id: string;
  number: string;

  name: string;
  shortName: string;

  description: string;

  image: string;
  imagePosition: string;

  element: ElementSlug;

  featured?: boolean;
};

export type ElementData = {
  slug: ElementSlug;

  number: string;

  name: string;

  eyebrow: string;

  title: string;

  description: string;

  theme: ElementTheme;
};

/*==================================================
  ELEMENTOS
==================================================*/

export const elements:
  Record<
    ElementSlug,
    ElementData
  > = {
  aire: {
    slug: "aire",

    number: "01",

    name: "Aire",

    eyebrow:
      "Libertad y contemplación",

    title:
      "Respira. Contempla. Conecta.",

    description:
      "Espacios abiertos para disfrutar la tranquilidad, el paisaje y la naturaleza de San Ramón.",

    theme: "air",
  },

  fuego: {
    slug: "fuego",

    number: "02",

    name: "Fuego",

    eyebrow:
      "Energía y conexión",

    title:
      "Encuentros que permanecen.",

    description:
      "Experiencias creadas para compartir, hacer una pausa y reconectar con la energía que nos rodea.",

    theme: "fire",
  },

  tierra: {
    slug: "tierra",

    number: "03",

    name: "Tierra",

    eyebrow:
      "Origen y estabilidad",

    title:
      "Un lugar para crear raíces.",

    description:
      "Naturaleza, actividad y espacios que conectan con la esencia de Zagari Resort Club.",

    theme: "earth",
  },

  agua: {
    slug: "agua",

    number: "04",

    name: "Agua",

    eyebrow:
      "Renovación y bienestar",

    title:
      "Fluye hacia una nueva forma de descansar.",

    description:
      "Experiencias de relajación, bienestar y conexión alrededor del agua.",

    theme: "water",
  },
};

/*==================================================
  AMENIDADES

  Clasificación conceptual:
  AIRE   → libertad, altura, contemplación
  FUEGO  → energía, encuentro
  TIERRA → naturaleza, raíces, actividad
  AGUA   → renovación, relajación
==================================================*/

export const amenities:
  Amenity[] = [
  /*================================================
    AIRE
  ================================================*/

  {
    id: "mirador",

    number: "01",

    name:
      "Mirador a San Ramón",

    shortName:
      "Mirador",

    description:
      "Un espacio elevado para contemplar el paisaje y conectar con la naturaleza de San Ramón.",

    image:
      "/assets/amenities/mirador.png",

    imagePosition:
      "center center",

    element:
      "aire",

    featured:
      true,
  },

  // {
  //   id: "yoga",

  //   number: "02",

  //   name:
  //     "Zona de yoga",

  //   shortName:
  //     "Yoga",

  //   description:
  //     "Un espacio abierto para respirar, encontrar equilibrio y disfrutar la tranquilidad del entorno.",

  //   image:
  //     "/assets/amenities/yoga.webp",

  //   imagePosition:
  //     "center center",

  //   element:
  //     "aire",
  // },

  {
    id: "muro-escalable",

    number: "03",

    name:
      "Muro escalable",

    shortName:
      "Muro escalable",

    description:
      "Movimiento, aventura y una experiencia diferente integrada al paisaje natural.",

    image:
      "/assets/amenities/tenis.png",

    imagePosition:
      "center center",

    element:
      "aire",
  },

  {
    id: "camping",

    number: "04",

    name:
      "Camping Zagari",

    shortName:
      "Camping",

    description:
      "Una experiencia al aire libre para vivir la naturaleza durante el día y bajo las estrellas.",

    image:
      "/assets/amenities/camping.png",

    imagePosition:
      "center center",

    element:
      "aire",
  },

  /*================================================
    FUEGO
  ================================================*/

  {
    id: "zona-espiritual",

    number: "01",

    name:
      "Zona espiritual",

    shortName:
      "Zona espiritual",

    description:
      "Un refugio para detenerte, meditar y recargar energías rodeado de naturaleza.",

    image:
      "/assets/amenities/zona-espiritual.png",

    imagePosition:
      "center center",

    element:
      "fuego",

    featured:
      true,
  },

  {
    id: "parrillas",

    number: "02",

    name:
      "Zona de parrillas",

    shortName:
      "Parrillas",

    description:
      "Un espacio pensado para compartir encuentros, sabores y buenos momentos.",

    image:
      "/assets/amenities/camping.png",

    imagePosition:
      "center center",

    element:
      "fuego",
  },

  {
    id: "explanada-eventos",

    number: "03",

    name:
      "Explanada de eventos",

    shortName:
      "Eventos",

    description:
      "Un espacio amplio para celebraciones, encuentros y experiencias especiales.",

    image:
      "/assets/amenities/explanada-eventos.webp",

    imagePosition:
      "center center",

    element:
      "fuego",
  },

  {
    id: "restaurante-bar",

    number: "04",

    name:
      "Restaurante Bar",

    shortName:
      "Resto Bar",

    description:
      "Gastronomía y experiencias sociales integradas al concepto natural de Zagari.",

    image:
      "/assets/amenities/resto-bar.webp",

    imagePosition:
      "center center",

    element:
      "fuego",
  },

  /*================================================
    TIERRA
  ================================================*/

  {
    id: "biohuerto",

    number: "01",

    name:
      "Biohuerto Zagari",

    shortName:
      "Biohuerto",

    description:
      "Un espacio para sembrar, aprender y reconectar con el origen de nuestros alimentos.",

    image:
      "/assets/amenities/biohuerto.webp",

    imagePosition:
      "center center",

    element:
      "tierra",

    featured:
      true,
  },

  {
    id: "zona-instagrameable",

    number: "02",

    name:
      "Diosa de los Elementos",

    shortName:
      "Zona instagrameable",

    description:
      "Un espacio emblemático inspirado en la conexión entre naturaleza y los cuatro elementos.",

    image:
      "/assets/amenities/diosa-elementos.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  {
    id: "cancha-futbol",

    number: "03",

    name:
      "Cancha de fútbol",

    shortName:
      "Fútbol",

    description:
      "Actividad, movimiento y diversión dentro de un entorno rodeado de naturaleza.",

    image:
      "/assets/amenities/futbol-voley.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  {
    id: "voley",

    number: "04",

    name:
      "Cancha de vóley",

    shortName:
      "Vóley",

    description:
      "Un espacio deportivo para compartir y disfrutar al aire libre.",

    image:
      "/assets/amenities/futbol-voley.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  {
    id: "mini-tenis",

    number: "05",

    name:
      "Mini tenis",

    shortName:
      "Mini tenis",

    description:
      "Una alternativa recreativa para mantenerse activo y compartir en familia.",

    image:
      "/assets/amenities/mini-tenis.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  {
    id: "gimnasio",

    number: "06",

    name:
      "Gimnasio equipado",

    shortName:
      "Gimnasio",

    description:
      "Un ambiente equipado para mantenerte activo durante tu experiencia en Zagari.",

    image:
      "/assets/amenities/gimnasio.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  {
    id: "zona-ninos",

    number: "07",

    name:
      "Zona de niños",

    shortName:
      "Niños",

    description:
      "Un espacio recreativo pensado para que los más pequeños también vivan Zagari.",

    image:
      "/assets/amenities/zona-ninos.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  {
    id: "mini-golf",

    number: "08",

    name:
      "Mini golf",

    shortName:
      "Mini golf",

    description:
      "Una experiencia recreativa para disfrutar en familia y con amigos.",

    image:
      "/assets/amenities/mini-golf.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  {
    id: "fronton",

    number: "09",

    name:
      "Frontón",

    shortName:
      "Frontón",

    description:
      "Un espacio deportivo que complementa la propuesta activa del Resort Club.",

    image:
      "/assets/amenities/fronton.webp",

    imagePosition:
      "center center",

    element:
      "tierra",
  },

  /*================================================
    AGUA
  ================================================*/

  {
    id: "piscina-infinita",

    number: "01",

    name:
      "Piscina infinita",

    shortName:
      "Piscina infinita",

    description:
      "Una piscina con borde infinito diseñada para relajarte mientras disfrutas el paisaje.",

    image:
      "/assets/amenities/piscina-infinita.webp",

    imagePosition:
      "center bottom",

    element:
      "agua",

    featured:
      true,
  },

  {
    id: "bar-piscina",

    number: "02",

    name:
      "Bar en la piscina",

    shortName:
      "Bar piscina",

    description:
      "Un espacio social integrado al agua para disfrutar bebidas, descanso y buenos momentos.",

    image:
      "/assets/amenities/bar-piscina.webp",

    imagePosition:
      "center bottom",

    element:
      "agua",
  },

  {
    id: "spa",

    number: "03",

    name:
      "Spa",

    shortName:
      "Spa",

    description:
      "Bienestar y relajación en un espacio diseñado para renovar cuerpo y mente.",

    image:
      "/assets/amenities/spa.webp",

    imagePosition:
      "center center",

    element:
      "agua",
  },
];

/*==================================================
  UTILIDADES
==================================================*/

export const elementSlugs =
  Object.keys(
    elements,
  ) as ElementSlug[];

export function isElementSlug(
  value: string,
): value is ElementSlug {
  return (
    value in
    elements
  );
}

export function getElementAmenities(
  slug: ElementSlug,
) {
  return amenities.filter(
    (amenity) =>
      amenity.element ===
      slug,
  );
}

export function getFeaturedAmenity(
  slug: ElementSlug,
) {
  return amenities.find(
    (amenity) =>
      amenity.element ===
        slug &&
      amenity.featured,
  );
}