import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import HeroSphere from "@/components/three/HeroSphere";

export default function HeroSection() {
  const [textOpacity, setTextOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const fadeEnd = window.innerHeight * 0.5;
      setTextOpacity(Math.max(0, 1 - window.scrollY / fadeEnd));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 3D Sphere — fixed fullscreen, always visible, above particles */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <HeroSphere />
      </div>

      {/* Hero text — fades as you scroll */}
      <section className="relative" style={{ zIndex: 10 }}>
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tight text-white mb-6">
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
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-300 neon-text tracking-widest mb-10"
            >
              Innovate. Transform. Thrive.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Trion Informaatique delivers a comprehensive suite of IT solutions
              for modern businesses, encompassing ERP software consulting,
              website design and development, digital marketing, and e-commerce
              setup. We also provide business software installation, training,
              and ongoing support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/catalog"
                className="glow-btn animate-pulse-glow inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-xl font-bold text-cyan-300 tracking-wide"
              >
                Explore Our Services
                <ArrowRight size={20} />
              </Link>
              <a
                href="tel:+919895168851"
                className="glass inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white/60 hover:text-white transition-colors"
              >
                <Phone size={18} />
                +91 98951 68851
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
