

import FaqSection from "./components/Faq/FaqSection";
import CinematicExperience from "./components/home/CinematicExperience/CinematicExperience";
import HeroSection from "./components/home/HeroSection";
import HomeContactForm from "./components/home/HomeContactForm";
import LocationSection from "./components/LocationSection/LocationSection";
import LotsSection from "./components/LotsSection/LotsSection";
import ZagariManifesto from "./components/Manifesto/ZagariManifesto";
import ZagariExperience from "./components/ZagariExperience/ZagariExperience";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>

      <HeroSection />
      
      <ZagariExperience />

      <CinematicExperience />

      <LotsSection/>

      {/* <AmenitiesSection /> */}

      {/* <HomeHero /> */}

      {/* <NearbyExperiences /> */}

      {/* <CabinsSection /> */}

      <LocationSection />

      <FaqSection />

      <ZagariManifesto />

      <HomeContactForm />

      {/* <FinalCta /> */}
    </main>
  );
}