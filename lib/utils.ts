import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Session,
  SessionStatus,
  RiskLevel,
  EventType,
  EventSeverity,
} from "@/types";

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusConfig(status: SessionStatus) {
  const configs = {
    Active: {
      label: "Active",
      className:
        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    Flagged: {
      label: "Flagged",
      className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    Completed: {
      label: "Completed",
      className: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
    },
    Reviewing: {
      label: "Reviewing",
      className: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    },
    Suspended: {
      label: "Suspended",
      className: "bg-red-500/10 text-red-400 border border-red-500/20",
    },
  };
  return configs[status] ?? configs.Active;
}

export function getRiskConfig(level: RiskLevel) {
  const configs = {
    Low: {
      label: "Low",
      className:
        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    Medium: {
      label: "Medium",
      className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    High: {
      label: "High",
      className: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    },
    Critical: {
      label: "Critical",
      className: "bg-red-500/10 text-red-400 border border-red-500/20",
    },
  };
  return configs[level] ?? configs.Low;
}

export function getEventConfig(eventType: EventType) {
  const configs: Record<EventType, { label: string; icon: string }> = {
    session_started: { label: "Session Started", icon: "play" },
    tab_switch: { label: "Tab Switch", icon: "layout-grid" },
    fullscreen_exit: { label: "Fullscreen Exit", icon: "maximize" },
    reconnect: { label: "Reconnect", icon: "refresh-cw" },
    focus_loss: { label: "Focus Loss", icon: "eye-off" },
    inactivity_warning: { label: "Inactivity Warning", icon: "clock" },
    network_interruption: { label: "Network Interruption", icon: "wifi-off" },
  };
  return configs[eventType] ?? configs.session_started;
}

export function getSeverityConfig(severity: EventSeverity) {
  const configs: Record<
    EventSeverity,
    { className: string; dotClass: string; labelClass: string }
  > = {
    success: {
      className: "border-emerald-500/20 bg-emerald-500/5",
      dotClass: "bg-emerald-400",
      labelClass:
        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    warning: {
      className: "border-amber-500/20 bg-amber-500/5",
      dotClass: "bg-amber-400",
      labelClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    critical: {
      className: "border-red-500/20 bg-red-500/5",
      dotClass: "bg-red-400",
      labelClass: "bg-red-500/10 text-red-400 border border-red-500/20",
    },
    info: {
      className: "border-blue-500/20 bg-blue-500/5",
      dotClass: "bg-blue-400",
      labelClass: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    },
  };
  return configs[severity];
}

export function exportToCSV(sessions: Session[]) {
  const headers = [
    "Candidate Name",
    "Session ID",
    "Exam Title",
    "Status",
    "Risk Score",
    "Risk Level",
    "Duration",
    "Last Activity",
    "Warning Count",
  ];

  const rows = sessions.map((s) => [
    s.candidateName,
    s.sessionId,
    s.examTitle,
    s.status,
    s.riskScore.toString(),
    s.riskLevel,
    s.duration,
    s.lastActivity,
    s.warningCount.toString(),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sessions-export.csv";
  link.click();
  URL.revokeObjectURL(url);
}
