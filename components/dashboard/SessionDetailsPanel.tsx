"use client";

import { X, User, Clock, AlertTriangle, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard";
import { Timeline } from "@/components/timeline/Timeline";
import { mergeClasses, getStatusConfig, getRiskConfig } from "@/lib/utils";

export function SessionDetailsPanel() {
  const { selectedSession, isPanelOpen, closePanel } = useDashboardStore();

  return (
    <AnimatePresence>
      {isPanelOpen && selectedSession && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={closePanel}
          />

          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[340px] z-40 flex flex-col bg-[hsl(224,10%,9%)] border-l border-white/[0.07] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
              <div>
                <h2 className="text-[13.5px] font-semibold text-white/90">
                  Session Details
                </h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {selectedSession.sessionId}
                </p>
              </div>
              <button
                onClick={closePanel}
                className="flex items-center justify-center w-7 h-7 rounded-md text-white/35 hover:bg-white/[0.07] hover:text-white/70 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-semibold text-white/60 flex-shrink-0">
                    {selectedSession.candidateName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/85">
                      {selectedSession.candidateName}
                    </p>
                    <p className="text-[11px] text-white/35">
                      {selectedSession.candidateEmail}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wide mb-1">
                      Exam
                    </p>
                    <p className="text-[11.5px] text-white/70 leading-tight">
                      {selectedSession.examTitle}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock size={9} className="text-white/30" />
                      <p className="text-[10px] text-white/30 uppercase tracking-wide">
                        Duration
                      </p>
                    </div>
                    <p className="text-[11.5px] text-white/70">
                      {selectedSession.duration}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[10px] text-white/30 uppercase tracking-wide mb-1">
                      Status
                    </p>
                    <span
                      className={mergeClasses(
                        "text-[10.5px] px-1.5 py-0.5 rounded font-medium",
                        getStatusConfig(selectedSession.status).className,
                      )}
                    >
                      {selectedSession.status}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-1 mb-1">
                      <AlertTriangle size={9} className="text-white/30" />
                      <p className="text-[10px] text-white/30 uppercase tracking-wide">
                        Warnings
                      </p>
                    </div>
                    <p className="text-[11.5px] text-white/70">
                      {selectedSession.warningCount}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[11.5px] font-semibold text-white/50 uppercase tracking-wide mb-3">
                  Event Timeline
                </h3>
                <Timeline events={selectedSession.timeline} />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-white/[0.07] space-y-3">
              <h3 className="text-[11.5px] font-semibold text-white/50 uppercase tracking-wide">
                Risk Summary
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <p className="text-[10px] text-white/35 mb-1">Risk Score</p>
                  <p className="text-[22px] font-semibold text-white/90 leading-tight">
                    {selectedSession.riskScore}
                    <span className="text-[13px] text-white/30 font-normal">
                      {" "}
                      / 100
                    </span>
                  </p>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <p className="text-[10px] text-white/35 mb-1">Risk Level</p>
                  <span
                    className={mergeClasses(
                      "text-[11px] font-semibold px-2 py-1 rounded",
                      getRiskConfig(selectedSession.riskLevel).className,
                    )}
                  >
                    {selectedSession.riskLevel}
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
