"use client";

import { cn } from "cn";
import {
  Check,
  Construction,
  Droplets,
  Lamp,
  type LucideIcon,
  MapPin,
  Recycle,
  Search,
  Siren,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type StatusKey = "open" | "assigned" | "in_progress" | "escalated" | "resolved";

type Request = {
  reference: string;
  title: string;
  category: string;
  ward: string;
  department: string;
  assignee: string;
  initials: string;
  status: StatusKey;
  statusLabel: string;
  slaLabel: string;
  slaPercent: number;
  slaUrgent: boolean;
  icon: LucideIcon;
};

const requests: Request[] = [
  {
    reference: "CR-2026-01842",
    title: "Streetlight not functioning",
    category: "Street lighting",
    ward: "Ward 12 · Central District",
    department: "Public Works",
    assignee: "R. Deshmukh",
    initials: "RD",
    status: "in_progress",
    statusLabel: "In progress",
    slaLabel: "17h 42m left",
    slaPercent: 63,
    slaUrgent: false,
    icon: Lamp,
  },
  {
    reference: "CR-2026-01836",
    title: "Waterlogging on main road",
    category: "Water & drainage",
    ward: "Ward 07 · Riverside",
    department: "Water & Drainage",
    assignee: "Crew #07 dispatched",
    initials: "C7",
    status: "escalated",
    statusLabel: "Escalated",
    slaLabel: "3h 05m left",
    slaPercent: 91,
    slaUrgent: true,
    icon: Droplets,
  },
  {
    reference: "CR-2026-01829",
    title: "Collection missed on MG Road",
    category: "Sanitation",
    ward: "Ward 23 · Old Town",
    department: "Sanitation Services",
    assignee: "Van #112 · 09:30",
    initials: "V1",
    status: "assigned",
    statusLabel: "Assigned",
    slaLabel: "26h 10m left",
    slaPercent: 28,
    slaUrgent: false,
    icon: Recycle,
  },
  {
    reference: "CR-2026-01851",
    title: "Transformer sparking near school gate",
    category: "Power & supply",
    ward: "Ward 04 · Lake View",
    department: "City Power Utility",
    assignee: "L. Fernandes",
    initials: "LF",
    status: "escalated",
    statusLabel: "Escalated",
    slaLabel: "48m left",
    slaPercent: 97,
    slaUrgent: true,
    icon: Zap,
  },
  {
    reference: "CR-2026-01847",
    title: "Pothole widening after monsoon",
    category: "Roads & potholes",
    ward: "Ward 03 · North Gate",
    department: "Roads & Highways",
    assignee: "Awaiting triage",
    initials: "··",
    status: "open",
    statusLabel: "Open",
    slaLabel: "4h 12m to route",
    slaPercent: 22,
    slaUrgent: false,
    icon: Construction,
  },
  {
    reference: "CR-2026-01833",
    title: "Overflowing bin near bus depot",
    category: "Sanitation",
    ward: "Ward 15 · Depot Road",
    department: "Sanitation Services",
    assignee: "S. Iyer",
    initials: "SI",
    status: "in_progress",
    statusLabel: "In progress",
    slaLabel: "9h 30m left",
    slaPercent: 74,
    slaUrgent: false,
    icon: Recycle,
  },
  {
    reference: "CR-2026-01811",
    title: "Pothole on ring road ramp",
    category: "Roads & potholes",
    ward: "Ward 03 · North Gate",
    department: "Roads & Highways",
    assignee: "Verified by citizen",
    initials: "OK",
    status: "resolved",
    statusLabel: "Resolved",
    slaLabel: "Closed in 4h 31m",
    slaPercent: 100,
    slaUrgent: false,
    icon: Check,
  },
  {
    reference: "CR-2026-01804",
    title: "Burst main flooding a basement",
    category: "Water & drainage",
    ward: "Ward 19 · Green Park",
    department: "Water & Drainage",
    assignee: "Verified by citizen",
    initials: "OK",
    status: "resolved",
    statusLabel: "Resolved",
    slaLabel: "Closed in 6h 08m",
    slaPercent: 100,
    slaUrgent: false,
    icon: Check,
  },
];

const statusTone: Record<StatusKey, { pill: string; dot: string }> = {
  open: {
    pill: "border-sky-400/20 bg-sky-400/10 text-sky-300",
    dot: "bg-sky-400",
  },
  assigned: {
    pill: "border-violet-400/20 bg-violet-400/10 text-violet-300",
    dot: "bg-violet-400",
  },
  in_progress: {
    pill: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
  escalated: {
    pill: "border-orange-400/20 bg-orange-400/10 text-orange-300",
    dot: "bg-orange-400",
  },
  resolved: {
    pill: "border-white/10 bg-white/[0.04] text-white/50",
    dot: "bg-white/40",
  },
};

const filters = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "assigned", label: "Assigned" },
  { key: "in_progress", label: "In progress" },
  { key: "escalated", label: "Escalated" },
  { key: "resolved", label: "Resolved" },
] as const;

