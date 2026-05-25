"use client";

import {
  Play,
  LayoutGrid,
  Maximize2,
  RefreshCw,
  EyeOff,
  Clock,
  WifiOff,
} from "lucide-react";
import { TimelineEvent, EventType } from "@/types";
import { getEventConfig, getSeverityConfig, mergeClasses } from "@/lib/utils";

const EventIcons: Record<EventType, React.ElementType> = {
  session_started: Play,
  tab_switch: LayoutGrid,
  fullscreen_exit: Maximize2,
  reconnect: RefreshCw,
  focus_loss: EyeOff,
  inactivity_warning: Clock,
  network_interruption: WifiOff,
};

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

function TimelineItem({ event, isLast }: TimelineItemProps) {
  const eventConfig = getEventConfig(event.eventType);
  const severityConfig = getSeverityConfig(event.severity);
  const Icon = EventIcons[event.eventType];

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={mergeClasses(
            "flex items-center justify-center w-8 h-8 rounded-full border flex-shrink-0",
            severityConfig.className,
          )}
        >
          <Icon
            size={13}
            className={mergeClasses(
              event.severity === "success" && "text-emerald-400",
              event.severity === "warning" && "text-amber-400",
              event.severity === "critical" && "text-red-400",
              event.severity === "info" && "text-blue-400",
            )}
          />
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-white/[0.07] mt-1 min-h-[16px]" />
        )}
      </div>

      <div className="flex-1 pb-4">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-medium text-white/80">
              {eventConfig.label}
            </span>
            <span
              className={mergeClasses(
                "text-[10px] font-medium px-1.5 py-0.5 rounded",
                severityConfig.labelClass,
              )}
            >
              {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
            </span>
          </div>
        </div>
        <p className="text-[11px] text-white/35 mb-1">
          {event.timestamp} · {event.date}
        </p>
        <p className="text-[12px] text-white/50">{event.description}</p>
      </div>
    </div>
  );
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div
        className={mergeClasses(
          "py-8 text-center text-white/30 text-[13px]",
          className,
        )}
      >
        No events recorded
      </div>
    );
  }

  return (
    <div className={mergeClasses("", className)}>
      {events.map((event, index) => (
        <TimelineItem
          key={event.id}
          event={event}
          isLast={index === events.length - 1}
        />
      ))}
    </div>
  );
}
