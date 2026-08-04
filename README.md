This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



zagari-resort-web/
│
├── app/
│   ├── amenidades/
│   │   ├── page.tsx
│   │   └── AmenidadesPage.module.css
│   │
│   ├── cabanas/
│   │   ├── page.tsx
│   │   └── CabanasPage.module.css
│   │
│   ├── experiencias/
│   │   ├── page.tsx
│   │   └── ExperienciasPage.module.css
│   │
│   ├── inversion/
│   │   ├── page.tsx
│   │   └── InversionPage.module.css
│   │
│   ├── lotes/
│   │   ├── page.tsx
│   │   └── LotesPage.module.css
│   │
│   ├── nosotros/
│   │   ├── page.tsx
│   │   └── NosotrosPage.module.css
│   │
│   ├── ubicacion/
│   │   ├── page.tsx
│   │   └── UbicacionPage.module.css
│   │
│   ├── contacto/
│   │   ├── page.tsx
│   │   └── ContactoPage.module.css
│   │
│   ├── politicas/
│   │   ├── privacidad/
│   │   │   └── page.tsx
│   │   └── terminos/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   └── leads/
│   │       └── route.ts
│   │
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── globals.css
│   ├── icon.png
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── not-found.tsx
│   ├── opengraph-image.png
│   ├── opengraph-image.alt.txt
│   ├── page.module.css
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── twitter-image.png
│   └── twitter-image.alt.txt
│
├── components/
│   ├── buttons/
│   │   ├── ActionButton.module.css
│   │   └── ActionButton.tsx
│   │
│   ├── cards/
│   │   ├── AmenityCard.module.css
│   │   ├── AmenityCard.tsx
│   │   ├── CabinCard.module.css
│   │   ├── CabinCard.tsx
│   │   ├── ElementCard.module.css
│   │   ├── ElementCard.tsx
│   │   ├── ExperienceCard.module.css
│   │   ├── ExperienceCard.tsx
│   │   ├── LotCard.module.css
│   │   └── LotCard.tsx
│   │
│   ├── forms/
│   │   ├── LeadForm.module.css
│   │   └── LeadForm.tsx
│   │
│   ├── gallery/
│   │   ├── ImmersiveGallery.module.css
│   │   ├── ImmersiveGallery.tsx
│   │   ├── Lightbox.module.css
│   │   └── Lightbox.tsx
│   │
│   ├── layout/
│   │   ├── Container.module.css
│   │   ├── Container.tsx
│   │   ├── PageHero.module.css
│   │   ├── PageHero.tsx
│   │   ├── SectionHeader.module.css
│   │   └── SectionHeader.tsx
│   │
│   ├── map/
│   │   ├── LocationMap.module.css
│   │   └── LocationMap.tsx
│   │
│   ├── navigation/
│   │   ├── Navbar.module.css
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.module.css
│   │   └── MobileMenu.tsx
│   │
│   ├── footer/
│   │   ├── Footer.module.css
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── AmenitiesPreview/
│   │   │   ├── AmenitiesPreview.module.css
│   │   │   └── AmenitiesPreview.tsx
│   │   │
│   │   ├── CabinsPreview/
│   │   │   ├── CabinsPreview.module.css
│   │   │   └── CabinsPreview.tsx
│   │   │
│   │   ├── ContactSection/
│   │   │   ├── ContactSection.module.css
│   │   │   └── ContactSection.tsx
│   │   │
│   │   ├── ElementsSection/
│   │   │   ├── ElementsSection.module.css
│   │   │   └── ElementsSection.tsx
│   │   │
│   │   ├── ExperienceSection/
│   │   │   ├── ExperienceSection.module.css
│   │   │   └── ExperienceSection.tsx
│   │   │
│   │   ├── InvestmentSection/
│   │   │   ├── InvestmentSection.module.css
│   │   │   └── InvestmentSection.tsx
│   │   │
│   │   ├── LocationSection/
│   │   │   ├── LocationSection.module.css
│   │   │   └── LocationSection.tsx
│   │   │
│   │   ├── LotsSection/
│   │   │   ├── LotsSection.module.css
│   │   │   └── LotsSection.tsx
│   │   │
│   │   ├── MasterplanSection/
│   │   │   ├── MasterplanSection.module.css
│   │   │   └── MasterplanSection.tsx
│   │   │
│   │   ├── ResortHero/
│   │   │   ├── ResortHero.module.css
│   │   │   └── ResortHero.tsx
│   │   │
│   │   └── TrustSection/
│   │       ├── TrustSection.module.css
│   │       └── TrustSection.tsx
│   │
│   ├── sliders/
│   │   ├── AmenitiesSlider.module.css
│   │   ├── AmenitiesSlider.tsx
│   │   ├── CabinsSlider.module.css
│   │   └── CabinsSlider.tsx
│   │
│   ├── ui/
│   │   ├── Badge.module.css
│   │   ├── Badge.tsx
│   │   ├── FloatingWhatsApp.module.css
│   │   ├── FloatingWhatsApp.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── VideoModal.tsx
│   │
│   └── video/
│       ├── BackgroundVideo.module.css
│       └── BackgroundVideo.tsx
│
├── data/
│   ├── amenities.ts
│   ├── cabins.ts
│   ├── contact.ts
│   ├── elements.ts
│   ├── experiences.ts
│   ├── lots.ts
│   ├── navigation.ts
│   ├── project.ts
│   ├── site.ts
│   └── stats.ts
│
├── hooks/
│   ├── useBodyLock.ts
│   ├── useMediaQuery.ts
│   ├── useScrollDirection.ts
│   └── useTawk.ts
│
├── lib/
│   ├── analytics.ts
│   ├── crm.ts
│   ├── formatters.ts
│   ├── seo.ts
│   └── validations.ts
│
├── styles/
│   ├── animations.css
│   ├── reset.css
│   ├── tokens.css
│   └── typography.css
│
├── types/
│   ├── amenity.ts
│   ├── cabin.ts
│   ├── lead.ts
│   └── project.ts
│
├── public/
│   ├── assets/
│   │   ├── brand/
│   │   │   ├── ancosur-logo.svg
│   │   │   ├── moro-capital-logo.svg
│   │   │   ├── zagari-logo-dark.svg
│   │   │   └── zagari-logo-light.svg
│   │   │
│   │   ├── hero/
│   │   │   ├── zagari-hero-desktop.webp
│   │   │   ├── zagari-hero-mobile.webp
│   │   │   └── zagari-hero.mp4
│   │   │
│   │   ├── concept/
│   │   │   ├── aire.webp
│   │   │   ├── agua.webp
│   │   │   ├── fuego.webp
│   │   │   └── tierra.webp
│   │   │
│   │   ├── location/
│   │   │   ├── location-map.webp
│   │   │   ├── san-ramon.webp
│   │   │   └── route-map.webp
│   │   │
│   │   ├── masterplan/
│   │   │   └── zagari-masterplan.webp
│   │   │
│   │   ├── lots/
│   │   │   ├── lot-model-01.webp
│   │   │   └── lot-model-02.webp
│   │   │
│   │   ├── cabins/
│   │   │   ├── cabin-one-bedroom.webp
│   │   │   ├── cabin-two-bedrooms.webp
│   │   │   └── cabin-three-bedrooms.webp
│   │   │
│   │   ├── amenities/
│   │   │   ├── biohuerto.webp
│   │   │   ├── camping.webp
│   │   │   ├── football-volleyball.webp
│   │   │   ├── gym.webp
│   │   │   ├── infinity-pool.webp
│   │   │   ├── mini-tennis.webp
│   │   │   ├── pool-bar.webp
│   │   │   ├── restaurant-bar.webp
│   │   │   ├── spiritual-zone.webp
│   │   │   └── viewpoint.webp
│   │   │
│   │   ├── experiences/
│   │   │   ├── goddess-elements.webp
│   │   │   ├── instagram-zone.webp
│   │   │   ├── nature.webp
│   │   │   └── trekking.webp
│   │   │
│   │   ├── trust/
│   │   │   ├── ancosur-experience.webp
│   │   │   └── moro-capital.webp
│   │   │
│   │   └── og/
│   │       ├── opengraph-image.png
│   │       └── twitter-image.png
│   │
│   ├── documents/
│   │   └── zagari-brochure.pdf
│   │
│   ├── fonts/
│   │
│   └── manifest/
│
├── middleware.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json




Verde bosque profundo   #063F2C
Verde Zagari            #0D6B47
Verde natural           #42B979
Marfil                   #FBF8F1
Arena                    #F3ECDE
Madera                   #9A6B3F
Agua                     #168FB4
Aire                     #4AB8D8
Fuego                    #EF7A32
Magenta del logo         #D32987