export default function LiveRequestBoard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesFilter = filter === "all" || request.status === filter;

      const matchesQuery =
        needle.length === 0 ||
        [
          request.reference,
          request.title,
          request.category,
          request.ward,
          request.department,
          request.assignee,
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle);

      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const openCount = requests.filter(
    (request) => request.status !== "resolved",
  ).length;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0c0e]">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>

          <p className="text-[13px] font-medium text-white/80">
            Live request board
          </p>

          <span className="font-mono text-[11px] text-white/30">
            {openCount} open of {requests.length}
          </span>
        </div>

        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />

          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reference, ward, department"
            aria-label="Search requests"
            className="h-9 rounded-full border-white/[0.08] bg-white/[0.03] pl-9 text-[12px] text-white/80 placeholder:text-white/25 focus-visible:border-primary/40 focus-visible:ring-primary/20"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white/25 transition-colors hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] px-5 py-4">
        {filters.map((item) => {
          const active = filter === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
                active
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-white/[0.08] text-white/40 hover:border-white/[0.16] hover:text-white/70",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
          <Siren className="size-5 text-white/20" />

          <p className="text-[13px] text-white/50">
            No requests match this view.
          </p>

          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="text-[12px] text-primary underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ul>
          {visible.map((request) => {
            const tone = statusTone[request.status];
            const Icon = request.icon;

            return (
              <li
                key={request.reference}
                className="grid gap-4 border-b border-white/[0.06] px-5 py-5 transition-colors last:border-b-0 hover:bg-white/[0.02] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto_minmax(0,11rem)] lg:items-center lg:gap-6"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                    <Icon className="size-4 text-primary" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-white/85">
                      {request.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/30">
                      <span className="font-mono">{request.reference}</span>

                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {request.ward}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary ring-1 ring-primary/20">
                    {request.initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[12px] text-white/65">
                      {request.department}
                    </p>

                    <p className="truncate text-[11px] text-white/30">
                      {request.assignee}
                    </p>
                  </div>
                </div>

                <Badge
                  className={cn(
                    "w-fit border px-2.5 py-1 text-[10px]",
                    tone.pill,
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      tone.dot,
                      request.status !== "resolved" &&
                        request.status !== "assigned" &&
                        "animate-pulse",
                    )}
                  />

                  {request.statusLabel}
                </Badge>

                <div className="lg:text-right">
                  <p
                    className={cn(
                      "font-mono text-[11px]",
                      request.slaUrgent ? "text-orange-300" : "text-white/55",
                    )}
                  >
                    {request.slaLabel}
                  </p>

                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07] lg:flex lg:justify-end">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        request.slaUrgent ? "bg-orange-400" : "bg-primary",
                        request.status === "resolved" && "bg-emerald-400",
                      )}
                      style={{ width: `${request.slaPercent}%` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
