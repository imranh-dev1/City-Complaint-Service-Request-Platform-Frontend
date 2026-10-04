"use client";

import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  note: string;
};

const stats: Stat[] = [
  {
    label: "Resolved this month",
    value: 1284,
    note: "Across 26 wards",
  },
  {
    label: "Closed within SLA",
    value: 94,
    suffix: "%",
    note: "Target is 90%",
  },
  {
    label: "Average resolution",
    value: 18,
    suffix: "h",
    note: "First response in 4h 12m",
  },
  {
    label: "Citizen rating",
    value: 4.6,
    decimals: 1,
    suffix: "/5",
    note: "From 3,904 responses",
  },
];

type Month = {
  label: string;
  received: number;
  resolved: number;
};

const months: Month[] = [
  { label: "Nov", received: 1180, resolved: 1092 },
  { label: "Dec", received: 1264, resolved: 1180 },
  { label: "Jan", received: 1348, resolved: 1244 },
  { label: "Feb", received: 1290, resolved: 1210 },
  { label: "Mar", received: 1412, resolved: 1338 },
  { label: "Apr", received: 1366, resolved: 1301 },
  { label: "May", received: 1502, resolved: 1436 },
  { label: "Jun", received: 1468, resolved: 1412 },
  { label: "Jul", received: 1580, resolved: 1494 },
  { label: "Aug", received: 1614, resolved: 1552 },
  { label: "Sep", received: 1542, resolved: 1498 },
  { label: "Oct", received: 1476, resolved: 1432 },
];

const axisMax = 1800;
const axisTicks = [100, 75, 50, 25, 0];

const insights = [
  {
    label: "Repeat complaints",
    value: "−31%",
    detail: "Potholes and drain blockages since last year",
    trend: "down",
  },
  {
    label: "Fastest department",
    value: "2h 55m",
    detail: "Sanitation Services, average first response",
    trend: "up",
  },
  {
    label: "Reopened after fix",
    value: "1.8%",
    detail: "Down from 4.2% when manual follow-up was used",
    trend: "down",
  },
] as const;

function useCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);

      return;
    }

    let frame = 0;
    let observer: IntersectionObserver | undefined;

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        observer?.disconnect();

        const started = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - started) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;

          setValue(target * eased);

          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}

function AnimatedNumber({
  value,
  decimals = 0,
  suffix,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const { ref, value: current } = useCountUp(value);

  return (
    <span ref={ref}>
      {current.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function CityImpact() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className={container}>
        <SectionHeading
          eyebrow="Measured, not claimed"
          title={
            <>
              Every number here comes{" "}
              <span className="text-white/35">from</span>{" "}
              <span className="text-primary">the audit log</span>
            </>
          }
          description="Resolution counts, SLA compliance and satisfaction scores are derived from the same immutable event stream that drives the workflow — so the report cannot drift from reality."
        />

        <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-6"
            >
              <dt className="text-[10px] tracking-[0.16em] text-white/30 uppercase">
                {stat.label}
              </dt>

              <dd className="mt-3 font-mono text-[2.1rem] leading-none font-medium tracking-[-0.03em] text-white tabular-nums">
                <AnimatedNumber
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </dd>

              <p className="mt-3 text-[11px] text-white/30">{stat.note}</p>
            </div>
          ))}
        </dl>

        <div className="mt-3 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0c0e]">
          <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[14px] font-medium text-white">
                Requests received vs. resolved
              </h3>

              <p className="mt-1 text-[11px] text-white/30">
                Rolling 12 months · all six departments
              </p>
            </div>

            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-[11px] text-white/40">
                <span className="size-2.5 rounded-sm bg-white/[0.12] ring-1 ring-white/20" />
                Received
              </span>

              <span className="flex items-center gap-2 text-[11px] text-white/40">
                <span className="size-2.5 rounded-sm bg-primary/70" />
                Resolved
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="relative h-56 w-8 shrink-0 sm:w-10">
                {axisTicks.map((tick) => (
                  <span
                    key={tick}
                    className="absolute right-0 -translate-y-1/2 font-mono text-[9px] text-white/20 tabular-nums"
                    style={{ bottom: `${tick}%` }}
                  >
                    {Math.round((axisMax * tick) / 100)}
                  </span>
                ))}
              </div>

              <div className="relative min-w-0 flex-1">
                <div
                  aria-hidden
                  className="absolute inset-0 flex flex-col justify-between"
                >
                  {axisTicks.map((tick) => (
                    <span key={tick} className="h-px w-full bg-white/[0.06]" />
                  ))}
                </div>

                <div className="relative flex h-56 items-end gap-1 sm:gap-2">
                  {months.map((month) => (
                    <div
                      key={month.label}
                      className="group relative flex h-full flex-1 items-end justify-center gap-[3px]"
                    >
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-lg border border-white/10 bg-[#111214] px-2.5 py-1.5 text-center opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                        <p className="text-[10px] font-medium whitespace-nowrap text-white">
                          {month.label}
                        </p>

                        <p className="mt-0.5 font-mono text-[9px] whitespace-nowrap text-white/45">
                          {month.resolved} / {month.received}
                        </p>
                      </div>

                      <span
                        title={`${month.label} received ${month.received}`}
                        style={{
                          height: `${(month.received / axisMax) * 100}%`,
                        }}
                        className="w-2.5 rounded-t-[3px] bg-white/[0.12] ring-1 ring-white/20 transition-colors group-hover:bg-white/[0.18] sm:w-3.5"
                      />

                      <span
                        title={`${month.label} resolved ${month.resolved}`}
                        style={{
                          height: `${(month.resolved / axisMax) * 100}%`,
                        }}
                        className="w-2.5 rounded-t-[3px] bg-primary/70 transition-colors group-hover:bg-primary sm:w-3.5"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-1 sm:gap-2">
                  {months.map((month) => (
                    <span
                      key={month.label}
                      className="flex-1 text-center font-mono text-[9px] text-white/25"
                    >
                      {month.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <dl className="grid gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
            {insights.map((insight) => {
              const Trend =
                insight.trend === "up" ? ArrowUpRight : ArrowDownRight;

              return (
                <div key={insight.label} className="bg-[#0b0c0e] p-5 sm:p-6">
                  <dt className="flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-white/30 uppercase">
                    <Trend
                      className={
                        insight.trend === "up"
                          ? "size-3 text-primary"
                          : "size-3 text-emerald-400"
                      }
                    />

                    {insight.label}
                  </dt>

                  <dd className="mt-3 font-mono text-2xl text-white">
                    {insight.value}
                  </dd>

                  <p className="mt-2 text-[11px] leading-5 text-white/30">
                    {insight.detail}
                  </p>
                </div>
              );
            })}
          </dl>
        </div>

        <p className="mt-6 flex items-center gap-2 text-[11px] text-white/25">
          <TrendingUp className="size-3.5" />
          Published figures refresh nightly and can be requested per ward, per
          category or per department.
        </p>
      </div>
    </Section>
  );
}
