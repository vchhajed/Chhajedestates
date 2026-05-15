import { supabase } from "@/lib/supabase";
import { Users, PhoneCall, CheckCircle, TrendingUp } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
  closed: "Closed",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400",
  contacted: "bg-yellow-500/15 text-yellow-400",
  converted: "bg-green-500/15 text-green-400",
  closed: "bg-gray-500/15 text-gray-400",
};

export default async function AdminOverviewPage() {
  const [{ data: all }, { data: recent }] = await Promise.all([
    supabase.from("enquiries").select("status, created_at"),
    supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const total = all?.length ?? 0;
  const newLeads = all?.filter((r) => r.status === "new").length ?? 0;
  const contacted = all?.filter((r) => r.status === "contacted").length ?? 0;
  const converted = all?.filter((r) => r.status === "converted").length ?? 0;

  const stats = [
    {
      label: "Total Leads",
      value: total,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "New",
      value: newLeads,
      icon: TrendingUp,
      color: "text-[#D4A017]",
      bg: "bg-[#D4A017]/10",
    },
    {
      label: "Contacted",
      value: contacted,
      icon: PhoneCall,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Converted",
      value: converted,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${bg} p-2.5 rounded-lg`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-gray-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Leads Table */}
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1E1E1E]">
          <h2 className="text-white font-semibold text-sm">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E1E1E]">
                {["Name", "Mobile", "Project", "Budget", "Status", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs text-gray-500 font-medium uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {recent?.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/50 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {lead.full_name}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{lead.mobile}</td>
                  <td className="px-6 py-4 text-gray-400 max-w-[140px] truncate">
                    {lead.project_interest}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{lead.budget}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        STATUS_COLORS[lead.status ?? "new"]
                      }`}
                    >
                      {STATUS_LABELS[lead.status ?? "new"]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(lead.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
              {!recent?.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-600"
                  >
                    No leads yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
