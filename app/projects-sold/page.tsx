import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Building2, ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Sold Projects",
  description:
    "Chhajed Estate's proven track record — Padmavati Nakshatra (18/18 sold), Girnar 108 (20+ sold at Vit Chowk Kondhwa), and 6+ resale properties.",
};

const soldProjects = [
  {
    name: "Padmavati Nakshatra",
    location: "Gurunanak Nagar",
    sublocation: "Opp Kumar Pacific Mall, Pune",
    config: "2 BHK",
    carpetArea: "900 sq.ft carpet",
    totalUnits: 18,
    soldUnits: 18,
    soldPercent: 100,
    status: "100% Sold",
    statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
    highlights: [
      "All 18 flats sold — 100% achievement",
      "Premium 2 BHK — 900 sq.ft carpet each",
      "Prime location: Gurunanak Nagar",
      "Opposite Kumar Pacific Mall",
      "Sole selling mandate by Chhajed Estate",
      "Completely delivered to buyers",
    ],
    gradient: "from-[#1a1208]",
    image: null,
  },
  {
    name: "Girnar 108",
    location: "Vit Chowk, Kondhwa Budruk",
    sublocation: "At Katraj Kondhwa Budruk, Pune",
    config: "2 / 2.5 / 3 BHK",
    carpetArea: "2BHK 990 sq.ft • 3BHK 1100 & 1300 sq.ft",
    totalUnits: 60,
    soldUnits: 20,
    soldPercent: 33,
    status: "20 Units Sold",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    highlights: [
      "60 total flats in the project",
      "2 BHK: 990 sq.ft carpet area",
      "3 BHK: 1100 & 1300 sq.ft carpet",
      "20 units sold through Chhajed Estate",
      "Vit Chowk — well-connected Kondhwa location",
      "Multiple configurations: 2, 2.5 & 3 BHK",
    ],
    gradient: "from-[#121218]",
    image: null,
  },
];

const resaleProperties = [
  { name: "Kumar Prithvi Phase I", config: "Premium Apartments", location: "Pune", image: null },
  { name: "Srivatsa", config: "Premium Residences", location: "Pune", image: "/images/srivatsa.jpeg" },
  { name: "Kumar Prithvi Phase II", config: "Premium Apartments", location: "Pune", image: null },
  { name: "Eisha Pearl", config: "Luxury Residences", location: "Pune", image: null },
  { name: "Shankeshwar Residency", config: "2 & 3 BHK", location: "Pune", image: null },
];

const builderSaleProperties = [
  { name: "Majestique Crown", config: "Premium Residences", location: "Pune", image: "/images/antariksh.jpeg" },
  { name: "Srivatsa", config: "Premium Residences", location: "Pune", image: "/images/srivatsa.jpeg" },
];

