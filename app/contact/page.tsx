import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { getSiteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Chhajed Estate for property inquiries, site visits, and builder partnerships.",
};

type Settings = {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  hours_weekday: string;
  hours_weekend: string;
};

const DEFAULTS: Settings = {
  phone: "+91 9422500152",
  email: "gautamchhajed5751@gmail.com",
  whatsapp: "919422500152",
  address: "Pune, Maharashtra, India",
  hours_weekday: "Mon – Sat: 9:00 AM – 8:00 PM",
  hours_weekend: "Sunday: 10:00 AM – 5:00 PM",
};

export default async function ContactPage() {
  const s = await getSiteConfig<Settings>("settings", DEFAULTS);

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      lines: [s.phone],
      action: { href: `tel:${s.phone.replace(/[^0-9]/g, "")}`, label: "Call Now" },
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      lines: [s.phone],
      action: {
        href: `https://wa.me/${s.whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20your%20properties.`,
        label: "Chat Now",
      },
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: [s.email],
      action: { href: `mailto:${s.email}`, label: "Send Email" },
    },
    {
      icon: MapPin,
      title: "Our Location",
      lines: [s.address],
      action: null,
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: [s.hours_weekday, s.hours_weekend],
      action: null,
    },
  ];

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
            Get In Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mt-3 mb-6">
            Contact Us
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-[#D4A017] to-[#F0C040] mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We&apos;re here to help you find the perfect property. Reach out for
            inquiries, site visits, or builder partnerships.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contactInfo.map((info, i) => (
              <AnimatedSection key={info.title} delay={i * 0.07}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/35 rounded-xl p-5 h-full transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A017]/10 flex items-center justify-center mb-4">
                    <info.icon size={18} className="text-[#D4A017]" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-xs leading-relaxed">
                      {line}
                    </p>
                  ))}
                  {info.action && (
                    <a
                      href={info.action.href}
                      target={info.action.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-3 inline-flex text-[#D4A017] text-xs font-medium hover:underline"
                    >
                      {info.action.label} →
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <AnimatedSection direction="left">
              <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                Send Us a Message
              </span>
              <h2 className="font-display text-3xl text-white font-bold mt-3 mb-8">
                Book a Site Visit or
                <br />
                <span className="text-gold-gradient">Request Details</span>
              </h2>
              <div className="bg-[#111111] border border-[#D4A017]/20 rounded-2xl p-8">
                <ContactForm
                  title="Submit Your Inquiry"
                  subtitle="Fill in your details and our expert will call you back shortly."
                />
              </div>
            </AnimatedSection>

            {/* Info + Map */}
            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-6">
                {/* Quick Contact */}
                <div className="bg-[#111111] border border-[#D4A017]/20 rounded-2xl p-8">
                  <h3 className="font-display text-xl text-white font-semibold mb-6">
                    Reach Us Directly
                  </h3>
                  <div className="space-y-5">
                    <a
                      href={`tel:${s.phone.replace(/[^0-9]/g, "")}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#D4A017]/10 flex items-center justify-center group-hover:bg-[#D4A017]/20 transition-colors">
                        <Phone size={18} className="text-[#D4A017]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">
                          Phone / WhatsApp
                        </p>
                        <p className="text-white font-medium">{s.phone}</p>
                      </div>
                    </a>

                    <a
                      href={`mailto:${s.email}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#D4A017]/10 flex items-center justify-center group-hover:bg-[#D4A017]/20 transition-colors">
                        <Mail size={18} className="text-[#D4A017]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">
                          Email
                        </p>
                        <p className="text-white font-medium break-all">
                          {s.email}
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#D4A017]/10 flex items-center justify-center">
                        <MapPin size={18} className="text-[#D4A017]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">
                          Location
                        </p>
                        <p className="text-white font-medium">{s.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <a
                      href={`tel:${s.phone.replace(/[^0-9]/g, "")}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm py-3.5 rounded transition-colors"
                    >
                      <Phone size={14} />
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/${s.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20site%20visit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-[#D4A017]/40 text-[#D4A017] hover:bg-[#D4A017]/10 text-sm py-3.5 rounded transition-colors"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="bg-[#111111] border border-[#D4A017]/20 rounded-2xl overflow-hidden">
                  <div className="h-64 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242901.37561491376!2d73.72272756736124!3d18.524564199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(80%) invert(90%)" }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Chhajed Estate Location - Pune"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-gray-500 text-xs">
                      Serving clients across Pune - Kondhwa, Bibwewadi, Katraj,
                      and surrounding areas
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display text-2xl text-white font-bold">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {[
              {
                q: "How long does it take to get a response?",
                a: `Our team responds to all inquiries within 2-4 working hours. For urgent matters, please call us directly at ${s.phone}.`,
              },
              {
                q: "Do you arrange site visits?",
                a: "Yes! We arrange free site visits for all our projects at your convenience. Simply submit the enquiry form or call/WhatsApp us.",
              },
              {
                q: "Can you assist with home loans?",
                a: "Absolutely. We work with leading banks and NBFCs to help you get the best home loan rates. Our team will guide you through the entire process.",
              },
              {
                q: "Do you work with builders for project sales?",
                a: "Yes, we offer sole selling mandates and project marketing services. Contact us to discuss your project requirements.",
              },
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-[#111111] border border-[#1E1E1E] hover:border-[#D4A017]/25 rounded-xl p-6 transition-colors">
                  <h4 className="text-white font-semibold text-sm mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
