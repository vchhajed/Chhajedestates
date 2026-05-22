"use client";

import React, { useEffect, useState, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import { publishContent } from "@/app/actions/admin";
import {
  Star,
  Globe,
  Save,
  Plus,
  Trash2,
  Camera,
  MapPin,
  Bed,
  ArrowRight,
} from "lucide-react";

// ─── Inline editing primitives ────────────────────────────────────────────────

function Editable({
  value,
  onChange,
  className = "",
  multiline = false,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const editCls =
    "bg-[#D4A017]/10 border border-dashed border-[#D4A017] rounded outline-none";

  if (editing) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          defaultValue={value}
          onBlur={(e) => {
            onChange(e.target.value);
            setEditing(false);
          }}
          className={`${className} ${editCls} resize-none w-full p-1 min-h-[5rem]`}
        />
      );
    }
    return (
      <input
        type="text"
        autoFocus
        defaultValue={value}
        onBlur={(e) => {
          onChange(e.target.value);
          setEditing(false);
        }}
        className={`${className} ${editCls} px-1 w-full`}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      title="Click to edit"
      className={`${className} cursor-pointer hover:ring-1 hover:ring-[#D4A017]/60 hover:ring-offset-2 hover:ring-offset-transparent rounded transition-all`}
    >
      {value || (
        <em className="text-gray-600 not-italic text-xs">click to edit…</em>
      )}
    </span>
  );
}

