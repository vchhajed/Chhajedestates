"use client";

import React, { useEffect, useState, useTransition, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
  updateOutboundStatus,
  updateOutboundNotes,
  updateOutboundPriority,
} from "@/app/actions/admin";
import {
  Search,
  RefreshCw,
  X,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Target,
  SlidersHorizontal,
  User,
  Building2,
  Banknote,
  CalendarDays,
  Tag,
  FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OutboundLead = {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  city: string | null;
  locality: string | null;
  requirement: string | null;
  bhk_config: string | null;
  budget: string | null;
  project_interest: string | null;
  source: string | null;
  source_url: string | null;
  profession: string | null;
  notes: string | null;
  status: string;
  priority: string;
  contacted_at: string | null;
  created_at: string;
  updated_at: string | null;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUSES = ["new", "contacted", "qualified", "converted", "dropped"] as const;
const PRIORITIES = ["high", "medium", "low"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  qualified: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  converted: "bg-green-500/15 text-green-400 border-green-500/30",
  dropped: "bg-gray-500/15 text-gray-400 border-gray-500/30",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-500/15 text-red-400 border-red-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  low: "bg-green-500/15 text-green-400 border-green-500/30",
};

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-green-400",
};

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({
  lead,
  onClose,
  onStatusChange,
  onPriorityChange,
}: {
  lead: OutboundLead;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
  onPriorityChange: (id: string, priority: string) => void;
}) {
  const [notesDraft, setNotesDraft] = useState(lead.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [, startTransition] = useTransition();

  function saveNotes() {
    setSaving(true);
    startTransition(async () => {
      await updateOutboundNotes(lead.id, notesDraft);
      setSaving(false);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    });
  }

  const Row = ({
    icon: Icon,
    label,
    value,
    link,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | null | undefined;
    link?: string;
  }) => {
    if (!value) return null;
    return (
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5">
          <Icon size={14} className="text-gray-500" />
        </div>
        <div>
          <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">
            {label}
          </p>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A017] text-sm hover:underline flex items-center gap-1"
            >
              {value}
              <ExternalLink size={11} />
            </a>
          ) : (
            <p className="text-white text-sm leading-relaxed">{value}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="w-[460px] bg-[#111111] border-l border-[#1E1E1E] flex flex-col h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#1E1E1E] flex items-start justify-between sticky top-0 bg-[#111111] z-10">
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              {lead.full_name}
            </h2>
            {lead.profession && (
              <p className="text-gray-500 text-xs mt-0.5">{lead.profession}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-[#1A1A1A]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status + Priority controls */}
        <div className="p-5 border-b border-[#1E1E1E] grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">
              Status
            </label>
            <select
              value={lead.status}
              onChange={(e) => onStatusChange(lead.id, e.target.value)}
              className={`w-full text-xs font-medium px-3 py-2 rounded-lg border bg-transparent cursor-pointer focus:outline-none ${
                STATUS_COLORS[lead.status] ?? STATUS_COLORS.new
              }`}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#1A1A1A] text-white">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">
              Priority
            </label>
            <select
              value={lead.priority}
              onChange={(e) => onPriorityChange(lead.id, e.target.value)}
              className={`w-full text-xs font-medium px-3 py-2 rounded-lg border bg-transparent cursor-pointer focus:outline-none ${
                PRIORITY_COLORS[lead.priority] ?? PRIORITY_COLORS.medium
              }`}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p} className="bg-[#1A1A1A] text-white">
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 space-y-4 border-b border-[#1E1E1E]">
          <Row icon={Phone} label="Mobile" value={lead.mobile} />
          <Row icon={Mail} label="Email" value={lead.email} />
          <Row
            icon={MapPin}
            label="Location"
            value={
              [lead.locality, lead.city].filter(Boolean).join(", ") || null
            }
          />
          <Row icon={Building2} label="Requirement" value={lead.requirement} />
          <Row icon={User} label="BHK Config" value={lead.bhk_config} />
          <Row icon={Banknote} label="Budget" value={lead.budget} />
          <Row
            icon={Target}
            label="Project Interest"
            value={lead.project_interest}
          />
          <Row icon={Tag} label="Source" value={lead.source} />
          {lead.source_url && (
            <Row
              icon={ExternalLink}
              label="Source URL"
              value={lead.source_url}
              link={lead.source_url}
            />
          )}
          {lead.contacted_at && (
            <Row
              icon={CalendarDays}
              label="Last Contacted"
              value={new Date(lead.contacted_at).toLocaleString("en-IN")}
            />
          )}
          <Row
            icon={CalendarDays}
            label="Created"
            value={new Date(lead.created_at).toLocaleString("en-IN")}
          />
        </div>

        {/* Notes — signal / context */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={14} className="text-[#D4A017]" />
            <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Notes &amp; Signal
            </label>
          </div>
          <textarea
            rows={6}
            value={notesDraft}
            onChange={(e) => setNotesDraft(e.target.value)}
            placeholder="Add context, signal explanation, follow-up notes…"
            className="w-full flex-1 bg-[#0A0A0A] border border-[#2A2A2A] text-white text-sm px-3 py-2.5 rounded-lg placeholder-gray-600 focus:border-[#D4A017] outline-none resize-none"
          />
          <button
            onClick={saveNotes}
            disabled={saving}
            className={`mt-3 px-4 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
              noteSaved
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-[#D4A017]/10 text-[#D4A017] hover:bg-[#D4A017]/20"
            }`}
          >
            {noteSaved ? "Saved ✓" : saving ? "Saving…" : "Save Notes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function OutboundLeadsPage() {
  const [leads, setLeads] = useState<OutboundLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCity, setFilterCity] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [selected, setSelected] = useState<OutboundLead | null>(null);
  const [, startTransition] = useTransition();

  async function fetchLeads() {
    setLoading(true);
    const { data } = await supabase
      .from("outbound_leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  function handleStatusChange(id: string, status: string) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    if (selected?.id === id) setSelected((s) => s && { ...s, status });
    startTransition(() => updateOutboundStatus(id, status));
  }

  function handlePriorityChange(id: string, priority: string) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, priority } : l))
    );
    if (selected?.id === id) setSelected((s) => s && { ...s, priority });
    startTransition(() => updateOutboundPriority(id, priority));
  }

  // Unique filter options derived from data
  const cities = useMemo(
    () => [...new Set(leads.map((l) => l.city).filter(Boolean))] as string[],
    [leads]
  );
  const projects = useMemo(
    () =>
      [...new Set(leads.map((l) => l.project_interest).filter(Boolean))] as string[],
    [leads]
  );
  const sources = useMemo(
    () => [...new Set(leads.map((l) => l.source).filter(Boolean))] as string[],
    [leads]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter((l) => {
      const matchSearch =
        !q ||
        l.full_name.toLowerCase().includes(q) ||
        l.mobile.includes(q) ||
        (l.email ?? "").toLowerCase().includes(q) ||
        (l.city ?? "").toLowerCase().includes(q) ||
        (l.locality ?? "").toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || l.status === filterStatus;
      const matchPriority =
        filterPriority === "all" || l.priority === filterPriority;
      const matchCity = filterCity === "all" || l.city === filterCity;
      const matchProject =
        filterProject === "all" || l.project_interest === filterProject;
      const matchSource = filterSource === "all" || l.source === filterSource;
      return (
        matchSearch &&
        matchStatus &&
        matchPriority &&
        matchCity &&
        matchProject &&
        matchSource
      );
    });
  }, [
    leads,
    search,
    filterStatus,
    filterPriority,
    filterCity,
    filterProject,
    filterSource,
  ]);

  // Summary stats
  const total = leads.length;
  const highPriority = leads.filter((l) => l.priority === "high").length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const converted = leads.filter((l) => l.status === "converted").length;

  const selectCls =
    "bg-[#1A1A1A] border border-[#2A2A2A] text-gray-300 rounded-lg px-3 py-2.5 text-xs focus:border-[#D4A017] focus:outline-none";

  return (
    <>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target size={18} className="text-[#D4A017]" />
              <h1 className="text-2xl font-bold text-white">Outbound Leads</h1>
            </div>
            <p className="text-gray-500 text-sm">
              {filtered.length} of {total} leads
            </p>
          </div>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] text-gray-400 hover:text-white rounded-lg text-sm transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Leads",
              value: total,
              color: "text-white",
              bg: "bg-[#1A1A1A]",
              border: "border-[#2A2A2A]",
            },
            {
              label: "High Priority",
              value: highPriority,
              color: "text-red-400",
              bg: "bg-red-500/5",
              border: "border-red-500/20",
            },
            {
              label: "New / Untouched",
              value: newCount,
              color: "text-blue-400",
              bg: "bg-blue-500/5",
              border: "border-blue-500/20",
            },
            {
              label: "Converted",
              value: converted,
              color: "text-green-400",
              bg: "bg-green-500/5",
              border: "border-green-500/20",
            },
          ].map((card) => (
            <div
              key={card.label}
              className={`${card.bg} border ${card.border} rounded-xl p-5`}
            >
              <p className="text-gray-500 text-xs mb-2">{card.label}</p>
              <p className={`text-3xl font-bold font-display ${card.color}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search name, mobile, email, city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-lg text-xs placeholder-gray-600 focus:border-[#D4A017] focus:outline-none w-64"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={13} className="text-gray-500" />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectCls}
            >
              <option value="all">All Status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={selectCls}
            >
              <option value="all">All Priority</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>

            {cities.length > 0 && (
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className={selectCls}
              >
                <option value="all">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}

            {projects.length > 0 && (
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className={selectCls}
              >
                <option value="all">All Projects</option>
                {projects.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            )}

            {sources.length > 0 && (
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className={selectCls}
              >
                <option value="all">All Sources</option>
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}

            {(filterStatus !== "all" ||
              filterPriority !== "all" ||
              filterCity !== "all" ||
              filterProject !== "all" ||
              filterSource !== "all" ||
              search) && (
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setFilterPriority("all");
                  setFilterCity("all");
                  setFilterProject("all");
                  setFilterSource("all");
                  setSearch("");
                }}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1E1E1E]">
                  {[
                    "Name",
                    "Contact",
                    "Location",
                    "Requirement",
                    "Budget",
                    "Project",
                    "Source",
                    "Priority",
                    "Status",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] text-gray-500 font-medium uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      Loading…
                    </td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      No leads found
                    </td>
                  </tr>
                )}
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/50 transition-colors cursor-pointer"
                  >
                    {/* Name + profession */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="text-white font-medium">{lead.full_name}</p>
                      {lead.profession && (
                        <p className="text-gray-600 text-[10px] mt-0.5">
                          {lead.profession}
                        </p>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <a
                        href={`tel:${lead.mobile}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-300 hover:text-[#D4A017] transition-colors flex items-center gap-1"
                      >
                        <Phone size={10} />
                        {lead.mobile}
                      </a>
                      {lead.email && (
                        <p className="text-gray-600 text-[10px] mt-0.5 max-w-[130px] truncate">
                          {lead.email}
                        </p>
                      )}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="text-gray-300">{lead.city ?? "—"}</p>
                      {lead.locality && (
                        <p className="text-gray-600 text-[10px] mt-0.5">
                          {lead.locality}
                        </p>
                      )}
                    </td>

                    {/* Requirement + BHK */}
                    <td className="px-4 py-3.5 max-w-[120px]">
                      <p className="text-gray-300 truncate">
                        {lead.requirement ?? "—"}
                      </p>
                      {lead.bhk_config && (
                        <p className="text-gray-600 text-[10px] mt-0.5">
                          {lead.bhk_config}
                        </p>
                      )}
                    </td>

                    {/* Budget */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-gray-300">
                      {lead.budget ?? "—"}
                    </td>

                    {/* Project */}
                    <td className="px-4 py-3.5 max-w-[110px]">
                      <p className="text-gray-300 truncate">
                        {lead.project_interest ?? "—"}
                      </p>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {lead.source_url ? (
                        <a
                          href={lead.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#D4A017] hover:underline flex items-center gap-1"
                        >
                          {lead.source ?? "Link"}
                          <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="text-gray-500">
                          {lead.source ?? "—"}
                        </span>
                      )}
                    </td>

                    {/* Priority */}
                    <td
                      className="px-4 py-3.5 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={lead.priority ?? "medium"}
                        onChange={(e) =>
                          handlePriorityChange(lead.id, e.target.value)
                        }
                        className={`text-[10px] font-semibold px-2 py-1 rounded-full border bg-transparent cursor-pointer focus:outline-none ${
                          PRIORITY_COLORS[lead.priority ?? "medium"]
                        }`}
                      >
                        {PRIORITIES.map((p) => (
                          <option
                            key={p}
                            value={p}
                            className="bg-[#1A1A1A] text-white"
                          >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Status */}
                    <td
                      className="px-4 py-3.5 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={lead.status ?? "new"}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value)
                        }
                        className={`text-[10px] font-semibold px-2 py-1 rounded-full border bg-transparent cursor-pointer focus:outline-none ${
                          STATUS_COLORS[lead.status ?? "new"]
                        }`}
                      >
                        {STATUSES.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-[#1A1A1A] text-white"
                          >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel
          lead={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />
      )}
    </>
  );
}
