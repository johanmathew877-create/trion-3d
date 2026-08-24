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
    title: "Business Accounting Software",
    subtitle: "Powered by BUSY — Busy Trivandrum",
    icon: Calculator,
    gradient: "from-cyan-400/20 to-blue-600/20",
    iconColor: "text-cyan-400",
    category: "Software",
    summary:
      "Boost your small business efficiency with BUSY Accounting Software — the ideal solution for streamlined billing, inventory management, and GST compliance.",
    description:
      "Empower your small business with Busy Accounting Software, designed to simplify billing, inventory management, and GST compliance. As an authorized sales and service partner of BUSY at Trivandrum, we offer cost-effective solutions that ensure accuracy and save you time. Backed by our unparalleled customer support and training programs, we are committed to delivering optimal solutions for your business needs, empowering your growth and productivity. BUSY is an integrated business accounting and management software for Micro, Small & Medium Enterprises (MSMEs). With over 600,000 licenses sold in over 20 countries, it is one of the leading business accounting software in India, South Asia, Middle East Asia, and Africa.",
    features: [
      "Financial Accounting — vouchers, ledgers, trial balance, balance sheets",
      "Inventory Management — batch, serial number, parameter-wise tracking",
      "Configurable Invoicing — party, item-wise and date-wise pricing",
      "Comprehensive GST Module — billing to return filing, e-Way Bill & e-Invoice",
      "Operations Management — indent, quotation, order, challan, payroll",
      "Mobile App — access business data anywhere, anytime",
      "Bill of Material & Production tracking",
      "Multi-branch and multi-location support",
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
      "Scalable and efficient browser applications that are user-friendly, innovative, and bring your customers closer.",
    description:
      "Trion Informatique creates for you scalable and efficient browser applications, which are user-friendly and innovative. Get control on your daily work activities by creating custom inbuilt applications to make your workflow enjoyable, interactive, and result oriented. Our expert team can assist you to bring your customers and well-wishers closer through purpose-built digital tools.",
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
      "Functional websites that enable your business to connect with customers, build relationships, and drive sales.",
    description:
      "We build functional websites that enable your business to connect with customers, build relationships, drive sales, and thrive in today's digital marketplace. Create engaging, accessible, and user-friendly digital experiences that meet the expectations of your customers. Let your pages reflect your true passion and project your brand and services with clarity.",
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
      "Ignite your brand's digital ascent with strategic social media campaigns and targeted SEO that amplify your resonance.",
    description:
      "Ignite your brand's digital ascent with our dynamic Digital Marketing solutions. Seamlessly integrating strategic social media campaigns and targeted SEO, we create a tailored strategy for your unique goals. From strategic social media campaigns to precision-targeted SEO, we amplify your brand's resonance. Craft compelling narratives, engage your audience, and foster meaningful connections across platforms.",
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
