"use client";

import React, { useEffect, useState, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import { updateLeadStatus, updateLeadNotes } from "@/app/actions/admin";
import { Search, RefreshCw, ChevronDown } from "lucide-react";

type Lead = {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  project_interest: string;
  budget: string;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

const STATUSES = ["new", "contacted", "converted", "closed"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  converted: "bg-green-500/15 text-green-400 border-green-500/30",
  closed: "bg-gray-500/15 text-gray-400 border-gray-500/30",
};

const PROJECT_LABELS: Record<string, string> = {
  ranawat: "Ranawat Group",
  vrindanand: "Vrindanand Parshwa",
  vatsalya: "Vatsalya Tower",
  emerald: "Emerald Vista",
  kshitij: "Kshitij Bibwewadi",
  resale: "Resale Properties",
  other: "Other",
};

const BUDGET_LABELS: Record<string, string> = {
  "50-75": "₹50L–₹75L",
  "75-1cr": "₹75L–₹1Cr",
  "1-1.5cr": "₹1Cr–₹1.5Cr",
  "1.5cr+": "Above ₹1.5Cr",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  async function fetchLeads() {
    setLoading(true);
    const { data } = await supabase
      .from("enquiries")
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
    startTransition(() => updateLeadStatus(id, status));
  }

  function handleNotesSave(id: string) {
    const notes = notesDraft[id] ?? "";
    startTransition(() => updateLeadNotes(id, notes));
  }

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.full_name.toLowerCase().includes(search.toLowerCase()) ||
      l.mobile.includes(search) ||
      (l.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} of {leads.length} leads
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

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search name, mobile, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-lg text-sm placeholder-gray-600 focus:border-[#D4A017] focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#1A1A1A] border border-[#2A2A2A] text-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-[#D4A017] focus:outline-none"
        >
          <option value="all">All Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E1E1E]">
                {[
                  "Name",
                  "Mobile",
                  "Email",
                  "Project",
                  "Budget",
                  "Status",
                  "Date",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs text-gray-500 font-medium uppercase tracking-wide whitespace-nowrap"
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
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-600"
                  >
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-600"
                  >
                    No leads found
                  </td>
                </tr>
              )}
              {filtered.map((lead) => (
                <React.Fragment key={lead.id}>
                  <tr
                    className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/40 transition-colors"
                  >
                    <td className="px-5 py-4 text-white font-medium whitespace-nowrap">
                      {lead.full_name}
                    </td>
                    <td className="px-5 py-4 text-gray-400 whitespace-nowrap">
                      <a
                        href={`tel:${lead.mobile}`}
                        className="hover:text-[#D4A017] transition-colors"
                      >
                        {lead.mobile}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-gray-400 max-w-[140px] truncate">
                      {lead.email ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-400 whitespace-nowrap">
                      {PROJECT_LABELS[lead.project_interest] ??
                        lead.project_interest}
                    </td>
                    <td className="px-5 py-4 text-gray-400 whitespace-nowrap">
                      {BUDGET_LABELS[lead.budget] ?? lead.budget}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status ?? "new"}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value)
                        }
                        className={`text-xs font-medium px-2.5 py-1.5 rounded-full border bg-transparent cursor-pointer focus:outline-none ${
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
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === lead.id ? null : lead.id
                          )
                        }
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            expandedId === lead.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                  {expandedId === lead.id && (
                    <tr
                      className="bg-[#0F0F0F] border-b border-[#1A1A1A]"
                    >
                      <td colSpan={8} className="px-5 py-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Message
                            </p>
                            <p className="text-gray-300 text-sm">
                              {lead.message || "—"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1.5">
                              Notes
                            </p>
                            <textarea
                              rows={3}
                              value={
                                notesDraft[lead.id] ?? lead.notes ?? ""
                              }
                              onChange={(e) =>
                                setNotesDraft((prev) => ({
                                  ...prev,
                                  [lead.id]: e.target.value,
                                }))
                              }
                              placeholder="Add internal notes…"
                              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm px-3 py-2 rounded-lg placeholder-gray-600 focus:border-[#D4A017] focus:outline-none resize-none"
                            />
                            <button
                              onClick={() => handleNotesSave(lead.id)}
                              disabled={isPending}
                              className="mt-2 text-xs px-3 py-1.5 bg-[#D4A017]/10 text-[#D4A017] hover:bg-[#D4A017]/20 rounded-lg transition-colors disabled:opacity-50"
                            >
                              Save Notes
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
