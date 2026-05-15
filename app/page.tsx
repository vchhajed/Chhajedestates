"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Award,
  Users,
  TrendingUp,
  ShieldCheck,
  Building2,
  MapPin,
  Bed,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const DEFAULT_STATS = [
  { value: "500+", label: "Happy Families" },
  { value: "78+", label: "Units Sold" },
  { value: "10+", label: "Premium Projects" },
  { value: "15+", label: "Years Experience" },
];

const whyChooseUs = [
  {
    icon: Award,
    title: "Exclusive Mandates",
    desc: "Sole selling rights on premium builder projects, giving you access to properties before they hit the market.",
  },
  {
    icon: TrendingUp,
    title: "High ROI Properties",
    desc: "Strategically selected projects in high-growth Pune micro-markets for maximum returns.",
  },
  {
    icon: Building2,
    title: "Strong Builder Network",
    desc: "Deep relationships with Pune's top builders and developers, ensuring verified, RERA-compliant projects.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Service",
    desc: "From site visits and negotiations to documentation and possession — we handle it all for you.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    desc: "Over 500 happy families and counting. Our reputation is built on honesty, transparency, and results.",
  },
  {
    icon: Star,
    title: "Premium Consulting",
    desc: "Expert market analysis and project positioning advice so you make the most informed decision.",
  },
];

const featuredProjects = [
  {
    id: "vatsalya",
    name: "Vatsalya Tower",
    location: "Katraj Kondhwa Road",
    config: "2 / 3 / 4 BHK",
    units: "33 Flats",
    tag: "Possession Soon",
    tagColor: "bg-green-500/20 text-green-400",
    rera: "P52100031866",
    highlight: "Jain Temple IN Premises • 95L+",
    possession: "Ready in 2 Months",
    price: "₹95 Lacs+",
    image: "/images/vatsalya-1.jpeg",
  },
  {
    id: "emerald",
    name: "Emerald Vista",
    location: "Ekbote Colony, Pune",
    config: "2 & 3 BHK",
    units: "Last 5 Units!",
    tag: "Last 5 Units",
    tagColor: "bg-red-500/20 text-red-400",
    rera: "P52100076742",
    highlight: "Near Jain Mandir • Vastu Compliant",
    possession: "12 Months",
    price: "₹1.31 Cr+",
    image: "/images/emerald-vista-render.jpeg",
  },
  {
    id: "vrindanand",
    name: "Vrindanand Parshwa",
    location: "Timber Merchant Colony",
    config: "3 & 4 BHK Luxury",
    units: "14 Exclusive Flats",
    tag: "Ultra Luxury",
    tagColor: "bg-[#D4A017]/20 text-[#D4A017]",
    rera: null,
    highlight: "Rooftop Amenities • ₹2.70Cr onwards",
    possession: "On Request",
    price: "₹2.70 Cr+",
    image: null,
  },
  {
    id: "ranawat",
    name: "Ranawat Group Project",
    location: "Pune",
    config: "2 & 3 BHK",
    units: "149 Residences",
    tag: "RERA Registered",
    tagColor: "bg-green-500/20 text-green-400",
    rera: "P52100080993",
    highlight: "32 Amenities • 1 Acre Tower",
    possession: "Dec 2028",
    price: "On Request",
    image: "/images/ranawat-render.jpg",
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    role: "2 BHK Buyer, Girnar 108",
    text: "Chhajed Estate helped us find the perfect home in Kondhwa. Their market knowledge and transparent process made everything smooth.",
    rating: 5,
  },
  {
    name: "Priya Jain",
    role: "Investor, Ranawat Project",
    text: "Outstanding service! They understood our investment goals and guided us to a project with excellent ROI potential.",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    role: "Builder Partner",
    text: "As a builder, Chhajed Estate's sole selling mandate approach is phenomenal. They sold 18 units faster than expected.",
    rating: 5,
  },
];

