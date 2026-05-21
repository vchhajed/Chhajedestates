import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Bed,
  ArrowRight,
  CheckCircle,
  Calendar,
  Building2,
  Layers,
  Phone,
  FileText,
  Download,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Available Projects",
  description:
    "Explore Chhajed Estate's premium ongoing residential projects in Pune — Vatsalya Tower (95L+), Emerald Vista (1.31Cr), Vrindanand Parshwa (2.70Cr), Kshitij Bibwewadi, and more.",
};

const ongoingProjects = [
  {
    id: "girishikhar",
    name: "Giri Shikhar",
    tagline: "149 Residences • 32 Amenities • 1 Acre Single Tower",
    location: "Pune",
    sublocation: "RERA Registered — Sole Selling",
    config: "2 & 3 BHK",
    units: 149,
    amenities: 32,
    possession: "December 2028",
    rera: "P52100080993",
    status: "Sole Selling",
    statusColor: "bg-[#D4A017]/20 text-[#D4A017] border-[#D4A017]/30",
    price: "On Request",
    priceNote: "Contact us for pricing",
    image: "/images/ranawat-render.jpg",
    images: ["/images/ranawat-render.jpg"],
    gradient: "from-[#1a1208]",
    highlights: [
      "149 premium residences",
      "1 Acre single tower development",
      "32 lifestyle amenities",
      "RERA Registered: P52100080993",
      "Swimming pool & fully equipped gym",
      "Kids' play area & landscaped gardens",
      "High ROI potential location",
      "Possession: December 2028",
    ],
    amenityList: [
      "Swimming Pool",
      "Gymnasium",
      "Kids Play Area",
      "Clubhouse",
      "Landscaped Gardens",
      "24/7 Security",
      "Intercom Facility",
      "Covered Parking",
    ],
    sizes: [
      "2 BHK — Contact for details",
      "3 BHK — Contact for details",
    ],
    developer: "Kusuma Developers / Padmavati Ventures",
    downloads: [],
  },
  {
    id: "vatsalya",
    name: "Vatsalya Tower",
    tagline: "Premium 2/3/4 BHK • 95 Lacs Onwards — Sole Selling",
    location: "Near Shatrunjay Temple, Kondhwa (BK)",
    sublocation: "Near Gagan Signet, Katraj Kondhwa Road",
    config: "2 / 3 / 4 BHK",
    units: 33,
    amenities: null,
    possession: "Very Soon (2 Months)",
    rera: "P52100031866",
    status: "Sole Selling",
    statusColor: "bg-[#D4A017]/20 text-[#D4A017] border-[#D4A017]/30",
    price: "₹95 Lacs Onwards",
    priceNote: "* T&C apply, taxes extra",
    image: "/images/vatsalya-1.jpeg",
    images: [
      "/images/vatsalya-1.jpeg",
      "/images/vatsalya-2.jpeg",
      "/images/vatsalya-3.jpeg",
      "/images/vatsalya-4.jpeg",
    ],
    gradient: "from-[#0a1218]",
    highlights: [
      "33 premium residential flats",
      "RERA Registered: P52100031866",
      "Possession in just 2 months",
      "95 Lacs onwards — excellent value",
      "Near Gagan Signet township",
      "Katraj Kondhwa Road — high connectivity",
      "2, 3 & 4 BHK configurations available",
    ],
    amenityList: [
      "Covered Parking",
      "Lift",
      "24/7 Security",
      "Quality Finishes",
    ],
    sizes: [
      "2 BHK — 960 sq.ft carpet",
      "2 BHK — 995 sq.ft carpet",
      "3 BHK — 1110 sq.ft carpet",
      "3 BHK — 1232 sq.ft carpet",
      "4 BHK — 1570 sq.ft carpet",
      "4 BHK — 1710 sq.ft carpet",
    ],
    developer: "Vatsalya Properties",
    downloads: [],
  },
  {
    id: "parshwavrindanand",
    name: "Parshwa Vrindanand",
    tagline: "XXL Homes with Exclusive Living • Rooftop Amenities — Sole Selling",
    location: "Timber Merchant Colony, Nr. Seven Loves Chowk",
    sublocation: "Pune — Prime Location",
    config: "3 & 4 BHK Luxury",
    units: 14,
    amenities: 6,
    possession: "On Request",
    rera: null,
    status: "Sole Selling",
    statusColor: "bg-[#D4A017]/20 text-[#D4A017] border-[#D4A017]/30",
    price: "₹2.70 Cr onwards",
    priceNote: "3 BHK all-inclusive",
    image: null,
    images: [],
    gradient: "from-[#121218]",
    highlights: [
      "14 exclusive ultra-luxury residences",
      "3 BHK: 1322 sq.ft carpet",
      "4 BHK: 1710 sq.ft carpet",
      "Spectacular rooftop amenity deck",
      "Timber Merchant Colony — prime Pune location",
      "2 covered car parks included",
      "Project onboarded November 2024",
    ],
    amenityList: [
      "Rooftop Deck",
      "Senior Citizen Area",
      "Fitness Facilities",
      "Pergola Seating",
      "Children's Play Area",
      "Open Air Theatre",
      "Meditation Zone",
      "2 Car Parks",
    ],
    sizes: [
      "3 BHK — 1322 sq.ft (₹2.70 Cr total cost)",
      "4 BHK — 1710 sq.ft (₹3.45 Cr total cost)",
    ],
    developer: "MNT Construction",
    downloads: [
      { label: "3 BHK Cost Sheet", href: "/images/parshwa-cost-3bhk.pdf" },
      { label: "4 BHK Cost Sheet", href: "/images/parshwa-cost-4bhk.pdf" },
      { label: "Floor Plan", href: "/images/parshwa-presentation-plan.pdf" },
      { label: "Typical Floor Plan", href: "/images/parshwa-typical-floor.pdf" },
    ],
  },
  {
    id: "padmavati",
    name: "Padmavati Nakshatra",
    tagline: "100% Sold — Sole Selling Mandate",
    location: "Gurunanak Nagar",
    sublocation: "Opp Kumar Pacific Mall, Pune",
    config: "2 BHK",
    units: 18,
    amenities: null,
    possession: "Delivered",
    rera: null,
    status: "Sold Out",
    statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
    price: "Sold Out",
    priceNote: "All 18 flats sold",
    image: null,
    images: [],
    gradient: "from-[#1a1208]",
    highlights: [
      "All 18 flats sold — 100% achievement",
      "Premium 2 BHK — 900 sq.ft carpet each",
      "Prime location: Gurunanak Nagar",
      "Opposite Kumar Pacific Mall",
      "Sole selling mandate by Chhajed Estates",
      "Completely delivered to buyers",
    ],
    amenityList: [
      "Covered Parking",
      "Lift",
      "24/7 Security",
      "Quality Finishes",
    ],
    sizes: [
      "2 BHK — 900 sq.ft carpet",
    ],
    developer: "Padmavati Group",
    downloads: [],
  },
  {
    id: "emerald",
    name: "Emerald Vista",
    tagline: "Ultra-Spacious 2 & 3 BHK — Sole Selling • All Sold",
    location: "Ekbote Colony, Near Seven Loves Chowk",
    sublocation: "Pune — Vastu Compliant",
    config: "2 & 3 BHK",
    units: 12,
    amenities: null,
    possession: "Delivered",
    rera: "P52100076742",
    status: "Sold Out",
    statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
    price: "Sold Out",
    priceNote: "All units sold",
    image: "/images/emerald-vista-render.jpeg",
    images: ["/images/emerald-vista-render.jpeg", "/images/emerald-vista-poster.jpeg"],
    gradient: "from-[#081210]",
    highlights: [
      "All units sold — sole selling mandate",
      "Vastu compliant design",
      "RERA Registered: P52100076742",
      "Ultra-spacious floor plans",
      "Ekbote Colony — peaceful prime location",
      "Near Seven Loves Chowk",
      "All-inclusive pricing (no hidden costs)",
    ],
    amenityList: [
      "Vastu Compliant",
      "Covered Parking",
      "24/7 Security",
      "Lift",
      "Landscaped Entrance",
    ],
    sizes: [
      "2 BHK — 832 sq.ft carpet",
      "3 BHK — 1120 sq.ft carpet",
    ],
    developer: "Padmavati Group",
    downloads: [],
  },
  {
    id: "kshitij",
    name: "Kshitij Bibwewadi",
    tagline: "Nature's Harmony • The Oasis of Greens — 2 Units Available",
    location: "Bibwewadi Yash Lawns Road",
    sublocation: "Behind Mahaveer Electronics, Bibwewadi, Pune",
    config: "2.5 & 3 BHK",
    units: 56,
    amenities: null,
    possession: "On Request",
    rera: "P52100051523",
    status: "2 Units Available",
    statusColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    price: "On Request",
    priceNote: "Contact us for pricing",
    image: null,
    images: [],
    gradient: "from-[#120a18]",
    highlights: [
      "Only 2 units remaining — limited availability",
      "2.5 & 3 BHK spacious configurations",
      "RERA Registered: P52100051523",
      "Bibwewadi — established premium locality",
      "Nature-themed design — 'Oasis of Greens'",
      "Yash Lawns Road — excellent access",
      "By Pavonine Associates (Trisha + Morphic)",
    ],
    amenityList: [
      "Landscaped Gardens",
      "Children's Play Area",
      "Covered Parking",
      "24/7 Security",
      "Lift",
      "Quality Finishes",
    ],
    sizes: [
      "2.5 BHK — 994 sq.ft carpet",
      "3 BHK — 1216 sq.ft carpet",
    ],
    developer: "Pavonine Associates",
    downloads: [],
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

export default function ProjectsPage() {
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
            Available Properties
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mt-3 mb-6">
            Ongoing Projects
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-[#D4A017] to-[#F0C040] mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Handpicked premium residential projects across Pune — with verified
            RERA numbers, exact carpet areas, and transparent pricing.
          </p>
          {/* Quick project jump */}
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {ongoingProjects.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="text-xs text-gray-400 hover:text-[#D4A017] border border-[#2A2A2A] hover:border-[#D4A017]/40 px-3 py-1.5 rounded-full transition-all"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Project Listings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto space-y-16">
          {ongoingProjects.map((project, i) => (
            <AnimatedSection key={project.id} delay={0.05}>
              <div
                id={project.id}
                className="rounded-2xl border border-[#D4A017]/20 overflow-hidden scroll-mt-24"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient.replace(
                    "from-",
                    ""
                  )} 0%, #0A0A0A 100%)`,
                }}
              >
                {/* Project Header */}
                <div className="border-b border-[#D4A017]/15 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="font-display text-2xl sm:text-3xl text-white font-bold">
                        {project.name}
                      </h2>
                      <span
                        className={`border text-xs font-semibold px-3 py-1 rounded-full ${project.statusColor}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[#D4A017] text-sm">{project.tagline}</p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href={`https://wa.me/919422500152?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                        project.name
                      )}.%20Please%20share%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-[#D4A017]/40 text-[#D4A017] hover:bg-[#D4A017]/10 text-sm px-4 py-2.5 rounded transition-colors"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="tel:9422500152"
                      className="flex items-center gap-2 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm px-5 py-2.5 rounded transition-colors"
                    >
                      <Phone size={14} />
                      Enquire Now
                    </a>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Main Details */}
                  <div className="lg:col-span-2">
                    {/* Image */}
                    {project.image && (
                      <div className="relative h-56 sm:h-72 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                        {/* Price badge */}
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-[#D4A017] text-black font-bold text-sm px-4 py-2 rounded">
                            {project.price}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-8">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
                          <Bed size={16} className="text-[#D4A017] mx-auto mb-1" />
                          <p className="text-white text-xs font-medium leading-tight">{project.config}</p>
                          <p className="text-gray-600 text-xs mt-0.5">Type</p>
                        </div>
                        <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
                          <Building2 size={16} className="text-[#D4A017] mx-auto mb-1" />
                          <p className="text-white text-xs font-medium">{project.units}</p>
                          <p className="text-gray-600 text-xs mt-0.5">Total Units</p>
                        </div>
                        {project.amenities && (
                          <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
                            <Layers size={16} className="text-[#D4A017] mx-auto mb-1" />
                            <p className="text-white text-xs font-medium">{project.amenities}+</p>
                            <p className="text-gray-600 text-xs mt-0.5">Amenities</p>
                          </div>
                        )}
                        <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
                          <Calendar size={16} className="text-[#D4A017] mx-auto mb-1" />
                          <p className="text-white text-xs font-medium leading-tight">{project.possession}</p>
                          <p className="text-gray-600 text-xs mt-0.5">Possession</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="mb-4">
                        <div className="flex items-start gap-2 text-gray-400 text-sm mb-1">
                          <MapPin size={14} className="text-[#D4A017] mt-0.5 shrink-0" />
                          <span>{project.location}</span>
                        </div>
                        <p className="text-gray-600 text-xs pl-5">{project.sublocation}</p>
                      </div>

                      {/* RERA */}
                      {project.rera && (
                        <div className="bg-green-500/5 border border-green-500/20 rounded-lg px-4 py-2 mb-5 inline-flex items-center gap-2">
                          <CheckCircle size={13} className="text-green-400" />
                          <span className="text-green-400 text-xs font-medium">
                            MahaRERA No: {project.rera}
                          </span>
                        </div>
                      )}

                      {/* Highlights */}
                      <h4 className="text-white font-semibold text-sm mb-3">Project Highlights</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.highlights.map((h) => (
                          <div key={h} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017] mt-1.5 shrink-0" />
                            <span className="text-gray-400 text-sm">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Developer */}
                      <p className="text-gray-600 text-xs mt-5">
                        A project by:{" "}
                        <span className="text-gray-400">{project.developer}</span>
                        {" "}• Sold by: <span className="text-[#D4A017]">Chhajed Estate</span>
                      </p>
                    </div>
                  </div>

                  {/* Side Panel */}
                  <div className="border-t lg:border-t-0 lg:border-l border-[#D4A017]/15 p-6 sm:p-8 flex flex-col gap-5">
                    {/* Sizes */}
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-3">Configurations & Sizes</h4>
                      <div className="space-y-2">
                        {project.sizes.map((size) => (
                          <div
                            key={size}
                            className="bg-[#0A0A0A]/60 border border-[#1E1E1E] rounded-lg px-4 py-2.5 text-sm text-gray-300"
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                      {project.priceNote && (
                        <p className="text-gray-600 text-xs mt-2">{project.priceNote}</p>
                      )}
                    </div>

                    {/* Amenities */}
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-3">Key Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.amenityList.map((a) => (
                          <span
                            key={a}
                            className="text-xs text-gray-400 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-1 rounded-full"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Downloads */}
                    {project.downloads.length > 0 && (
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                          <FileText size={14} className="text-[#D4A017]" />
                          Downloads
                        </h4>
                        <div className="space-y-2">
                          {project.downloads.map((d) => (
                            <a
                              key={d.label}
                              href={d.href}
                              download
                              className="flex items-center gap-2 text-xs text-[#D4A017] hover:text-[#F0C040] border border-[#D4A017]/25 hover:border-[#D4A017]/50 px-3 py-2 rounded transition-all"
                            >
                              <Download size={12} />
                              {d.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto space-y-2.5 pt-2">
                      <Link
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm py-3.5 rounded transition-colors"
                      >
                        Book Site Visit
                        <ArrowRight size={14} />
                      </Link>
                      <a
                        href={`https://wa.me/919422500152?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                          project.name
                        )}.%20Please%20share%20details.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 border border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017]/10 text-sm py-3.5 rounded transition-colors"
                      >
                        WhatsApp Enquiry
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Resale Properties */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Other Properties
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Resale Properties
            </h2>
            <div className="gold-divider mt-4" />
            <p className="text-gray-400 text-sm mt-4 max-w-xl mx-auto">
              Premium resale properties from trusted established projects.
              Contact us for current availability and best pricing.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resaleProperties.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.07}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/35 rounded-xl overflow-hidden group">
                  {p.image && (
                    <div className="relative w-full h-40">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="400px" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-white font-semibold text-base">{p.name}</h3>
                      <span className="text-xs text-[#D4A017] border border-[#D4A017]/30 px-2.5 py-1 rounded-full shrink-0 ml-2">Resale</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <MapPin size={12} />{p.location}
                    </div>
                    <p className="text-gray-600 text-sm">{p.config}</p>
                    <div className="mt-5 pt-4 border-t border-[#1E1E1E]">
                      <Link href="/contact" className="text-[#D4A017] text-xs font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all group-hover:text-[#F0C040]">
                        Enquire About Pricing <ArrowRight size={12} />
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
              Other Properties
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
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/35 rounded-xl overflow-hidden group">
                  {p.image && (
                    <div className="relative w-full h-40">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="400px" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-white font-semibold text-base">{p.name}</h3>
                      <span className="text-xs text-[#D4A017] border border-[#D4A017]/30 px-2.5 py-1 rounded-full shrink-0 ml-2">Builder Sale</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <MapPin size={12} />{p.location}
                    </div>
                    <p className="text-gray-600 text-sm">{p.config}</p>
                    <div className="mt-5 pt-4 border-t border-[#1E1E1E]">
                      <Link href="/contact" className="text-[#D4A017] text-xs font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all group-hover:text-[#F0C040]">
                        Enquire About Pricing <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                Get Details
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3 mb-6">
                Interested in a Project?
                <br />
                <span className="text-gold-gradient">Let's Talk</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Our team will provide you with detailed floor plans, payment
                schedules, site visit arrangements, and home loan guidance for
                any project you are interested in.
              </p>
              <div className="space-y-3">
                {[
                  "Free site visit coordination",
                  "Detailed floor plan sharing",
                  "Flexible payment plan guidance",
                  "Home loan assistance",
                  "Legal documentation support",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#D4A017]" />
                    <span className="text-gray-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-[#111111] border border-[#D4A017]/20 rounded-2xl p-8">
                <ContactForm compact />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
