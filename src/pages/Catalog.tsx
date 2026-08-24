import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { services } from "@/lib/services";
import ParticleField from "@/components/three/ParticleField";

const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return services.filter((s) => {
      const matchesCategory =
        activeCategory === "All" || s.category === activeCategory;
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleField />

      {/* Header */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl text-white/40 max-w-lg mx-auto mb-10"
          >
            Browse our full range of technology solutions. Select any service to
            learn more about what we offer.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-lg mx-auto relative"
          >
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full glass-bright rounded-xl pl-12 pr-4 py-4 text-lg text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-cyan-500/40 transition-shadow"
            />
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "glass text-white/40 hover:text-white/60 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="relative pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/30 py-20 text-lg"
            >
              No services match your search. Try a different term or category.
            </motion.p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={`/catalog/${service.slug}`}
                      className="block card-3d glass-bright rounded-2xl p-8 neon-border group relative overflow-hidden h-full"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />
                      <div className="relative z-10">
                        <div
                          className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={28} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/25 mb-2 block">
                          {service.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-base text-white/35 leading-relaxed mb-6">
                          {service.summary}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400/70 group-hover:text-cyan-300 transition-colors">
                          View details
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