export default function HomePage() {
  const [liveStats, setLiveStats] = useState(DEFAULT_STATS);
  const [liveTestimonials, setLiveTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [liveFeatured, setLiveFeatured] = useState(featuredProjects);
  const [heroBadge, setHeroBadge] = useState("Premium Real Estate Consultancy, Pune");
  const [heroHeading, setHeroHeading] = useState("Premium Real Estate Solutions for Builders & Buyers");
  const [heroSubheading, setHeroSubheading] = useState(
    "Unlock Maximum Value for Your Project with Our Expertise. Exclusive mandates, high-ROI properties, and trusted partnerships across Pune."
  );
  const [heroBgImage, setHeroBgImage] = useState("/images/ranawat-render.jpg");

  useEffect(() => {
    supabase
      .from("site_config")
      .select("key, value")
      .in("key", ["hero", "stats", "testimonials", "featuredProjects"])
      .then(({ data }) => {
        if (!data) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const map = Object.fromEntries(data.map((r) => [r.key, r.value])) as Record<string, any>;
        if (map.hero?.badge) setHeroBadge(map.hero.badge);
        if (map.hero?.heading) setHeroHeading(map.hero.heading);
        if (map.hero?.subheading) setHeroSubheading(map.hero.subheading);
        if (map.hero?.bgImage) setHeroBgImage(map.hero.bgImage);
        if (map.stats?.length) setLiveStats(map.stats);
        if (map.testimonials?.length) setLiveTestimonials(map.testimonials);
        if (map.featuredProjects?.length) setLiveFeatured(map.featuredProjects);
      });
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src={heroBgImage}
            alt="Premium Real Estate — Chhajed Estate"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(26,18,8,0.82) 40%, rgba(10,10,10,0.90) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,160,23,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-[#D4A017]/30 bg-[#D4A017]/5 px-4 py-2 rounded-full mb-6"
            >
              <Star size={12} className="text-[#D4A017] fill-[#D4A017]" />
              <span className="text-[#D4A017] text-xs font-medium tracking-widest uppercase">
                {heroBadge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {heroHeading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg"
            >
              {heroSubheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="flex items-center gap-2 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold px-7 py-3.5 rounded transition-all duration-300 hover:gap-3"
              >
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 border border-[#D4A017]/50 text-white hover:border-[#D4A017] hover:bg-[#D4A017]/10 px-7 py-3.5 rounded transition-all duration-300"
              >
                Book Site Visit
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-4 gap-6 mt-14 pt-10 border-t border-[#D4A017]/15"
            >
              {liveStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-[#D4A017]">
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#111111] border border-[#D4A017]/20 rounded-2xl p-8 shadow-2xl"
          >
            <div className="mb-6">
              <h2 className="font-display text-xl text-white font-semibold">
                Get Project Details
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Our experts will contact you within hours.
              </p>
            </div>
            <ContactForm compact />
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                About Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3 mb-6 leading-tight">
                Pune's Most Trusted
                <br />
                <span className="text-gold-gradient">Real Estate Partner</span>
              </h2>
              <div className="gold-divider" style={{ margin: "0 0 1.5rem 0" }} />
              <p className="text-gray-400 leading-relaxed mb-6">
                Chhajed Estate is a premium real estate consultancy based in
                Pune, specializing in exclusive builder project sales, sole
                selling mandates, and high-value residential properties.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our expertise spans the entire spectrum — from luxury apartments
                in prime Pune locations to affordable quality homes for families.
                We work closely with top builders to deliver maximum value for
                both buyers and developers.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Sole Selling Mandates",
                  "Builder Partnerships",
                  "Market Analysis",
                  "Project Positioning",
                  "RERA Compliant",
                  "Jain Community Focus",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#D4A017] font-medium hover:gap-3 transition-all duration-300 group"
              >
                Learn More About Us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    num: "18",
                    label: "Flats Sold",
                    sub: "Padmavati Nakshatra",
                    bg: "bg-[#1A1208]",
                  },
                  {
                    num: "20+",
                    label: "Units Sold",
                    sub: "Girnar 108",
                    bg: "bg-[#121218]",
                  },
                  {
                    num: "149",
                    label: "Residences",
                    sub: "Ranawat Project",
                    bg: "bg-[#0A1218]",
                  },
                  {
                    num: "32",
                    label: "Amenities",
                    sub: "Ranawat Project",
                    bg: "bg-[#081210]",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={`${card.bg} border border-[#D4A017]/15 rounded-xl p-6 hover:border-[#D4A017]/40 transition-colors`}
                  >
                    <p className="font-display text-3xl font-bold text-[#D4A017]">
                      {card.num}
                    </p>
                    <p className="text-white font-medium text-sm mt-1">
                      {card.label}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{card.sub}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Ongoing Projects
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Featured Properties
            </h2>
            <div className="gold-divider mt-4" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveFeatured.map((project, i) => (
              <AnimatedSection key={project.name} delay={i * 0.1}>
                <div className="project-card bg-[#111111] border border-[#2A2A2A] hover:border-[#D4A017]/40 rounded-xl overflow-hidden group flex flex-col">
                  {/* Card image or gradient */}
                  <div className="relative h-36 overflow-hidden">
                    {project.image ? (
                      <>
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#121218] to-[#0A0A0A] flex items-center justify-center">
                        <Building2 size={32} className="text-[#D4A017]/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border ${project.tagColor}`}>
                        {project.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs font-bold text-white bg-[#D4A017] px-2.5 py-1 rounded">
                        {project.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-white font-semibold text-base leading-tight mb-1">
                      {project.name}
                    </h3>

                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                      <MapPin size={11} />
                      {project.location}
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                      <Bed size={11} className="text-[#D4A017]" />
                      {project.config}
                    </div>

                    <p className="text-gray-600 text-xs mb-2">{project.highlight}</p>

                    <p className="text-[#D4A017] text-xs font-medium mb-4">
                      Possession: {project.possession}
                    </p>

                    <Link
                      href={`/projects#${project.id}`}
                      className="mt-auto w-full flex items-center justify-center gap-2 border border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017] hover:text-black text-xs font-semibold py-2.5 rounded transition-all duration-300"
                    >
                      View Details
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-[#D4A017]/40 text-[#D4A017] hover:bg-[#D4A017] hover:text-black font-semibold px-8 py-3.5 rounded transition-all duration-300"
            >
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              The Chhajed Estate Advantage
            </h2>
            <div className="gold-divider mt-4" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/30 rounded-xl p-7 transition-all duration-300 group h-full">
                  <div className="w-11 h-11 rounded-lg bg-[#D4A017]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4A017]/20 transition-colors">
                    <item.icon size={20} className="text-[#D4A017]" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLD PROJECTS PREVIEW ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Track Record
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Projects Delivered
            </h2>
            <div className="gold-divider mt-4" />
            <p className="text-gray-400 text-sm mt-4 max-w-xl mx-auto">
              Our proven record of successfully sold projects speaks for our
              expertise and commitment.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: "Padmavati Nakshatra",
                location: "Gurunanak Nagar, Opp Kumar Pacific Mall",
                config: "2 BHK • 900 sq.ft carpet",
                units: "18 Flats",
                sold: "100% Sold",
                bg: "from-[#1a1208]",
              },
              {
                name: "Girnar 108",
                location: "Vit Chowk, Kondhwa Budruk",
                config: "2 / 2.5 / 3 BHK",
                units: "60 Flats",
                sold: "20 Units Sold",
                bg: "from-[#121218]",
              },
            ].map((p) => (
              <AnimatedSection key={p.name} delay={0.1}>
                <div
                  className={`bg-gradient-to-br ${p.bg} to-[#0A0A0A] border border-[#D4A017]/20 rounded-xl p-7`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-white text-xl font-bold">
                      {p.name}
                    </h3>
                    <span className="bg-[#D4A017]/20 text-[#D4A017] text-xs font-semibold px-3 py-1 rounded-full">
                      {p.sold}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin size={12} />
                    {p.location}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-4 pt-4 border-t border-[#D4A017]/10">
                    <span>
                      <span className="text-[#D4A017] font-medium">
                        {p.units}
                      </span>{" "}
                      Total
                    </span>
                    <span className="text-gray-600">•</span>
                    <span>{p.config}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/projects-sold"
              className="inline-flex items-center gap-2 border border-[#D4A017]/40 text-[#D4A017] hover:bg-[#D4A017] hover:text-black font-semibold px-8 py-3.5 rounded transition-all duration-300"
            >
              View All Sold Projects
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Testimonials
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              What Our Clients Say
            </h2>
            <div className="gold-divider mt-4" />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {liveTestimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/25 rounded-xl p-7 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-[#D4A017] fill-[#D4A017]"
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6 pt-5 border-t border-[#1E1E1E]">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#D4A017] text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div
              className="rounded-2xl border border-[#D4A017]/25 p-10 sm:p-14 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1A1208 0%, #0D0D0D 50%, #121218 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, #D4A017 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                  Get In Touch
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3 mb-4">
                  Ready to Find Your Dream Home?
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-8">
                  Book a free site visit with our expert consultants. We'll help
                  you find the perfect property that matches your budget, needs,
                  and aspirations.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold px-8 py-3.5 rounded transition-all duration-300"
                  >
                    Book Site Visit
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="https://wa.me/919422500152?text=Hi%2C%20I%20want%20to%20book%20a%20site%20visit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[#D4A017]/40 text-white hover:border-[#D4A017] hover:bg-[#D4A017]/10 px-8 py-3.5 rounded transition-all duration-300"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
