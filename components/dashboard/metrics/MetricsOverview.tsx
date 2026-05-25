"use client";

import { useMemo } from "react";
import { useDashboardStore } from "@/store/dashboard";
import MetricCard from "./MetricCard";

export function MetricsOverview() {
  const { sessions } = useDashboardStore();

  const metrics = useMemo(() => {
    const total = sessions.length;
    const active = sessions.filter((s) => s.status === "Active").length;
    const flagged = sessions.filter((s) => s.status === "Flagged").length;
    const critical = sessions.filter(
      (s) => s.riskLevel === "Critical" && s.status !== "Completed",
    ).length;
    return { total, active, flagged, critical };
  }, [sessions]);

  const cards = [
    {
      label: "Total Sessions",
      value: metrics.total,
      subtitle: "All time sessions",
      sparkData: [6, 8, 7, 10, 9, 12, 10, 14, 11, 13, 15, 10],
      color: "#a1a1aa",
    },
    {
      label: "Active Sessions",
      value: metrics.active,
      subtitle: "Currently in progress",
      sparkData: [2, 3, 3, 4, 3, 5, 4, 6, 4, 5, 4, 4],
      color: "#34d399",
    },
    {
      label: "Flagged Sessions",
      value: metrics.flagged,
      subtitle: "Under review",
      sparkData: [0, 1, 1, 2, 1, 2, 2, 3, 2, 3, 3, metrics.flagged],
      color: "#fbbf24",
    },
    {
      label: "Critical Risk Sessions",
      value: metrics.critical,
      subtitle: "High risk detected",
      sparkData: [0, 0, 1, 0, 1, 1, 0, 1, 1, 2, 1, metrics.critical],
      color: "#f87171",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} />
      ))}
    </div>
  );
}
