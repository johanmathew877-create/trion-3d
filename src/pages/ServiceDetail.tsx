import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Phone, ArrowRight } from "lucide-react";
import { getServiceBySlug, services } from "@/lib/services";
import ParticleField from "@/components/three/ParticleField";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <NotFound />;

  const Icon = service.icon;
  const related = services.filter(
    (s) => s.slug !== service.slug && s.category === service.category
  );
  const other = services.filter(
    (s) => s.slug !== service.slug && s.category !== service.category
  );
  const suggestions = [...related, ...other].slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleField />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/catalog"
            className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium text-white/60 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 px-6"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400/60 mb-6 block"
          >
            {service.category}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-10"
          >
            <div
              className={`w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center ${service.iconColor} neon-border`}
            >
              <Icon size={40} />
            </div>
            <div>
              <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight neon-text">
                {service.title}
              </h1>
              {service.subtitle && (
                <p className="text-xl font-semibold text-cyan-400/70 mt-2">
                  {service.subtitle}
                </p>
              )}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl sm:text-2xl text-white/50 leading-relaxed max-w-3xl font-medium"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent origin-left"
        />
      </div>

      {/* Features */}
      <section
        className="relative py-20 px-6"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-4xl sm:text-5xl font-black text-white mb-10 neon-text"
          >
            What You Get
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass-bright rounded-xl p-5 flex items-start gap-4 neon-border group hover:border-cyan-500/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check size={18} />
                </div>
                <span className="text-lg font-semibold text-white/60">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-20 px-6"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-bright rounded-3xl p-14 neon-border"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 neon-text">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/40 mb-10 max-w-lg mx-auto font-medium">
              Talk to our team about how {service.title.toLowerCase()} can
              benefit your business.
            </p>
            <a
              href="tel:+919895168851"
              className="glow-btn animate-pulse-glow inline-flex items-center gap-3 px-12 py-6 rounded-2xl text-2xl font-bold text-cyan-300 tracking-wide"
            >
              <Phone size={24} />
              Call Us Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related services */}
      {suggestions.length > 0 && (
        <section
          className="relative pb-32 px-6"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-3xl font-black text-white mb-10 neon-text"
            >
              Explore More Services
            </motion.h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {suggestions.map((s, i) => {
                const SIcon = s.icon;
                return (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.1 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={`/catalog/${s.slug}`}
                      className="block glass-bright rounded-2xl p-7 neon-border card-3d group"
                    >
                      <div
                        className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 ${s.iconColor} group-hover:scale-110 transition-transform`}
                      >
                        <SIcon size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                        {s.title}
                      </h4>
                      <span className="inline-flex items-center gap-1.5 text-base font-semibold text-cyan-400/50 group-hover:text-cyan-300 transition-colors">
                        Learn more <ArrowRight size={14} />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