function EditableImg({
  src,
  onChange,
  alt,
  fill,
  className = "",
}: {
  src: string;
  onChange: (v: string) => void;
  alt: string;
  fill?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(src);

  return (
    <>
      <div
        className={`${fill ? "absolute inset-0" : "relative"} group/img cursor-pointer`}
        onClick={() => {
          setDraft(src);
          setOpen(true);
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className={
              fill ? "w-full h-full object-cover object-center" : className
            }
          />
        ) : (
          <div
            className={`${fill ? "absolute inset-0" : className} bg-[#1A1A1A] flex items-center justify-center`}
          >
            <Camera size={24} className="text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10 rounded pointer-events-none">
          <div className="text-center">
            <Camera size={18} className="text-white mx-auto mb-1" />
            <span className="text-white text-xs font-medium">Change Image</span>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-semibold mb-1">Change Image</h3>
            <p className="text-gray-500 text-xs mb-3">
              Path inside{" "}
              <code className="text-[#D4A017]">/public</code>, e.g.{" "}
              <code className="text-gray-400">/images/photo.jpg</code>
            </p>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="/images/photo.jpg"
              autoFocus
              className="w-full bg-[#0A0A0A] border border-[#3A3A3A] text-white px-3 py-2.5 rounded text-sm focus:border-[#D4A017] outline-none mb-3 font-mono"
            />
            {draft && (
              <div className="relative h-28 rounded overflow-hidden mb-3 bg-[#0A0A0A]">
                <img
                  src={draft}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onChange(draft);
                  setOpen(false);
                }}
                className="flex-1 bg-[#D4A017] text-black font-semibold text-sm py-2.5 rounded hover:bg-[#F0C040] transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-[#3A3A3A] text-gray-400 text-sm py-2.5 rounded hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Types & defaults ─────────────────────────────────────────────────────────

type Hero = {
  badge: string;
  heading: string;
  subheading: string;
  bgImage: string;
};
type Stat = { value: string; label: string };
type Testimonial = { name: string; role: string; text: string; rating: number };
type FeaturedProject = {
  id: string;
  name: string;
  location: string;
  config: string;
  units: string;
  tag: string;
  highlight: string;
  possession: string;
  price: string;
  image: string;
};
type Settings = {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  hours_weekday: string;
  hours_weekend: string;
};

const D_HERO: Hero = {
  badge: "Premium Real Estate Consultancy, Pune",
  heading: "Premium Real Estate Solutions for Builders & Buyers",
  subheading:
    "Unlock Maximum Value for Your Project with Our Expertise. Exclusive mandates, high-ROI properties, and trusted partnerships across Pune.",
  bgImage: "/images/ranawat-render.jpg",
};

const D_STATS: Stat[] = [
  { value: "500+", label: "Happy Families" },
  { value: "78+", label: "Units Sold" },
  { value: "10+", label: "Premium Projects" },
  { value: "15+", label: "Years Experience" },
];

const D_TESTIMONIALS: Testimonial[] = [
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

const D_FEATURED: FeaturedProject[] = [
  {
    id: "girishikhar",
    name: "Giri Shikhar",
    location: "Pune",
    config: "2 & 3 BHK",
    units: "149 Residences",
    tag: "Sole Selling",
    highlight: "32 Amenities • 1 Acre Tower",
    possession: "Dec 2029",
    price: "On Request",
    image: "/images/ranawat-render.jpg",
  },
  {
    id: "vatsalya",
    name: "Vatsalya Tower",
    location: "Katraj Kondhwa Road",
    config: "2 / 3 / 4 BHK",
    units: "33 Flats",
    tag: "Sole Selling",
    highlight: "Sole Selling • 95L+",
    possession: "Ready in 2 Months",
    price: "₹95 Lacs+",
    image: "/images/vatsalya-1.jpeg",
  },
  {
    id: "parshwavrindanand",
    name: "Parshwa Vrindanand",
    location: "Timber Merchant Colony",
    config: "3 & 4 BHK Luxury",
    units: "14 Exclusive Flats",
    tag: "Sole Selling",
    highlight: "Rooftop Amenities • ₹2.70Cr onwards",
    possession: "On Request",
    price: "₹2.70 Cr+",
    image: "",
  },
  {
    id: "kshitij",
    name: "Kshitij Bibwewadi",
    location: "Bibwewadi, Pune",
    config: "2.5 & 3 BHK",
    units: "2 Units Left",
    tag: "2 Units Available",
    highlight: "2 Units Available • Oasis of Greens",
    possession: "On Request",
    price: "On Request",
    image: "",
  },
];

const D_SETTINGS: Settings = {
  phone: "+91 9422500152",
  email: "gautamchhajed5751@gmail.com",
  whatsapp: "919422500152",
  address: "Pune, Maharashtra, India",
  hours_weekday: "Mon – Sat: 9:00 AM – 8:00 PM",
  hours_weekend: "Sunday: 10:00 AM – 5:00 PM",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContentEditorPage() {
  const [hero, setHero] = useState<Hero>(D_HERO);
  const [stats, setStats] = useState<Stat[]>(D_STATS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(D_TESTIMONIALS);
  const [featured, setFeatured] = useState<FeaturedProject[]>(D_FEATURED);
  const [settings, setSettings] = useState<Settings>(D_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    supabase
      .from("site_config")
      .select("key, value")
      .then(({ data }) => {
        if (!data) {
          setLoading(false);
          return;
        }
        const map = Object.fromEntries(
          data.map((r) => [r.key, r.value])
        ) as Record<string, unknown>;
        if (map.hero) setHero({ ...D_HERO, ...(map.hero as Hero) });
        if (Array.isArray(map.stats) && map.stats.length)
          setStats(map.stats as Stat[]);
        if (Array.isArray(map.testimonials) && map.testimonials.length)
          setTestimonials(map.testimonials as Testimonial[]);
        if (
          Array.isArray(map.featuredProjects) &&
          (map.featuredProjects as FeaturedProject[]).length
        )
          setFeatured(map.featuredProjects as FeaturedProject[]);
        if (map.settings)
          setSettings({ ...D_SETTINGS, ...(map.settings as Settings) });
        setLoading(false);
      });
  }, []);

  function handlePublish() {
    startTransition(async () => {
      await publishContent({
        hero,
        stats,
        testimonials,
        featuredProjects: featured,
        settings,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-sm">Loading editor…</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* ── Sticky publish bar ── */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#1E1E1E] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse inline-block" />
          <span className="text-xs text-gray-400">
            Click any text or image to edit it inline
          </span>
        </div>
        <button
          onClick={handlePublish}
          disabled={isPending}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-60 ${
            saved
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-[#D4A017] hover:bg-[#F0C040] text-black"
          }`}
        >
          {saved ? (
            <>
              <Save size={14} /> Saved!
            </>
          ) : isPending ? (
            <>
              <Globe size={14} className="animate-spin" /> Publishing…
            </>
          ) : (
            <>
              <Globe size={14} /> Publish Changes
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-hidden">
        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <EditableImg
              src={hero.bgImage}
              alt="Hero background"
              fill
              onChange={(v) => setHero((h) => ({ ...h, bgImage: v }))}
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

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-[#D4A017]/30 bg-[#D4A017]/5 px-4 py-2 rounded-full mb-6">
                <Star
                  size={12}
                  className="text-[#D4A017] fill-[#D4A017] shrink-0"
                />
                <Editable
                  value={hero.badge}
                  onChange={(v) => setHero((h) => ({ ...h, badge: v }))}
                  className="text-[#D4A017] text-xs font-medium tracking-widest uppercase"
                />
              </div>

              {/* Heading */}
              <div className="mb-6">
                <Editable
                  value={hero.heading}
                  onChange={(v) => setHero((h) => ({ ...h, heading: v }))}
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                />
              </div>

              {/* Subheading */}
              <div className="mb-10 max-w-lg">
                <Editable
                  value={hero.subheading}
                  multiline
                  onChange={(v) => setHero((h) => ({ ...h, subheading: v }))}
                  className="text-gray-300 text-lg leading-relaxed"
                />
              </div>

              {/* CTA buttons — static preview */}
              <div className="flex flex-wrap gap-4 mb-14 pointer-events-none select-none opacity-50">
                <span className="flex items-center gap-2 bg-[#D4A017] text-black font-semibold px-7 py-3.5 rounded text-sm">
                  View Projects <ArrowRight size={16} />
                </span>
                <span className="flex items-center gap-2 border border-[#D4A017]/50 text-white px-7 py-3.5 rounded text-sm">
                  Book Site Visit
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 pt-10 border-t border-[#D4A017]/15">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <Editable
                      value={stat.value}
                      onChange={(v) =>
                        setStats((prev) =>
                          prev.map((s, j) =>
                            j === i ? { ...s, value: v } : s
                          )
                        )
                      }
                      className="font-display text-2xl font-bold text-[#D4A017] block"
                    />
                    <Editable
                      value={stat.label}
                      onChange={(v) =>
                        setStats((prev) =>
                          prev.map((s, j) =>
                            j === i ? { ...s, label: v } : s
                          )
                        )
                      }
                      className="text-gray-500 text-xs mt-1 leading-tight block"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
        </section>

        {/* ════════════════════════════════════════════════
            FEATURED PROJECTS
        ════════════════════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                Ongoing Projects
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
                Featured Properties
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-[#D4A017] to-[#F0C040] mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((project, i) => (
                <div
                  key={project.id}
                  className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <EditableImg
                      src={project.image}
                      alt={project.name}
                      fill
                      className="group-hover:scale-105 transition-transform duration-500"
                      onChange={(v) =>
                        setFeatured((prev) =>
                          prev.map((p, j) =>
                            j === i ? { ...p, image: v } : p
                          )
                        )
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 z-10">
                      <Editable
                        value={project.tag}
                        onChange={(v) =>
                          setFeatured((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, tag: v } : p
                            )
                          )
                        }
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-[#D4A017] border border-[#D4A017]/40"
                      />
                    </div>
                    <div className="absolute bottom-3 right-3 z-10">
                      <Editable
                        value={project.price}
                        onChange={(v) =>
                          setFeatured((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, price: v } : p
                            )
                          )
                        }
                        className="text-xs font-bold text-black bg-[#D4A017] px-2.5 py-1 rounded"
                      />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5 flex flex-col flex-1 gap-1.5">
                    <Editable
                      value={project.name}
                      onChange={(v) =>
                        setFeatured((prev) =>
                          prev.map((p, j) =>
                            j === i ? { ...p, name: v } : p
                          )
                        )
                      }
                      className="font-display text-white font-semibold text-base leading-tight block"
                    />
                    <div className="flex items-center gap-1">
                      <MapPin size={11} className="text-gray-500 shrink-0" />
                      <Editable
                        value={project.location}
                        onChange={(v) =>
                          setFeatured((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, location: v } : p
                            )
                          )
                        }
                        className="text-gray-500 text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed size={11} className="text-[#D4A017] shrink-0" />
                      <Editable
                        value={project.config}
                        onChange={(v) =>
                          setFeatured((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, config: v } : p
                            )
                          )
                        }
                        className="text-gray-400 text-xs"
                      />
                    </div>
                    <Editable
                      value={project.highlight}
                      onChange={(v) =>
                        setFeatured((prev) =>
                          prev.map((p, j) =>
                            j === i ? { ...p, highlight: v } : p
                          )
                        )
                      }
                      className="text-gray-600 text-xs block"
                    />
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-gray-500">Possession:</span>
                      <Editable
                        value={project.possession}
                        onChange={(v) =>
                          setFeatured((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, possession: v } : p
                            )
                          )
                        }
                        className="text-[#D4A017] text-xs font-medium"
                      />
                    </div>
                    <button
                      onClick={() =>
                        setFeatured((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="mt-2 text-xs text-gray-600 hover:text-red-400 transition-colors flex items-center gap-1 self-start"
                    >
                      <Trash2 size={11} /> Remove card
                    </button>
                  </div>
                </div>
              ))}

              {/* Add project */}
              <button
                onClick={() =>
                  setFeatured((prev) => [
                    ...prev,
                    {
                      id: `proj-${Date.now()}`,
                      name: "New Project",
                      location: "Pune",
                      config: "2 & 3 BHK",
                      units: "—",
                      tag: "New",
                      highlight: "",
                      possession: "On Request",
                      price: "On Request",
                      image: "",
                    },
                  ])
                }
                className="border-2 border-dashed border-[#2A2A2A] hover:border-[#D4A017]/50 rounded-xl flex flex-col items-center justify-center gap-2 p-8 text-gray-600 hover:text-[#D4A017] transition-colors min-h-[260px]"
              >
                <Plus size={24} />
                <span className="text-sm">Add Project Card</span>
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[#D4A017] text-xs font-medium tracking-[0.3em] uppercase">
                Testimonials
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mt-3">
                What Our Clients Say
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-[#D4A017] to-[#F0C040] mx-auto mt-4" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-7 flex flex-col"
                >
                  {/* Clickable stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() =>
                          setTestimonials((prev) =>
                            prev.map((x, j) =>
                              j === i ? { ...x, rating: n } : x
                            )
                          )
                        }
                        title={`Set ${n} stars`}
                      >
                        <Star
                          size={14}
                          className={
                            n <= t.rating
                              ? "text-[#D4A017] fill-[#D4A017]"
                              : "text-gray-600"
                          }
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 mb-4">
                    <Editable
                      value={t.text}
                      multiline
                      onChange={(v) =>
                        setTestimonials((prev) =>
                          prev.map((x, j) =>
                            j === i ? { ...x, text: v } : x
                          )
                        )
                      }
                      className="text-gray-400 text-sm leading-relaxed italic block"
                    />
                  </div>

                  <div className="pt-5 border-t border-[#1E1E1E]">
                    <Editable
                      value={t.name}
                      onChange={(v) =>
                        setTestimonials((prev) =>
                          prev.map((x, j) =>
                            j === i ? { ...x, name: v } : x
                          )
                        )
                      }
                      className="text-white font-semibold text-sm block"
                    />
                    <Editable
                      value={t.role}
                      onChange={(v) =>
                        setTestimonials((prev) =>
                          prev.map((x, j) =>
                            j === i ? { ...x, role: v } : x
                          )
                        )
                      }
                      className="text-[#D4A017] text-xs mt-0.5 block"
                    />
                  </div>

                  <button
                    onClick={() =>
                      setTestimonials((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="mt-3 text-xs text-gray-600 hover:text-red-400 transition-colors flex items-center gap-1 self-start"
                  >
                    <Trash2 size={11} /> Remove
                  </button>
                </div>
              ))}

              {/* Add testimonial */}
              <button
                onClick={() =>
                  setTestimonials((prev) => [
                    ...prev,
                    {
                      name: "Client Name",
                      role: "Property Type",
                      text: "Write your review here.",
                      rating: 5,
                    },
                  ])
                }
                className="border-2 border-dashed border-[#2A2A2A] hover:border-[#D4A017]/50 rounded-xl flex flex-col items-center justify-center gap-2 p-8 text-gray-600 hover:text-[#D4A017] transition-colors min-h-[200px]"
              >
                <Plus size={24} />
                <span className="text-sm">Add Testimonial</span>
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CONTACT SETTINGS
        ════════════════════════════════════════════════ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-t border-[#1E1E1E]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white font-bold text-lg mb-1">
              Contact &amp; Business Info
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Shown on Contact page, footer, and WhatsApp links
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {(
                [
                  ["Phone Number", "phone"],
                  ["WhatsApp (with country code)", "whatsapp"],
                  ["Email Address", "email"],
                  ["Address", "address"],
                  ["Weekday Hours", "hours_weekday"],
                  ["Weekend Hours", "hours_weekend"],
                ] as [string, keyof Settings][]
              ).map(([label, key]) => (
                <div key={key}>
                  <label className="block text-xs text-gray-500 mb-1.5">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={settings[key]}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, [key]: e.target.value }))
                    }
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white text-sm px-3 py-2.5 rounded-lg focus:border-[#D4A017] outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
