import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

function NetworkNodes() {
  return (
    <svg
      viewBox="0 0 800 200"
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Network lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x1 = (i * 57) % 800;
        const y1 = 30 + (i * 37) % 140;
        const x2 = ((i + 3) * 73) % 800;
        const y2 = 20 + (i * 43) % 160;
        return (
          <line
            key={`l${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#00dcff"
            strokeWidth="0.5"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.4;0.1"
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}
      {/* Network nodes */}
      {Array.from({ length: 15 }).map((_, i) => {
        const cx = (i * 57) % 800;
        const cy = 30 + (i * 37) % 140;
        return (
          <g key={`n${i}`}>
            <circle cx={cx} cy={cy} r="3" fill="#00dcff" opacity="0.5">
              <animate
                attributeName="r"
                values="2;4;2"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={cx} cy={cy} r="8" fill="#00dcff" opacity="0.05">
              <animate
                attributeName="r"
                values="6;12;6"
                dur={`${3 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

export default function FooterSection() {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer className="relative py-24 px-6 overflow-hidden">
      {/* Network background */}
      <NetworkNodes />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Touch
            </span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Ready to transform your business? Reach out to us today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Phone */}
          <motion.a
            href="tel:+919895168851"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-bright rounded-2xl p-6 neon-border card-3d group text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
              <Phone size={22} />
            </div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
              Phone
            </h3>
            <p className="text-lg font-bold text-cyan-300 neon-text">
              +91 98951 68851
            </p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:reach.trion@gmail.com"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-bright rounded-2xl p-6 neon-border card-3d group text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform">
              <Mail size={22} />
            </div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
              Email
            </h3>
            <p className="text-lg font-bold text-blue-300 neon-text-blue">
              reach.trion@gmail.com
            </p>
          </motion.a>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-bright rounded-2xl p-6 neon-border card-3d group text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <MapPin size={22} />
            </div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
              Headquarters
            </h3>
            <p className="text-sm font-medium text-white/50">
              Thiruvananthapuram, Kerala
            </p>
          </motion.div>
        </div>

        {/* Addresses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass rounded-2xl p-8 neon-border"
        >
          <h3 className="text-lg font-bold text-white mb-6 text-center">
            Our Locations
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                  Office 1
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  Oppo. TLRA 69, Thoppil Lane, Kumarapuram,
                  Thiruvananthapuram - 695011
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                  Office 2
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  52, Poonthi Road, Kumarapuram,
                  Thiruvananthapuram - 695011
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-xs">
              T
            </div>
            <span className="text-sm font-bold text-white/60">
              Trion <span className="text-cyan-400">Informaatique</span>
            </span>
          </div>
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Trion Informaatique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
