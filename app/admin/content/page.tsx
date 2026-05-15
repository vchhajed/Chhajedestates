"use client";

import { useEffect, useState, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import { publishContent } from "@/app/actions/admin";
import { Save, Globe, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type Settings = {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  hours_weekday: string;
  hours_weekend: string;
};

type Hero = {
  badge: string;
  heading: string;
  subheading: string;
};

type Stat = { value: string; label: string };

type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

type Project = {
  id: string;
  name: string;
  tagline: string;
  location: string;
  sublocation: string;
  config: string;
  totalUnits: number;
  possession: string;
  rera: string | null;
  status: string;
  price: string;
  priceNote: string;
  image: string;
  developer: string;
};

const DEFAULT_SETTINGS: Settings = {
  phone: "+91 9422500152",
  email: "gautamchhajed5751@gmail.com",
  whatsapp: "919422500152",
  address: "Pune, Maharashtra, India",
  hours_weekday: "Mon – Sat: 9:00 AM – 8:00 PM",
  hours_weekend: "Sunday: 10:00 AM – 5:00 PM",
};

const DEFAULT_HERO: Hero = {
  badge: "Premium Real Estate Consultancy, Pune",
  heading: "Premium Real Estate Solutions for Builders & Buyers",
  subheading:
    "Unlock Maximum Value for Your Project with Our Expertise. Exclusive mandates, high-ROI properties, and trusted partnerships across Pune.",
};

const TABS = ["Settings", "Hero", "Stats", "Testimonials", "Projects"] as const;
type Tab = (typeof TABS)[number];

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const cls =
    "w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white text-sm px-3 py-2.5 rounded-lg placeholder-gray-600 focus:border-[#D4A017] focus:outline-none transition-colors";
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </div>
  );
}

