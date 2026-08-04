import type {
  MetadataRoute,
} from "next";

export default function manifest():
  MetadataRoute.Manifest {
  return {
    name:
      "Zagari Resort Club",

    short_name:
      "Zagari",

    description:
      "Lotes, naturaleza, cabañas y experiencias en San Ramón.",

    start_url:
      "/",

    scope:
      "/",

    display:
      "standalone",

    orientation:
      "portrait-primary",

    background_color:
      "#f6f2e8",

    theme_color:
      "#0b3d2e",

    lang:
      "es-PE",

    categories: [
      "travel",
      "lifestyle",
      "business",
    ],

    icons: [
      {
        src:
          "/icon-192.png",

        sizes:
          "192x192",

        type:
          "image/png",
      },

      {
        src:
          "/icon-512.png",

        sizes:
          "512x512",

        type:
          "image/png",
      },

      {
        src:
          "/icon-512-maskable.png",

        sizes:
          "512x512",

        type:
          "image/png",

        purpose:
          "maskable",
      },
    ],
  };
}