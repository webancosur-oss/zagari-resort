

import AmenitiesSection from "./components/AmenitiesSection/AmenitiesSection";
import CabinsSection from "./components/CabinsSection/CabinsSection";
import FinalCta from "./components/FinalCta/FinalCta";
import CinematicExperience from "./components/home/CinematicExperience/CinematicExperience";
import HomeHero from "./components/home/HomeHero";
import InvestmentSection from "./components/InvestmentSection/InvestmentSection";
import LocationSection from "./components/LocationSection/LocationSection";
import LotsSection from "./components/LotsSection/LotsSection";
import ManifestoSection from "./components/ManifestoSection/ManifestoSection";
import Navbar from "./components/navbar/Navbar";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
        <Navbar />
      <HomeHero />

      <ManifestoSection />

      <CinematicExperience />

      <LotsSection/>

      <CabinsSection />

      <AmenitiesSection />

      <InvestmentSection />

      <LocationSection />

      <FinalCta />
    </main>
  );
}