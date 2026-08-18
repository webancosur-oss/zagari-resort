

import AmenitiesSection from "./components/AmenitiesSection/AmenitiesSection";
import CabinsSection from "./components/CabinsSection/CabinsSection";
import FinalCta from "./components/FinalCta/FinalCta";
import CinematicExperience from "./components/home/CinematicExperience/CinematicExperience";
import HeroSection from "./components/home/HeroSection";
import HomeContactForm from "./components/home/HomeContactForm";
import ElementsShowcase from "./components/home/HomeHero";
import HomeHero from "./components/home/HomeHero";
import LocationSection from "./components/LocationSection/LocationSection";
import LotsSection from "./components/LotsSection/LotsSection";
import ZagariManifesto from "./components/Manifesto/ZagariManifesto";
import Navbar from "./components/navbar/Navbar";
import NearbyExperiences from "./components/NearbyExperiences/NearbyExperiences";
import ZagariExperience from "./components/ZagariExperience/ZagariExperience";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>

      <HeroSection />
      
      <ZagariExperience />

      <ZagariManifesto />

      <CinematicExperience />

      <LotsSection/>

      <AmenitiesSection />

      {/* <HomeHero /> */}

      <NearbyExperiences />

      


      {/* <CabinsSection /> */}


      <LocationSection />

      <HomeContactForm />

      {/* <FinalCta /> */}
    </main>
  );
}