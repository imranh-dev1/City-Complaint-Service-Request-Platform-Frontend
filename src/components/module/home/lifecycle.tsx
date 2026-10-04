import {
  BellRing,
  CircleCheck,
  FilePlus,
  type LucideIcon,
  MapPin,
  Network,
  ShieldCheck,
  Star,
  UserCheck,
  Wrench,
} from "lucide-react";

import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";

type Stage = {
  number: string;
  title: string;
  actor: string;
  description: string;
  meta: string;
  icon: LucideIcon;
};

const stages: Stage[] = [
  {
    number: "01",
    title: "Create complaint / request",
    actor: "Citizen",
    description:
      "A verified citizen account files the issue with a description, photo or video evidence, and an exact location.",
    meta: "Target · under 2 minutes",
    icon: FilePlus,
  },
  {
    number: "02",
    title: "Category & location",
    actor: "Platform",
    description:
      "Category, ward and coordinates are read together to confirm the request is valid, complete and geocoded.",
    meta: "Auto · validated on submit",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Department assignment",
    actor: "Routing engine",
    description:
      "The request is routed by capability and jurisdiction, so a drainage issue never lands with the parks team.",
    meta: "Routing · capability + ward",
    icon: Network,
  },
  {
    number: "04",
    title: "Staff / technician assigned",
    actor: "Department manager",
    description:
      "A named officer is picked by skill, current workload and distance from the reported location.",
    meta: "Matching · skill, load, proximity",
    icon: UserCheck,
  },
  {
    number: "05",
    title: "Investigation / work",
    actor: "Field technician",
    description:
      "The technician inspects the site, logs progress and attaches before-and-after evidence from the field.",
    meta: "Evidence · photos per update",
    icon: Wrench,
  },
  {
    number: "06",
    title: "Status update",
    actor: "Platform",
    description:
      "Every state change is pushed to the citizen in-app, by email and by SMS, so nobody has to chase a reply.",
    meta: "Notify · in-app, email, SMS",
    icon: BellRing,
  },
  {
    number: "07",
    title: "Resolution",
    actor: "Assigned officer",
    description:
      "Work is marked complete against the original complaint, closing the SLA clock with a written resolution note.",
    meta: "Closes · the SLA timer",
    icon: CircleCheck,
  },
  {
    number: "08",
    title: "Citizen feedback",
    actor: "Citizen",
    description:
      "The citizen confirms the fix or reopens the request with one tap, which is scored against the department.",
    meta: "Outcome · closed or reopened",
    icon: Star,
  },
];

export default function RequestLifecycle() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Request lifecycle"
                title={
                  <>
                    Eight stages, <span className="text-white/35">zero</span>{" "}
                    <span className="text-primary">black holes</span>
                  </>
                }
                description="A complaint is not a support ticket that disappears into an inbox. Every request moves through a fixed state machine, and no stage can be skipped or silently closed."
              />

              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
                <div className="bg-[#0b0c0e] p-5">
                  <dt className="text-[10px] tracking-[0.16em] text-white/30 uppercase">
                    Visible stages
                  </dt>

                  <dd className="mt-2 font-mono text-2xl text-white">8 / 8</dd>
                </div>

                <div className="bg-[#0b0c0e] p-5">
                  <dt className="text-[10px] tracking-[0.16em] text-white/30 uppercase">
                    Average stages
                  </dt>

                  <dd className="mt-2 font-mono text-2xl text-white">5.4</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

                <p className="text-[12px] leading-5 text-white/50">
                  Each transition is written to an immutable audit log with the
                  actor, the timestamp and the previous state — which is how
                  escalations and disputes are settled.
                </p>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {stages.map((stage, index) => (
              <li
                key={stage.number}
                className="group relative flex gap-5 pb-8 last:pb-0 sm:gap-7"
              >
                {index < stages.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-11 bottom-0 left-[22px] w-px bg-gradient-to-b from-white/[0.12] to-white/[0.04] sm:left-[26px]"
                  />
                )}

                <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-[#0b0c0e] transition-colors group-hover:border-primary/40 sm:size-[52px]">
                  <stage.icon
                    className="size-[18px] text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-mono text-[10px] text-white/25">
                      {stage.number}
                    </span>

                    <h3 className="text-[15px] font-medium tracking-[-0.01em] text-white sm:text-base">
                      {stage.title}
                    </h3>

                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/45">
                      {stage.actor}
                    </span>
                  </div>

                  <p className="mt-2.5 text-[13px] leading-6 text-white/40">
                    {stage.description}
                  </p>

                  <p className="mt-3 font-mono text-[10px] tracking-wide text-white/25">
                    {stage.meta}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
