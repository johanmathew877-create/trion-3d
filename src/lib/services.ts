import {
  Calculator,
  Globe,
  GraduationCap,
  MessageSquare,
  Palette,
  Megaphone,
} from "lucide-react";
import type { ComponentType } from "react";

export interface ServiceItem {
  slug: string;
  title: string;
  subtitle: string | null;
  icon: ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  iconColor: string;
  summary: string;
  description: string;
  features: string[];
  category: string;
}

export const services: ServiceItem[] = [
  {
    slug: "business-accounting-software",
    title: "Business & Accounting Software",
    subtitle: "Powered by Busy",
    icon: Calculator,
    gradient: "from-cyan-400/20 to-blue-600/20",
    iconColor: "text-cyan-400",
    category: "Software",
    summary:
      "Streamline billing, inventory, and GST compliance with an enterprise-grade accounting platform built for growing businesses.",
    description:
      "Empower your small business with Busy Accounting Software, designed to simplify billing, inventory management, and GST compliance. As an authorized partner of Busy, we offer a cost-effective solution that ensures accuracy and saves you time. Backed by our unparalleled customer support and training programs, we are committed to delivering optimal solutions for your business needs, empowering your growth and productivity.",
    features: [
      "Automated billing and invoicing",
      "Real-time inventory tracking",
      "Full GST compliance and reporting",
      "Authorized Busy partner support",
      "Comprehensive training programs",
      "Cost-effective licensing",
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    subtitle: null,
    icon: Globe,
    gradient: "from-blue-400/20 to-indigo-600/20",
    iconColor: "text-blue-400",
    category: "Development",
    summary:
      "Custom browser-based applications that streamline daily workflows and bring your customers closer to your business.",
    description:
      "Trion Informaatique creates scalable and efficient browser applications that are user-friendly and innovative. Take control of your daily work activities by commissioning a custom in-built application that makes your workflow enjoyable, interactive, and result-oriented. Our expert team can help you bring your customers and stakeholders closer through purpose-built digital tools.",
    features: [
      "Scalable cloud-hosted architecture",
      "Responsive, mobile-first design",
      "Custom workflow automation",
      "Real-time data dashboards",
      "Secure user authentication",
      "Ongoing maintenance and support",
    ],
  },
  {
    slug: "learning-management-solution",
    title: "Learning Management Solution",
    subtitle: null,
    icon: GraduationCap,
    gradient: "from-violet-400/20 to-purple-600/20",
    iconColor: "text-violet-400",
    category: "Software",
    summary:
      "A dynamic platform that integrates training, skill development, and knowledge dissemination for organisational excellence.",
    description:
      "Empower your organization's growth with our Learning Management Solutions. We offer a dynamic platform that seamlessly integrates training, skill development, and knowledge dissemination. From interactive courses to robust analytics, our solution is a catalyst for continuous learning and organizational excellence. Enhance your workforce capabilities, streamline training processes, and embrace a future where knowledge drives success. Choose our Learning Management Solutions for a transformative approach to professional development.",
    features: [
      "Interactive course builder",
      "Progress tracking and analytics",
      "Certificate and assessment tools",
      "Multi-tenant organisation support",
      "Content library management",
      "Mobile-friendly learner portal",
    ],
  },
  {
    slug: "sms-communication-solution",
    title: "SMS Communication Solution",
    subtitle: null,
    icon: MessageSquare,
    gradient: "from-emerald-400/20 to-teal-600/20",
    iconColor: "text-emerald-400",
    category: "Communication",
    summary:
      "Targeted, personalised messaging that delivers promotions and critical updates with instant reach and reliable delivery.",
    description:
      "Revolutionize your communication strategy with our SMS Solutions. Seamlessly connect with your audience through targeted and personalized messages. From promotions to critical updates, our platform ensures swift and reliable delivery, amplifying your outreach. Experience the power of instant, direct engagement that keeps your audience informed and connected.",
    features: [
      "Bulk and transactional messaging",
      "Personalised templates",
      "Delivery tracking and analytics",
      "API integration support",
      "Scheduled campaign management",
      "DND-compliant distribution",
    ],
  },
  {
    slug: "website-design",
    title: "Website Design",
    subtitle: null,
    icon: Palette,
    gradient: "from-amber-400/20 to-orange-600/20",
    iconColor: "text-amber-400",
    category: "Design",
    summary:
      "Visually compelling websites that reflect your brand identity and convert visitors into loyal customers.",
    description:
      "Let your pages reflect your true passion and project your brand and services with clarity. A well-designed website is more than an online brochure — it is your most hard-working salesperson, available around the clock. We craft purposeful designs that guide every visitor toward becoming a valued customer, blending aesthetics with conversion-driven strategy.",
    features: [
      "Bespoke visual design",
      "SEO-optimised page structure",
      "Fast, performance-focused builds",
      "E-commerce integration",
      "Content management systems",
      "Analytics and conversion tracking",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    subtitle: null,
    icon: Megaphone,
    gradient: "from-pink-400/20 to-rose-600/20",
    iconColor: "text-pink-400",
    category: "Marketing",
    summary:
      "Data-driven campaigns across social media, search, and content channels that amplify brand visibility and drive growth.",
    description:
      "Build a powerful digital presence with strategic marketing campaigns tailored to your business goals. From social media management and search engine optimisation to pay-per-click advertising and content strategy, we help you reach the right audience at the right time. Our data-driven approach ensures every campaign delivers measurable results and a strong return on investment.",
    features: [
      "Social media strategy and management",
      "Search engine optimisation (SEO)",
      "Pay-per-click (PPC) advertising",
      "Content marketing and copywriting",
      "Analytics and performance reporting",
      "Brand identity consulting",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}
