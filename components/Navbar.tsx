"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/projects-sold", label: "Sold Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#D4A017]/20 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4A017]/30 group-hover:border-[#D4A017] transition-colors">
              <Image
                src="/images/logo.jpeg"
                alt="Chhajed Estates Logo"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-white tracking-[0.15em] uppercase group-hover:text-[#D4A017] transition-colors duration-300 leading-tight">
                Chhajed
              </span>
              <span className="text-[9px] font-light text-[#D4A017] tracking-[0.3em] uppercase leading-tight">
                Estate
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium tracking-wide transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[#D4A017] active"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:9422500152"
              className="hidden sm:flex items-center gap-2 text-sm text-[#D4A017] border border-[#D4A017]/40 hover:border-[#D4A017] hover:bg-[#D4A017]/10 px-4 py-2 rounded transition-all duration-300"
            >
              <Phone size={14} />
              <span>9422500152</span>
            </a>
            <Link
              href="/contact"
              className="hidden md:block bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm px-5 py-2.5 rounded transition-all duration-300"
            >
              Enquire Now
            </Link>
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0A0A0A]/98 border-t border-[#D4A017]/20 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    pathname === link.href
                      ? "text-[#D4A017]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:9422500152"
                className="flex items-center gap-2 text-sm text-[#D4A017] mt-2"
              >
                <Phone size={14} />
                9422500152
              </a>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-[#D4A017] text-black font-semibold text-sm px-5 py-3 rounded text-center"
              >
                Enquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
