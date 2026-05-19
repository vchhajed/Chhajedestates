import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#D4A017]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#D4A017]/30 shrink-0">
                <Image
                  src="/images/logo.jpeg"
                  alt="Chhajed Estates Logo"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white tracking-wider block">
                  CHHAJED
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="h-px w-5 bg-[#D4A017]" />
                  <span className="text-[9px] font-light text-[#D4A017] tracking-[0.25em] uppercase">
                    Estates
                  </span>
                  <div className="h-px w-5 bg-[#D4A017]" />
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Unlock Maximum Value for Your Project with Our Expertise. Premium
              real estate consultancy for builders & buyers in Pune.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#D4A017]/30 flex items-center justify-center text-[#D4A017] hover:bg-[#D4A017]/10 transition-colors"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#D4A017]/30 flex items-center justify-center text-[#D4A017] hover:bg-[#D4A017]/10 transition-colors"
              >
                <FaFacebookF size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/projects", label: "Ongoing Projects" },
                { href: "/projects-sold", label: "Sold Projects" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4A017] text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#D4A017] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-widest uppercase mb-5">
              Featured Projects
            </h4>
            <ul className="space-y-3">
              {[
                "Giri Shikhar",
                "Vatsalya Tower",
                "Parshwa Vrindanand",
                "Kshitij Bibwewadi",
                "Padmavati Nakshatra",
              ].map((project) => (
                <li key={project}>
                  <Link
                    href="/projects"
                    className="text-gray-400 hover:text-[#D4A017] text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#D4A017] text-xs">›</span>
                    {project}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-widest uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:9422500152"
                  className="flex items-start gap-3 text-gray-400 hover:text-[#D4A017] text-sm transition-colors"
                >
                  <Phone size={15} className="text-[#D4A017] mt-0.5 shrink-0" />
                  +91 9422500152
                </a>
              </li>
              <li>
                <a
                  href="mailto:gautamchhajed5751@gmail.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-[#D4A017] text-sm transition-colors break-all"
                >
                  <Mail size={15} className="text-[#D4A017] mt-0.5 shrink-0" />
                  gautamchhajed5751@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={15} className="text-[#D4A017] mt-0.5 shrink-0" />
                Pune, Maharashtra, India
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-block bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-xs px-5 py-2.5 rounded transition-colors uppercase tracking-widest"
            >
              Book Site Visit
            </Link>
          </div>
        </div>

        <div className="border-t border-[#D4A017]/15 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Chhajed Estates. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            RERA Registered | Premium Real Estate Consultancy, Pune
          </p>
        </div>
      </div>
    </footer>
  );
}
