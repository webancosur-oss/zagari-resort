import type {
  Metadata,
  Viewport,
} from "next";
import type { ReactNode } from "react";

import {
  Barlow_Condensed,
  Manrope,
} from "next/font/google";

import { siteConfig } from "@/data/site";

import "./globals.css";

import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";

/* =========================================================
   TIPOGRAFÍAS
========================================================= */

/*
 * Manrope:
 * párrafos, botones, formularios, navegación y textos generales.
 */
const manrope = Manrope({
  variable: "--font-sans",

  subsets: [
    "latin",
  ],

  weight: [
    "400",
    "500",
    "600",
    "700",
  ],

  display:
    "swap",

  preload:
    true,

  fallback: [
    "Arial",
    "Helvetica",
    "sans-serif",
  ],
});

/*
 * Barlow Condensed:
 * títulos h1, h2, h3, h4, h5 y h6.
 *
 * Es una alternativa de Google Fonts
 * similar al estilo condensado de Akrobat.
 */
const barlowCondensed =
  Barlow_Condensed({
    variable:
      "--font-display",

    subsets: [
      "latin",
    ],

    weight: [
      "400",
      "500",
      "600",
      "700",
    ],

    style: [
      "normal",
    ],

    display:
      "swap",

    preload:
      true,

    fallback: [
      "Arial Narrow",
      "Arial",
      "Helvetica",
      "sans-serif",
    ],
  });

/* =========================================================
   METADATA
========================================================= */

const defaultTitle =
  "Zagari Resort Club | Lotes en San Ramón";

const defaultDescription =
  "Descubre Zagari Resort Club, un proyecto de lotes en preventa en San Ramón con naturaleza, cabañas, experiencias y más de 20 amenidades.";