export default function ContentEditorPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Settings");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hero, setHero] = useState<Hero>(DEFAULT_HERO);
  const [stats, setStats] = useState<Stat[]>([
    { value: "500+", label: "Happy Families" },
    { value: "78+", label: "Units Sold" },
    { value: "10+", label: "Premium Projects" },
    { value: "15+", label: "Years Experience" },
  ]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("site_config").select("key, value");
      if (!data) return;
      const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
      if (map.settings) setSettings(map.settings as Settings);
      if (map.hero) setHero(map.hero as Hero);
      if (map.stats) setStats(map.stats as Stat[]);
      if (map.testimonials) setTestimonials(map.testimonials as Testimonial[]);
      if (map.projects) setProjects(map.projects as Project[]);
      setLoading(false);
    }
    load();
  }, []);

  function handlePublish() {
    startTransition(async () => {
      await publishContent({ settings, hero, stats, testimonials, projects });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="text-gray-500 text-sm">Loading content…</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Website</h1>
          <p className="text-gray-500 text-sm mt-1">
            Edit content then click Publish to make changes live
          </p>
        </div>
        <button
          onClick={handlePublish}
          disabled={isPending}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            saved
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-[#D4A017] hover:bg-[#F0C040] text-black"
          } disabled:opacity-60`}
        >
          {saved ? (
            <>
              <Save size={15} /> Published!
            </>
          ) : isPending ? (
            <>
              <Globe size={15} className="animate-spin" /> Publishing…
            </>
          ) : (
            <>
              <Globe size={15} /> Publish Changes
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#111111] border border-[#1E1E1E] rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#1A1A1A] text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6">
        {/* SETTINGS TAB */}
        {activeTab === "Settings" && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold mb-4">
              Contact & Business Info
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Phone Number"
                value={settings.phone}
                onChange={(v) => setSettings((s) => ({ ...s, phone: v }))}
              />
              <Field
                label="WhatsApp Number (with country code)"
                value={settings.whatsapp}
                onChange={(v) => setSettings((s) => ({ ...s, whatsapp: v }))}
              />
            </div>
            <Field
              label="Email Address"
              value={settings.email}
              type="email"
              onChange={(v) => setSettings((s) => ({ ...s, email: v }))}
            />
            <Field
              label="Address"
              value={settings.address}
              onChange={(v) => setSettings((s) => ({ ...s, address: v }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Weekday Hours"
                value={settings.hours_weekday}
                onChange={(v) =>
                  setSettings((s) => ({ ...s, hours_weekday: v }))
                }
              />
              <Field
                label="Weekend Hours"
                value={settings.hours_weekend}
                onChange={(v) =>
                  setSettings((s) => ({ ...s, hours_weekend: v }))
                }
              />
            </div>
          </div>
        )}

        {/* HERO TAB */}
        {activeTab === "Hero" && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold mb-4">
              Homepage Hero Section
            </h2>
            <Field
              label="Badge Text"
              value={hero.badge}
              onChange={(v) => setHero((h) => ({ ...h, badge: v }))}
            />
            <Field
              label="Main Heading"
              value={hero.heading}
              onChange={(v) => setHero((h) => ({ ...h, heading: v }))}
            />
            <Field
              label="Subheading"
              value={hero.subheading}
              multiline
              onChange={(v) => setHero((h) => ({ ...h, subheading: v }))}
            />
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "Stats" && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold mb-4">Homepage Stats</h2>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-4 p-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg"
              >
                <Field
                  label="Value"
                  value={stat.value}
                  onChange={(v) =>
                    setStats((prev) =>
                      prev.map((s, j) => (j === i ? { ...s, value: v } : s))
                    )
                  }
                />
                <Field
                  label="Label"
                  value={stat.label}
                  onChange={(v) =>
                    setStats((prev) =>
                      prev.map((s, j) => (j === i ? { ...s, label: v } : s))
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === "Testimonials" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Testimonials</h2>
              <button
                onClick={() =>
                  setTestimonials((prev) => [
                    ...prev,
                    { name: "", role: "", text: "", rating: 5 },
                  ])
                }
                className="flex items-center gap-1.5 text-xs text-[#D4A017] hover:text-[#F0C040] transition-colors"
              >
                <Plus size={13} /> Add
              </button>
            </div>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg space-y-3"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Testimonial {i + 1}
                  </p>
                  <button
                    onClick={() =>
                      setTestimonials((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="text-gray-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Name"
                    value={t.name}
                    onChange={(v) =>
                      setTestimonials((prev) =>
                        prev.map((x, j) => (j === i ? { ...x, name: v } : x))
                      )
                    }
                  />
                  <Field
                    label="Role / Property"
                    value={t.role}
                    onChange={(v) =>
                      setTestimonials((prev) =>
                        prev.map((x, j) => (j === i ? { ...x, role: v } : x))
                      )
                    }
                  />
                </div>
                <Field
                  label="Review Text"
                  value={t.text}
                  multiline
                  onChange={(v) =>
                    setTestimonials((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, text: v } : x))
                    )
                  }
                />
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Rating (1–5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={t.rating}
                    onChange={(e) =>
                      setTestimonials((prev) =>
                        prev.map((x, j) =>
                          j === i
                            ? { ...x, rating: Number(e.target.value) }
                            : x
                        )
                      )
                    }
                    className="w-20 bg-[#0A0A0A] border border-[#2A2A2A] text-white text-sm px-3 py-2 rounded-lg focus:border-[#D4A017] focus:outline-none"
                  />
                </div>
              </div>
            ))}
            {testimonials.length === 0 && (
              <p className="text-gray-600 text-sm text-center py-8">
                No testimonials yet
              </p>
            )}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "Projects" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">
                Projects ({projects.length})
              </h2>
              <button
                onClick={() =>
                  setProjects((prev) => [
                    ...prev,
                    {
                      id: `project-${Date.now()}`,
                      name: "New Project",
                      tagline: "",
                      location: "",
                      sublocation: "",
                      config: "",
                      totalUnits: 0,
                      possession: "",
                      rera: null,
                      status: "Ongoing",
                      price: "On Request",
                      priceNote: "",
                      image: "",
                      developer: "",
                    },
                  ])
                }
                className="flex items-center gap-1.5 text-xs text-[#D4A017] hover:text-[#F0C040] transition-colors"
              >
                <Plus size={13} /> Add Project
              </button>
            </div>

            {projects.map((project, i) => (
              <div
                key={project.id}
                className="border border-[#1E1E1E] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.id ? null : project.id
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#0F0F0F] hover:bg-[#1A1A1A] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium text-sm">
                      {project.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {project.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjects((prev) => prev.filter((_, j) => j !== i));
                      }}
                      className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                    {expandedProject === project.id ? (
                      <ChevronUp size={15} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={15} className="text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedProject === project.id && (
                  <div className="p-4 space-y-3 bg-[#0A0A0A]">
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Project Name"
                        value={project.name}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, name: v } : p
                            )
                          )
                        }
                      />
                      <Field
                        label="Developer"
                        value={project.developer}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, developer: v } : p
                            )
                          )
                        }
                      />
                    </div>
                    <Field
                      label="Tagline"
                      value={project.tagline}
                      onChange={(v) =>
                        setProjects((prev) =>
                          prev.map((p, j) =>
                            j === i ? { ...p, tagline: v } : p
                          )
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Location"
                        value={project.location}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, location: v } : p
                            )
                          )
                        }
                      />
                      <Field
                        label="Sub-location"
                        value={project.sublocation}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, sublocation: v } : p
                            )
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Field
                        label="Config (e.g. 2 & 3 BHK)"
                        value={project.config}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, config: v } : p
                            )
                          )
                        }
                      />
                      <Field
                        label="Price"
                        value={project.price}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, price: v } : p
                            )
                          )
                        }
                      />
                      <Field
                        label="Status Tag"
                        value={project.status}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, status: v } : p
                            )
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Field
                        label="RERA Number"
                        value={project.rera ?? ""}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i
                                ? { ...p, rera: v || null }
                                : p
                            )
                          )
                        }
                      />
                      <Field
                        label="Possession"
                        value={project.possession}
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, possession: v } : p
                            )
                          )
                        }
                      />
                      <Field
                        label="Total Units"
                        value={String(project.totalUnits)}
                        type="number"
                        onChange={(v) =>
                          setProjects((prev) =>
                            prev.map((p, j) =>
                              j === i
                                ? { ...p, totalUnits: Number(v) }
                                : p
                            )
                          )
                        }
                      />
                    </div>
                    <Field
                      label="Image Path (e.g. /images/vatsalya-1.jpeg)"
                      value={project.image}
                      onChange={(v) =>
                        setProjects((prev) =>
                          prev.map((p, j) =>
                            j === i ? { ...p, image: v } : p
                          )
                        )
                      }
                    />
                    <Field
                      label="Price Note"
                      value={project.priceNote}
                      onChange={(v) =>
                        setProjects((prev) =>
                          prev.map((p, j) =>
                            j === i ? { ...p, priceNote: v } : p
                          )
                        )
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
