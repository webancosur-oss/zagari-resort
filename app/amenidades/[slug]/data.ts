/* =========================================================
   TIPOS
========================================================= */

export type ElementSlug =
  | "agua"
  | "aire"
  | "fuego"
  | "tierra";

export type ElementTheme =
  | "water"
  | "air"
  | "fire"
  | "earth";

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

/* =========================================================
   ELEMENTOS
========================================================= */

export const elements: Record<
  ElementSlug,
  ElementData
> = {
  agua: {
    slug: "agua",
    number: "01",
    name: "Agua",
    eyebrow: "Renovación y descanso",
    title: "Fluye. Descansa. Renueva.",
    description:
      "Espacios donde el agua acompaña el descanso, la contemplación y los momentos para disfrutar sin prisa.",
    theme: "water",
  },

  aire: {
    slug: "aire",
    number: "02",
    name: "Aire",
    eyebrow: "Libertad y contemplación",
    title: "Respira. Contempla. Conecta.",
    description:
      "Espacios abiertos para contemplar el paisaje, respirar con calma y conectar con la amplitud natural de San Ramón.",
    theme: "air",
  },

  fuego: {
    slug: "fuego",
    number: "03",
    name: "Fuego",
    eyebrow: "Energía y conexión",
    title: "Momentos para conectar.",
    description:
      "Experiencias para compartir, desconectarse de la rutina y vivir Zagari desde una perspectiva diferente.",
    theme: "fire",
  },

  tierra: {
    slug: "tierra",
    number: "04",
    name: "Tierra",
    eyebrow: "Origen y naturaleza",
    title: "Conecta con lo natural.",
    description:
      "Gastronomía, deporte, cultivos y espacios integrados al paisaje que conectan la experiencia con la tierra.",
    theme: "earth",
  },
};

/* =========================================================
   AMENIDADES

   IMPORTANTE:
   - Solo existen las imágenes listadas aquí.
   - Todas son .webp.
   - Cada imagen aparece una sola vez.
   - El elemento corresponde al prefijo del archivo.
========================================================= */