export const metadata: Metadata = {
  metadataBase:
    new URL(
      siteConfig.url,
    ),

  applicationName:
    siteConfig.name,

  title: {
    default:
      defaultTitle,

    template:
      "%s | Zagari Resort Club",
  },

  description:
    defaultDescription,

  keywords: [
    ...siteConfig.keywords,
  ],

  authors: [
    {
      name:
        siteConfig.legalName,

      url:
        siteConfig.url,
    },
  ],

  creator:
    siteConfig.legalName,

  publisher:
    siteConfig.legalName,

  category:
    "Bienes raíces y turismo",

  classification:
    "Proyecto inmobiliario, resort y lotes vacacionales",

  referrer:
    "origin-when-cross-origin",

  formatDetection: {
    email:
      false,

    address:
      false,

    telephone:
      false,
  },

  alternates: {
    canonical:
      "/",

    languages: {
      "es-PE":
        "/",

      "x-default":
        "/",
    },
  },

  openGraph: {
    title:
      defaultTitle,

    description:
      defaultDescription,

    url:
      "/",

    siteName:
      siteConfig.name,

    locale:
      siteConfig.locale,

    type:
      "website",

    images: [
      {
        url:
          "/opengraph-image.png",

        width:
          1200,

        height:
          630,

        alt:
          "Zagari Resort Club, lotes en San Ramón rodeados de naturaleza",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      defaultTitle,

    description:
      defaultDescription,

    images: [
      "/twitter-image.png",
    ],
  },

  robots: {
    index:
      true,

    follow:
      true,

    nocache:
      false,

    googleBot: {
      index:
        true,

      follow:
        true,

      noimageindex:
        false,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },

  icons: {
    icon: [
      {
        url:
          "/favicon.ico",

        sizes:
          "any",

        type:
          "image/x-icon",
      },

      {
        url:
          "/icon-192.png",

        type:
          "image/png",

        sizes:
          "192x192",
      },

      {
        url:
          "/icon-512.png",

        type:
          "image/png",

        sizes:
          "512x512",
      },
    ],

    shortcut:
      "/favicon.ico",

    apple: [
      {
        url:
          "/apple-icon.png",

        type:
          "image/png",

        sizes:
          "180x180",
      },
    ],
  },

  manifest:
    "/manifest.webmanifest",

  other: {
    "geo.region":
      siteConfig.region,

    "geo.placename":
      siteConfig.city,

    "content-language":
      siteConfig.language,
  },
};

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width:
    "device-width",

  initialScale:
    1,

  viewportFit:
    "cover",

  colorScheme:
    "light",

  themeColor: [
    {
      media:
        "(prefers-color-scheme: light)",

      color:
        "#fbf8f1",
    },

    {
      media:
        "(prefers-color-scheme: dark)",

      color:
        "#032d20",
    },
  ],
};

/* =========================================================
   TIPOS
========================================================= */

type RootLayoutProps = {
  children:
    ReactNode;
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const organizationJsonLd = {
    "@context":
      "https://schema.org",

    "@type": [
      "RealEstateAgent",
      "LocalBusiness",
    ],

    "@id":
      `${siteConfig.url}/#organization`,

    name:
      siteConfig.name,

    alternateName: [
      "Zagari",
      "Zagari Resort",
      "Zagari Resort Club San Ramón",
    ],

    legalName:
      siteConfig.legalName,

    description:
      defaultDescription,

    url:
      siteConfig.url,

    slogan:
      siteConfig.slogan,

    logo: {
      "@type":
        "ImageObject",

      url:
        `${siteConfig.url}/assets/brand/zagari-logo-dark.svg`,
    },

    image: {
      "@type":
        "ImageObject",

      url:
        `${siteConfig.url}/opengraph-image.png`,

      width:
        1200,

      height:
        630,
    },

    telephone:
      siteConfig.phone,

    email:
      siteConfig.email,

    priceRange:
      "$$",

    currenciesAccepted:
      "PEN",

    paymentAccepted:
      "Transferencia bancaria, financiamiento y crédito directo sujeto a evaluación",

    address: {
      "@type":
        "PostalAddress",

      streetAddress:
        siteConfig.address.salesOffice,

      addressLocality:
        "Huancayo",

      addressRegion:
        "Junín",

      addressCountry:
        "PE",
    },

    areaServed: [
      {
        "@type":
          "City",

        name:
          "San Ramón",
      },

      {
        "@type":
          "AdministrativeArea",

        name:
          "Chanchamayo",
      },

      {
        "@type":
          "AdministrativeArea",

        name:
          "Junín",
      },
    ],

    contactPoint: [
      {
        "@type":
          "ContactPoint",

        telephone:
          siteConfig.phone,

        email:
          siteConfig.email,

        contactType:
          "sales",

        areaServed:
          "PE",

        availableLanguage: [
          "Spanish",
        ],
      },
    ],
  };

  const websiteJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    "@id":
      `${siteConfig.url}/#website`,

    url:
      siteConfig.url,

    name:
      siteConfig.name,

    alternateName:
      "Zagari",

    description:
      defaultDescription,

    inLanguage:
      siteConfig.language,

    publisher: {
      "@id":
        `${siteConfig.url}/#organization`,
    },
  };

  const placeJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "Place",

    "@id":
      `${siteConfig.url}/#project-location`,

    name:
      "Zagari Resort Club San Ramón",

    description:
      "Proyecto de lotes, cabañas y experiencias en contacto con la naturaleza.",

    url:
      siteConfig.url,

    address: {
      "@type":
        "PostalAddress",

      addressLocality:
        "San Ramón",

      addressRegion:
        "Junín",

      addressCountry:
        "PE",
    },
  };

  const jsonLd = [
    organizationJsonLd,
    websiteJsonLd,
    placeJsonLd,
  ];

  return (
    <html
      lang={siteConfig.language}
      className={`${manrope.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Navbar />
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                jsonLd,
              ).replace(
                /</g,
                "\\u003c",
              ),
          }}
        />
      </body>
    </html>
  );
}