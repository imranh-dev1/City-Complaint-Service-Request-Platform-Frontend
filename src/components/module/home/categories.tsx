import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Construction,
  Droplets,
  Lamp,
  type LucideIcon,
  Recycle,
  TrafficCone,
  Trees,
  Zap,
} from "lucide-react";
import Link from "next/link";

import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";

type Service = {
  slug: string;
  name: string;
  description: string;
  department: string;
  resolutionTarget: string;
  openRequests: number;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    slug: "roads",
    name: "Roads & Potholes",
    description: "Potholes, cracks, sunken slabs and faded road markings.",
    department: "Roads & Highways",
    resolutionTarget: "48h",
    openRequests: 214,
    icon: Construction,
  },
  {
    slug: "water-drainage",
    name: "Water & Drainage",
    description:
      "Supply disruption, leaking mains, blocked drains and waterlogging.",
    department: "Water Supply & Drainage",
    resolutionTarget: "24h",
    openRequests: 168,
    icon: Droplets,
  },
  {
    slug: "sanitation",
    name: "Garbage & Sanitation",
    description: "Missed collection, overflowing bins and illegal dumping.",
    department: "Sanitation Services",
    resolutionTarget: "24h",
    openRequests: 192,
    icon: Recycle,
  },
  {
    slug: "street-lighting",
    name: "Street Lighting",
    description: "Non-working poles, flickering fixtures and dark stretches.",
    department: "Public Works",
    resolutionTarget: "72h",
    openRequests: 87,
    icon: Lamp,
  },
  {
    slug: "traffic",
    name: "Traffic & Signage",
    description: "Signal faults, missing boards, barricades and dead zones.",
    department: "Traffic Police",
    resolutionTarget: "36h",
    openRequests: 121,
    icon: TrafficCone,
  },
  {
    slug: "public-spaces",
    name: "Parks & Public Spaces",
    description: "Broken play equipment, dead trees and unusable open spaces.",
    department: "Parks & Recreation",
    resolutionTarget: "96h",
    openRequests: 64,
    icon: Trees,
  },
  {
    slug: "encroachment",
    name: "Illegal Encroachment",
    description:
      "Unauthorised structures, blocking of footpaths and junctions.",
    department: "Town Planning",
    resolutionTarget: "72h",
    openRequests: 143,
    icon: Building2,
  },
  {
    slug: "power",
    name: "Power & Supply",
    description: "Transformer failures, exposed wiring and dead street poles.",
    department: "City Power Utility",
    resolutionTarget: "12h",
    openRequests: 96,
    icon: Zap,
  },
];

export default function ServiceCategories() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className={container}>
        <SectionHeading
          eyebrow="Report an issue"
          title={
            <>
              Start from what you <span className="text-white/35">can see</span>
            </>
          }
          description="Pick the closest match. Your location, ward and category are what route the request to the right department automatically — no phone calls, no guesswork."
          trailing={
            <Link
              href="/complaints/new"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
            >
              All 24 services
              <ChevronRight className="size-4 text-white/30 transition-transform group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/complaints/new?category=${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-5 transition-colors hover:border-primary/30 hover:bg-white/[0.035]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                    <service.icon
                      className="size-[18px] text-primary"
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="rounded-full border border-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-white/40">
                    {service.resolutionTarget}
                  </span>
                </div>

                <h3 className="mt-5 text-[15px] font-medium tracking-[-0.01em] text-white">
                  {service.name}
                </h3>

                <p className="mt-2 text-[12px] leading-5 text-white/35">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <div className="min-w-0">
                    <p className="truncate text-[11px] text-white/45">
                      {service.department}
                    </p>

                    <p className="mt-0.5 font-mono text-[10px] text-white/25">
                      {service.openRequests} open
                    </p>
                  </div>

                  <ArrowUpRight className="size-4 shrink-0 text-white/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
