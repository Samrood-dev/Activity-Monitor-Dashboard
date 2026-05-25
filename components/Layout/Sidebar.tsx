"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Monitor,
  Users,
  FileText,
  Settings,
  Shield,
} from "lucide-react";
import { mergeClasses } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Monitor, label: "Sessions" },
  { icon: Users, label: "Candidates" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="flex flex-col w-full min-h-screen bg-[hsl(224,10%,9%)] border-r border-white/[0.06]">
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-white/[0.06]">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white/10">
          <Shield size={14} className="text-white/80" />
        </div>
        <div>
          <p className="text-[12px] py-0.5 font-semibold text-white/90 leading-tight">
            RiskMonitor
          </p>
          <p className="text-[10px] text-white/35 leading-tight">Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={mergeClasses(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-colors duration-150",
                isActive
                  ? "bg-white/[0.08] text-white/90"
                  : "text-white/40 hover:bg-white/[0.04] hover:text-white/60",
              )}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span className="text-[12.5px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