export const amenities: Amenity[] = [
  /* =======================================================
     AGUA
  ======================================================= */

  {
    id: "bar-piscina",
    number: "01",
    name: "Bar piscina",
    shortName: "Bar piscina",
    description:
      "Un espacio junto al agua para disfrutar bebidas, descanso y momentos de encuentro dentro del resort.",
    image:
      "/assets/amenities/element-agua-bar-piscina.webp",
    imagePosition: "center center",
    element: "agua",
  },

  {
    id: "lago",
    number: "02",
    name: "Lago",
    shortName: "Lago",
    description:
      "Un espacio integrado al paisaje para contemplar, relajarse y conectar con la tranquilidad de la naturaleza.",
    image:
      "/assets/amenities/element-agua-lago.webp",
    imagePosition: "center center",
    element: "agua",
  },

  {
    id: "piscina-borde-infinito",
    number: "03",
    name: "Piscina de borde infinito",
    shortName: "Piscina",
    description:
      "Una piscina diseñada para descansar mientras el agua y el paisaje se integran en una misma experiencia.",
    image:
      "/assets/amenities/element-agua-piscina-borde-infinito.webp",
    imagePosition: "center center",
    element: "agua",
    featured: true,
  },

  /* =======================================================
     AIRE
  ======================================================= */

  {
    id: "domo",
    number: "01",
    name: "Domo",
    shortName: "Domo",
    description:
      "Un espacio abierto a la contemplación para disfrutar el entorno y la tranquilidad de Zagari.",
    image:
      "/assets/amenities/element-aire-domo.webp",
    imagePosition: "center center",
    element: "aire",
  },

  {
    id: "mirador",
    number: "02",
    name: "Mirador",
    shortName: "Mirador",
    description:
      "Un punto privilegiado para contemplar el paisaje de San Ramón y la inmensidad de la Selva Central.",
    image:
      "/assets/amenities/element-aire-mirador.webp",
    imagePosition: "center center",
    element: "aire",
    featured: true,
  },

  /* =======================================================
     FUEGO
  ======================================================= */

  {
    id: "camping",
    number: "01",
    name: "Camping",
    shortName: "Camping",
    description:
      "Una experiencia al aire libre para compartir, descansar y disfrutar la naturaleza desde otra perspectiva.",
    image:
      "/assets/amenities/element-fuego-camping.webp",
    imagePosition: "center center",
    element: "fuego",
    featured: true,
  },

  {
    id: "zona-espiritual",
    number: "02",
    name: "Zona espiritual",
    shortName: "Zona espiritual",
    description:
      "Un espacio pensado para hacer una pausa, encontrar calma y reconectar con lo esencial.",
    image:
      "/assets/amenities/element-fuego-zona-espiritual.webp",
    imagePosition: "center center",
    element: "fuego",
  },

  /* =======================================================
     TIERRA
  ======================================================= */

  {
    id: "bar-restaurante",
    number: "01",
    name: "Bar restaurante",
    shortName: "Bar restaurante",
    description:
      "Un espacio gastronómico y social para compartir bebidas, sabores y buenos momentos dentro de Zagari.",
    image:
      "/assets/amenities/element-tierra-bar-restaurante.webp",
    imagePosition: "center center",
    element: "tierra",
  },

  {
    id: "biohuerto-mandarina",
    number: "02",
    name: "Biohuerto de mandarinas",
    shortName: "Biohuerto",
    description:
      "Un espacio de cultivo integrado al entorno que conecta la experiencia con los productos de la Selva Central.",
    image:
      "/assets/amenities/element-tierra-biohuerto-mandarina.webp",
    imagePosition: "center center",
    element: "tierra",
  },

  {
    id: "campo-futbol-voley",
    number: "03",
    name: "Campo de fútbol y vóley",
    shortName: "Fútbol y vóley",
    description:
      "Un espacio deportivo al aire libre para mantenerse activo y compartir actividades en grupo.",
    image:
      "/assets/amenities/element-tierra-campo-futbol-voley.webp",
    imagePosition: "center center",
    element: "tierra",
  },

  {
    id: "diosa-de-elementos",
    number: "04",
    name: "Diosa de los elementos",
    shortName: "Diosa",
    description:
      "Una pieza representativa de Zagari que simboliza la conexión entre agua, aire, fuego y tierra.",
    image:
      "/assets/amenities/element-tierra-diosa-de-elementos.webp",
    imagePosition: "center center",
    element: "tierra",
  },

  {
    id: "gym",
    number: "05",
    name: "Gimnasio",
    shortName: "Gym",
    description:
      "Un espacio equipado para complementar la estadía con actividad física, movimiento y bienestar.",
    image:
      "/assets/amenities/element-tierra-gym.webp",
    imagePosition: "center center",
    element: "tierra",
  },

  {
    id: "minigolf",
    number: "06",
    name: "Mini golf",
    shortName: "Mini golf",
    description:
      "Una experiencia recreativa para compartir y disfrutar en familia, en pareja o con amigos.",
    image:
      "/assets/amenities/element-tierra-minigolf.webp",
    imagePosition: "center center",
    element: "tierra",
  },

  {
    id: "portico",
    number: "07",
    name: "Pórtico de ingreso",
    shortName: "Pórtico",
    description:
      "El acceso que marca la llegada a Zagari Resort Club y da inicio a la experiencia.",
    image:
      "/assets/amenities/element-tierra-portico.webp",
    imagePosition: "center center",
    element: "tierra",
  },

  {
    id: "restaurant",
    number: "08",
    name: "Restaurante",
    shortName: "Restaurante",
    description:
      "Una propuesta gastronómica integrada al entorno para disfrutar sabores y momentos compartidos.",
    image:
      "/assets/amenities/element-tierra-restaurant.webp",
    imagePosition: "center center",
    element: "tierra",
    featured: true,
  },

  {
    id: "tenis-muro-escalable",
    number: "09",
    name: "Tenis y muro escalable",
    shortName: "Tenis y escalada",
    description:
      "Un espacio para combinar deporte, movimiento y aventura dentro de la experiencia Zagari.",
    image:
      "/assets/amenities/element-tierra-tenis-muro-escalable.webp",
    imagePosition: "center center",
    element: "tierra",
  },
];

/* =========================================================
   SLUGS
========================================================= */

export const elementSlugs =
  Object.keys(elements) as ElementSlug[];

/* =========================================================
   VALIDAR SLUG
========================================================= */

export function isElementSlug(
  value: string,
): value is ElementSlug {
  return value in elements;
}

/* =========================================================
   AMENIDADES POR ELEMENTO
========================================================= */

export function getElementAmenities(
  slug: ElementSlug,
): Amenity[] {
  return amenities.filter(
    (amenity) =>
      amenity.element === slug,
  );
}

/* =========================================================
   AMENIDAD DESTACADA
========================================================= */

export function getFeaturedAmenity(
  slug: ElementSlug,
): Amenity | undefined {
  return amenities.find(
    (amenity) =>
      amenity.element === slug &&
      amenity.featured,
  );
}

/* =========================================================
   OBTENER ELEMENTO
========================================================= */

export function getElement(
  slug: ElementSlug,
): ElementData {
  return elements[slug];
}