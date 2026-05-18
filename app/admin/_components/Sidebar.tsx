"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Edit3, ExternalLink, LogOut, Target } from "lucide-react";
import { logout } from "@/app/actions/admin";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Inbound Leads", icon: Users, exact: false },
  { href: "/admin/outbound", label: "Outbound Leads", icon: Target, exact: false },
  { href: "/admin/content", label: "Edit Website", icon: Edit3, exact: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#111111] border-r border-[#1E1E1E] flex flex-col fixed h-full z-10">
      <div className="p-6 border-b border-[#1E1E1E]">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
          Admin Panel
        </p>
        <h1 className="text-white font-bold text-sm leading-tight tracking-wide">
          CHHAJED ESTATE
        </h1>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-[#D4A017]/15 text-[#D4A017] font-medium"
                  : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#1E1E1E] space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A1A1A] text-sm transition-colors"
        >
          <ExternalLink size={15} />
          View Website
        </a>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-[#1A1A1A] text-sm transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
