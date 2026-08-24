import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import HeroSphere from "@/components/three/HeroSphere";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0 z-0">
        <HeroSphere />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-4">
            Trion{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Informaatique
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 neon-text tracking-widest mb-8"
        >
          Innovate. Transform. Thrive.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Trion Informaatique delivers a comprehensive suite of IT solutions for
          modern businesses, encompassing ERP software consulting, website design
          and development, digital marketing, and e-commerce setup. We also
          provide business software installation, training, and ongoing support.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/catalog"
            className="glow-btn animate-pulse-glow inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold text-cyan-300 tracking-wide"
          >
            Explore Our Services
            <ArrowRight size={18} />
          </Link>
          <a
            href="tel:+919895168851"
            className="glass inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white/60 hover:text-white transition-colors"
          >
            <Phone size={16} />
            +91 98951 68851
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
