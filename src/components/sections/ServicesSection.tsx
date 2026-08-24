import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { services } from "@/lib/services";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
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
            className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon size={24} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2 block">
            {service.category}
          </span>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
            {service.title}
          </h3>
          {service.subtitle && (
            <p className="text-sm font-medium text-cyan-400/70 mb-3">
              {service.subtitle}
            </p>
          )}

          <p className="text-sm text-white/40 leading-relaxed mt-3 mb-4">
            {service.summary}
          </p>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400/60 group-hover:text-cyan-300 transition-colors">
            View details
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null!);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Services
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 max-w-xl mx-auto mb-8"
          >
            Explore our comprehensive suite of technology solutions designed to
            transform and elevate your business. Select any service to learn
            more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-xl text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors neon-border"
            >
              View all services
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
