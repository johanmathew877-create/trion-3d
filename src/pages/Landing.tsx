import ParticleField from "@/components/three/ParticleField";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 3D Particle Background */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* About */}
      <AboutSection />

      {/* Services */}
      <ServicesSection />

      {/* Footer / Contact */}
      <div id="contact">
        <FooterSection />
      </div>
    </div>
  );
}
