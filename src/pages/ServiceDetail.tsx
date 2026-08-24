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
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/25 mb-4 block">
              {service.category}
            </span>
            <div className="flex items-center gap-5 mb-8">
              <div
                className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${service.iconColor} neon-border`}
              >
                <Icon size={32} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  {service.title}
                </h1>
                {service.subtitle && (
                  <p className="text-lg font-medium text-cyan-400/70 mt-2">
                    {service.subtitle}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl text-white/50 leading-relaxed max-w-3xl"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="relative pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-bright rounded-2xl p-10 sm:p-12 neon-border"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              What You Get
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Check size={16} />
                  </div>
                  <span className="text-base text-white/50">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass rounded-2xl p-12 neon-border"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/40 mb-8 max-w-md mx-auto">
              Talk to our team about how {service.title.toLowerCase()} can
              benefit your business.
            </p>
            <a
              href="tel:+919895168851"
              className="glow-btn animate-pulse-glow inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-xl font-bold text-cyan-300 tracking-wide"
            >
              <Phone size={22} />
              Call Us Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related services */}
      {suggestions.length > 0 && (
        <section className="relative pb-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8">
              Explore More Services
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {suggestions.map((s) => {
                const SIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    to={`/catalog/${s.slug}`}
                    className="glass-bright rounded-xl p-6 neon-border card-3d group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${s.iconColor} group-hover:scale-110 transition-transform`}
                    >
                      <SIcon size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {s.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400/50 group-hover:text-cyan-300 transition-colors">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
