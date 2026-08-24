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

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      {/* About */}
      <AboutSection />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      {/* Services */}
      <ServicesSection />

      {/* Footer / Contact */}
      <FooterSection />
    </div>
  );
}
