import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const menuItems = [
  { label: "Services", href: "/catalog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${
        scrolled
          ? "glass-bright shadow-lg shadow-cyan-900/10 py-3"
          : "glass py-4"
      } rounded-2xl`}
    >
      <div className="flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-sm tracking-tight">
            T
          </div>
          <span className="text-base font-bold tracking-tight text-white hidden sm:block">
            Trion <span className="text-cyan-400">Informatique</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) =>
            item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link
                key={item.label}
                to={item.href}
                className="px-3 py-1.5 text-[13px] font-medium text-white/60 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-[13px] font-medium text-white/60 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </a>
            )
          )}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+919895168851"
            className="glow-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-cyan-300 shrink-0"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">Call Now</span>
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white/70 hover:text-cyan-400 transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-white/5 mt-3">
              {menuItems.map((item) =>
                item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-white/60 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-white/60 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
