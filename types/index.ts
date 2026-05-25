export type SessionStatus = "Active" | "Flagged" | "Completed" | "Reviewing" | "Suspended";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type EventType =
  | "tab_switch"
  | "fullscreen_exit"
  | "reconnect"
  | "focus_loss"
  | "inactivity_warning"
  | "network_interruption"
  | "session_started";
export type EventSeverity = "info" | "warning" | "critical" | "success";

export interface TimelineEvent {
  id: string;
  timestamp: string;
  date: string;
  eventType: EventType;
  severity: EventSeverity;
  description: string;
}

export interface Session {
  id: string;
  sessionId: string;
  candidateName: string;
  candidateEmail: string;
  examTitle: string;
  status: SessionStatus;
  riskScore: number;
  riskLevel: RiskLevel;
  duration: string;
  lastActivity: string;
  warningCount: number;
  startTime: string;
  timeline: TimelineEvent[];
}
