import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calculator,
  Globe,
  GraduationCap,
  MessageSquare,
  Palette,
} from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Business & Accounting Solution",
    subtitle: "Busy Trivandrum",
    content:
      "Empower your small business with Busy Accounting Software, designed to simplify billing, inventory management, and GST compliance. As an authorized partner of Busy, we offer a cost-effective solution that ensures accuracy and saves you time. Backed by our unparalleled customer support and training programs, we're committed to delivering optimal solutions for your business needs, empowering your growth and productivity.",
    gradient: "from-cyan-400/20 to-blue-600/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    subtitle: null,
    content:
      "Trion Informatique creates for you scalable and efficient browser applications, which are user-friendly and innovative. Get control on your daily work activities, by creating a custom inbuilt applications to make your work flow enjoyable, interactive and result oriented. Our expert team can assist you to bring your customers and well wishers closer.",
    gradient: "from-blue-400/20 to-indigo-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: GraduationCap,
    title: "Learning Management Solution",
    subtitle: null,
    content:
      "Empower your organization's growth with our Learning Management Solutions. We offer a dynamic platform that seamlessly integrates training, skill development, and knowledge dissemination. From interactive courses to robust analytics, our solution is a catalyst for continuous learning and organizational excellence. Enhance your workforce capabilities, streamline training processes, and embrace a future where knowledge drives success. Choose our Learning Management Solutions for a transformative approach to professional development.",
    gradient: "from-violet-400/20 to-purple-600/20",
    iconColor: "text-violet-400",
  },
  {
    icon: MessageSquare,
    title: "SMS Solution",
    subtitle: null,
    content:
      "Revolutionize your communication strategy with our SMS Solutions. Seamlessly connect with your audience through targeted and personalized messages. From promotions to critical updates, our platform ensures swift and reliable delivery, amplifying your outreach. Experience the power of instant, direct engagement.",
    gradient: "from-emerald-400/20 to-teal-600/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Palette,
    title: "Website Design",
    subtitle: null,
    content:
      "Let your pages reflect your true passion and project your brand and services. Make the visitor to your website be your loved customer.",
    gradient: "from-amber-400/20 to-orange-600/20",
    iconColor: "text-amber-400",
  },
];

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
      className="card-3d glass-bright rounded-2xl p-8 neon-border group relative overflow-hidden"
    >
      {/* Gradient glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10">
        <div
          className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={24} />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
        {service.subtitle && (
          <p className="text-sm font-medium text-cyan-400/70 mb-3">
            {service.subtitle}
          </p>
        )}

        <p className="text-sm text-white/40 leading-relaxed mt-3">
          {service.content}
        </p>
      </div>
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
            className="text-white/40 max-w-xl mx-auto"
          >
            Explore our comprehensive suite of technology solutions designed to
            transform and elevate your business.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
