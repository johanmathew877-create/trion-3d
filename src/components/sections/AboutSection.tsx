import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Helix animation / visual */}
          <div className="relative flex items-center justify-center min-h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 300 300" className="w-64 h-64 opacity-30">
                <defs>
                  <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00dcff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1e5aff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 20 }).map((_, i) => {
                  const angle = (i / 20) * Math.PI * 4;
                  const y = 30 + (i / 20) * 240;
                  const cx1 = 150 + Math.cos(angle) * 80;
                  const cx2 = 150 + Math.cos(angle + Math.PI) * 80;
                  return (
                    <g key={i}>
                      <circle cx={cx1} cy={y} r={4} fill="url(#helixGrad)" opacity={0.8}>
                        <animate
                          attributeName="r"
                          values="3;5;3"
                          dur={`${2 + i * 0.2}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx={cx2} cy={y} r={3} fill="#1e5aff" opacity={0.4}>
                        <animate
                          attributeName="r"
                          values="2;4;2"
                          dur={`${2.5 + i * 0.15}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      {i > 0 && (
                        <line
                          x1={150 + Math.cos(((i - 1) / 20) * Math.PI * 4) * 80}
                          y1={30 + ((i - 1) / 20) * 240}
                          x2={cx1}
                          y2={y}
                          stroke="#00dcff"
                          strokeWidth="0.5"
                          opacity="0.2"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="relative z-10 glass-bright rounded-2xl p-8 neon-border animate-float">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                600K+
              </div>
              <div className="text-lg text-white/40 mt-1">BUSY Licenses Sold</div>
            </div>
          </div>

          {/* Right: Text content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-black text-white mb-8 tracking-tight"
            >
              ABOUT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                US
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass rounded-2xl p-10 neon-border"
            >
              <p className="text-white/50 leading-relaxed text-lg sm:text-xl">
                Welcome to Trion Informatique, your strategic partner in
                technology innovation. With a dedicated team of experts, we
                excel in software development and IT consulting. Committed to
                excellence, we stay ahead in technology, turning challenges
                into opportunities. Transparent, integral, and client-focused,
                Trion Informatique is where innovation meets results. Join us
                in shaping the future of technology —{" "}
                <span className="text-cyan-400 font-semibold neon-text">
                  Innovate. Transform. Thrive.
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
