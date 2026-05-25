import { create } from "zustand";
import { Session, SessionStatus, RiskLevel } from "@/types";
import { mockSessions } from "@/lib/mock-data";

interface Filters {
  status: SessionStatus | "All";
  riskLevel: RiskLevel | "All";
}

interface DashboardStore {
  sessions: Session[];

  searchQuery: string;
  filters: Filters;

  selectedSession: Session | null;
  isPanelOpen: boolean;

  pageIndex: number;
  pageSize: number;

  setSearchQuery: (query: string) => void;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
  selectSession: (session: Session | null) => void;
  closePanel: () => void;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sessions: mockSessions,
  searchQuery: "",
  filters: { status: "All", riskLevel: "All" },
  selectedSession: null,
  isPanelOpen: false,
  pageIndex: 0,
  pageSize: 10,

  setSearchQuery: (query) => set({ searchQuery: query, pageIndex: 0 }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      pageIndex: 0,
    })),

  resetFilters: () =>
    set({
      filters: { status: "All", riskLevel: "All" },
      searchQuery: "",
      pageIndex: 0,
    }),

  selectSession: (session) =>
    set({ selectedSession: session, isPanelOpen: session !== null }),

  closePanel: () => set({ isPanelOpen: false, selectedSession: null }),

  setPageIndex: (index) => set({ pageIndex: index }),

  setPageSize: (size) => set({ pageSize: size, pageIndex: 0 }),
}));
