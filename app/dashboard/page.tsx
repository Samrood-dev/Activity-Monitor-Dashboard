"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { MetricsOverview } from "@/components/dashboard/metrics/MetricsOverview";
import { SessionTable } from "@/components/table/SessionTable";
import { SessionDetailsPanel } from "@/components/dashboard/SessionDetailsPanel";
import { useState } from "react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[hsl(224,10%,8%)]">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
      <div
        className={`
          fixed lg:relative z-50 lg:z-0
          h-screen
          w-full
          max-w-[242px] 
          transition-all duration-300  
           ${
             sidebarOpen
               ? "translate-x-0"
               : "-translate-x-full lg:translate-x-0"
           }
        `}
      >
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 ">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto space-y-4 p-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-[13.5px] font-semibold text-white/60 mb-3">
              Overview
            </h2>
            <MetricsOverview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <SessionTable />
          </motion.div>
        </main>
      </div>

      <SessionDetailsPanel />
    </div>
  );
}
