

import AmenitiesSection from "./components/AmenitiesSection/AmenitiesSection";
import CabinsSection from "./components/CabinsSection/CabinsSection";
import FinalCta from "./components/FinalCta/FinalCta";
import CinematicExperience from "./components/home/CinematicExperience/CinematicExperience";
import HomeContactForm from "./components/home/HomeContactForm";
import ElementsShowcase from "./components/home/HomeHero";
import HomeHero from "./components/home/HomeHero";
import LocationSection from "./components/LocationSection/LocationSection";
import LotsSection from "./components/LotsSection/LotsSection";
import ZagariManifesto from "./components/Manifesto/ZagariManifesto";
import Navbar from "./components/navbar/Navbar";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      
      <HomeHero />

      <ZagariManifesto />

      <CinematicExperience />
      
      <AmenitiesSection />

      <LotsSection/>

      {/* <CabinsSection /> */}


      <LocationSection />

      <HomeContactForm />

      {/* <FinalCta /> */}
    </main>
  );
}