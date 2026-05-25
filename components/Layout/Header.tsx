"use client";

import { Bell, Moon, Calendar, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
export function Header({ setSidebarOpen }: HeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="h-14 border-b border-white/[0.06] bg-[hsl(224,10%,8%)] flex items-center justify-between px-4">
      <div
        onClick={() => {
          setSidebarOpen((prev) => !prev);
        }}
        className="lg:hidden cursor-pointer pr-2"
      >
        <Menu size={20} />
      </div>

      <div>
        <h1 className="text-[15px] font-semibold text-white/90">
          Session Activity Monitoring
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.07] text-white/50 text-[12px]">
          <Calendar size={13} />
          <span>{today}</span>
        </div>
        <button className="relative flex items-center justify-center w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/40 hover:text-white/70 hover:bg-white/[0.07] transition-colors">
          <Moon size={14} />
        </button>
        <button className="relative flex items-center justify-center w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/40 hover:text-white/70 hover:bg-white/[0.07] transition-colors">
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>
      </div>
    </header>
  );
}
