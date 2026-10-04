"use client";

import { cn } from "cn";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Construction,
  Droplets,
  Lamp,
  type LucideIcon,
  MapPin,
  Radio,
  Recycle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/* -------------------------------------------------------------------------- */
/*                                  TRUST POINTS                                  */
/* -------------------------------------------------------------------------- */

const trustPoints = [
  {
    icon: Radio,
    label: "Live tracking",
  },
  {
    icon: ShieldCheck,
    label: "Verified updates",
  },
  {
    icon: Clock3,
    label: "SLA monitoring",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  REQUESTS                                  */
/* -------------------------------------------------------------------------- */

const stages = ["Filed", "Assigned", "On site", "Closed"];

type StatusTone = "live" | "urgent" | "queued" | "resolved";

type LiveRequest = {
  reference: string;
  category: string;
  icon: LucideIcon;
  title: string;
  location: string;
  status: string;
  tone: StatusTone;
  completed: number;
  department: string;
  assignee: string;
  initials: string;
  sla: string;
  slaLabel: string;
};

const requests: LiveRequest[] = [
  {
    reference: "CR-2026-01842",
    category: "Street lighting",
    icon: Lamp,
    title: "Streetlight not functioning",
    location: "Ward 12 · Central District",
    status: "In progress",
    tone: "live",
    completed: 3,
    department: "Public Works",
    assignee: "Officer #24",
    initials: "PW",
    sla: "17h 42m",
    slaLabel: "SLA remaining",
  },
  {
    reference: "CR-2026-01836",
    category: "Drainage",
    icon: Droplets,
    title: "Waterlogging on main road",
    location: "Ward 07 · Riverside",
    status: "Escalated",
    tone: "urgent",
    completed: 2,
    department: "Sanitation & Drainage",
    assignee: "Crew #07 dispatched",
    initials: "SD",
    sla: "3h 05m",
    slaLabel: "SLA remaining",
  },
  {
    reference: "CR-2026-01829",
    category: "Waste management",
    icon: Recycle,
    title: "Collection missed on MG Road",
    location: "Ward 23 · Old Town",
    status: "Assigned",
    tone: "queued",
    completed: 1,
    department: "Waste Management",
    assignee: "Van #112 · 09:30",
    initials: "WM",
    sla: "26h 10m",
    slaLabel: "SLA remaining",
  },
  {
    reference: "CR-2026-01811",
    category: "Roads & highways",
    icon: Construction,
    title: "Pothole on ring road ramp",
    location: "Ward 03 · North Gate",
    status: "Closed",
    tone: "resolved",
    completed: 4,
    department: "Roads & Highways",
    assignee: "Verified by citizen",
    initials: "RH",
    sla: "4h 31m",
    slaLabel: "Resolution time",
  },
];

const statusStyles: Record<
  StatusTone,
  {
    dot: string;
    text: string;
    background: string;
  }
> = {
  live: {
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    background: "bg-emerald-400/10",
  },
  urgent: {
    dot: "bg-orange-400",
    text: "text-orange-300",
    background: "bg-orange-400/10",
  },
  queued: {
    dot: "bg-sky-400",
    text: "text-sky-300",
    background: "bg-sky-400/10",
  },
  resolved: {
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    background: "bg-emerald-400/10",
  },
};

function RequestCard({ request }: { request: LiveRequest }) {
  const Icon = request.icon;

  const progress = (request.completed / stages.length) * 100;

  const status = statusStyles[request.tone];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111214] p-5 shadow-2xl shadow-black/20">
      {/* Top border glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
            <Icon className="size-[18px] text-primary" strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="text-[12px] font-medium text-white/80">
              {request.category}
            </p>

            <p className="mt-0.5 font-mono text-[10px] tracking-wide text-white/30">
              {request.reference}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium",
            status.background,
            status.text,
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              status.dot,
              request.tone !== "resolved" && "animate-pulse",
            )}
          />

          {request.status}
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-[17px] font-medium tracking-[-0.02em] text-white">
          {request.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-white/35">
          <MapPin className="size-3.5" />
          {request.location}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
            Resolution progress
          </span>

          <span className="font-mono text-[11px] text-white/60">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${progress}% `,
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-start">
        {stages.map((stage, index) => {
          const completed = index < request.completed;

          return (
            <React.Fragment key={stage}>
              <div className="flex min-w-0 flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full border",
                    completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-white/10 bg-white/[0.03] text-white/20",
                  )}
                >
                  {completed && <Check className="size-3" strokeWidth={3} />}
                </div>

                <span
                  className={cn(
                    "text-[9px] whitespace-nowrap",
                    completed ? "text-white/65" : "text-white/25",
                  )}
                >
                  {stage}
                </span>
              </div>

              {index < stages.length - 1 && (
                <div
                  className={cn(
                    "mt-2.5 h-px flex-1",
                    index < request.completed
                      ? "bg-primary/50"
                      : "bg-white/[0.08]",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary ring-1 ring-primary/20">
            {request.initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-white/70">
              {request.department}
            </p>

            <p className="truncate text-[10px] text-white/30">
              {request.assignee}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-mono text-[12px] text-white/75">{request.sla}</p>

          <p className="text-[9px] text-white/25">{request.slaLabel}</p>
        </div>
      </div>
    </article>
  );
}

export default function CityComplaintBanner() {
  const [api, setApi] = React.useState<CarouselApi>();

  const [selected, setSelected] = React.useState(0);

  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const sync = () => {
      setSelected(api.selectedScrollSnap());
    };

    sync();

    api.on("reInit", sync);
    api.on("select", sync);

    return () => {
      api.off("reInit", sync);
      api.off("select", sync);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || paused) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, [api, paused]);

  return (
    <section className="relative w-full bg-background px-3 pt-20 sm:px-5 lg:px-6 lg:pt-24">
      <div className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[28px] border border-border bg-[#08090a] shadow-2xl shadow-black/20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 size-[500px] rounded-full bg-primary/[0.08] blur-[120px]" />

          <div className="absolute right-[-180px] top-[20%] size-[450px] rounded-full bg-primary/[0.05] blur-[120px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_35%)]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative">
          <div className="grid items-center gap-14 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-16 lg:py-20 xl:px-20">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />

                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
                  Civic service platform
                </span>
              </div>

              {/* Heading */}
              <h1 className="mt-7 max-w-[650px] text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.25rem]">
                Better cities
                <br />
                <span className="text-white/35">start with</span>{" "}
                <span className="text-primary">better action.</span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-lg text-[15px] leading-7 text-white/45 sm:text-base">
                Report local problems, connect them with the right department,
                and follow every step from submission to resolution — all in one
                transparent platform.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  <Link href="/complaints/new">
                    Report an issue
                    <ArrowUpRight
                      className="ml-2 size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2.2}
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-white hover:bg-white/[0.07] hover:text-white"
                >
                  <Link href="/track">
                    Track a request
                    <ChevronRight className="ml-1.5 size-4 text-white/40" />
                  </Link>
                </Button>
              </div>

              {/* Trust points */}
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.07] pt-6">
                {trustPoints.map((point) => (
                  <div
                    key={point.label}
                    className="flex items-center gap-2 text-[11px] text-white/35"
                  >
                    <point.icon className="size-3.5 text-primary/70" />

                    {point.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-w-0">
              {/* Dashboard */}
              <div className="relative rounded-[22px] border border-white/10 bg-white/[0.025] p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">
                {/* Dashboard header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                      <Radio className="size-3.5 text-primary" />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-white/80">
                        Service activity
                      </p>

                      <p className="text-[9px] text-white/30">
                        Live civic requests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] text-emerald-300">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                    LIVE
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 px-2 pb-2">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3">
                    <p className="text-[9px] uppercase tracking-wider text-white/25">
                      Active
                    </p>

                    <p className="mt-1 font-mono text-lg text-white">128</p>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3">
                    <p className="text-[9px] uppercase tracking-wider text-white/25">
                      Resolved
                    </p>

                    <p className="mt-1 font-mono text-lg text-white">94%</p>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3">
                    <p className="text-[9px] uppercase tracking-wider text-white/25">
                      Avg. time
                    </p>

                    <p className="mt-1 font-mono text-lg text-white">18h</p>
                  </div>
                </div>

                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  setApi={setApi}
                  className="px-2"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onFocusCapture={() => setPaused(true)}
                  onBlurCapture={() => setPaused(false)}
                >
                  <CarouselContent>
                    {requests.map((request) => (
                      <CarouselItem
                        key={request.reference}
                        className="basis-full"
                      >
                        <RequestCard request={request} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <div className="flex items-center justify-between px-2 py-3">
                    {/* Pagination */}
                    <div className="flex items-center gap-1.5">
                      {requests.map((request, index) => (
                        <button
                          key={request.reference}
                          type="button"
                          onClick={() => api?.scrollTo(index)}
                          aria-label={`Show request ${index + 1} `}
                          aria-current={index === selected}
                          className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            index === selected
                              ? "w-7 bg-primary"
                              : "w-2.5 bg-white/15 hover:bg-white/30",
                          )}
                        />
                      ))}
                    </div>

                    {/* Carousel controls */}
                    <div className="flex items-center gap-1.5">
                      <span className="mr-2 font-mono text-[9px] text-white/25">
                        {String(selected + 1).padStart(2, "0")} /{" "}
                        {String(requests.length).padStart(2, "0")}
                      </span>

                      <CarouselPrevious
                        variant="outline"
                        size="icon-sm"
                        className="static size-7 translate-y-0 rounded-lg border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.08] hover:text-white"
                      />

                      <CarouselNext
                        variant="outline"
                        size="icon-sm"
                        className="static size-7 translate-y-0 rounded-lg border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.08] hover:text-white"
                      />
                    </div>
                  </div>
                </Carousel>
              </div>

              {/* Floating verification card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-white/10 bg-[#111214]/95 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-400/10">
                    <Check className="size-4 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-white/70">
                      Resolution verified
                    </p>

                    <p className="mt-0.5 text-[9px] text-white/30">
                      Citizen confirmation received
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-14 lg:h-20" />
    </section>
  );
}
