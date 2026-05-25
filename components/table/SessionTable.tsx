"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { Session, SessionStatus, RiskLevel } from "@/types";
import {
  mergeClasses,
  getStatusConfig,
  getRiskConfig,
  exportToCSV,
} from "@/lib/utils";

const STATUS_OPTIONS: (SessionStatus | "All")[] = [
  "All",
  "Active",
  "Flagged",
  "Completed",
  "Reviewing",
  "Suspended",
];
const RISK_OPTIONS: (RiskLevel | "All")[] = [
  "All",
  "Low",
  "Medium",
  "High",
  "Critical",
];

export function SessionTable() {
  const {
    sessions,
    searchQuery,
    filters,
    selectedSession,
    pageIndex,
    pageSize,
    setSearchQuery,
    setFilter,
    resetFilters,
    selectSession,
    setPageIndex,
    setPageSize,
  } = useDashboardStore();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = useMemo(() => {
    return sessions.filter((s) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        s.candidateName.toLowerCase().includes(query) ||
        s.sessionId.toLowerCase().includes(query) ||
        s.examTitle.toLowerCase().includes(query);
      const matchStatus =
        filters.status === "All" || s.status === filters.status;
      const matchRisk =
        filters.riskLevel === "All" || s.riskLevel === filters.riskLevel;
      return matchSearch && matchStatus && matchRisk;
    });
  }, [sessions, searchQuery, filters]);

  const columns = useMemo<ColumnDef<Session>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <input
            type="checkbox"
            className="rounded border-white/20 bg-transparent accent-white/50 w-3.5 h-3.5"
          />
        ),
        cell: () => (
          <input
            type="checkbox"
            className="rounded border-white/20 bg-transparent accent-white/50 w-3.5 h-3.5"
            onClick={(e) => e.stopPropagation()}
          />
        ),
        size: 40,
        enableSorting: false,
      },
      {
        accessorKey: "candidateName",
        header: "Candidate Name",
        cell: (info) => (
          <span className="text-[12.5px] font-medium text-white/85">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "sessionId",
        header: "Session ID",
        cell: (info) => (
          <span className="text-[11.5px] text-white/40 font-mono">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "examTitle",
        header: "Exam Title",
        cell: (info) => (
          <span className="text-[12px] text-white/60">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as SessionStatus;
          const config = getStatusConfig(status);
          return (
            <span
              className={mergeClasses(
                "text-[10.5px] font-medium px-2 py-0.5 rounded",
                config.className,
              )}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "riskScore",
        header: "Risk Score",
        cell: (info) => {
          const row = info.row.original;
          const config = getRiskConfig(row.riskLevel);
          return (
            <div className="flex items-center gap-2">
              <span className="text-[12.5px] text-white/80 font-medium tabular-nums w-7">
                {info.getValue() as number}
              </span>
              <span
                className={mergeClasses(
                  "text-[10px] font-medium px-1.5 py-0.5 rounded",
                  config.className,
                )}
              >
                {row.riskLevel}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: (info) => (
          <span className="text-[12px] text-white/50 tabular-nums">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "lastActivity",
        header: "Last Activity",
        cell: (info) => (
          <span className="text-[12px] text-white/45">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "warningCount",
        header: "Warnings",
        cell: (info) => {
          const count = info.getValue() as number;
          return (
            <span
              className={mergeClasses(
                "text-[12px] tabular-nums font-medium",
                count === 0
                  ? "text-white/30"
                  : count >= 5
                    ? "text-red-400"
                    : count >= 3
                      ? "text-amber-400"
                      : "text-white/60",
              )}
            >
              {count}
            </span>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  const hasActiveFilters =
    filters.status !== "All" || filters.riskLevel !== "All";

  return (
    <div className="flex flex-col bg-[hsl(224,10%,11%)] border border-white/[0.07] rounded-lg overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07] flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-md">
          <Search size={13} className="text-white/30 flex-shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, session ID or exam..."
            className="flex-1 bg-transparent text-[12.5px] text-white/70 placeholder:text-white/25 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-white/30 hover:text-white/60"
            >
              <X size={11} />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters((p) => !p)}
          className={mergeClasses(
            "flex items-center gap-1.5 px-3 py-2 rounded-md border text-[12px] font-medium transition-colors",
            showFilters || hasActiveFilters
              ? "bg-white/[0.08] border-white/[0.15] text-white/80"
              : "border-white/[0.08] text-white/45 hover:bg-white/[0.05] hover:text-white/65",
          )}
        >
          <SlidersHorizontal size={13} />
          Filters
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5" />
          )}
        </button>

        <button
          onClick={() => exportToCSV(filteredData)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/[0.08] text-[12px] font-medium text-white/45 hover:bg-white/[0.05] hover:text-white/65 transition-colors"
        >
          <Download size={13} />
          Export
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden border-b border-white/[0.07]"
          >
            <div className="px-4 py-2.5 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] text-white/35">Status:</span>
                <div className="flex gap-1">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilter("status", s)}
                      className={mergeClasses(
                        "px-2 py-0.5 rounded text-[11px] font-medium transition-colors",
                        filters.status === s
                          ? "bg-white/[0.12] text-white/80"
                          : "text-white/35 hover:bg-white/[0.05] hover:text-white/55",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] text-white/35">Risk:</span>
                <div className="flex gap-1">
                  {RISK_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setFilter("riskLevel", r)}
                      className={mergeClasses(
                        "px-2 py-0.5 rounded text-[11px] font-medium transition-colors",
                        filters.riskLevel === r
                          ? "bg-white/[0.12] text-white/80"
                          : "text-white/35 hover:bg-white/[0.05] hover:text-white/55",
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-white/35 hover:text-white/60 flex items-center gap-1"
                >
                  <X size={10} /> Reset
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-white/[0.06]">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.column.getSize() }}
                    className="px-4 py-2.5 text-left text-[11px] font-semibold text-white/35 uppercase tracking-wide whitespace-nowrap"
                  >
                    {header.column.getCanSort() ? (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-1 hover:text-white/60 transition-colors"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp size={10} />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown size={10} />
                        ) : (
                          <ArrowUpDown size={10} className="opacity-40" />
                        )}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <AnimatePresence>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-[13px] text-white/30"
                  >
                    No sessions match your search or filters.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => {
                  const isSelected = selectedSession?.id === row.original.id;
                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() =>
                        selectSession(isSelected ? null : row.original)
                      }
                      className={mergeClasses(
                        "border-b border-white/[0.04] cursor-pointer transition-colors",
                        isSelected
                          ? "bg-white/[0.07]"
                          : "hover:bg-white/[0.04]",
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[11.5px] text-white/35">Rows</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-white/[0.05] border border-white/[0.10] rounded text-[11.5px] text-white/60 px-1.5 py-0.5 outline-none"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n} className="bg-[#1a1a1f]">
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11.5px] text-white/35">
            {pageIndex * pageSize + 1}–
            {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of{" "}
            {filteredData.length}
          </span>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded text-white/35 hover:bg-white/[0.07] hover:text-white/65 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded text-white/35 hover:bg-white/[0.07] hover:text-white/65 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 py-0.5 rounded bg-white/[0.08] text-[11.5px] text-white/70 min-w-[28px] text-center">
              {pageIndex + 1}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded text-white/35 hover:bg-white/[0.07] hover:text-white/65 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>

            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded text-white/35 hover:bg-white/[0.07] hover:text-white/65 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
