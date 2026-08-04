import type {
  MetadataRoute,
} from "next";

import { siteConfig } from "@/data/site";

export default function sitemap():
  MetadataRoute.Sitemap {
  const now =
    new Date();
    const routes = [
  {
    path: "",
    priority: 1,
    changeFrequency:
      "weekly" as const,
  },
];

//   const routes = [
//     {
//       path: "",
//       priority: 1,
//       changeFrequency:
//         "weekly" as const,
//     },

//     {
//       path:
//         "/lotes",
//       priority: 0.9,
//       changeFrequency:
//         "weekly" as const,
//     },

//     {
//       path:
//         "/cabanas",
//       priority: 0.85,
//       changeFrequency:
//         "monthly" as const,
//     },

//     {
//       path:
//         "/amenidades",
//       priority: 0.85,
//       changeFrequency:
//         "monthly" as const,
//     },

//     {
//       path:
//         "/experiencias",
//       priority: 0.8,
//       changeFrequency:
//         "monthly" as const,
//     },

//     {
//       path:
//         "/inversion",
//       priority: 0.85,
//       changeFrequency:
//         "monthly" as const,
//     },

//     {
//       path:
//         "/ubicacion",
//       priority: 0.75,
//       changeFrequency:
//         "monthly" as const,
//     },

//     {
//       path:
//         "/nosotros",
//       priority: 0.65,
//       changeFrequency:
//         "monthly" as const,
//     },

//     {
//       path:
//         "/contacto",
//       priority: 0.8,
//       changeFrequency:
//         "monthly" as const,
//     },
//   ];

  return routes.map(
    ({
      path,
      priority,
      changeFrequency,
    }) => ({
      url:
        `${siteConfig.url}${path}`,

      lastModified:
        now,

      changeFrequency,

      priority,
    }),
  );
}