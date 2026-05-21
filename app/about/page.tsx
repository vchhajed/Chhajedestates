import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Target, Eye, Heart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Chhajed Estate — Pune's trusted real estate consultancy. Specializing in sole selling mandates, builder partnerships, and premium residential projects.",
};

const milestones = [
  { year: "2010", event: "Founded Chhajed Estate in Pune" },
  { year: "2015", event: "First sole selling mandate — 100% sold" },
  { year: "2018", event: "Expanded to luxury residential segment" },
  { year: "2020", event: "Girnar 108 — 60 flats, 20+ units sold" },
  { year: "2022", event: "Padmavati Nakshatra — 18/18 units sold" },
  { year: "2024", event: "5 new premium projects onboarded" },
];

const expertise = [
  {
    icon: Target,
    title: "Project Positioning",
    desc: "We analyze market trends, competitor pricing, and buyer sentiment to position your project for maximum absorption and optimal pricing.",
  },
  {
    icon: CheckCircle,
    title: "Sole Selling Mandates",
    desc: "We take full responsibility for project sales — from launch strategy and marketing to buyer qualification and closure.",
  },
  {
    icon: Eye,
    title: "Market Analysis",
    desc: "Data-driven insights into Pune's micro-markets, helping builders time their launches and buyers make informed decisions.",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    desc: "Every interaction is rooted in honesty, transparency, and a genuine desire to match buyers with properties they'll love.",
  },
];

export default function AboutPage() {
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
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Who We Are
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mt-3 mb-6">
              About Chhajed Estate
            </h1>
            <div
              className="h-px w-16 bg-gradient-to-r from-[#D4A017] to-[#F0C040] mx-auto mb-6"
            />
            <p className="text-gray-400 text-lg leading-relaxed">
              A legacy of trust, expertise, and premium real estate solutions
              across Pune.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <AnimatedSection direction="left">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4A017]/20 shadow-2xl mx-auto" style={{ aspectRatio: "3/4", maxWidth: "320px", background: "linear-gradient(160deg, #1A1208 0%, #0D0D0D 100%)" }}>
                <Image
                  src="/images/about-photo.png"
                  alt="Gautam Chhajed — Chhajed Estates"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-white text-xl font-bold">Gautam Chhajed</p>
                  <p className="text-[#D4A017] text-sm tracking-wide">Founder, Chhajed Estates</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Story text + timeline */}
            <AnimatedSection direction="right" delay={0.2}>
              <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                Our Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3 mb-6">
                Building Dreams,
                <br />
                <span className="text-gold-gradient">Delivering Value</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed mb-10">
                <p>
                  Chhajed Estates was founded with a single mission: to be the
                  most trusted real estate partner for both builders and buyers
                  in Pune. Over the years, we have grown from a boutique
                  consultancy to a recognized name in Pune's premium real estate
                  market.
                </p>
                <p>
                  Our founder, Gautam Chhajed, brings decades of hands-on
                  experience in property sales, market analysis, and builder
                  partnerships. His deep understanding of the Pune market —
                  especially in areas like Kondhwa, Bibwewadi, and Katraj — has
                  helped hundreds of families find their dream homes.
                </p>
                <p>
                  We specialize in exclusive sole selling mandates, where we
                  partner directly with builders to manage the complete sales
                  process. This approach ensures quality service, transparent
                  dealings, and the best outcomes for everyone involved.
                </p>
              </div>

              {/* Timeline inline */}
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-[#D4A017]/20" />
                <div className="space-y-5">
                  {milestones.map((m) => (
                    <div key={m.year} className="flex gap-5 pl-10 relative">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#1A1208] border-2 border-[#D4A017] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#D4A017] rounded-full" />
                      </div>
                      <div>
                        <span className="text-[#D4A017] text-xs font-bold tracking-widest">{m.year}</span>
                        <p className="text-gray-300 text-sm mt-0.5">{m.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              Our Purpose
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Vision & Mission
            </h2>
            <div className="gold-divider mt-4" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div
                className="rounded-xl p-8 border border-[#D4A017]/20 h-full"
                style={{
                  background:
                    "linear-gradient(135deg, #1A1208 0%, #0D0D0D 100%)",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#D4A017]/10 flex items-center justify-center mb-6">
                  <Eye size={22} className="text-[#D4A017]" />
                </div>
                <h3 className="font-display text-white text-xl font-bold mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To be the premier real estate consultancy in Pune, recognized
                  for delivering exceptional value, building lasting
                  relationships, and setting the highest standards of
                  professionalism in property sales and advisory services.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div
                className="rounded-xl p-8 border border-[#D4A017]/20 h-full"
                style={{
                  background:
                    "linear-gradient(135deg, #121218 0%, #0D0D0D 100%)",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#D4A017]/10 flex items-center justify-center mb-6">
                  <Target size={22} className="text-[#D4A017]" />
                </div>
                <h3 className="font-display text-white text-xl font-bold mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To connect quality builders with qualified buyers through
                  expert guidance, transparent dealings, and a relentless focus
                  on client satisfaction — ensuring every property transaction
                  creates maximum value for all stakeholders.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
              What We Do Best
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
              Our Core Expertise
            </h2>
            <div className="gold-divider mt-4" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/30 rounded-xl p-7 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-lg bg-[#D4A017]/10 flex items-center justify-center mb-5">
                    <item.icon size={20} className="text-[#D4A017]" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Builder Partnership Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                For Builders
              </span>
              <h2 className="font-display text-3xl text-white font-bold mt-3 mb-6">
                Partner With Us for
                <br />
                <span className="text-gold-gradient">Maximum Sales</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                We offer comprehensive sole selling mandate services to builders
                and developers. Our approach combines aggressive marketing,
                qualified lead generation, and expert sales management to ensure
                your project achieves full absorption at premium pricing.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Complete sales strategy and project launch planning",
                  "Targeted buyer outreach and lead qualification",
                  "Digital & offline marketing campaign management",
                  "Site visit coordination and buyer engagement",
                  "CRM and inventory management support",
                  "Post-sale documentation assistance",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#D4A017] mt-0.5 shrink-0" />
                    <span className="text-gray-400 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold px-7 py-3.5 rounded transition-all duration-300 group"
              >
                Connect as Builder Partner
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "100%", label: "Sales Achievement", sub: "Padmavati Nakshatra" },
                  { val: "33%", label: "Sold at Girnar 108", sub: "Ongoing mandate" },
                  { val: "149", label: "Units — Ranawat", sub: "Active mandate" },
                  { val: "5+", label: "Active Mandates", sub: "Across Pune" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#111111] border border-[#D4A017]/15 rounded-xl p-6 hover:border-[#D4A017]/35 transition-colors"
                  >
                    <p className="font-display text-3xl font-bold text-[#D4A017]">
                      {s.val}
                    </p>
                    <p className="text-white font-medium text-sm mt-1">
                      {s.label}
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <h2 className="font-display text-3xl text-white font-bold mb-4">
                Get in Touch With Our Team
              </h2>
              <p className="text-gray-400 mb-6">
                Whether you're a buyer looking for your dream home, an investor
                seeking high-ROI properties, or a builder wanting to maximize
                sales — we're here to help.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:9422500152"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D4A017] transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-[#D4A017]/10 flex items-center justify-center">
                    📞
                  </span>
                  +91 9422500152
                </a>
                <a
                  href="mailto:gautamchhajed5751@gmail.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D4A017] transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-[#D4A017]/10 flex items-center justify-center">
                    ✉️
                  </span>
                  gautamchhajed5751@gmail.com
                </a>
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
