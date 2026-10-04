import {
  ArrowUpRight,
  Building2,
  Droplets,
  Leaf,
  type LucideIcon,
  Power,
  Recycle,
  TrafficCone,
} from "lucide-react";
import Link from "next/link";

import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";

type Department = {
  name: string;
  categories: number;
  officers: number;
  openRequests: number;
  slaMet: number;
  avgResponse: string;
  load: number;
  icon: LucideIcon;
};

const departments: Department[] = [
  {
    name: "Roads & Highways",
    categories: 4,
    officers: 42,
    openRequests: 214,
    slaMet: 88,
    avgResponse: "6h 10m",
    load: 72,
    icon: Building2,
  },
  {
    name: "Water & Drainage",
    categories: 5,
    officers: 36,
    openRequests: 168,
    slaMet: 91,
    avgResponse: "3h 48m",
    load: 61,
    icon: Droplets,
  },
  {
    name: "Sanitation Services",
    categories: 3,
    officers: 58,
    openRequests: 192,
    slaMet: 94,
    avgResponse: "2h 55m",
    load: 84,
    icon: Recycle,
  },
  {
    name: "City Power Utility",
    categories: 4,
    officers: 29,
    openRequests: 96,
    slaMet: 79,
    avgResponse: "1h 32m",
    load: 57,
    icon: Power,
  },
  {
    name: "Traffic Police",
    categories: 6,
    officers: 24,
    openRequests: 121,
    slaMet: 86,
    avgResponse: "2h 04m",
    load: 48,
    icon: TrafficCone,
  },
  {
    name: "Parks & Recreation",
    categories: 2,
    officers: 18,
    openRequests: 64,
    slaMet: 96,
    avgResponse: "9h 20m",
    load: 33,
    icon: Leaf,
  },
];

export default function DepartmentDirectory() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className={container}>
        <SectionHeading
          eyebrow="Who handles what"
          title={
            <>
              Six departments, <span className="text-white/35">one</span>{" "}
              accountable chain
            </>
          }
          description="Routing is capability-based: the request goes to the department that owns the service, then to a named officer inside it. Nothing sits in a shared queue."
          trailing={
            <div className="flex items-center gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
              <div>
                <p className="text-[10px] tracking-[0.16em] text-white/30 uppercase">
                  Field staff
                </p>

                <p className="mt-1 font-mono text-xl text-white">207</p>
              </div>

              <div className="h-8 w-px bg-white/[0.08]" />

              <div>
                <p className="text-[10px] tracking-[0.16em] text-white/30 uppercase">
                  Wards
                </p>

                <p className="mt-1 font-mono text-xl text-white">26</p>
              </div>
            </div>
          }
        />

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {departments.map((department) => (
            <li key={department.name}>
              <Link
                href={`/departments/${department.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-6 transition-colors hover:border-primary/30 hover:bg-white/[0.035]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                    <department.icon
                      className="size-5 text-primary"
                      strokeWidth={1.7}
                    />
                  </div>

                  <ArrowUpRight className="size-4 text-white/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>

                <h3 className="mt-5 text-[15px] font-medium tracking-[-0.01em] text-white">
                  {department.name}
                </h3>

                <p className="mt-1.5 text-[11px] text-white/30">
                  {department.categories} categories · {department.officers}{" "}
                  officers
                </p>

                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-5">
                  <div>
                    <dt className="text-[10px] text-white/30">Open</dt>

                    <dd className="mt-1 font-mono text-[15px] text-white/85">
                      {department.openRequests}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[10px] text-white/30">Avg response</dt>

                    <dd className="mt-1 font-mono text-[15px] text-white/85">
                      {department.avgResponse}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[10px] text-white/30">SLA met</dt>

                    <dd className="mt-1 font-mono text-[15px] text-white/85">
                      {department.slaMet}%
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-[10px] text-white/30">
                    <span>Current load</span>

                    <span className="font-mono">{department.load}%</span>
                  </div>

                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-primary/70"
                      style={{ width: `${department.load}%` }}
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
