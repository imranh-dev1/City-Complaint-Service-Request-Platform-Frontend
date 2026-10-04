import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";

type Priority = {
  level: string;
  name: string;
  examples: string;
  response: string;
  resolution: string;
  escalation: string;
  accent: string;
  chip: string;
};

const priorities: Priority[] = [
  {
    level: "P1",
    name: "Emergency",
    examples:
      "Live power failure, flooding, road collapse, sewage on main road",
    response: "15 minutes",
    resolution: "4 hours",
    escalation: "Auto-escalated to commissioner",
    accent: "bg-red-400",
    chip: "border-red-400/25 bg-red-400/10 text-red-300",
  },
  {
    level: "P2",
    name: "High",
    examples: "Water supply cut, transformer fault, unsafe structure",
    response: "1 hour",
    resolution: "24 hours",
    escalation: "Escalated after 2 missed updates",
    accent: "bg-orange-400",
    chip: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  },
  {
    level: "P3",
    name: "Standard",
    examples: "Potholes, streetlight outage, missed garbage collection",
    response: "4 hours",
    resolution: "48 hours",
    escalation: "Auto-escalated when SLA breaches",
    accent: "bg-sky-400",
    chip: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  },
  {
    level: "P4",
    name: "Low",
    examples: "Paint, landscaping, minor signage wear",
    response: "1 working day",
    resolution: "7 working days",
    escalation: "Reviewed weekly by the manager",
    accent: "bg-white/30",
    chip: "border-white/10 bg-white/[0.04] text-white/50",
  },
];

export default function SlaCommitments() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className={container}>
        <SectionHeading
          eyebrow="Service level commitments"
          title={
            <>
              Published deadlines, <span className="text-white/35">not</span>{" "}
              <span className="text-primary">best effort</span>
            </>
          }
          description="Priority is set from the category and the reported impact. The clock starts when the request is validated and is published on the request itself — so both the citizen and the department are working to the same deadline."
          trailing={
            <Link
              href="/sla"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
            >
              Full SLA charter
              <ArrowUpRight className="size-4 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0c0e] lg:mt-16">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] border-collapse text-left">
              <caption className="sr-only">
                Response and resolution targets by complaint priority
              </caption>

              <thead>
                <tr className="border-b border-white/[0.07]">
                  {[
                    "Priority",
                    "Typical cases",
                    "First response",
                    "Resolution target",
                    "If the target is missed",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-6 py-4 text-[10px] font-medium tracking-[0.16em] text-white/30 uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {priorities.map((priority) => (
                  <tr
                    key={priority.level}
                    className="border-b border-white/[0.06] transition-colors last:border-b-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-5 align-middle">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className={`h-9 w-0.5 rounded-full ${priority.accent}`}
                        />

                        <div>
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] ${priority.chip}`}
                          >
                            {priority.level}
                          </span>

                          <p className="mt-1.5 text-[13px] font-medium text-white/85">
                            {priority.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="max-w-xs px-6 py-5 align-middle text-[12px] leading-5 text-white/40">
                      {priority.examples}
                    </td>

                    <td className="px-6 py-5 align-middle font-mono text-[13px] text-white/80">
                      {priority.response}
                    </td>

                    <td className="px-6 py-5 align-middle font-mono text-[13px] text-white/80">
                      {priority.resolution}
                    </td>

                    <td className="px-6 py-5 align-middle text-[12px] leading-5 text-white/40">
                      {priority.escalation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="border-t border-white/[0.07] px-6 py-4 text-[11px] leading-5 text-white/30">
            Emergency cases can also be reported by phone on the 24-hour
            helpline. Online reports are handled outside office hours as well.
          </p>
        </div>
      </div>
    </Section>
  );
}