export default function ProjectsSoldPage() {
  return (
    <>
      {/* Page Header */}
      <section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          background:
            "linear-gradient(135deg, #0A0A0A 0%, #1A1208 50%, #0A0A0A 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,23,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
            Our Track Record
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mt-3 mb-6">
            Projects Sold
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-[#D4A017] to-[#F0C040] mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Numbers that speak for themselves — every unit sold is a family
            whose trust we have earned.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-y border-[#D4A017]/15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "38+", label: "Units Sold (Direct)" },
              { value: "2", label: "Sole Mandates Delivered" },
              { value: "100%", label: "Padmavati Nakshatra" },
              { value: "6+", label: "Resale Properties" },
            ].map((s) => (
              <AnimatedSection key={s.label}>
                <p className="font-display text-3xl font-bold text-[#D4A017]">
                  {s.value}
                </p>
                <p className="text-gray-400 text-sm mt-1">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sold Projects Detail */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Completed & Delivered
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Successfully Sold Projects
            </h2>
            <div className="gold-divider mt-4" />
          </AnimatedSection>

          <div className="space-y-10">
            {soldProjects.map((project, i) => (
              <AnimatedSection key={project.name} delay={i * 0.1}>
                <div
                  className="rounded-2xl border border-[#D4A017]/20 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradient.replace(
                      "from-",
                      ""
                    )} 0%, #0D0D0D 100%)`,
                  }}
                >
                  <div className="grid md:grid-cols-3">
                    {/* Left — Project Info */}
                    <div className="md:col-span-2 p-8 sm:p-10">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                          <h3 className="font-display text-2xl sm:text-3xl text-white font-bold">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1.5">
                            <MapPin size={13} />
                            {project.location}
                          </div>
                          <p className="text-gray-600 text-xs mt-0.5 pl-4">
                            {project.sublocation}
                          </p>
                        </div>
                        <span
                          className={`border text-xs font-semibold px-4 py-1.5 rounded-full shrink-0 ${project.statusColor}`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Sales Achievement</span>
                          <span className="text-[#D4A017] font-medium">
                            {project.soldUnits} / {project.totalUnits} units sold
                          </span>
                        </div>
                        <div className="h-2.5 bg-[#1E1E1E] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#D4A017] to-[#F0C040] transition-all"
                            style={{ width: `${project.soldPercent}%` }}
                          />
                        </div>
                        <p className="text-right text-xs text-gray-600 mt-1">
                          {project.soldPercent}% sold
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Bed size={14} className="text-[#D4A017]" />
                          {project.config}
                        </div>
                        <div className="text-gray-600">•</div>
                        <div className="text-gray-400">{project.carpetArea}</div>
                      </div>

                      <ul className="space-y-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-3">
                            <CheckCircle size={14} className="text-[#D4A017] mt-0.5 shrink-0" />
                            <span className="text-gray-400 text-sm">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right — Stats Panel */}
                    <div className="border-t md:border-t-0 md:border-l border-[#D4A017]/15 p-8 flex flex-col justify-center gap-5">
                      <div className="text-center">
                        <Building2 size={26} className="text-[#D4A017] mx-auto mb-2" />
                        <p className="font-display text-4xl font-bold text-[#D4A017]">
                          {project.totalUnits}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">Total Flats</p>
                      </div>
                      <div className="h-px bg-[#D4A017]/15" />
                      <div className="text-center">
                        <p className="font-display text-4xl font-bold text-white">
                          {project.soldUnits}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">Units Sold</p>
                      </div>
                      <div className="h-px bg-[#D4A017]/15" />
                      <div className="text-center">
                        <p className="font-display text-xl font-bold text-[#D4A017]">
                          {project.config}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">Configuration</p>
                      </div>
                      <div className="h-px bg-[#D4A017]/15" />
                      <div className="text-center">
                        <p className="text-white text-xs font-medium">{project.carpetArea}</p>
                        <p className="text-gray-600 text-xs mt-0.5">Carpet Area</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Resale Properties */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Resale Inventory
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Resale Properties
            </h2>
            <div className="gold-divider mt-4" />
            <p className="text-gray-400 text-sm mt-4 max-w-xl mx-auto">
              We also handle premium resale properties from trusted established
              projects. Contact us for current availability and best pricing.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resaleProperties.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.07}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/35 rounded-xl overflow-hidden project-card group">
                  {p.image && (
                    <div className="relative w-full h-40">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="400px" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-white font-semibold text-base">
                        {p.name}
                      </h3>
                      <span className="text-xs text-[#D4A017] border border-[#D4A017]/30 px-2.5 py-1 rounded-full shrink-0 ml-2">
                        Resale
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <MapPin size={12} />
                      {p.location}
                    </div>
                    <p className="text-gray-600 text-sm">{p.config}</p>
                    <div className="mt-5 pt-4 border-t border-[#1E1E1E]">
                      <Link
                        href="/contact"
                        className="text-[#D4A017] text-xs font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all group-hover:text-[#F0C040]"
                      >
                        Enquire About Pricing
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Builder Sale */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Builder Sale
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Builder Sale Properties
            </h2>
            <div className="gold-divider mt-4" />
            <p className="text-gray-400 text-sm mt-4 max-w-xl mx-auto">
              Direct builder sale properties available through Chhajed Estates.
              Contact us for pricing and site visit.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {builderSaleProperties.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.07}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/35 rounded-xl overflow-hidden project-card group">
                  {p.image && (
                    <div className="relative w-full h-40">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="400px" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-white font-semibold text-base">
                        {p.name}
                      </h3>
                      <span className="text-xs text-[#D4A017] border border-[#D4A017]/30 px-2.5 py-1 rounded-full shrink-0 ml-2">
                        Builder Sale
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <MapPin size={12} />
                      {p.location}
                    </div>
                    <p className="text-gray-600 text-sm">{p.config}</p>
                    <div className="mt-5 pt-4 border-t border-[#1E1E1E]">
                      <Link
                        href="/contact"
                        className="text-[#D4A017] text-xs font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all group-hover:text-[#F0C040]"
                      >
                        Enquire About Pricing
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div
              className="rounded-2xl border border-[#D4A017]/25 p-10 sm:p-14 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1A1208 0%, #0D0D0D 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, #D4A017 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-4">
                  Looking for More Options?
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-8">
                  Explore our currently available projects or contact us for
                  resale pricing and availability.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/projects"
                    className="flex items-center gap-2 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold px-8 py-3.5 rounded transition-all duration-300"
                  >
                    View Ongoing Projects
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 border border-[#D4A017]/40 text-white hover:border-[#D4A017] px-8 py-3.5 rounded transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
