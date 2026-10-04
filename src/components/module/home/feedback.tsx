import { Check, Quote, Star } from "lucide-react";

import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";

type Feedback = {
  quote: string;
  name: string;
  ward: string;
  category: string;
  resolvedIn: string;
  rating: number;
};

const feedback: Feedback[] = [
  {
    quote:
      "I reported a pothole on the ring road at 8 in the morning. By the evening the crew had patched it and I had a photo of the finished work in my dashboard.",
    name: "Anjali Menon",
    ward: "Ward 12 · Central District",
    category: "Roads & potholes",
    resolvedIn: "Resolved in 10h",
    rating: 5,
  },
  {
    quote:
      "The transformer outside our building started sparking at midnight. It was flagged as an emergency automatically and supply was cut within the hour.",
    name: "Imran Qureshi",
    ward: "Ward 04 · Lake View",
    category: "Power & supply",
    resolvedIn: "Resolved in 3h 12m",
    rating: 5,
  },
  {
    quote:
      "I could see which officer was assigned, what he was doing on site, and when it was finished. No more standing in a queue at the ward office.",
    name: "Fatima Sheikh",
    ward: "Ward 07 · Riverside",
    category: "Water & drainage",
    resolvedIn: "Resolved in 1d 4h",
    rating: 4,
  },
];

const distribution = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const starPositions = [1, 2, 3, 4, 5] as const;

function Rating({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {starPositions.map((position) => (
        <Star
          key={position}
          className={
            position <= rating
              ? "size-3 fill-primary text-primary"
              : "size-3 text-white/15"
          }
        />
      ))}
    </span>
  );
}

export default function CitizenFeedback() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className={container}>
        <SectionHeading
          eyebrow="Citizen feedback"
          title={
            <>
              Feedback closes the <span className="text-white/35">loop</span>,{" "}
              <span className="text-primary">not the file</span>
            </>
          }
          description="Rating a resolution is part of the workflow, not an afterthought. It is scored against the department, and a low score reopens the request automatically."
        />

        <ul className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-3">
          {feedback.map((item) => (
            <li
              key={item.name}
              className="relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-6"
            >
              <Quote
                className="size-5 text-primary/40"
                strokeWidth={1.6}
                aria-hidden
              />

              <blockquote className="mt-4 flex-1 text-[13px] leading-6 text-white/60">
                {item.quote}
              </blockquote>

              <div className="mt-6 border-t border-white/[0.07] pt-5">
                <div className="flex items-center justify-between gap-3">
                  <Rating rating={item.rating} />

                  <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-300/80">
                    <Check className="size-3" />
                    {item.resolvedIn}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-[10px] font-semibold text-white/70 ring-1 ring-white/[0.08]">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-white/80">
                      {item.name}
                    </p>

                    <p className="truncate text-[11px] text-white/30">
                      {item.ward} · {item.category}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-3 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-[auto_minmax(0,1fr)]">
          <div className="flex items-center gap-6 bg-[#0b0c0e] p-6 lg:px-8">
            <div>
              <p className="font-mono text-[2.4rem] leading-none font-medium tracking-[-0.03em] text-white tabular-nums">
                4.6
                <span className="text-lg text-white/30">/5</span>
              </p>

              <p className="mt-2 text-[11px] text-white/35">
                3,904 resolutions rated
              </p>
            </div>

            <Rating rating={5} />
          </div>

          <div className="grid gap-3 bg-[#0b0c0e] p-6 sm:grid-cols-5 sm:gap-5 lg:px-8">
            {distribution.map((row) => (
              <div key={row.stars}>
                <div className="flex items-center justify-between font-mono text-[10px] text-white/30">
                  <span>{row.stars}★</span>

                  <span>{row.percent}%</span>
                </div>

                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    style={{ width: `${row.percent}%` }}
                    className="h-full rounded-full bg-primary/70"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
